import { ROUTES } from '@/constants/routes'
import { post } from '@/utilities/api'

/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

/**
 * User login
 * @param {object} credentials - Login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise} - User data and token
 */
export function login (credentials) {
    return post(ROUTES.AUTH.LOGIN, credentials)
}

export function refreshToken(tokens) {
    return post(ROUTES.AUTH.REFRESH_TOKEN, tokens)
}