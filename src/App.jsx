import React, { Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { SWRConfig } from 'swr'
import Layout from '@/components/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'
import ErrorBoundary from '@/components/ErrorBoundary'
import Spinner from '@/components/Spinner'
import { swrConfig, defaultFetcher } from '@/lib/swr-config'
import { MessageModalProvider } from '@/contexts/MessageModalContext'

// Loading fallback component
const PageLoader = () => <Spinner />

// Auth pages - not lazy loaded for faster initial access
import Login from '@/pages/auth/Login'
import ViewDocumentPage from './pages/other/ViewDocumentPage'
import { useAuthStore } from './store'
import { ToastContainer } from 'react-toastify'
// import ResetPassword from '@/pages/auth/ResetPassword'
// import ForgotPassword from '@/pages/auth/ForgotPassword'

const App = () => {
    const setTokens = useAuthStore((state) => state.setTokens)
    const setUser = useAuthStore((state) => state.setUser)

    // TODO: remove this hardcoded token once authentication is implemented
    useEffect(() => {
        setUser({
            id: 1710,
            firstname: 'Jerwin',
            lastname: 'Lalap',
            email: 'jerwin.lalap@gbss.com.au'
        })
        setTokens('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE3ZDU2MGMwLWEzYmMtNDNmYy04MjI1LWQ4OThjNDg5OTcxYSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjExMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJKTCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluaXN0cmF0b3IiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJqZXJ3aW4ubGFsYXBAZ2Jzcy5jb20uYXUiLCJleHAiOjE3ODI4OTQ5NTMsImlzcyI6IkdCU1NfQXBpIiwiYXVkIjoiR0JTUyJ9.lXun7R9AzsmxzeY0FWe2WlnI5OWlk1hVLi4XdEdvJrs')
    }, [setUser, setTokens])

    return (
        <MessageModalProvider>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <SWRConfig value={{ ...swrConfig, fetcher: defaultFetcher }}>
                <ErrorBoundary>
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            {/* Routes without Layout */}
                            <Route path="/login" element={<Login />} />
                            {/* <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="/reset-password/:encryptedEmail" element={<ResetPassword />} /> */}
                            <Route path="/view-document/:encryptedPath" element={<ViewDocumentPage />} />

                            <Route
                                path="*"
                                element={
                                    <ProtectedRoute>
                                        <Layout />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </Suspense>
                </ErrorBoundary>
            </SWRConfig>
        </MessageModalProvider>
    )
}

export default App