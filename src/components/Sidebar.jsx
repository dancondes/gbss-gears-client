import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useFormsMenuStore, useTabStore, useUIStore } from '@/store'
import { preloadComponent } from '@/constants/route-components'

const Sidebar = ({ isOpen, onClose }) => {
    const [hoveredItem, setHoveredItem] = useState(null)
    const handleClose = useCallback(() => {
        if (onClose) onClose()
    }, [onClose])
    const { openTab, activeTabId } = useTabStore()
    const sidebarMenuItems = useFormsMenuStore(function (state) { return state.sidebarMenuItems })
    const sidebarMinimized = useUIStore(state => state.sidebarMinimized)
    const setSidebarMinimized = useUIStore(state => state.setSidebarMinimized)

    const isActive = (path) => {
        const activeTab = useTabStore.getState().tabs.find(t => t.id === activeTabId)
        return activeTab && activeTab.path === path
    }

    function handleItemClick(item) {        
        openTab({
            id: item.id,
            label: item.name,
            path: item.path
        })
        
        handleClose()
    }

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-59 lg:hidden"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`bg-white border-r border-tertiary shrink-0 transform transition-all duration-300 ease-in-out z-60 lg:z-40 fixed inset-y-0 left-0 lg:relative ${isOpen
                        ? 'translate-x-0'
                        : '-translate-x-full lg:translate-x-0'
                    } w-64 ${sidebarMinimized && 'lg:w-20'}`}
            >
                <div className={`p-3 ${sidebarMinimized && 'lg:p-2'} flex flex-col h-full`}>
                    {/* Minimize Button - Hidden on mobile */}
                    <div className={`hidden lg:flex ${sidebarMinimized ? 'justify-center' : 'justify-end'} mb-2`}>
                        <button
                            onClick={() => setSidebarMinimized(!sidebarMinimized)}
                            className="p-2 rounded hover:bg-bg-light transition-colors cursor-pointer"
                            title={sidebarMinimized ? 'Expand Sidebar' : 'Minimize Sidebar'}
                        >
                            <svg
                                className={`h-5 w-5 text-tertiary transition-transform duration-300 ${sidebarMinimized ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className={`flex-1 overflow-y-auto ${sidebarMinimized && 'lg:flex-none lg:overflow-visible'}`}>
                        {sidebarMenuItems.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-center text-sm text-tertiary">You don&apos;t have access to any items</p>
                            </div>
                        ) : (
                        sidebarMenuItems.map((section, sectionIdx) => (
                            <div key={sectionIdx} className={sectionIdx > 0 ? 'mt-4' : ''}>
                                {/* Section Title - Only show when expanded */}
                                <h3 className={`${sidebarMinimized && 'lg:hidden'} px-3 text-xs font-semibold text-tertiary uppercase tracking-wider mb-2`}>
                                    {section.title}
                                </h3>

                                {/* Section Items */}
                                <nav className={`space-y-1 ${sidebarMinimized && 'lg:space-y-2 lg:flex lg:flex-col lg:items-center'}`}>
                                    {section.items.map((item) => {
                                        const disabled = false
                                        
                                        return disabled ? (
                                            <div
                                                key={item.path}
                                                className={`flex items-center rounded transition-colors text-gray-400 bg-gray-50 cursor-not-allowed opacity-60 px-3 py-2 text-sm font-medium ${
                                                    sidebarMinimized && 'lg:p-2 lg:relative'
                                                }`}
                                                title={sidebarMinimized ? item.name : "You don't have permission to access this page"}
                                            >
                                                <svg
                                                    className={`h-5 w-5 shrink-0 mr-3 ${sidebarMinimized && 'lg:mr-0'}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                                </svg>
                                                <span className={sidebarMinimized ? 'lg:hidden' : ''}>
                                                    {item.name}
                                                </span>
                                            </div>
                                        ) : (
                                            <div
                                                key={item.path}
                                                onClick={() => handleItemClick(item)}
                                                onMouseEnter={() => {
                                                    setHoveredItem(sidebarMinimized ? item.path : null)
                                                    preloadComponent(item.path)
                                                }}
                                                onMouseLeave={() => setHoveredItem(null)}
                                                className={`flex items-center rounded transition-colors cursor-pointer relative px-3 py-2 text-sm font-medium w-full ${
                                                    isActive(item.path)
                                                        ? 'bg-primary text-white'
                                                        : 'text-tertiary hover:bg-bg-light hover:text-primary'
                                                } ${
                                                    sidebarMinimized && 'lg:p-2 lg:w-auto'
                                                }`}
                                            >
                                                <svg
                                                    className={`h-5 w-5 shrink-0 mr-3 ${sidebarMinimized && 'lg:mr-0'}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                                </svg>
                                                <span className={sidebarMinimized ? 'lg:hidden' : ''}>
                                                    {item.name}
                                                </span>

                                                {/* Tooltip for minimized sidebar */}
                                                {sidebarMinimized && hoveredItem === item.path && (
                                                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap pointer-events-none z-50">
                                                        {item.name}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </nav>
                            </div>
                        )))}
                    </div>
                </div>

                {/* Sidebar Footer */}
                {/* <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-tertiary bg-bg-light">
          <div className="flex items-center">
            <div className="shrink-0">
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold">
                v1
              </div>
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-primary">Version 1.0.1</p>
              <p className="text-xs text-tertiary">© 2025 GBSS</p>
            </div>
          </div>
        </div> */}
            </aside>
        </>
    )
}

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

Sidebar.displayName = 'Sidebar'

export default React.memo(Sidebar)
