import React from 'react'
import PropTypes from 'prop-types'

function TabBar({ tabs, activeTab, onTabClick, onTabClose }) {
    return (
    <div className="flex items-center overflow-x-auto">
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    className={`flex items-center gap-2 px-4 py-2 border-r border-gray-300 cursor-pointer select-none ${
                        activeTab === tab.id
                            ? 'bg-white text-primary font-medium'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => onTabClick(tab.id)}
                >
                    <span className="text-sm whitespace-nowrap">{tab.label}</span>
                    {tab.closeable && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                onTabClose(tab.id)
                            }}
                            className="ml-2 text-gray-500 hover:text-danger transition-colors"
                            aria-label="Close tab"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}

TabBar.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            closeable: PropTypes.bool
        })
    ).isRequired,
    activeTab: PropTypes.string.isRequired,
    onTabClick: PropTypes.func.isRequired,
    onTabClose: PropTypes.func.isRequired
}

export default TabBar
