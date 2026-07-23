import React, { useState, useCallback, useContext, useRef, useEffect } from 'react'
import { useAuthStore, useFormsMenuStore, useNotificationStore } from '@/store'
import { gbss_logo_white } from '@/assets/images'
import NavbarNotifications from '../NavbarNotifications'
import NavbarUserProfile from '../NavbarUserProfile'
import MenuBarItem from './components/MenuBarItem'
import { MessageModalContext } from '@/contexts/MessageModalContext'
import { useNavigate } from 'react-router-dom'
import useTabNavigation from '@/hooks/use-tab-navigation'
import EvacuationButton from './components/EvacuationButton'
import { canUserTriggerEvacuation } from '@/utilities/jwt-utils'
import HamburgerButton from '../HamburgerButton'
import MobileNavDrawer from '../MobileNavDrawer'

// ---------------------------------------------------------------------------
// MenuBar – the full horizontal menu bar (desktop) / hamburger + drawer (mobile)
// ---------------------------------------------------------------------------

function MenuBar() {
    const menuItems = useFormsMenuStore(function (state) { return state.menuItems })
    const [openIndex, setOpenIndex] = useState(null)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const hamburgerButtonRef = useRef(null)
    const messageModalContext = useContext(MessageModalContext)
    const user = useAuthStore((state) => state.user)
    const token = useAuthStore((state) => state.token)
    const fullName = user?.employeeInfo ? `${user?.employeeInfo?.preferedName || user?.employeeInfo?.firstname} ${user?.employeeInfo?.lastname}` : ''
    const logout = useAuthStore((state) => state.logout)
    const navigate = useNavigate()
    const { navigate: navigateTo } = useTabNavigation()
    const canViewTeams = useAuthStore((state) => state.canViewTeams)
    const canViewIT = useAuthStore((state) => state.canViewIT)

    const [notificationOpen, setNotificationOpen] = useState(false)

    const [isBellShaking, setIsBellShaking] = useState(false)
    const [justOpenedNotificationIds, setJustOpenedNotificationIds] = useState([])
    const previousLatestNotificationIdRef = useRef(null)
    const notifications = useNotificationStore(function (state) { return state.notifications })
    const unreadCount = useNotificationStore(function (state) { return state.unreadCount })
    const markAllAsRead = useNotificationStore(function (state) { return state.markAllAsRead })
    const clearNotifications = useNotificationStore(function (state) { return state.clearNotifications })


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


    const handleToggle = useCallback(function (index) {
        setOpenIndex(function (prev) {
            return prev === index ? null : index
        })
    }, [])

    const handleClose = useCallback(function (index) {
        setOpenIndex(function (prev) {
            return prev === index ? null : prev
        })
    }, [])

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

    function handleUserMenuToggle() {
        // setNotificationOpen(false)
        setUserMenuOpen((prev) => !prev)
    }

    function handleUserMenuClose() {
        setUserMenuOpen(false)
    }

    function handleUserProfileClick() {
        setUserMenuOpen(false)
        navigateTo('/user/personal-details', {
            id: 'Personal-Details',
            title: 'Personal Details',
        })
    }

    // notifs
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

    function handleMobileMenuToggle() {
        setMobileMenuOpen(function (prev) { return !prev })
    }

    function handleMobileMenuClose() {
        setMobileMenuOpen(false)
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

    if (!menuItems || menuItems.length === 0) return null

    const canEvacuate = canUserTriggerEvacuation(token) && user?.hasEvac

    return (
        <div>
            {/* Top bar with logo and user menu */}
            <div className="bg-primary px-4 py-1.5">
                <div className="flex justify-between items-center">
                    {/* Left side - Hamburger menu (mobile) and Logo */}
                    <div className="flex items-center gap-4">
                        <HamburgerButton ref={hamburgerButtonRef} isOpen={mobileMenuOpen} onClick={handleMobileMenuToggle} />
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
                            user={user?.employeeInfo}
                            fullName={fullName}
                            userMenuOpen={userMenuOpen}
                            onUserMenuToggle={handleUserMenuToggle}
                            onUserMenuClose={handleUserMenuClose}
                            onLogoutClick={handleLogoutClick}
                            onProfileClick={handleUserProfileClick}
                        />
                    </div>
                </div>
            </div>

            {/* Desktop dropdown menu row – hidden below md, hamburger/drawer take over */}
            <div className="hidden md:flex gap-10 justify-between px-2 py-1 border-b border-gray-200 bg-white">
                <div className='flex items-center gap-0.5'>
                    {menuItems.map(function (item, index) {
                        if (item.name === 'Team' && !canViewTeams()) {
                            return null
                        }

                        if (item.name === 'IT' && !canViewIT()) {
                            return null
                        }

                        return (
                            <MenuBarItem
                                key={item.name ?? `icon-menu-${index}`}
                                item={item}
                                isOpen={openIndex === index}
                                onToggle={function () { handleToggle(index) }}
                                onClose={function () { handleClose(index) }}
                            />
                        )
                    })}
                </div>

                {canEvacuate && (
                    <EvacuationButton />
                )}
            </div>

            {/* Mobile slide-in drawer – mirrors the same menuItems as an accordion */}
            <MobileNavDrawer
                isOpen={mobileMenuOpen}
                onClose={handleMobileMenuClose}
                menuItems={menuItems}
                canViewTeams={canViewTeams}
                canViewIT={canViewIT}
                evacuationSlot={canEvacuate ? <EvacuationButton /> : null}
                triggerRef={hamburgerButtonRef}
            />

        </div>
    )
}

MenuBar.displayName = 'MenuBar'

export default MenuBar