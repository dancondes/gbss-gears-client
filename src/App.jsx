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
import ViewDocumentPage from './pages/other/ViewDocumentPage'
import { Toaster } from 'sonner'
// import ResetPassword from '@/pages/auth/ResetPassword'
// import ForgotPassword from '@/pages/auth/ForgotPassword'

const App = () => {
    return (
        <MessageModalProvider>
            <Toaster
                duration={5000}
                closeButton
                toastOptions={{
                    classNames: {
                        error: '!ring-1 !ring-red-600 !text-red-600',
                        success: '!ring-1 !ring-primary !text-primary',
                        warning: '!ring-1 !ring-yellow-600 !text-yellow-600',
                        info: '!ring-1 !ring-blue-600 !text-blue-600',
                        closeButton: '!bg-white !border-gray-300 !text-gray-700',
                    },
                }}
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