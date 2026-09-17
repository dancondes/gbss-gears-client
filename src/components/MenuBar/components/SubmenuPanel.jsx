import React from 'react'
import PropTypes from 'prop-types'
import useMenuItemClick from '@/hooks/use-menu-item-click'

// ---------------------------------------------------------------------------
// SubmenuPanel – the dropdown panel that appears below a top-level menu item
// ---------------------------------------------------------------------------

function SubmenuPanel({ items, isOpen, onClose }) {
    const handleItemClick = useMenuItemClick(onClose)
    
    if (!isOpen || !items || items.length === 0) return null

    return (
        <div className="absolute left-0 top-full mt-0.5 z-50 min-w-50 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
            {items.map(function (item) {
                return (
                    <button
                        key={item.id || item.name}
                        data-guide-item-id={item.id}
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

SubmenuPanel.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string.isRequired,
            icon: PropTypes.element,
            url: PropTypes.string,
        })
    ).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default SubmenuPanel
