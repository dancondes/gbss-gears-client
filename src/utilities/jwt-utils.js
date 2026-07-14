import { jwtDecode } from 'jwt-decode'

/**
 * JWT Utilities
 * Helper functions for decoding and parsing JWT tokens
 */

/**
 * Decode JWT token without verification (client-side only)
 * Note: This does NOT verify the signature - only decodes the payload
 * 
 * @param {string} token - JWT token
 * @returns {object|null} - Decoded token payload or null if invalid
 */
export function decodeJWT(token) {
    try {
        if (!token) return null
        return jwtDecode(token)
    } catch {
        return null
    }
}

/**
 * Extract userId from JWT token
 * Looks for the nameidentifier claim which contains the userId
 * 
 * @param {string} token - JWT token
 * @returns {string|null} - User ID or null if not found
 */
export function getUserIdFromToken(token) {
    const decoded = decodeJWT(token)
    
    if (!decoded) return null

    // The userId is stored in the 'nameidentifier' claim
    const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
    
    return userId || null
}

export function getTokenExpiration(token) {
    const decoded = decodeJWT(token)
    if (!decoded || !decoded.exp) return null

    const EIGHT_HOURS_MS = 0 // 8 * 60 * 60 * 1000
    // JWT exp is in UTC+0, subtract 8 hours to convert to local time (UTC+8)
    return (decoded.exp * 1000) - EIGHT_HOURS_MS
}

/**
 * Check if token is expired
 * 
 * @param {string} token - JWT token
 * @returns {boolean} - True if token is expired
 */
export function isTokenExpired(token) {
    const expirationTime = getTokenExpiration(token)
    if (!expirationTime) return true
    const currentTime = Date.now()

    return currentTime > expirationTime
}

/**
 * Check if token needs refresh
 * Returns true if token will expire in less than 5 minutes
 * 
 * @param {string} token - JWT token
 * @returns {boolean} - True if token should be refreshed
 */
export function shouldRefreshToken(token) {
    const expirationTime = getTokenExpiration(token)
    if (!expirationTime) return true
    
    // Refresh if less than 5 minutes remaining
    const currentTime = Date.now()
    const fiveMinutes = 5 * 60 * 1000

    return ((expirationTime - currentTime) < fiveMinutes) && !isTokenExpired(token)
}

/**
 * Get time until token expiration in milliseconds
 * 
 * @param {string} token - JWT token
 * @returns {number} - Time in milliseconds, or 0 if expired/invalid
 */
export function getTimeUntilExpiration(token) {
    const expirationTime = getTokenExpiration(token)

    if (!expirationTime) return 0

    const currentTime = Date.now()

    const timeRemaining = expirationTime - currentTime

    return timeRemaining > 0 ? timeRemaining : 0
}

export function getPIN(token) {
    return decodeJWT(token)?.PNo || null
}