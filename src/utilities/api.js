import axios from 'axios'
import useAuthStore from '@/store/auth-store'
import { isTokenExpired } from './jwt-utils'

/**
 * API Configuration
 * Base URL for all API requests
 const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const API_INTERNAL_APP_URL = import.meta.env.VITE_API_INTERNAL_APP_URL || ''

/**
 * Create Axios instance with default configuration
 */
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

const internalApiClient = axios.create({
    baseURL: API_INTERNAL_APP_URL,
    headers: { 'Content-Type': 'application/json' },
})

function attachInterceptors(client) {
    /**
     * Request Interceptor
     * Automatically attaches the authentication token to requests
     */
    client.interceptors.request.use(
        (config) => {
            const authState = useAuthStore.getState()
            const token = authState.token

            if (token && isTokenExpired(token)) {
                authState.setSessionExpired(true)
                return Promise.reject({
                    status: 401,
                    message: 'Session expired. Please log in again.',
                    errors: null,
                })
            }

            if (token) {
                config.headers.Authorization = `Bearer ${token}`
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
     * Automatically attempts token refresh on 401 errors
     */
    client.interceptors.response.use(
        (response) => {
            if (response.config.rawResponse) return response
            // Return the data directly for successful responses
            return response.data
        },
        async (error) => {
            // const originalRequest = error.config

            // Handle specific error cases
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                const { status, data } = error.response

                switch (status) {
                    case 401:
                        // Unauthorized - logout user
                        useAuthStore.getState().setSessionExpired(true)
                        break
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
}

// Attach interceptors to both API clients
attachInterceptors(apiClient)
attachInterceptors(internalApiClient)

const getClient = (internal = false) => {
    return internal ? internalApiClient : apiClient
}

/**
 * Generic API helper functions
 */

export const get = (url, config = {}, internal = false) => {
    return getClient(internal).get(url, config)
}

export const post = (url, data = {}, config = {}, internal = false) => {
    return getClient(internal).post(url, data, config)
}

export const put = (url, data = {}, config = {}, internal = false) => {
    return getClient(internal).put(url, data, config)
}

export const patch = (url, data = {}, config = {}, internal = false) => {
    return getClient(internal).patch(url, data, config)
}

export const del = (url, config = {}, internal = false) => {
    return getClient(internal).delete(url, config)
}

export const uploadFile = (url, formData, onUploadProgress = null, method = 'post', internal = false) => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    }
    if (onUploadProgress) config.onUploadProgress = onUploadProgress

    return getClient(internal)[method](url, formData, config)
}

// Export the configured axios instance for custom use cases
export default apiClient
