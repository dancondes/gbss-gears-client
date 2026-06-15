import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { gbss_logo_white } from '@/assets/images'
import NavMenu from './NavMenu'
import NavbarNotifications from './NavbarNotifications'
import NavbarUserProfile from './NavbarUserProfile'
import { useAuthStore, useFormsMenuStore, useNotificationStore, useUIStore } from '@/store'
import { MessageModalContext } from '@/contexts/MessageModalContext'

function Navbar({ onMenuClick }) {
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [notificationOpen, setNotificationOpen] = useState(false)
    const [isBellShaking, setIsBellShaking] = useState(false)
    const [justOpenedNotificationIds, setJustOpenedNotificationIds] = useState([])
    const previousLatestNotificationIdRef = useRef(null)
    const messageModalContext = useContext(MessageModalContext)
    const navigate = useNavigate()
    const { logout, user } = useAuthStore()
    const menuItems = useFormsMenuStore(function (state) { return state.menuItems })
    const showSubmenuOnHover = useUIStore(state => state.showSubmenuOnHover)
    const setShowSubmenuOnHover = useUIStore(state => state.setShowSubmenuOnHover)
    const notifications = useNotificationStore(function (state) { return state.notifications })
    const unreadCount = useNotificationStore(function (state) { return state.unreadCount })
    const markAllAsRead = useNotificationStore(function (state) { return state.markAllAsRead })
    const clearNotifications = useNotificationStore(function (state) { return state.clearNotifications })
    const fullName = user ? `${user.firstName} ${user.lastName}` : ''
    const navigationLayoutLabel = showSubmenuOnHover ? '↓' : '↑'
    const navigationLayoutTitle = showSubmenuOnHover
        ? 'Switch to click-to-open menus'
        : 'Switch to hover-to-open menus'

    useEffect(function () {
        if (!Array.isArray(notifications) || notifications.length === 0) {
            previousLatestNotificationIdRef.current = null
            return
        }

        const latestNotificationId = notifications[0].id

        if (!previousLatestNotificationIdRef.current) {
            previousLatestNotificationIdRef.current = latestNotificationId
            return
        }

        if (previousLatestNotificationIdRef.current !== latestNotificationId) {
            previousLatestNotificationIdRef.current = latestNotificationId
            setIsBellShaking(true)

            const timerId = window.setTimeout(function () {
                setIsBellShaking(false)
            }, 650)

            return function () {
                window.clearTimeout(timerId)
            }
        }
    }, [notifications])

    function handleUserMenuToggle() {
        setNotificationOpen(false)
        setUserMenuOpen((prev) => !prev )
    }

    function handleUserMenuClose() {
        setUserMenuOpen(false)
    }

    function handleNotificationToggle() {
        setUserMenuOpen(false)

        setNotificationOpen(function (previousValue) {
            const nextValue = !previousValue

            if (nextValue) {
                const unreadNotificationIds = notifications
                    .filter(function (notification) { return !notification.isRead })
                    .map(function (notification) { return notification.id })

                setJustOpenedNotificationIds(unreadNotificationIds)
                markAllAsRead()
            } else {
                setJustOpenedNotificationIds([])
            }

            return nextValue
        })
    }

    function handleNotificationClose() {
        setNotificationOpen(false)
        setJustOpenedNotificationIds([])
    }

    function handleClearNotifications() {
        clearNotifications()
    }

    function getNotificationAccentClass(type) {
        if (type === 'success') {
            return 'bg-secondary'
        }

        if (type === 'warn') {
            return 'bg-warning'
        }

        if (type === 'error') {
            return 'bg-danger'
        }

        return 'bg-primary'
    }

    function formatNotificationTimestamp(timestamp) {
        if (!timestamp) {
            return ''
        }

        const parsedDate = new Date(timestamp)
        if (Number.isNaN(parsedDate.getTime())) {
            return ''
        }

        return parsedDate.toLocaleString([], {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        })
    }

    function handleLogoutConfirm() {
        logout()
        navigate('/login')
    }

    function handleLogoutClick() {
        setUserMenuOpen(false)
        if (messageModalContext && typeof messageModalContext.showConfirmationModal === 'function') {
            messageModalContext.showConfirmationModal({
                title: 'Sign Out',
                message: 'Are you sure you want to sign out?',
                confirmText: 'Yes, Sign Out',
                cancelText: 'Cancel',
                variant: 'danger',
                onConfirm: handleLogoutConfirm,
            })
            return
        }

        if (window.confirm('Are you sure you want to sign out?')) {
            handleLogoutConfirm()
        }
    }

    function handleNavigationLayoutToggle() {
        setShowSubmenuOnHover(!showSubmenuOnHover)
    }

    // Default icon if none specified
    const defaultIcon = (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    )

    const navigationLayoutButton = (
        <button
            onClick={handleNavigationLayoutToggle}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-600 transition-colors hover:border-primary hover:text-primary focus:outline-none cursor-pointer"
            title={navigationLayoutTitle}
            aria-label={navigationLayoutTitle}
            aria-pressed={showSubmenuOnHover}
        >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h10M4 17h16" />
            </svg>
            <span className="font-semibold text-primary text-sm leading-none" aria-hidden="true">{navigationLayoutLabel}</span>
        </button>
    )

    return (
        <nav className="bg-white border-b border-gray-300 shadow-sm sticky top-0 z-50">
            {/* Top bar with logo and user menu */}
            <div className="bg-primary px-4 py-1.5">
                <div className="flex justify-between items-center">
                    {/* Left side - Hamburger menu and Logo */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onMenuClick}
                            className="lg:hidden p-1 rounded text-white hover:bg-white/20 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <img
                            src={gbss_logo_white}
                            alt="GBSS Logo"
                            className="h-8 object-contain"
                        />
                    </div>

                    {/* Center - Global Navigation Search Bar */}
                    <div className="flex-1 flex justify-center min-w-0">
                        {/* Desktop: Full search bar */}
                        <div className="w-full max-w-4xl px-4 hidden md:block">
                            {/* <GlobalSearchBar /> */}
                        </div>
                    </div>

                    {/* Right side - User menu */}
                    <div className="flex items-center gap-2">
                        {/* Mobile: Search icon button */}
                        {/* <button
                            onClick={handleOpenMobileSearch}
                            className="md:hidden p-1 rounded text-white hover:bg-white/20 focus:outline-none"
                            aria-label="Open search"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button> */}

                        <NavbarNotifications
                            notificationOpen={notificationOpen}
                            onNotificationToggle={handleNotificationToggle}
                            onNotificationClose={handleNotificationClose}
                            isBellShaking={isBellShaking}
                            unreadCount={unreadCount}
                            notifications={notifications}
                            onClearNotifications={handleClearNotifications}
                            justOpenedNotificationIds={justOpenedNotificationIds}
                            getNotificationAccentClass={getNotificationAccentClass}
                            formatNotificationTimestamp={formatNotificationTimestamp}
                        />

                        <NavbarUserProfile
                            user={user}
                            fullName={fullName}
                            userMenuOpen={userMenuOpen}
                            onUserMenuToggle={handleUserMenuToggle}
                            onUserMenuClose={handleUserMenuClose}
                            onLogoutClick={handleLogoutClick}
                        />
                    </div>
                </div>
            </div>

            {/* Desktop-style Menu Bar */}
            <NavMenu
                menuItems={menuItems}
                defaultIcon={defaultIcon}
                showSubmenu={true}
                showSubmenuOnHover={showSubmenuOnHover}
                toolbarAction={navigationLayoutButton}
            />

            {/* Mobile Search Modal */}
            {/* {mobileSearchOpen && (
                <div className="fixed inset-0 bg-black/50 z-60 md:hidden" onClick={handleCloseMobileSearch}>
                    <div className="fixed inset-x-4 top-20" onClick={handleMobileSearchContainerClick}>
                        <div className="bg-white rounded-lg shadow-2xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-base font-semibold text-gray-900">Search Pages</h3>
                                <button
                                    onClick={handleCloseMobileSearch}
                                    className="p-1 rounded hover:bg-gray-100 focus:outline-none"
                                    aria-label="Close search"
                                >
                                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <GlobalSearchBar onNavigate={handleCloseMobileSearch} autoFocus />
                        </div>
                    </div>
                </div>
            )} */}
        </nav>
    )
}

Navbar.propTypes = {
    onMenuClick: PropTypes.func.isRequired
}

Navbar.displayName = 'Navbar'

export default Navbar
