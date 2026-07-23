import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useMenuItemClick from '@/hooks/use-menu-item-click'

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ChevronIcon({ open }) {
    return (
        <svg
            className={['h-4 w-4 shrink-0 transition-transform duration-200', open ? 'rotate-180' : ''].join(' ')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    )
}

function ExternalLinkIcon() {
    return (
        <svg className="h-3.5 w-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
    )
}

// ---------------------------------------------------------------------------
// MobileMenuItem – a single row in the mobile drawer.
// Direct items (submenu === null) navigate immediately.
// Items with a submenu array expand/collapse in place (accordion), never a
// floating panel, so nothing gets clipped by the drawer's scroll container.
// ---------------------------------------------------------------------------

function MobileMenuItem({ item, onNavigate }) {
    const [expanded, setExpanded] = useState(false)

    const isDirect = item.submenu === null
    const hasChildren = Array.isArray(item.submenu) && item.submenu.length > 0
    const label = item.name || 'Menu'
    const goTo = useMenuItemClick(onNavigate)

    function handleRowClick() {
        if (isDirect) {
            goTo(item)
            return
        }
        if (hasChildren) {
            setExpanded(function (prev) { return !prev })
        }
    }

    return (
        <div className="border-b border-gray-100 last:border-b-0">
            <button
                type="button"
                onClick={handleRowClick}
                className="w-full flex items-center gap-3 px-3 py-3 text-left text-[15px] font-medium text-gray-800 active:bg-gray-100 rounded-md focus:outline-none"
                aria-expanded={hasChildren ? expanded : undefined}
            >
                {item.icon && <span className="text-primary shrink-0">{item.icon}</span>}
                <span className="flex-1 truncate">{label}</span>
                {isDirect && item.url && <ExternalLinkIcon />}
                {hasChildren && <ChevronIcon open={expanded} />}
            </button>

            {/* Accordion body – grid 0fr/1fr trick animates height without
                guessing max-height and without clipping real content. The
                inner overflow-hidden only exists to mask the collapse
                transition itself, not to truncate anything. */}
            {hasChildren && (
                <div
                    className={[
                        'grid transition-[grid-template-rows] duration-300 ease-in-out',
                        expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                    ].join(' ')}
                >
                    <div className="overflow-hidden">
                        <div className="pb-2 pl-9 pr-2 flex flex-col gap-0.5">
                            {item.submenu.map(function (child, idx) {
                                return (
                                    <button
                                        key={child.id ?? `${label}-child-${idx}`}
                                        type="button"
                                        onClick={function () { goTo(child) }}
                                        className="flex items-center gap-2 px-3 py-2.5 text-left text-sm text-gray-600 rounded-md active:bg-gray-100 focus:outline-none"
                                    >
                                        {child.icon && <span className="text-primary/80 shrink-0">{child.icon}</span>}
                                        <span className="flex-1 truncate">{child.name}</span>
                                        {child.url && <ExternalLinkIcon />}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

MobileMenuItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        icon: PropTypes.element,
        url: PropTypes.string,
        path: PropTypes.string,
        submenu: PropTypes.array,
    }).isRequired,
    onNavigate: PropTypes.func.isRequired,
}

export default MobileMenuItem