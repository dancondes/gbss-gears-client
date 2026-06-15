import { useState, useCallback } from 'react'

/**
 * Custom hook for making API calls with loading state
 * Errors are thrown and should be handled with try-catch
 * 
 * @returns {object} - API call utilities
 * @returns {boolean} loading - Loading state
 * @returns {function} execute - Function to execute the API call
 * @returns {function} reset - Function to reset states
 */
export const useApi = () => {
    const [loading, setLoading] = useState(false)

    /**
     * Execute an API call
     * @param {Promise} apiCall - The API function to execute
     * @returns {Promise} - The result of the API call
     * @throws {Error} - Throws error if API call fails
     */
    const execute = useCallback(async (apiCall) => {
        setLoading(true)

        try {
            const result = await apiCall
            return result
        } finally {
            setLoading(false)
        }
    }, [])

    /**
     * Reset states
     */
    const reset = useCallback(() => {
        setLoading(false)
    }, [])

    return { loading, execute, reset }
}

/**
 * Custom hook for making API calls that return data
 * Errors are thrown and should be handled with try-catch
 * 
 * @returns {object} - API call utilities with data state
 * @returns {any} data - Response data
 * @returns {boolean} loading - Loading state
 * @returns {function} execute - Function to execute the API call
 * @returns {function} reset - Function to reset states
 * 
 */
export const useApiData = (initialData = null) => {
    const [data, setData] = useState(initialData)
    const [loading, setLoading] = useState(false)

    /**
     * Execute an API call and store the result
     * @param {Promise} apiCall - The API function to execute
     * @returns {Promise} - The result of the API call
     * @throws {Error} - Throws error if API call fails
     */
    const execute = useCallback(async (apiCall) => {
        setLoading(true)

        try {
            const result = await apiCall
            setData(result)
            return result
        } finally {
            setLoading(false)
        }
    }, [])

    /**
     * Reset states
     */
    const reset = useCallback(() => {
        setData(initialData)
        setLoading(false)
    }, [initialData])

    return { data, loading, execute, reset }
}
