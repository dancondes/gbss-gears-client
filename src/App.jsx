import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { Toaster } from 'sonner'
import Layout from '@/components/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'
import ErrorBoundary from '@/components/ErrorBoundary'
import Spinner from '@/components/Spinner'
import DesktopOnly from '@/components/DesktopOnly'
import { swrConfig, defaultFetcher } from '@/lib/swr-config'
import { MessageModalProvider } from '@/contexts/MessageModalContext'
import Login from '@/pages/auth/Login'
import ViewDocumentPage from '@/pages/other/ViewDocumentPage'
import EnableDeviceBypassPage from '@/pages/other/EnableDeviceBypassPage'

function PageLoader() {
    return <Spinner />
}

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
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
    )
}

function App() {
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
                            {/* Soft convenience mechanism only: this route is intentionally obscure,
                                not a real security boundary. It must stay reachable on any device
                                so someone can enable the local bypass flag when needed. */}
                            <Route path="/enable-bypass" element={<EnableDeviceBypassPage />} />
                            <Route
                                path="*"
                                element={
                                    <DesktopOnly>
                                        <AppRoutes />
                                    </DesktopOnly>
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