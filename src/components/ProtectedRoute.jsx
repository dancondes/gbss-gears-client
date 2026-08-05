import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore, useTabStore } from '@/store'
import { getUserById } from '@/services/user-service'
import { getTimeUntilExpiration, getUserIdFromToken, isTokenExpired, isTokenExpiredOnPreviousDate, shouldRefreshToken } from '@/utilities/jwt-utils'
import Spinner from './Spinner'
import SessionExpiredModal from './modals/SessionExpiredModal'
import { toast } from 'sonner'
import logger from '@/utilities/logger'
import { useRefreshToken } from '@/hooks/use-refresh-token'

const REFRESH_THRESHOLD_MS = 5 * 60 * 1000 // Refresh 5 minutes before expiry

/**
 * ProtectedRoute Component
 * Checks if user is authenticated and fetches user data from server
 * Redirects to login if not authenticated
 */
function ProtectedRoute({ children }) {
    const { user, token, isAuthenticated, setUser, logout, sessionExpired, setSessionExpired } = useAuthStore()
    const activeTabId = useTabStore((state) => state.activeTabId)
    const tabsCount = useTabStore((state) => state.tabs.length)
    const location = useLocation()
    const [isInitialized, setIsInitialized] = useState(false)
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const { refresh } = useRefreshToken()

    // Every early-exit path from initializeAuth needs to mark init done; some
    // also need to log the user out. One call instead of repeating both lines
    // at each guard.
    const finishAuth = useCallback(
        (options = {}) => {
            const { doLogout = false } = options
            if (doLogout) {
                logout()
            }
            setIsInitialized(true)
        },
        [logout]
    )

    // Check if current token has expired and trigger session expiry if needed
    const enforceTokenValidity = useCallback(() => {
        if (!token) {
            return true
        }

        if (isTokenExpiredOnPreviousDate(token)) {
            logout()
            setIsInitialized(true)
            setShouldRedirect(true)
            return false
        }

        if (isTokenExpired(token)) {
            setSessionExpired(true)
            return false
        }

        return true
    }, [token, setSessionExpired, logout])

    // Refresh the token now if it's due, and only if the tab is actually visible.
    const refreshIfDue = useCallback(() => {
        if (document.hidden) {
            logger.log('Tab hidden, skipping token refresh')
            return
        }
        if (shouldRefreshToken(token)) {
            refresh()
        }
    }, [token, refresh])

    // Initialize authentication: validate token, fetch user data, and load forms menu
    const initializeAuth = useCallback(async () => {
        try {
            if (!token) {
                finishAuth()
                return
            }

            if (!enforceTokenValidity()) {
                finishAuth()
                return
            }

            // Optimization: if user data already loaded, skip fetching
            if (user) {
                setIsInitialized(true)
                return
            }

            const userId = getUserIdFromToken(token)
            if (!userId) {
                finishAuth({ doLogout: true })
                return
            }

            const fetchedUser = await getUserById(userId)

            if (fetchedUser && fetchedUser.data[0]) {
                setUser(fetchedUser.data[0])
            } else {
                toast.error('Failed to fetch user data')
                logout()
            }

            setIsInitialized(true)
        } catch (err) {
            logger.error('Auth initialization error:', err)
            toast.error('Failed to initialize authentication')
            finishAuth({ doLogout: true })
        }
    }, [token, user, setUser, logout, enforceTokenValidity, finishAuth, refresh])

    // Run initial auth setup when component mounts or when dependencies change
    useEffect(() => {
        initializeAuth()
    }, [initializeAuth])

    // Validate token immediately when route or active tab changes
    useEffect(() => {
        enforceTokenValidity()
    }, [location.pathname, location.search, location.hash, activeTabId, tabsCount, enforceTokenValidity])

    // Schedule automatic token refresh 5 minutes before it expires (only while tab visible)
    useEffect(() => {
        if (!token || isTokenExpired(token)) {
            return
        }

        if (shouldRefreshToken(token)) {
            refreshIfDue()
            return
        }

        const timeUntilExpiration = getTimeUntilExpiration(token)
        const timeUntilRefresh = timeUntilExpiration - REFRESH_THRESHOLD_MS

        const timeoutId = window.setTimeout(refreshIfDue, timeUntilRefresh)
        return () => window.clearTimeout(timeoutId)
    }, [token, refreshIfDue])

    // Refresh token when tab becomes visible again after inactivity
    useEffect(() => {
        function handleVisibilityChange() {
            if (!document.hidden) {
                if (enforceTokenValidity())
                    refresh()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
    }, [enforceTokenValidity, refresh])

    // Clear session state and prepare redirect to login when user confirms expiry modal
    function handleSessionExpiredConfirm() {
        setSessionExpired(false)
        logout()
        setShouldRedirect(true)
    }

    if (!isInitialized) {
        return <Spinner />
    }

    if (sessionExpired) {
        return <SessionExpiredModal isOpen={sessionExpired} onConfirm={handleSessionExpiredConfirm} />
    }

    if (shouldRedirect || !isAuthenticated || !token) {
        return <Navigate to="/login" replace />
    }

    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ProtectedRoute