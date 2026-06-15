import { ROUTES } from '@/constants/routes'
import { get, put, post, del } from '@/utilities/api'
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
 * Update user status
 * @param {string} id - User ID
 * @param {boolean} status - New status (active/inactive)
 * @returns {Promise} - Updated user object
 */
export const updateUserStatus = (id, status) => {
    return put(ROUTES.USERS.UPDATE_STATUS(id, status))
}

export const requestPasswordReset = (email) => {
    return post(ROUTES.USERS.REQUEST_RESET_PASSWORD(email))
}

/**
 * Reset user password
 * @param {number|string} id - User ID
 * @returns {Promise} - Response object
 */
export const resetUserPassword = (email, password) => {
    return post(ROUTES.USERS.RESET_PASSWORD(email), JSON.stringify(password))
}

/**
 * Resend verification email to user
 * @param {number|string} email - User ID
 * @returns {Promise} - Response object
 */
export const requestSendVerificationEmail = (email) => {
    return post(ROUTES.USERS.REQUEST_SEND_VERIFICATION(email))
}

export const verifyEmail = (encryptedEmail) => {
    return get(ROUTES.USERS.VERIFY(encryptedEmail))
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


// Web Users
export function getAllWebUsers() {
    return get(ROUTES.USERS.GET_ALL_WEB_USERS)
}

export function getWebUserById(id) {
    return get(ROUTES.USERS.GET_WEB_USER_BY_ID(id))
}

export function createWebUser(data) {
    return post(ROUTES.USERS.CREATE_WEB_USER, data)
}

export function updateWebUser(id, data) {
    return put(ROUTES.USERS.UPDATE_WEB_USER(id), data)
}

export function deleteWebUser(id) {
    return del(ROUTES.USERS.DELETE_WEB_USER(id))
}