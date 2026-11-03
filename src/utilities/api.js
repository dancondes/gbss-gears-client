import axios from 'axios'
import useAuthStore, { syncAuthFromStorage } from '@/store/auth-store'
import { isTokenExpired } from './jwt-utils'

/**
 * API Configuration
 * Base URL for all API requests
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

/**
 * Create Axios instance with default configuration
 */
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

/**
 * Request Interceptor
 * Automatically attaches the authentication token to requests
 */
apiClient.interceptors.request.use(
    (config) => {
        // Make sure we use the newest tokens, even if another tab just rotated them
        syncAuthFromStorage()

        const authState = useAuthStore.getState()
        const token = authState.token
        const impersonatedUser = authState.impersonatedUser

        if (token && isTokenExpired(token)) {
            authState.setSessionExpired(true)
            return Promise.reject({
                status: 401,
                message: 'Session expired. Please log in again.',
                errors: null,
            })
        }

        if (token) {
            const effectiveToken = impersonatedUser ? impersonatedUser.token : token
            config.headers.Authorization = `Bearer ${effectiveToken}`
            // Remember which mode this request was made in (used by the 401 handler)
            config._impersonated = !!impersonatedUser
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

/**
 * Response Interceptor
 * Handles common response scenarios and errors
 */
apiClient.interceptors.response.use(
    (response) => {
        if (response.config.rawResponse) return response
        // Return the data directly for successful responses
        return response.data
    },
    async (error) => {
        const originalRequest = error.config

        // Handle specific error cases
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const { status, data } = error.response

            switch (status) {
                case 401: {
                    // A 401 can simply mean another tab refreshed the tokens while this
                    // request was in flight. Compare the token this request used with the
                    // latest one before treating the session as expired.
                    const usedToken = originalRequest?.headers?.Authorization?.replace('Bearer ', '')
                    syncAuthFromStorage()

                    const state = useAuthStore.getState()
                    const sameMode = originalRequest?._impersonated === !!state.impersonatedUser
                    const currentToken = state.impersonatedUser ? state.impersonatedUser.token : state.token

                    const tokenWasRotated =
                        sameMode && !!currentToken && !!usedToken && currentToken !== usedToken

                    if (tokenWasRotated) {
                        // Retry once with the fresh token (the request interceptor re-attaches it).
                        // Skip the refresh endpoint itself: its body carries the old tokens.
                        const isRefreshCall = originalRequest?.url?.toLowerCase().includes('refresh')
                        if (originalRequest && !originalRequest._retried && !isRefreshCall) {
                            originalRequest._retried = true
                            return apiClient(originalRequest)
                        }
                    } else {
                        // Unauthorized - session is really over
                        state.setSessionExpired(true)
                    }
                    break
                }
                case 403:
                    break
                case 404:
                    break
                case 500:
                    break
                default:
                    break
            }

            // Return a structured error object
            return Promise.reject({
                status,
                message: data?.message || 'An error occurred',
                errors: data?.errors || null,
            })
        } else if (error.request) {
            // The request was made but no response was received
            return Promise.reject({
                status: null,
                message: 'Network error - please check your connection',
                errors: null,
            })
        } else {
            // Something happened in setting up the request that triggered an Error
            return Promise.reject({
                status: null,
                message: error.message || 'Request failed',
                errors: null,
            })
        }
    }
)

/**
 * Generic API helper functions
 */

export const get = (url, config = {}) => {
    return apiClient.get(url, config)
}

export const post = (url, data = {}, config = {}) => {
    return apiClient.post(url, data, config)
}

export const put = (url, data = {}, config = {}) => {
    return apiClient.put(url, data, config)
}

export const patch = (url, data = {}, config = {}) => {
    return apiClient.patch(url, data, config)
}

export const del = (url, config = {}) => {
    return apiClient.delete(url, config)
}

export const uploadFile = (url, formData, onUploadProgress = null, method = 'post') => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    }
    if (onUploadProgress) config.onUploadProgress = onUploadProgress

    return apiClient[method](url, formData, config)
}

// Export the configured axios instance for custom use cases
export default apiClient