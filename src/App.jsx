import React, { Suspense, useEffect } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { Toaster } from 'sonner'
import Layout from '@/components/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'
import GuestRoute from '@/components/GuestRoute'
import ErrorBoundary from '@/components/ErrorBoundary'
import Spinner from '@/components/Spinner'
import DesktopOnly from '@/components/DesktopOnly'
import { swrConfig, defaultFetcher } from '@/lib/swr-config'
import { MessageModalProvider } from '@/contexts/MessageModalContext'
import Login from '@/pages/auth/Login'
import ViewDocumentPage from '@/pages/other/ViewDocumentPage'
import MaintenancePage from './components/MaintenancePage'
import { useServerStatusStore } from './store'
import useTabNavigation from '@/hooks/use-tab-navigation'

function PageLoader() {
    return <Spinner />
}

function PayslipDeepLink() {
    const { navigate } = useTabNavigation()

    useEffect(function () {
        navigate('/user/payslip', {
            id: 'Payslip',
            label: 'Payslip',
        })
    }, [navigate])

    return <Navigate to="/" replace />
}

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/view-document/:encryptedPath" element={<ViewDocumentPage />} />
            <Route
                path="/payslip"
                element={
                    <ProtectedRoute>
                        <PayslipDeepLink />
                    </ProtectedRoute>
                }
            />
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
    const isServerUnavailable = useServerStatusStore(state => state.isServerUnavailable)

    if (isServerUnavailable) {
        return <MaintenancePage />
    }

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