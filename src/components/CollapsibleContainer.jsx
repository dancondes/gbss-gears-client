import React, { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * CollapsibleContainer - A reusable component for collapsible content sections
 * Useful for hiding/showing content on small screens to save space
 * 
 * @param {string} title - The title/label for the collapsible section
 * @param {React.ReactNode} children - Content to display inside the collapsible container
 * @param {boolean} defaultOpen - Whether the container starts open (default: false on mobile, true on desktop)
 * @param {string} icon - Icon to display next to title (optional)
 */
const CollapsibleContainer = ({ 
    title, 
    children, 
    defaultOpen = true,
    icon = null,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}>
            {/* Header */}
            <button
                onClick={toggleOpen}
                className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-left transition-colors duration-200 cursor-pointer"
                aria-expanded={isOpen}
                title={isOpen ? 'Collapse' : 'Expand'}
                type="button"
            >
                <div className="flex items-center gap-2">
                    {icon && <span className="text-gray-600">{icon}</span>}
                    <span className="font-medium text-sm text-gray-700">{title}</span>
                </div>
                <svg
                    className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </button>

            {/* Content */}
            <div
                className={`overflow-y-auto transition-all duration-300 ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                }`}
            >
                <div className="px-4 py-3 bg-white border-t border-gray-200">
                    {children}
                </div>
            </div>
        </div>
    )
}

CollapsibleContainer.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    defaultOpen: PropTypes.bool,
    icon: PropTypes.string,
    className: PropTypes.string,
}

export default CollapsibleContainer
