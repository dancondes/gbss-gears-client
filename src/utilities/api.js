import axios from 'axios'
import useAuthStore from '@/store/auth-store'
import { API_CALL_TIMEOUT_LIMIT } from '@/constants'
import { isTokenExpired } from './jwt-utils'

/**
 * API Configuration
 * Base URL for all API requests
 const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

/**
 * Create Axios instance with default configuration
 */
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    // timeout: API_CALL_TIMEOUT_LIMIT,
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
apiClient.interceptors.response.use(
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

/**
 * Generic API helper functions
 */

/**
 * GET request
 * @param {string} url - API endpoint
 * @param {object} config - Additional axios config
 * @returns {Promise} - Response data
 */
export const get = (url, config = {}) => {
    return apiClient.get(url, config)
}

/**
 * POST request
 * @param {string} url - API endpoint
 * @param {object} data - Request payload
 * @param {object} config - Additional axios config
 * @returns {Promise} - Response data
 */
export const post = (url, data = {}, config = {}) => {
    return apiClient.post(url, data, config)
}

/**
 * PUT request
 * @param {string} url - API endpoint
 * @param {object} data - Request payload
 * @param {object} config - Additional axios config
 * @returns {Promise} - Response data
 */
export const put = (url, data = {}, config = {}) => {
    return apiClient.put(url, data, config)
}

/**
 * PATCH request
 * @param {string} url - API endpoint
 * @param {object} data - Request payload
 * @param {object} config - Additional axios config
 * @returns {Promise} - Response data
 */
export const patch = (url, data = {}, config = {}) => {
    return apiClient.patch(url, data, config)
}

/**
 * DELETE request
 * @param {string} url - API endpoint
 * @param {object} config - Additional axios config
 * @returns {Promise} - Response data
 */
export const del = (url, config = {}) => {
    return apiClient.delete(url, config)
}

/**
 * Upload file(s)
 * @param {string} url - API endpoint
 * @param {FormData} formData - Form data with file(s)
 * @param {function} onUploadProgress - Progress callback
 * @param {string} method - HTTP method ('post' or 'put'), defaults to 'post'
 * @returns {Promise} - Response data
 */
export const uploadFile = (url, formData, onUploadProgress = null, method = 'post') => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }

    if (onUploadProgress) {
        config.onUploadProgress = onUploadProgress
    }

    return apiClient[method](url, formData, config)
}

// Export the configured axios instance for custom use cases
export default apiClient
