import React, { useState, useCallback, useContext } from 'react'
import { useAuthStore, useFormsMenuStore } from '@/store'
import { gbss_logo_white } from '@/assets/images'
import NavbarNotifications from '../NavbarNotifications'
import NavbarUserProfile from '../NavbarUserProfile'
import MenuBarItem from './components/MenuBarItem'
import { MessageModalContext } from '@/contexts/MessageModalContext'
import { useNavigate } from 'react-router-dom'
import useTabNavigation from '@/hooks/use-tab-navigation'
import EvacuationButton from './components/EvacuationButton'

// ---------------------------------------------------------------------------
// MenuBar – the full horizontal menu bar
// ---------------------------------------------------------------------------

function MenuBar() {
    const menuItems = useFormsMenuStore(function (state) { return state.menuItems })
    const [openIndex, setOpenIndex] = useState(null)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const messageModalContext = useContext(MessageModalContext)
    const user = useAuthStore((state) => state.user)
    const fullName = user?.employeeInfo ? `${user?.employeeInfo?.preferedName || user?.employeeInfo?.firstname} ${user?.employeeInfo?.lastname}` : ''
    const logout = useAuthStore((state) => state.logout)
    const navigate = useNavigate()
    const { navigate: navigateTo } = useTabNavigation()
    const canViewTeams = useAuthStore((state) => state.canViewTeams)
    const canViewIT = useAuthStore((state) => state.canViewIT)

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

    if (!menuItems || menuItems.length === 0) return null

    return (
        <div>
            {/* Top bar with logo and user menu */}
            <div className="bg-primary px-4 py-1.5">
                <div className="flex justify-between items-center">
                    {/* Left side - Hamburger menu and Logo */}
                    <div className="flex items-center gap-4">
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
                        // notificationOpen={notificationOpen}
                        // onNotificationToggle={handleNotificationToggle}
                        // onNotificationClose={handleNotificationClose}
                        // isBellShaking={isBellShaking}
                        // unreadCount={unreadCount}
                        // notifications={notifications}
                        // onClearNotifications={handleClearNotifications}
                        // justOpenedNotificationIds={justOpenedNotificationIds}
                        // getNotificationAccentClass={getNotificationAccentClass}
                        // formatNotificationTimestamp={formatNotificationTimestamp}
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
            <div className="flex gap-10 justify-between px-2 py-1 border-b border-gray-200 bg-white">
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
                <EvacuationButton />
            </div>

        </div>
    )
}

MenuBar.displayName = 'MenuBar'

export default MenuBar
