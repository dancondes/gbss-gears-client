import React, { Suspense } from 'react'
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
// import ResetPassword from '@/pages/auth/ResetPassword'
// import ForgotPassword from '@/pages/auth/ForgotPassword'

const App = () => {
    return (
        <MessageModalProvider>
            <SWRConfig value={{ ...swrConfig, fetcher: defaultFetcher }}>
                <ErrorBoundary>
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            {/* Routes without Layout */}
                            <Route path="/login" element={<Login />} />
                            {/* <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="/reset-password/:encryptedEmail" element={<ResetPassword />} /> */}

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