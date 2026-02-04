import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

function MenuDropdown({ label, items, icon }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    function handleItemClick(item) {
        if (item.onClick) {
            item.onClick()
        }
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-2 rounded transition-colors cursor-pointer"
            >
                {label}
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg min-w-[180px] z-50">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleItemClick(item)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 cursor-pointer"
                        >
                            {item.icon && (
                                <span className="text-gray-500">{item.icon}</span>
                            )}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

MenuDropdown.propTypes = {
    label: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            icon: PropTypes.node,
            onClick: PropTypes.func
        })
    ).isRequired,
    icon: PropTypes.node
}

export default MenuDropdown
