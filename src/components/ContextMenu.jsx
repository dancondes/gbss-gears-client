import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

/**
 * A custom context menu component that appears on right-click
 * 
 * @component
 * @example
 * <ContextMenu
 *   isOpen={isOpen}
 *   position={{ x: 100, y: 200 }}
 *   onClose={() => setIsOpen(false)}
 *   items={[
 *     { label: 'Edit', onClick: handleEdit, icon: <EditIcon /> },
 *     { label: 'Delete', onClick: handleDelete, icon: <DeleteIcon />, danger: true },
 *     { type: 'divider' },
 *     { label: 'View Details', onClick: handleView }
 *   ]}
 * />
 */
const ContextMenu = ({ isOpen, position, onClose, items, title }) => {
    const menuRef = useRef(null)

    useEffect(() => {
        if (!isOpen) return

        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose()
            }
        }

        function handleEscape(event) {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        function handleScroll() {
            onClose()
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)
        document.addEventListener('scroll', handleScroll, true)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
            document.removeEventListener('scroll', handleScroll, true)
        }
    }, [isOpen, onClose])

    useEffect(() => {
        if (!isOpen || !menuRef.current) return

        const menu = menuRef.current
        const menuRect = menu.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        let adjustedX = position.x
        let adjustedY = position.y

        // Check if menu overflows right edge
        if (position.x + menuRect.width > viewportWidth) {
            adjustedX = position.x - menuRect.width
        }

        // Check if menu overflows bottom edge
        if (position.y + menuRect.height > viewportHeight) {
            adjustedY = position.y - menuRect.height
        }

        // Apply adjusted position
        if (adjustedX !== position.x || adjustedY !== position.y) {
            menu.style.left = `${adjustedX}px`
            menu.style.top = `${adjustedY}px`
        }
    }, [isOpen, position])

    if (!isOpen) return null

    function handleItemClick(item) {
        if (item.onClick) {
            item.onClick()
        }
        onClose()
    }

    return (
        <div
            ref={menuRef}
            className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[180px]"
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
            }}
        >
            {title && (
                <div className="px-4 py-2 border-b border-gray-200 font-semibold text-sm text-gray-700">
                    {title}
                </div>
            )}
            {items.map((item, index) => {
                if (item.type === 'divider') {
                    return (
                        <div
                            key={`divider-${index}`}
                            className="border-t border-gray-200 my-1"
                        />
                    )
                }

                return (
                    <button
                        key={index}
                        onClick={() => handleItemClick(item)}
                        disabled={item.disabled}
                        className={`
                            w-full px-4 py-2 text-left text-sm flex items-center gap-3
                            transition-colors cursor-pointer
                            ${item.disabled
                                ? 'opacity-50 cursor-not-allowed'
                                : item.danger
                                    ? 'hover:bg-red-50 text-red-600'
                                    : 'hover:bg-gray-100 text-gray-700'
                            }
                        `}
                    >
                        {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                        <span>{item.label}</span>
                    </button>
                )
            })}
        </div>
    )
}

ContextMenu.propTypes = {
    /** Whether the context menu is open */
    isOpen: PropTypes.bool.isRequired,
    
    /** Position of the context menu */
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    
    /** Callback when the menu should close */
    onClose: PropTypes.func.isRequired,
    
    /** Optional title to display at the top of the menu */
    title: PropTypes.string,
    
    /** Array of menu items */
    items: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(['divider']),
            label: PropTypes.string,
            onClick: PropTypes.func,
            icon: PropTypes.node,
            disabled: PropTypes.bool,
            danger: PropTypes.bool,
        })
    ).isRequired,
}

export default ContextMenu
