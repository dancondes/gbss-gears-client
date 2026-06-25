import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function FolderItem({ folder, selectedFolder, onSelect, expandedFolders, onToggleExpand, level = 0 }) {
    const isSelected = folder.id === selectedFolder?.id
    const hasChildren = folder.children && folder.children.length > 0
    const isExpanded = expandedFolders.includes(folder.id)
    const isParent = level === 0
    const paddingLeft = isParent ? '16px' : `${(level * 20) + 16}px`

    function handleRowClick() {
        onSelect(folder)
    }

    function handleToggleClick(e) {
        e.stopPropagation()
        onToggleExpand(folder.id)
    }

    return (
        <>
            <div
                onClick={handleRowClick}
                className={`w-full text-left py-3 flex items-center gap-2 transition-colors cursor-pointer border-b border-gray-100 ${
                    isSelected
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-50 text-gray-700'
                } ${!isParent ? 'bg-gray-50/50' : ''}`}
                style={{ paddingLeft }}
            >
                {hasChildren ? (
                    <button
                        onClick={handleToggleClick}
                        className="p-0.5 hover:bg-black/10 rounded transition-colors"
                    >
                        <svg
                            className={`h-4 w-4 shrink-0 transition-transform ${
                                isExpanded ? 'rotate-90' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                ) : (
                    level > 0 && <span className="w-4" />
                )}
                
                <svg className={`h-5 w-5 shrink-0 ${isParent ? 'text-current' : 'opacity-70'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                </svg>
                <span className={`text-sm flex-1 ${isParent ? 'font-semibold' : 'font-medium'}`}>{folder.name}</span>
            </div>
            
            {hasChildren && isExpanded && (
                <>
                    {folder.children.map(function(child) {
                        return (
                            <FolderItem
                                key={child.id}
                                folder={child}
                                selectedFolder={selectedFolder}
                                onSelect={onSelect}
                                expandedFolders={expandedFolders}
                                onToggleExpand={onToggleExpand}
                                level={level + 1}
                            />
                        )
                    })}
                </>
            )}
        </>
    )
}

FolderItem.propTypes = {
    folder: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        children: PropTypes.array,
    }).isRequired,
    selectedFolder: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
    expandedFolders: PropTypes.array.isRequired,
    onToggleExpand: PropTypes.func.isRequired,
    level: PropTypes.number,
}

function FolderPanel({ folders, selectedFolder, onSelectFolder, title = 'Folders', className = '', isLoading = false }) {
    const [expandedFolders, setExpandedFolders] = useState([])

    useEffect(function() {
        if (!selectedFolder?.parentId) return

        setExpandedFolders(function(prev) {
            if (prev.includes(selectedFolder.parentId)) {
                return prev
            }

            return [...prev, selectedFolder.parentId]
        })
    }, [selectedFolder])

    function handleToggleExpand(folderId) {
        setExpandedFolders(function(prev) {
            if (prev.includes(folderId)) {
                return prev.filter(function(id) {
                    return id !== folderId
                })
            }
            return [...prev, folderId]
        })
    }

    function handleCollapseAll() {
        setExpandedFolders([])
    }

    return (
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col ${className}`}>
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
                <button
                    onClick={handleCollapseAll}
                    className="text-xs text-primary hover:underline cursor-pointer"
                    type="button"
                >
                    Collapse All
                </button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {isLoading
                    ? (
                        <div className="px-4 py-3 text-sm text-gray-500">Loading...</div>
                    )
                    : folders.map(function(folder) {
                        return (
                            <FolderItem
                                key={folder.id}
                                folder={folder}
                                selectedFolder={selectedFolder}
                                onSelect={onSelectFolder}
                                expandedFolders={expandedFolders}
                                onToggleExpand={handleToggleExpand}
                            />
                        )
                    })}
            </div>
        </div>
    )
}

FolderPanel.propTypes = {
    folders: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            children: PropTypes.array,
        })
    ).isRequired,
    selectedFolder: PropTypes.object,
    onSelectFolder: PropTypes.func.isRequired,
    title: PropTypes.string,
    className: PropTypes.string,
    isLoading: PropTypes.bool,
}

export default FolderPanel
