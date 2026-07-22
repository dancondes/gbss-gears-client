import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore, useTabStore } from '@/store'
import { getUserById } from '@/services/user-service'
import { getTimeUntilExpiration, getUserIdFromToken, isTokenExpired, shouldRefreshToken } from '@/utilities/jwt-utils'
import Spinner from './Spinner'
import SessionExpiredModal from './modals/SessionExpiredModal'
import { toast } from 'sonner'
import logger from '@/utilities/logger'
import { useRefreshToken } from '@/hooks/use-refresh-token'

/**
 * ProtectedRoute Component
 * Checks if user is authenticated and fetches user data from server
 * Redirects to login if not authenticated
 */
function ProtectedRoute({ children }) {
    const { user, token, isAuthenticated, setUser, logout, sessionExpired, setSessionExpired } = useAuthStore()
    const activeTabId = useTabStore(function (state) { return state.activeTabId })
    const tabsCount = useTabStore(function (state) { return state.tabs.length })
    const location = useLocation()
    const [isInitialized, setIsInitialized] = useState(false)
    const [showSessionExpired, setShowSessionExpired] = useState(false)
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const REFRESH_THRESHOLD_MS = 5 * 60 * 1000 // Refresh 5 minutes before expiry
    const { refresh } = useRefreshToken()

    // Check if current token has expired and trigger session expiry if needed
    const enforceTokenValidity = useCallback(function () {
        if (!token) {
            return true
        }

        if (isTokenExpired(token)) {
            setSessionExpired(true)
            return false
        }

        return true
    }, [token, setSessionExpired])

    // Initialize authentication: validate token, fetch user data, and load forms menu
    const initializeAuth = useCallback(async () => {
        try {
            // Guard: if no token, clear menu and mark as initialized
            if (!token) {
                setIsInitialized(true)
                return
            }

            // Guard: if token is expired, clear menu and halt initialization
            if (!enforceTokenValidity()) {
                setIsInitialized(true)
                return
            }

            // Optimization: if user data already loaded, skip fetching
            if (user) {
                setIsInitialized(true)
                return
            }

            // Extract user ID from JWT token payload
            const userId = getUserIdFromToken(token)

            // Guard: if no valid user ID in token, logout and reset
            if (!userId) {
                logout()
                setIsInitialized(true)
                return
            }

            // Fetch user data from server and validate active status
            const fetchedUser = await getUserById(userId)

            // Check if fetchedUser exists, is active, then store and load menu
            if (fetchedUser && fetchedUser.data[0]) {
                setUser(fetchedUser.data[0])

                try {
                    // Fetch forms menu data for authenticated user
                } catch (menuError) {
                    // Log menu fetch failure but continue (non-critical)
                    logger.error('Forms menu initialization error:', menuError)
                }
            } else {
                // User not found or inactive: show error and logout
                toast.error('Failed to fetch user data')
                logout()
            }

            setIsInitialized(true)
        } catch (err) {
            // Catch-all for unexpected errors during auth setup
            logger.error('Auth initialization error:', err)
            toast.error('Failed to initialize authentication')
            logout()
            setIsInitialized(true)
        }
    }, [token, user, setUser, logout, enforceTokenValidity])

    // Run initial auth setup when component mounts or when dependencies change
    useEffect(() => {
        initializeAuth()
    }, [initializeAuth])

    // Validate token immediately when route or active tab changes
    useEffect(() => {
        enforceTokenValidity()
    }, [location.pathname, location.search, location.hash, activeTabId, tabsCount, enforceTokenValidity])

    // Show session expired modal when global session expiry state changes
    useEffect(() => {
        if (sessionExpired) {
            setShowSessionExpired(true)
        }
    }, [sessionExpired])

    // Schedule automatic token refresh at 55 minutes (5 minutes before 1-hour expiry) if tab is visible
    useEffect(() => {
        if (!token) {
            return
        }

        // Calculate time until refresh (5 minutes before token expiry)
        const timeUntilExpiration = getTimeUntilExpiration(token)
        const timeUntilRefresh = timeUntilExpiration - REFRESH_THRESHOLD_MS

        // Handle case where token is already less than 5 minutes from expiry
        if (shouldRefreshToken(token)) {
            // Less than 5 minutes left, refresh immediately if tab is visible
            if (!document.hidden) {
                refresh()
            }
            return
        }

        // Schedule refresh callback to run at the calculated time
        const timeoutId = window.setTimeout(() => {
            // Only refresh if tab is still visible
            if (!document.hidden) {
                refresh()
            } else {
                // If tab is hidden, will refresh when it becomes visible again
                logger.log('Tab hidden, skipping token refresh')
            }
        }, timeUntilRefresh)

        // Cleanup: clear timeout if token changes before callback fires
        return function () {
            window.clearTimeout(timeoutId)
        }
    }, [token, refresh])

    // Refresh token when tab regains focus or becomes visible after inactivity
    useEffect(() => {
        function handleWindowStateChange() {
            if (!document.hidden) {
                // Only attempt refresh if token is not already expired
                if (shouldRefreshToken(token)) {
                    refresh()
                }

                enforceTokenValidity()
            }
        }

        // Listen for focus event (tab/window regains focus)
        // window.addEventListener('focus', handleWindowStateChange)
        // Listen for visibility API changes (tab becomes visible/hidden)
        document.addEventListener('visibilitychange', handleWindowStateChange)

        // Cleanup: remove event listeners to prevent memory leaks
        return function () {
            // window.removeEventListener('focus', handleWindowStateChange)
            document.removeEventListener('visibilitychange', handleWindowStateChange)
        }
    }, [enforceTokenValidity, refresh])


    // Clear session state and prepare redirect to login when user confirms expiry modal
    function handleSessionExpiredConfirm() {
        setSessionExpired(false)
        setShowSessionExpired(false)
        logout()
        setShouldRedirect(true)
    }

    // Show loading spinner while initializing auth and fetching user data
    if (!isInitialized) {
        return <Spinner />
    }

    // Display session expired modal when token has expired
    if (showSessionExpired) {
        return (
            <SessionExpiredModal
                isOpen={showSessionExpired}
                onConfirm={handleSessionExpiredConfirm}
            />
        )
    }

    // Redirect to login if not authenticated, no token, or redirect flag is set
    if (shouldRedirect || !isAuthenticated || !token) {
        return <Navigate to="/login" replace />
    }

    // Render protected content if all auth checks pass
    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ProtectedRoute
