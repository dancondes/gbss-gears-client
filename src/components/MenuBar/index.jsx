import React, { useState, useCallback } from 'react'
import { useFormsMenuStore } from '@/store'
import { gbss_logo_white } from '@/assets/images'
import NavbarNotifications from '../NavbarNotifications'
import NavbarUserProfile from '../NavbarUserProfile'
import MenuBarItem from './components/MenuBarItem'

// ---------------------------------------------------------------------------
// MenuBar – the full horizontal menu bar
// ---------------------------------------------------------------------------

function MenuBar() {
    const menuItems = useFormsMenuStore(function (state) { return state.menuItems })
    const [openIndex, setOpenIndex] = useState(null)

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

    if (!menuItems || menuItems.length === 0) return null

    return (
        <div>
            {/* Top bar with logo and user menu */}
            <div className="bg-primary px-4 py-1.5">
                <div className="flex justify-between items-center">
                    {/* Left side - Hamburger menu and Logo */}
                    <div className="flex items-center gap-4">
                        {/* <button
                            onClick={null}
                            className="lg:hidden p-1 rounded text-white hover:bg-white/20 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button> */}
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
                            // user={user}
                            // fullName={fullName}
                            // userMenuOpen={userMenuOpen}
                            // onUserMenuToggle={handleUserMenuToggle}
                            // onUserMenuClose={handleUserMenuClose}
                            // onLogoutClick={handleLogoutClick}
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-0.5 px-2 py-1 border-b border-gray-200 bg-white">
                {menuItems.map(function (item, index) {
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
        </div>
    )
}

MenuBar.displayName = 'MenuBar'

export default MenuBar
