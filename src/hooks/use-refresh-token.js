import { useCallback, useState } from 'react'
import { refreshToken as refreshTokenApi } from '@/services/auth-service'
import useAuthStore, { syncAuthFromStorage } from '@/store/auth-store'
import { shouldRefreshToken } from '@/utilities/jwt-utils'
import logger from '@/utilities/logger'

/**
 * Does the actual refresh. Returns an Error if the refresh failed, otherwise null.
 * Plain function (no React closures) so it always reads the latest state.
 */
async function doRefresh(force) {
    // Always start from what is actually in localStorage: another tab may have
    // rotated the tokens since this tab last looked.
    syncAuthFromStorage()

    const { token, refreshToken, setTokens, setSessionExpired } = useAuthStore.getState()
    if (!token) return null

    // Not due yet (or another tab / an earlier call already refreshed): nothing to do
    if (!force && !shouldRefreshToken(token)) return null

    if (!refreshToken) {
        const err = new Error('No refresh token available')
        logger.error('Error refreshing token:', err)
        setSessionExpired(true)
        return err
    }

    try {
        const result = await refreshTokenApi({ token, refreshToken })
        const { token: newAccessToken, refreshToken: newRefreshToken } = result?.data || {}

        if (!newAccessToken || !newRefreshToken) {
            throw new Error('Failed to refresh token: Missing new tokens in response')
        }

        setTokens(newAccessToken, newRefreshToken)
        return null
    } catch (err) {
        // If another tab rotated the tokens while this request was in flight,
        // the failure is expected: adopt their tokens and carry on.
        syncAuthFromStorage()
        if (useAuthStore.getState().token !== token) return null

        logger.error('Error refreshing token:', err)
        setSessionExpired(true)
        return err
    }
}

/**
 * Refresh the tokens if they are due (or always, with { force: true }).
 * Only one refresh runs at a time across ALL tabs: a second caller waits for
 * the lock, re-reads the fresh tokens, and skips the API call.
 */
export function refreshTokens({ force = false } = {}) {
    if (typeof navigator === 'undefined' || !navigator.locks) {
        return doRefresh(force)
    }
    return navigator.locks.request('gears-auth-token-refresh', () => doRefresh(force))
}

export function useRefreshToken() {
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState(null)

    // Safe to call at any time: does nothing unless the token is actually due.
    const refresh = useCallback(async (options) => {
        setIsRefreshing(true)
        setError(null)
        try {
            const err = await refreshTokens(options)
            if (err) setError(err)
        } finally {
            setIsRefreshing(false)
        }
    }, [])

    return { refresh, isRefreshing, error }
}