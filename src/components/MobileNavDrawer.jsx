import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import MobileMenuItem from './MobileMenuItem'
import { gbss_logo_white } from '@/assets/images'

function CloseIcon() {
    return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    )
}

// ---------------------------------------------------------------------------
// MobileNavDrawer – full-height slide-in sidebar for small screens.
//
// - Backdrop click, Escape, or selecting a nav item all close it (onClose /
//   onNavigate wired through).
// - Body scroll is locked while open so the page behind can't scroll.
// - The nav list is the ONLY scrollable region (overflow-y-auto); the drawer
//   shell itself never clips content because menu expansion happens inline
//   (accordion) rather than via an absolutely-positioned dropdown.
// - Closing never leaves focus stranded inside a hidden panel: whatever
//   triggered the close is blurred first, then the panel is marked `inert`
//   (not aria-hidden, which Chrome flags if a descendant still has focus).
// ---------------------------------------------------------------------------

function MobileNavDrawer({ isOpen, onClose, menuItems, canViewTeams, canViewIT, evacuationSlot, triggerRef }) {
    const panelRef = useRef(null)
    const closeButtonRef = useRef(null)

    // Keep the panel out of the tab order / a11y tree while closed, using
    // `inert` (set imperatively so this works regardless of React version's
    // JSX support for the attribute) instead of aria-hidden.
    useEffect(function () {
        const panel = panelRef.current
        if (!panel) return
        panel.inert = !isOpen
    }, [isOpen])

    useEffect(function () {
        if (isOpen) {
            // Move focus into the panel once it's open and interactive.
            closeButtonRef.current?.focus()
            return
        }

        // Drawer just closed – if focus somehow escaped our blur-before-close
        // handlers and is still inside the (now inert) panel, move it back
        // to whatever opened the drawer so it isn't stranded.
        if (panelRef.current && panelRef.current.contains(document.activeElement)) {
            document.activeElement.blur()
        }
        triggerRef?.current?.focus()
    }, [isOpen, triggerRef])

    useEffect(function () {
        if (!isOpen) return

        function handleKeyDown(event) {
            if (event.key === 'Escape') closeAndBlur()
        }

        document.addEventListener('keydown', handleKeyDown)

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return function () {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = previousOverflow
        }
    }, [isOpen])

    // Blur whatever currently has focus BEFORE telling the parent to close.
    // This must happen synchronously, before the isOpen state flips, so the
    // panel is never marked inert/aria-hidden while it still holds focus.
    function closeAndBlur() {
        if (panelRef.current && panelRef.current.contains(document.activeElement)) {
            document.activeElement.blur()
        }
        onClose()
    }

    const visibleItems = (menuItems || []).filter(function (item) {
        if (item.name === 'Team' && !canViewTeams()) return false
        if (item.name === 'IT' && !canViewIT()) return false
        return true
    })

    return (
        <>
            {/* Backdrop – tapping it counts as "outside" and closes the drawer */}
            <div
                onClick={closeAndBlur}
                aria-hidden="true"
                className={[
                    'fixed inset-0 bg-gray-900/50 z-40 transition-opacity duration-300 md:hidden',
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
                ].join(' ')}
            />

            {/* Panel */}
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label="Main navigation"
                className={[
                    'fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm bg-white shadow-2xl',
                    'flex flex-col h-full transform transition-transform duration-300 ease-in-out md:hidden',
                    isOpen ? 'translate-x-0' : '-translate-x-full',
                ].join(' ')}
            >
                {/* Header */}
                <div className="flex items-center justify-between bg-linear-to-br from-primary to-secondary px-4 py-3 shrink-0">
                    <img src={gbss_logo_white} alt="GBSS Logo" className="h-7 object-contain" />
                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={closeAndBlur}
                        aria-label="Close menu"
                        className="text-white/90 hover:text-white p-1 rounded-md active:bg-white/10 focus:outline-none"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Scrollable nav list – the single overflow boundary in this component */}
                <nav className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-2 py-2">
                    {visibleItems.map(function (item, index) {
                        return (
                            <MobileMenuItem
                                key={item.name ?? `mobile-menu-${index}`}
                                item={item}
                                onNavigate={closeAndBlur}
                            />
                        )
                    })}
                </nav>

                {/* Optional footer slot, e.g. the evacuation button */}
                {evacuationSlot && (
                    <div className="shrink-0 border-t border-gray-100 px-3 py-3">
                        {evacuationSlot}
                    </div>
                )}
            </div>
        </>
    )
}

MobileNavDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    menuItems: PropTypes.array.isRequired,
    canViewTeams: PropTypes.func.isRequired,
    canViewIT: PropTypes.func.isRequired,
    evacuationSlot: PropTypes.node,
    triggerRef: PropTypes.shape({ current: PropTypes.any }),
}

export default MobileNavDrawer