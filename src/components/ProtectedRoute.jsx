import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore, useFormsMenuStore, useTabStore } from '@/store'
import { getUserById } from '@/services/user-service'
import { refreshToken as refreshTokenAPI } from '@/services/auth-service'
import { getTimeUntilExpiration, getUserIdFromToken, isTokenExpired, shouldRefreshToken } from '@/utilities/jwt-utils'
import Spinner from './Spinner'
import SessionExpiredModal from './modals/SessionExpiredModal'
import { toast } from 'react-toastify'
import logger from '@/utilities/logger'

/**
 * ProtectedRoute Component
 * Checks if user is authenticated and fetches user data from server
 * Redirects to login if not authenticated
 */
function ProtectedRoute({ children }) {
    const { user, token, isAuthenticated, setUser, logout, sessionExpired, setSessionExpired, getTokens, setTokens } = useAuthStore()
    const setFormsMenuData = useFormsMenuStore((state) => state.setFormsMenuData)
    const clearFormsMenuData = useFormsMenuStore((state) => state.clearFormsMenuData)
    const activeTabId = useTabStore(function (state) { return state.activeTabId })
    const tabsCount = useTabStore(function (state) { return state.tabs.length })
    const location = useLocation()
    const [isInitialized, setIsInitialized] = useState(false)
    const [showSessionExpired, setShowSessionExpired] = useState(false)
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const REFRESH_THRESHOLD_MS = 5 * 60 * 1000 // Refresh 5 minutes before expiry

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

    // Call refresh token API and update stored tokens with new credentials
    const handleTokenRefresh = useCallback(async () => {

        if (isTokenExpired(token)) {
            logger.warn('Token already expired. Please log in again.')
            setSessionExpired(true)
            return
        }

        try {
            // Get both access and refresh tokens from store
            const { accessToken, refreshToken: refreshTokenValue } = getTokens()

            // Guard: abort if no refresh token is available
            if (!refreshTokenValue) {
                logger.warn('No refresh token available')
                return
            }

            // Call backend to get new token pair using current tokens
            const response = await refreshTokenAPI({ accessToken, refreshToken: refreshTokenValue })

            // Update store with newly issued tokens for next refresh cycle
            if (response && response.token && response.refreshToken) {
                setTokens(response.token, response.refreshToken)
            }
        } catch (err) {
            // On failure, trigger session expiry to force re-login
            logger.error('Token refresh failed:', err)
            setSessionExpired(true)
        }
    }, [getTokens, setTokens, setSessionExpired])

    // Initialize authentication: validate token, fetch user data, and load forms menu
    const initializeAuth = useCallback(async () => {
        // TODO: remove this
        setFormsMenuData([])

        
        try {
            // Guard: if no token, clear menu and mark as initialized
            if (!token) {
                clearFormsMenuData()
                setIsInitialized(true)
                return
            }

            // Guard: if token is expired, clear menu and halt initialization
            if (!enforceTokenValidity()) {
                clearFormsMenuData()
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
                clearFormsMenuData()
                logout()
                setIsInitialized(true)
                return
            }

            // Fetch user data from server and validate active status
            // const userData = await getUserById(userId) // TODO: uncomment this once backend is ready
            const userData = [{ id: 1710, firstname: 'John', lastname: 'Doe', name: 'John Doe', isActive: true, access: [{ buttonId: 'dashboard' }, { buttonId: 'reports' }] }] // Mocked user data for testing

            // Check if user exists, is active, then store and load menu
            if (userData && userData[0] && userData[0].isActive) {
                setUser(userData[0])

                try {
                    // Fetch forms menu data for authenticated user
                    const buttonPermissions = getSystemFunctions(userData[0])
                    setFormsMenuData(buttonPermissions)
                } catch (menuError) {
                    // Log menu fetch failure but continue (non-critical)
                    logger.error('Forms menu initialization error:', menuError)
                    clearFormsMenuData()
                }
            } else {
                // User not found or inactive: show error and logout
                toast.error('Failed to fetch user data')
                clearFormsMenuData()
                logout()
            }

            setIsInitialized(true)
        } catch (err) {
            // Catch-all for unexpected errors during auth setup
            logger.error('Auth initialization error:', err)
            toast.error('Failed to initialize authentication')
            clearFormsMenuData()
            logout()
            setIsInitialized(true)
        }
    }, [token, user, setUser, logout, enforceTokenValidity, clearFormsMenuData, setFormsMenuData])

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
                handleTokenRefresh()
            }
            return
        }

        // Schedule refresh callback to run at the calculated time
        const timeoutId = window.setTimeout(() => {
            // Only refresh if tab is still visible
            if (!document.hidden) {
                handleTokenRefresh()
            } else {
                // If tab is hidden, will refresh when it becomes visible again
                logger.log('Tab hidden, skipping token refresh')
            }
        }, timeUntilRefresh)

        // Cleanup: clear timeout if token changes before callback fires
        return function () {
            window.clearTimeout(timeoutId)
        }
    }, [token, handleTokenRefresh])

    // Refresh token when tab regains focus or becomes visible after inactivity
    useEffect(() => {
        function handleWindowStateChange() {
            if (!document.hidden) {
                // Only attempt refresh if token is not already expired
                if (shouldRefreshToken(token)) {
                    handleTokenRefresh()
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
    }, [enforceTokenValidity, handleTokenRefresh])

    function getSystemFunctions(user) {
        return [...new Set(user?.access?.flatMap(role => role.buttonId))];
    }

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
    // TODO: uncomment this once validations are implemented
    // if (showSessionExpired) {
    //     return (
    //         <SessionExpiredModal
    //             isOpen={showSessionExpired}
    //             onConfirm={handleSessionExpiredConfirm}
    //         />
    //     )
    // }

    // Redirect to login if not authenticated, no token, or redirect flag is set
    // TODO: uncomment this once validations are implemented
    // if (shouldRedirect || !isAuthenticated || !token) {
    //     return <Navigate to="/login" replace />
    // }

    // Render protected content if all auth checks pass
    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ProtectedRoute
