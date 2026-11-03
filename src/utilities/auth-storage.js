import { isTokenExpired } from '@/utilities/jwt-utils'

// NOTE: this file must not import any store, so the auth store, GuestRoute and
// the Login page can all use it without creating circular imports.

export const AUTH_STORAGE_KEY = 'gears-auth-storage'

/**
 * Read the persisted auth state straight from localStorage (the source of truth
 * across tabs).
 */
export function readStoredAuth() {
    try {
        const raw = localStorage.getItem(AUTH_STORAGE_KEY)
        const state = raw ? JSON.parse(raw).state : null
        return {
            token: state?.token ?? null,
            refreshToken: state?.refreshToken ?? null,
            impersonatedUser: state?.impersonatedUser ?? null,
        }
    } catch {
        return { token: null, refreshToken: null, impersonatedUser: null }
    }
}

/**
 * True when localStorage holds an access token that has not expired.
 */
export function hasValidStoredToken() {
    const { token } = readStoredAuth()
    return !!token && !isTokenExpired(token)
}