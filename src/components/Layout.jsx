import React, { useState, useEffect, Suspense } from 'react'
import PropTypes from 'prop-types'
import DevelopmentBanner from './DevelopmentBanner'
import OpenTabsBar from './OpenTabsBar'
import Spinner from './Spinner'
import ErrorBoundary from './ErrorBoundary'
import { useTabStore, useFormsMenuStore } from '@/store'
import { getComponentForPath } from '@/constants/route-components'
import { TabActiveContext, TabPathContext } from '@/hooks/use-is-tab-active'
import AccessRestricted from './AccessRestricted'
import MenuBar from './MenuBar'

function TabErrorFallback({ error, onClose }) {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <svg className="h-12 w-12 text-danger mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-500 mb-2">An unexpected error occurred on this tab. Please contact the IT support team if the issue persists.</p>
            {error && (
                <p className="text-sm font-medium text-danger mb-4">{error.message}</p>
            )}
            <div className="flex items-center gap-3 mb-4">
                <button
                    onClick={onClose}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-danger hover:bg-red-700 focus:outline-none cursor-pointer"
                >
                    Close Tab
                </button>
                {error?.stack && (
                    <button
                        onClick={function () { setShowDetails(function (prev) { return !prev }) }}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer"
                    >
                        {showDetails ? 'Hide Details' : 'Show Details'}
                    </button>
                )}
            </div>
            {showDetails && error?.stack && (
                <pre className="w-full max-w-2xl text-left text-xs bg-gray-100 text-gray-700 rounded-lg p-4 overflow-auto max-h-64 whitespace-pre-wrap wrap-break-word border border-gray-200">
                    {error.stack}
                </pre>
            )}
        </div>
    )
}

TabErrorFallback.propTypes = {
    error: PropTypes.instanceOf(Error),
    onClose: PropTypes.func.isRequired
}

const TabContent = React.memo(function TabContent({ tab, isActive }) {
    const Component = getComponentForPath(tab.path)
    const checkIfUserHavAccessToTab = useFormsMenuStore((state) => state.checkIfUserHavAccessToTab)
    const hasAccess = checkIfUserHavAccessToTab(tab)

    if (!Component) return null

    if (!hasAccess) {
        return <AccessRestricted />
    }

    return (
        <TabActiveContext.Provider value={isActive}>
            <TabPathContext.Provider value={tab.path}>
                <Suspense fallback={<Spinner />}>
                    <Component />
                </Suspense>
            </TabPathContext.Provider>
        </TabActiveContext.Provider>
    )
})

TabContent.propTypes = {
    tab: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    }).isRequired,
    isActive: PropTypes.bool.isRequired
}

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [visitedTabIds, setVisitedTabIds] = useState(new Set())
    const { tabs, activeTabId, switchTab, closeTab, closeOtherTabs, closeAllTabs, closeTabsToRight, pinTab, unpinTab } = useTabStore()
    const checkIfThereAreMenuItemsToShow = useFormsMenuStore((state) => state.checkIfThereAreMenuItemsToShow)

    const hasTabs = tabs.length > 0

    const startAutoCloseInterval = useTabStore(s => s.startAutoCloseInterval)
    const stopAutoCloseInterval = useTabStore(s => s.stopAutoCloseInterval)

    useEffect(() => {
        startAutoCloseInterval()
        return () => stopAutoCloseInterval()
    }, [])

    // Track visited tabs - only render visited tabs + active tab
    useEffect(() => {
        if (activeTabId) {
            setVisitedTabIds(function (prev) {
                const updated = new Set(prev)
                updated.add(activeTabId)
                return updated
            })
        }
    }, [activeTabId])

    // Clean up visited tabs when they're closed
    useEffect(() => {
        setVisitedTabIds(function (prev) {
            const currentTabIds = new Set(tabs.map(function (t) { return t.id }))
            const idsToRemove = []
            for (const id of prev) {
                if (!currentTabIds.has(id)) {
                    idsToRemove.push(id)
                }
            }
            if (idsToRemove.length === 0) {
                return prev
            }
            const updated = new Set(prev)
            idsToRemove.forEach(function (id) { updated.delete(id) })
            return updated
        })
    }, [tabs])


    function handleTabClick(tabId) {
        switchTab(tabId)
    }

    function handleTabClose(tabId) {
        closeTab(tabId)
    }

    function handleCloseOthers(tabId) {
        closeOtherTabs(tabId)
    }

    function handleCloseAll() {
        closeAllTabs()
    }

    function handleCloseAllToRight(tabId) {
        closeTabsToRight(tabId)
    }

    function handlePinTab(tabId) {
        pinTab(tabId)
    }

    function handleUnpinTab(tabId) {
        unpinTab(tabId)
    }


    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <DevelopmentBanner />
            <MenuBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

            {/* Container for Sidebar and Main Content */}
            <div className="flex flex-1 overflow-hidden min-h-0">

                {/* Main Content Area with Tabs */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {hasTabs && (
                        <OpenTabsBar
                            tabs={tabs}
                            activeTab={activeTabId}
                            onTabClick={handleTabClick}
                            onTabClose={handleTabClose}
                            onCloseOthers={handleCloseOthers}
                            onCloseAll={handleCloseAll}
                            onCloseAllToRight={handleCloseAllToRight}
                            onPinTab={handlePinTab}
                            onUnpinTab={handleUnpinTab}
                        />
                    )}

                    <main className="flex-1 bg-white overflow-y-auto w-full px-3 py-4">
                        {hasTabs ? (
                            tabs.map(function (tab) {
                                const isActive = tab.id === activeTabId
                                const hasBeenVisited = visitedTabIds.has(tab.id)
                                const shouldRender = isActive || hasBeenVisited

                                if (!shouldRender) return null

                                return (
                                    <div key={tab.id} style={{ display: isActive ? 'block' : 'none' }}>
                                        <ErrorBoundary
                                            fallback={function (error, _errorInfo, resetError) { return <TabErrorFallback error={error} onClose={function () { resetError(); closeTab(tab.id) }} /> }}
                                        >
                                            <TabContent
                                                tab={tab}
                                                isActive={isActive}
                                            />
                                        </ErrorBoundary>
                                    </div>
                                )
                            })
                        ) : checkIfThereAreMenuItemsToShow() ? (
                            <div className="flex items-center justify-center px-4 py-12 min-h-70">
                                <div className="text-center max-w-[320px]">
                                    <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto mb-5">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <rect x="2" y="3" width="20" height="18" rx="2" />
                                            <path d="M2 7h20" />
                                            <circle cx="5.5" cy="5" r="0.8" fill="#9CA3AF" />
                                            <circle cx="8.5" cy="5" r="0.8" fill="#9CA3AF" />
                                            <circle cx="11.5" cy="5" r="0.8" fill="#9CA3AF" />
                                        </svg>
                                    </div>
                                    <p className="text-[15px] font-medium text-gray-800 mb-1.5">Nothing open yet</p>
                                    <p className="text-[13px] text-gray-500 leading-relaxed">
                                        Open tabs from the navigation bar or sidebar to view contents and perform actions.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center px-4 py-10">
                                <div className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white px-6 py-8 text-center">
                                    <p className="text-gray-600 text-sm md:text-base mb-4">
                                        You don&apos;t have access to any navigation items.
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        If you think you&apos;re having problems accessing some pages, please contact the IT support team.
                                    </p>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Layout
