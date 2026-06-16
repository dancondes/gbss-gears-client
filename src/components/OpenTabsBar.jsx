import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import ContextMenu from './ContextMenu'
import useConfirmationModal from '@/hooks/use-confirmation-modal'

function OpenTabsBar({ tabs, activeTab, onTabClick, onTabClose, onCloseOthers, onCloseAll, onCloseAllToRight, onPinTab, onUnpinTab }) {
    const { showConfirmationModal } = useConfirmationModal()
    const [contextMenu, setContextMenu] = useState(null)
    const [contextTabId, setContextTabId] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const scrollContainerRef = useRef(null)
    const dropdownRef = useRef(null)

    // Truncate tab label to max 15 characters
    function truncateLabel(label, maxLength = 15) {
        if (label.length <= maxLength) return label
        return label.substring(0, maxLength) + '...'
    }

    // For duplicate tab labels, append (1), (2), (3)... in order of appearance
    function getDisplayLabels(tabs) {
        const countMap = {}
        tabs.forEach(function (t) {
            countMap[t.label] = (countMap[t.label] || 0) + 1
        })
        const indexMap = {}
        const result = {}
        tabs.forEach(function (t) {
            if (countMap[t.label] > 1) {
                indexMap[t.label] = (indexMap[t.label] || 0) + 1
                result[t.id] = t.label + ' (' + indexMap[t.label] + ')'
            } else {
                result[t.id] = t.label
            }
        })
        return result
    }

    const displayLabels = getDisplayLabels(tabs)

    // Scroll active tab into view when it changes or on mount
    useEffect(() => {
        if (scrollContainerRef.current && activeTab) {
            const activeTabElement = scrollContainerRef.current.querySelector(`[data-tab-id="${activeTab}"]`)
            if (activeTabElement) {
                activeTabElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                })
            }
        }
    }, [activeTab])

    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return

        function handleWheel(e) {
            e.preventDefault()
            container.scrollLeft += e.deltaY
        }

        container.addEventListener('wheel', handleWheel, { passive: false })

        return function () {
            container.removeEventListener('wheel', handleWheel)
        }
    }, [])

    useEffect(() => {
        if (!dropdownOpen) return

        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return function () {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownOpen])

    function handleContextMenu(e, tabId, canBePinned = true) {
        e.preventDefault()
        setContextTabId(tabId)
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            canBePinned
        })
    }

    function handleCloseContextMenu() {
        setContextMenu(null)
        setContextTabId(null)
    }

    function toggleDropdown() {
        setDropdownOpen(function (prev) { return !prev })
    }

    function handleDropdownTabClick(tabId) {
        onTabClick(tabId)
        setDropdownOpen(false)
    }

    function handleCloseTab(tabId) {
        onTabClose(tabId)
        handleCloseContextMenu()
    }

    function handleCloseOthers() {
        if (contextTabId && onCloseOthers) {
            onCloseOthers(contextTabId)
        }
        handleCloseContextMenu()
    }

    function handleCloseAll() {
        if (!onCloseAll) {
            handleCloseContextMenu()
            return
        }

        showConfirmationModal({
            title: 'Close All Tabs',
            message: 'Are you sure you want to close all tabs? Pinned tabs will remain open.',
            confirmText: 'Close All',
            cancelText: 'Cancel',
            variant: 'danger',
            onConfirm: function () {
                onCloseAll()
            },
        })

        if (onCloseAll) {
            handleCloseContextMenu()
        }
    }

    function handleDropdownCloseAll() {
        if (!onCloseAll) {
            setDropdownOpen(false)
            return
        }

        showConfirmationModal({
            title: 'Close All Tabs',
            message: 'Are you sure you want to close all tabs? Pinned tabs will remain open.',
            confirmText: 'Close All',
            cancelText: 'Cancel',
            variant: 'danger',
            onConfirm: function () {
                onCloseAll()
            },
        })

        setDropdownOpen(false)
    }

    function handleCloseAllToRight() {
        if (contextTabId && onCloseAllToRight) {
            onCloseAllToRight(contextTabId)
        }
        handleCloseContextMenu()
    }

    function handlePinTab() {
        if (contextTabId && onPinTab) {
            onPinTab(contextTabId)
        }
        handleCloseContextMenu()
    }

    function handleUnpinTab() {
        if (contextTabId && onUnpinTab) {
            onUnpinTab(contextTabId)
        }
        handleCloseContextMenu()
    }

    const tab = tabs.find(t => t.id === contextTabId)
    const tabIndex = tabs.findIndex(t => t.id === contextTabId)
    const isTabPinned = tab?.pinned
    const isTabCloseable = !isTabPinned || tab.isDefault
    const hasCloseableTabsToRight = tabIndex >= 0 && tabs.slice(tabIndex + 1).some(t => !t.pinned)
    const hasCloseableTabs = tabs.some(t => !t.pinned)
    const hasOtherCloseableTabs = tabs.filter(t => !t.pinned && t.id !== contextTabId).length > 0

    const contextMenuItems = contextTabId ? [
        isTabPinned
            ? { label: 'Unpin Tab', onClick: handleUnpinTab }
            : { label: 'Pin Tab', onClick: handlePinTab },
        isTabCloseable && {
            label: 'Close',
            onClick: function () { handleCloseTab(contextTabId) }
        },
        hasOtherCloseableTabs && {
            label: 'Close Others',
            onClick: handleCloseOthers
        },
        hasCloseableTabsToRight && {
            label: 'Close All to the Right',
            onClick: handleCloseAllToRight
        },
        hasCloseableTabs && {
            label: 'Close All',
            onClick: handleCloseAll
        }
    ].filter(Boolean) : []

    return (
        <>
            <div className="flex items-center bg-gray-50 border-b-2 border-gray-300">
                <div 
                    ref={scrollContainerRef}
                    className="flex items-center overflow-x-auto flex-1 min-w-0"
                >
                    {tabs.map((t) => {
                        return (
                            <div
                                key={t.id}
                                data-tab-id={t.id}
                                title={displayLabels[t.id]}
                                className={`relative flex items-center gap-2 px-4 py-2 border-r border-gray-300 cursor-pointer select-none transition-colors duration-200 ease-in-out ${
                                    activeTab === t.id
                                        ? 'bg-white text-primary font-semibold'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                                }`}
                                onClick={() => { onTabClick(t.id) }}
                                onContextMenu={(e) => { handleContextMenu(e, t.id, !t.isDefault) }}
                            >
                                <span
                                    className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-200 ease-in-out ${
                                        activeTab === t.id ? 'w-full opacity-100' : 'w-0 opacity-0'
                                    }`}
                                />
                                {t.pinned && (
                                    <svg className="w-3 h-3 shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                                    </svg>
                                )}
                                <span className="text-sm whitespace-nowrap">{truncateLabel(displayLabels[t.id])}</span>
                                {(!t.pinned && !t.isDefault) && (
                                    <button
                                        onClick={function (e) {
                                            e.stopPropagation()
                                            onTabClose(t.id)
                                        }}
                                        className={`ml-2 transition-colors cursor-pointer ${
                                            activeTab === t.id
                                                ? 'text-primary hover:text-danger'
                                                : 'text-gray-500 hover:text-danger'
                                        }`}
                                        aria-label="Close tab"
                                        title="Close tab"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div ref={dropdownRef} className="relative shrink-0 border-l-2 border-gray-300">
                    <button
                        onClick={toggleDropdown}
                        className={`flex items-center gap-1.5 justify-center px-3 py-2 cursor-pointer transition-colors duration-200 ease-in-out ${
                            dropdownOpen
                                ? 'bg-primary text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'
                        }`}
                        aria-label="Show all tabs"
                        title="Show all tabs"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 top-full z-50 mt-0.5 w-64 max-h-72 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
                            {hasCloseableTabs && (
                                <button
                                    onClick={handleDropdownCloseAll}
                                    className="flex items-center w-full px-4 py-2 text-xs font-semibold cursor-pointer text-danger hover:bg-danger/10 border-b border-gray-200 transition-colors duration-150"
                                >
                                    Close All Tabs
                                </button>
                            )}
                            {tabs.map(function (t) {
                                return (
                                    <div
                                        key={t.id}
                                        onClick={function () { handleDropdownTabClick(t.id) }}
                                        className={`flex items-center w-full px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ${
                                            activeTab === t.id
                                                ? 'bg-primary/10 text-primary font-semibold'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                        title={displayLabels[t.id]}
                                    >
                                        {t.pinned && (
                                            <svg className="w-3 h-3 shrink-0 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                                            </svg>
                                        )}
                                        <span className="truncate flex-1 min-w-0">{displayLabels[t.id]}</span>
                                        {(!t.pinned && !t.isDefault) && (
                                            <button
                                                onClick={function (e) {
                                                    e.stopPropagation()
                                                    onTabClose(t.id)
                                                }}
                                                className={`ml-2 shrink-0 cursor-pointer transition-colors ${
                                                    activeTab === t.id
                                                        ? 'text-primary hover:text-danger'
                                                        : 'text-gray-400 hover:text-danger'
                                                }`}
                                                aria-label="Close tab"
                                                title="Close tab"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>

            {contextMenu && contextMenuItems.length > 0 && (
                <ContextMenu
                    isOpen={true}
                    position={{ x: contextMenu.x, y: contextMenu.y }}
                    items={contextMenuItems}
                    onClose={handleCloseContextMenu}
                />
            )}
        </>
    )
}

OpenTabsBar.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            pinned: PropTypes.bool
        })
    ).isRequired,
    activeTab: PropTypes.string,
    onTabClick: PropTypes.func.isRequired,
    onTabClose: PropTypes.func.isRequired,
    onCloseOthers: PropTypes.func,
    onCloseAll: PropTypes.func,
    onCloseAllToRight: PropTypes.func,
    onPinTab: PropTypes.func,
    onUnpinTab: PropTypes.func
}

export default OpenTabsBar
