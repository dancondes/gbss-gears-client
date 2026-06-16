import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import SubmenuPanel from './SubMenuPanel'
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


MenuBarItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        icon: PropTypes.element,
        url: PropTypes.string,
        path: PropTypes.string,
        submenu: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string.isRequired,
            icon: PropTypes.element,
            url: PropTypes.string,
        })).isRequired,
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default MenuBarItem
