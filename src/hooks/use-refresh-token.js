import { refreshToken as refreshTokenApi } from '@/services/auth-service'
import { useAuthStore } from '@/store'
import logger from '@/utilities/logger'
import { useCallback, useState } from 'react'

export function useRefreshToken() {
    const { getTokens, setTokens, setSessionExpired } = useAuthStore()
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState(null)

    const refresh = useCallback(async () => {
        const { accessToken, refreshToken } = getTokens()

        setIsRefreshing(true)
        setError(null)

        try {
            if (!refreshToken) {
                throw new Error('No refresh token available')
            }
            
            const result = await refreshTokenApi({ token: accessToken, refreshToken })
            const { token: newAccessToken, refreshToken: newRefreshToken } = result?.data || {}

            if (!newAccessToken || !newRefreshToken) {
                throw new Error('Failed to refresh token: Missing new tokens in response')
            }

            setTokens(newAccessToken, newRefreshToken)
        } catch (err) {
            setError(err)
            logger.error('Error refreshing token:', err)
            setSessionExpired(true)
        } finally {
            setIsRefreshing(false)
        }
    }, [getTokens, setTokens])

    return { refresh, isRefreshing, error }
}