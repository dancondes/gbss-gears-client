import React, { useCallback, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import HorizontalScrollContainer from './HorizontalScrollContainer'
import { useTabStore } from '@/store'

const NavMenu = ({
    menuItems,
    onActiveChange,
    showSubmenu = true,
    showSubmenuOnHover = false,
    toolbarAction,
    defaultIcon = <span>📄</span>,
    scrollSpeed = 6,
    defaultActive
}) => {
    const location = useLocation()
    const { openTab, activeTabId } = useTabStore()
    const [activeMenu, setActiveMenu] = useState(defaultActive || menuItems[0]?.name || '')
    const [hoveredMenu, setHoveredMenu] = useState(null)
    const [showSubmenuDropdown, setShowSubmenuDropdown] = useState(false)
    const submenuTimeoutRef = React.useRef(null)

    function handleTabOpen(item) {
        // Don't open external links as tabs
        if (item.inNewTab) {
            window.open(item.path, '_blank', 'noopener,noreferrer')
            return
        }

        openTab({
            id: item.id,
            label: item.name,
            path: item.path
        })
    }

    const handleAction = useCallback((action, itemName, disabled) => {
        if (disabled) {
            return
        }
    }, [])

    // Determine active menu based on current pathname
    useEffect(() => {
        const currentPath = location.pathname

        for (const item of menuItems) {
            if (item.submenu && item.submenu.length > 0) {
                for (const subItem of item.submenu) {
                    // Check if has children
                    if (subItem.submenu && subItem.submenu.length > 0) {
                        for (const childItem of subItem.submenu) {
                            if (currentPath === childItem.path) {
                                setActiveMenu(item.name)
                                return
                            }
                        }
                    } else {
                        // Check the subItem itself
                        if (currentPath === subItem.path) {
                            setActiveMenu(item.name)
                            return
                        }
                    }
                }
            }
        }
    }, [location.pathname, menuItems])

    // Notify parent component when active menu changes
    useEffect(() => {
        if (onActiveChange) {
            onActiveChange(activeMenu)
        }
    }, [activeMenu, onActiveChange])

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (submenuTimeoutRef.current) {
                clearTimeout(submenuTimeoutRef.current)
            }
        }
    }, [])

    const handleMenuClick = (menuName) => {
        setActiveMenu(menuName)
    }

    function handleMenuHover(menuName, hasSubmenu) {
        // Clear any existing timeout
        if (submenuTimeoutRef.current) {
            clearTimeout(submenuTimeoutRef.current)
        }

        if (hasSubmenu) {
            setHoveredMenu(menuName)
            setShowSubmenuDropdown(true)
        }
    }

    function handleMenuLeave() {
        // Add a small delay before hiding to allow moving to submenu
        submenuTimeoutRef.current = setTimeout(() => {
            setShowSubmenuDropdown(false)
            setHoveredMenu(null)
        }, 150)
    }

    function handleSubmenuEnter() {
        // Clear the timeout if user moves to submenu
        if (submenuTimeoutRef.current) {
            clearTimeout(submenuTimeoutRef.current)
        }
    }

    function handleSubmenuLeave() {
        setShowSubmenuDropdown(false)
        setHoveredMenu(null)
    }

    // Get current submenu based on hovered menu (or active menu if not hovering)
    const displayMenu = hoveredMenu || activeMenu
    const currentSubmenu = menuItems.find(item => item.name === displayMenu)?.submenu || []

    // Get parent menu permissions
    // const parentMenuPermission = menuItems.find(item => item.name === activeMenu)?.permissions

    // Check if a path is active
    const isActive = (path) => {
        const activeTab = useTabStore.getState().tabs.find(t => t.id === activeTabId)
        return activeTab && activeTab.path === path
    }

    return (
        <div className="w-full">
            {/* Main Menu Tabs */}
            <div className="bg-white border-t border-gray-200">
                {menuItems.length === 0 ? (
                    <div className="flex items-center justify-center py-6 px-4">
                        <p className="text-center text-sm text-gray-600">You don&apos;t have access to any navigation items</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 px-2">
                        <div className="min-w-0 flex-1">
                            <HorizontalScrollContainer
                                autoScroll={true}
                                scrollSpeed={scrollSpeed}
                                className="flex items-center"
                            >
                                {menuItems.map((item) => {
                                    const parentDisabled = false
                                    const hasSubmenu = item.submenu && item.submenu.length > 0

                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() => !parentDisabled && handleMenuClick(item.name)}
                                            onMouseEnter={() => !parentDisabled && showSubmenuOnHover && handleMenuHover(item.name, hasSubmenu)}
                                            onMouseLeave={showSubmenuOnHover ? handleMenuLeave : undefined}
                                            disabled={parentDisabled}
                                            className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${parentDisabled
                                                    ? 'border-transparent text-gray-400 cursor-not-allowed opacity-60'
                                                    : activeMenu === item.name || hoveredMenu === item.name
                                                        ? 'border-primary text-primary bg-white'
                                                        : 'border-transparent text-gray-700 hover:text-primary hover:bg-white/50'
                                                }`}
                                            title={parentDisabled ? "You don't have permission to access this menu" : ''}
                                        >
                                            {item.name}
                                        </button>
                                    )
                                })}
                            </HorizontalScrollContainer>
                        </div>

                        {toolbarAction && (
                            <div className="shrink-0 py-1">
                                {toolbarAction}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Submenu Bar - Shows on hover with smooth transition */}
            {showSubmenu && (showSubmenuOnHover ? showSubmenuDropdown : true) && currentSubmenu.length > 0 && (
                <div
                    className="bg-white border-b border-gray-200 shadow-sm animate-slideDown"
                    onMouseEnter={showSubmenuOnHover ? handleSubmenuEnter : undefined}
                    onMouseLeave={showSubmenuOnHover ? handleSubmenuLeave : undefined}
                >
                    <div className="px-3 py-2">
                        <HorizontalScrollContainer
                            autoScroll={true}
                            scrollSpeed={scrollSpeed}
                            className="flex items-start gap-1 md:gap-3 pb-1"
                        >
                            {currentSubmenu.map((subItem, index) => (
                                <React.Fragment key={index}>
                                    <div className="flex flex-col items-center">
                                        {/* Buttons */}
                                        <div className="flex gap-1.5 mb-1">
                                            {subItem.submenu && subItem.submenu.length > 0 ? (
                                                // If has children, show the children as buttons
                                                subItem.submenu.map((childItem) => {
                                                    const disabled = false

                                                    return childItem.action ? (
                                                        // Handle action-based menu items or Refresh button
                                                        <button
                                                            key={childItem.name}
                                                            onClick={() => handleAction(childItem.action, childItem.name, disabled)}
                                                            disabled={disabled}
                                                            className={`px-3 py-2 text-xs whitespace-nowrap rounded transition-colors border flex flex-col items-center gap-1 ${disabled
                                                                    ? 'cursor-not-allowed text-gray-400 bg-gray-100 border-gray-200 opacity-60'
                                                                    : isActive(childItem.path)
                                                                        ? 'cursor-pointer text-white bg-primary border-primary font-medium shadow-md'
                                                                        : 'cursor-pointer text-gray-700 bg-gray-50 border-gray-300 hover:bg-primary hover:text-white hover:border-primary hover:shadow'
                                                                }`}
                                                        >
                                                            {childItem.icon || defaultIcon}
                                                            <span className="text-[10px]">{childItem.name}</span>
                                                        </button>
                                                    ) : (
                                                        // Handle regular navigation
                                                        disabled ? (
                                                            <div
                                                                key={childItem.path}
                                                                className="px-3 py-2 text-xs whitespace-nowrap rounded border flex flex-col items-center gap-1 cursor-not-allowed text-gray-400 bg-gray-100 border-gray-200 opacity-60"
                                                                title="You don't have permission to access this page"
                                                            >
                                                                {childItem.icon || defaultIcon}
                                                                <span className="text-[10px]">{childItem.name}</span>
                                                            </div>
                                                        ) : (
                                                            <div
                                                                key={childItem.path}
                                                                onClick={() => handleTabOpen(childItem)}
                                                                className={`px-3 py-2 text-xs whitespace-nowrap rounded transition-colors border flex flex-col items-center gap-1 cursor-pointer ${isActive(childItem.path)
                                                                        ? 'text-white bg-primary border-primary font-medium shadow-md'
                                                                        : 'text-gray-700 bg-gray-50 border-gray-300 hover:bg-primary hover:text-white hover:border-primary hover:shadow'
                                                                    }`}
                                                            >
                                                                {childItem.icon || defaultIcon}
                                                                <span className="text-[10px]">{childItem.name}</span>
                                                            </div>
                                                        )
                                                    )
                                                })
                                            ) : (
                                                // If no children, show itself as a button
                                                (() => {
                                                    const disabled = false

                                                    return subItem.action || subItem.name === 'Refresh' ? (
                                                        <button
                                                            onClick={() => handleAction(subItem.action, subItem.name, disabled)}
                                                            disabled={disabled}
                                                            className={`px-3 py-2 text-xs whitespace-nowrap rounded transition-colors border flex flex-col items-center gap-1 ${disabled
                                                                    ? 'cursor-not-allowed text-gray-400 bg-gray-100 border-gray-200 opacity-60'
                                                                    : isActive(subItem.path)
                                                                        ? 'cursor-pointer text-white bg-primary border-primary font-medium shadow-md'
                                                                        : 'cursor-pointer text-gray-700 bg-gray-50 border-gray-300 hover:bg-primary hover:text-white hover:border-primary hover:shadow'
                                                                }`}
                                                        >
                                                            {subItem.icon || defaultIcon}
                                                            <span className="text-[10px]">{subItem.name}</span>
                                                        </button>
                                                    ) : (
                                                        disabled ? (
                                                            <div
                                                                className="px-3 py-2 text-xs whitespace-nowrap rounded border flex flex-col items-center gap-1 cursor-not-allowed text-gray-400 bg-gray-100 border-gray-200 opacity-60"
                                                                title="You don't have permission to access this page"
                                                            >
                                                                {subItem.icon || defaultIcon}
                                                                <span className="text-[10px]">{subItem.name}</span>
                                                            </div>
                                                        ) : (
                                                            <div
                                                                onClick={() => handleTabOpen(subItem)}
                                                                className={`px-3 py-2 text-xs whitespace-nowrap rounded transition-colors border flex flex-col items-center gap-1 cursor-pointer ${isActive(subItem.path)
                                                                        ? 'text-white bg-primary border-primary font-medium shadow-md'
                                                                        : 'text-gray-700 bg-gray-50 border-gray-300 hover:bg-primary hover:text-white hover:border-primary hover:shadow'
                                                                    }`}
                                                            >
                                                                {subItem.icon || defaultIcon}
                                                                <span className="text-[10px]">{subItem.name}</span>
                                                            </div>
                                                        )
                                                    )
                                                })()
                                            )}
                                        </div>

                                        {/* Label at bottom */}
                                        <div className="text-[10px] text-center font-semibold text-gray-500 uppercase tracking-wide pt-0.5 px-1">
                                            {subItem.name}
                                        </div>
                                    </div>

                                    {/* Vertical Divider after each group except last */}
                                    {index < currentSubmenu.length - 1 && (
                                        <div className="h-auto w-px bg-gray-300 self-stretch"></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </HorizontalScrollContainer>
                    </div>
                </div>
            )}
        </div>
    )
}

NavMenu.propTypes = {
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            submenu: PropTypes.array
        })
    ).isRequired,
    onActiveChange: PropTypes.func,
    showSubmenu: PropTypes.bool,
    showSubmenuOnHover: PropTypes.bool,
    toolbarAction: PropTypes.node,
    scrollSpeed: PropTypes.number,
    defaultIcon: PropTypes.node,
    defaultActive: PropTypes.string,
    onRefreshClick: PropTypes.func
}

NavMenu.displayName = 'NavMenu'

export default React.memo(NavMenu)
