import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useFormsMenuStore } from '@/store'
import useTabNavigation from '@/hooks/use-tab-navigation'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function useOutsideClick(refs, handler) {
    useEffect(function () {
        function listener(event) {
            const clickedOutside = refs.every(function (ref) {
                return ref.current && !ref.current.contains(event.target)
            })
            if (clickedOutside) handler()
        }
        document.addEventListener('mousedown', listener)
        return function () {
            document.removeEventListener('mousedown', listener)
        }
    }, [refs, handler])
}

// ---------------------------------------------------------------------------
// SubmenuPanel – the dropdown panel that appears below a top-level menu item
// ---------------------------------------------------------------------------

function SubmenuPanel({ items, isOpen, onClose }) {
    const { navigate } = useTabNavigation()

    if (!isOpen || !items || items.length === 0) return null

    function handleItemClick(item) {
        onClose()

        if (item.url) {
            window.open(item.url, '_blank', 'noopener,noreferrer')
            return
        }

        if (item.path) {
            navigate(item.path, {
                id: item.id,
                label: item.name,
            })
        }

        if (item.action && typeof item.action === 'function') {
            item.action()
        }
    }

    return (
        <div className="absolute left-0 top-full mt-0.5 z-50 min-w-50 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
            {items.map(function (item) {
                return (
                    <button
                        key={item.id || item.name}
                        onClick={function () { handleItemClick(item) }}
                        className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors focus:outline-none focus:bg-gray-50"
                    >
                        {item.icon && (
                            <span className="shrink-0 text-gray-400">
                                {item.icon}
                            </span>
                        )}
                        <span className="flex-1">{item.name}</span>
                        {item.shortcut && (
                            <span className="ml-auto text-xs text-gray-400 font-mono">
                                {item.shortcut}
                            </span>
                        )}
                    </button>
                )
            })}
        </div>
    )
}

// ---------------------------------------------------------------------------
// MenuBarItem – a single top-level menu entry (icon-only, labeled, or direct)
// ---------------------------------------------------------------------------

function MenuBarItem({ item, isOpen, onToggle, onClose }) {
    const { navigate } = useTabNavigation()
    const containerRef = useRef(null)

    useOutsideClick([containerRef], onClose)

    const isIconOnly = !item.name
    const isDirect = item.submenu === null  // Code of Conduct – no dropdown

    function handleClick() {
        if (isDirect) {
            if (item.url) {
                window.open(item.url, '_blank', 'noopener,noreferrer')
            } else if (item.path) {
                navigate(item.path, {
                    id: item.id,
                    label: item.name,
                })
            }
            return
        }
        onToggle()
    }

    return (
        <div ref={containerRef} className="relative">
            <button
                onClick={handleClick}
                className={[
                    'flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-sm transition-colors focus:outline-none',
                    isDirect
                        ? 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                        : isOpen
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-primary',
                ].join(' ')}
                aria-haspopup={!isDirect ? 'true' : undefined}
                aria-expanded={!isDirect ? isOpen : undefined}
                title={isIconOnly ? 'Menu' : item.name}
            >
                {/* Icon */}
                {item.icon && (
                    <span className={[
                        'shrink-0',
                        isIconOnly && isOpen ? 'text-white' : 'text-primary',
                    ].join(' ')}>
                        {item.icon}
                    </span>
                )}

                {/* Label (skipped for icon-only menu) */}
                {!isIconOnly && (
                    <span>{item.name}</span>
                )}

                {/* Chevron for items with submenus */}
                {!isDirect && !isIconOnly && (
                    <svg
                        className={[
                            'h-3 w-3 transition-transform',
                            isOpen ? 'rotate-180 text-white' : 'text-gray-400',
                        ].join(' ')}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                )}

                {/* External link indicator for direct-nav items */}
                {isDirect && item.url && (
                    <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                )}
            </button>

            {/* Dropdown panel */}
            {!isDirect && (
                <SubmenuPanel
                    items={item.submenu}
                    isOpen={isOpen}
                    onClose={onClose}
                />
            )}
        </div>
    )
}

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
    )
}

MenuBar.displayName = 'MenuBar'

export default MenuBar
