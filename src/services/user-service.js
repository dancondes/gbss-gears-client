import { ROUTES } from '@/constants/routes'
import { get, put, post } from '@/utilities/api'
import { useFetchOptions } from '@/hooks/use-fetch-options'

/**
 * User API Service
 * Handles all user-related API calls
 */

/**
 * User registration
 * @param {object} userData - Registration data
 * @returns {Promise} - Created user data and token
 */
export const register = (userData) => {
    return post(ROUTES.USERS.CREATE, userData)
}

/**
 * Fetch all users
 * @returns {Promise} - Array of users
 */
export const getAllUsers = () => {
    return get(ROUTES.USERS.GET_ALL)
}

/**
 * Fetch a single user by ID
 * @param {number|string} id - User ID
 * @returns {Promise} - User object
 */
export const getUserById = (id) => {
    return get(ROUTES.USERS.GET_BY_ID(id))
}

/**
 * Update a user
 * @param {number|string} id - User ID
 * @param {object} userData - Updated user data
 * @returns {Promise} - Updated user object
 */
export const updateUser = (id, userData) => {
    return put(ROUTES.USERS.UPDATE(id), userData)
}

/**
 * Custom hook to fetch user options for select/typeahead components
 * @returns {object} - Object containing options array, loading state, and error
 */
export function useUserOptions(valueKey = 'userId') {
    return useFetchOptions(getAllUsers, {
        valueKey,
        labelKey: 'name',
        transform: (data) => data
        .filter(user => user.firstName && user.lastName) // Filter out users with missing names
        .map(user => ({
            [valueKey]: valueKey === 'userId' ? user.userId?.toUpperCase() : user?.[valueKey],
            name: `${user.firstName} ${user.lastName}`
        }))
    })
}