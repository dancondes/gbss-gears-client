import React, { useCallback, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import AccessRestricted from './AccessRestricted'

/**
 * Reusable TabContainer component for managing tabbed interfaces
 * Handles tab navigation and content switching
 * 
 * @param {Object} props
 * @param {Array} props.tabs - Array of tab objects with structure: { id, label, content }
 * @param {string} props.defaultTab - The tab ID to display by default
 * @param {string} props.variant - Visual variant: 'primary' (default) or 'secondary' (nested/compact)
 * @param {Function} props.onTabChange - Callback when active tab changes
 * @param {boolean} props.scrollable - Enable horizontal scrolling for tabs (default: true)
 */
const TabbedPanel = ({
    tabs = [],
    defaultTab,
    variant = 'primary',
    onTabChange,
    scrollable = true,
}) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)
    const scrollRef = useRef(null)

    useEffect(() => {
        const container = scrollRef.current
        if (!container) return

        function handleWheel(e) {
            e.preventDefault()
            container.scrollLeft += e.deltaY * 0.4
        }

        container.addEventListener('wheel', handleWheel, { passive: false })

        return function () {
            container.removeEventListener('wheel', handleWheel)
        }
    }, [])

    useEffect(() => {
        if (defaultTab && defaultTab !== activeTab) {
            setActiveTab(defaultTab)
        }
    }, [defaultTab])

    const handleTabChange = useCallback((tabId, disabled) => {
        if (disabled) return
        setActiveTab(tabId)
        if (onTabChange) onTabChange(tabId)
    }, [onTabChange])

    const isSecondary = variant === 'secondary'
    const containerClasses = isSecondary 
        ? 'bg-white rounded-lg border border-gray-100 overflow-hidden' 
        : 'bg-white rounded-lg border border-gray-200 overflow-hidden'
    
    const borderClasses = isSecondary 
        ? 'border-b border-gray-100' 
        : 'border-b border-gray-200'
    
    const getTabButtonClasses = (isActive, isDisabled) => {
        const baseClasses = `transition-colors whitespace-nowrap font-medium rounded-t-lg`
        const sizeClasses = isSecondary ? 'text-xs py-2 px-3' : 'px-4 py-3 text-xs'
        
        if (isDisabled) {
            return `${baseClasses} ${sizeClasses} text-gray-400 cursor-not-allowed opacity-60`
        }
        
        const cursorClass = 'cursor-pointer'
        
        if (isActive) {
            return `${baseClasses} ${sizeClasses} ${cursorClass} ${isSecondary ? 'bg-secondary' : 'bg-primary'} text-white`
        } else {
            const inactiveColor = isSecondary 
                ? 'text-gray-600 hover:text-gray-700 hover:bg-gray-200' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
            return `${baseClasses} ${sizeClasses} ${cursorClass} ${inactiveColor}`
        }
    }

    return (
        <div className={containerClasses}>
            {/* Tab Navigation */}
            <div className={borderClasses}>
                <nav ref={scrollRef} className={`flex -mb-px ${scrollable ? 'overflow-x-auto' : 'flex-wrap'}`}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => handleTabChange(tab.id, tab.disabled)}
                            disabled={tab.disabled}
                            className={getTabButtonClasses(activeTab === tab.id, tab.disabled)}
                            title={tab.disabled ? "You don't have permission to access this tab" : ''}
                        >
                            {tab.label}
                            {tab.badge !== undefined && (
                                <span className="ml-2 text-xs">({tab.badge})</span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className='p-4'>
                {                
                    tabs.map((tab) => (
                        activeTab === tab.id && (
                            <div key={tab.id}>
                                {typeof tab.content === 'function' ? tab.content() : tab.content}
                            </div>
                        )
                    ))
                }
            </div>
        </div>
    )
}

TabbedPanel.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
        badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        disabled: PropTypes.bool
    })).isRequired,
    defaultTab: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary']),
    onTabChange: PropTypes.func,
    scrollable: PropTypes.bool,
}

export default TabbedPanel
