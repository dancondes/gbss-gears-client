import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { syncAuthFromStorage } from '@/store/auth-store'
import { AUTH_STORAGE_KEY } from '@/utilities/auth-storage'
import { isTokenExpired } from '@/utilities/jwt-utils'
import Spinner from './Spinner'

function GuestRoute({ children }) {
    const token = useAuthStore((state) => state.token)
    const logout = useAuthStore((state) => state.logout)
    const [isInitialized, setIsInitialized] = useState(false)
    const [hasValidToken, setHasValidToken] = useState(false)

    useEffect(function () {
        function checkStoredToken() {
            // Make sure the store reflects localStorage before judging it, regardless of
            // the order in which storage listeners fire.
            syncAuthFromStorage()
            const storedToken = useAuthStore.getState().token

            if (!storedToken) {
                setHasValidToken(false)
                setIsInitialized(true)
                return
            }

            if (isTokenExpired(storedToken)) {
                logout()
                setHasValidToken(false)
            } else {
                setHasValidToken(true)
            }

            setIsInitialized(true)
        }

        function handleStorageChange(event) {
            if (event.key === AUTH_STORAGE_KEY || event.key === null) {
                checkStoredToken()
            }
        }

        checkStoredToken()
        window.addEventListener('storage', handleStorageChange)

        return function () {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [logout])

    useEffect(function () {
        if (!isInitialized) {
            return
        }

        if (token && !isTokenExpired(token)) {
            setHasValidToken(true)
        }
    }, [isInitialized, token])

    if (!isInitialized) {
        return <Spinner />
    }

    if (hasValidToken) {
        return <Navigate to="/" replace />
    }

    return children
}

GuestRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default GuestRoute