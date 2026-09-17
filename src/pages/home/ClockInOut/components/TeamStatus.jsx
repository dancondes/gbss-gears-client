import React, { useEffect, useState, useCallback } from 'react'
import { getTeamStatus } from '@/services/user-service'
import PropTypes from 'prop-types'
import useTabNavigation from '@/hooks/use-tab-navigation'

const STATUS_STYLES = {
    ONLINE: 'bg-green-500',
    OFFLINE: 'bg-red-500',
    'ON BREAK': 'bg-yellow-500',
}

function RefreshIcon({ spinning }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-4 h-4 ${spinning ? 'animate-spin' : ''}`}
        >
            <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-8.13-5.13" />
            <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 8.13 5.13" />
            <path d="M21 3v6h-6" />
            <path d="M3 21v-6h6" />
        </svg>
    )
}

RefreshIcon.propTypes = {
    spinning: PropTypes.bool,
}

function formatSyncTime(date) {
    if (!date) return '—'
    return date.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    })
}

function StatusRow({ member }) {
    const dotColor = STATUS_STYLES[member.status] ?? 'bg-gray-400'
    return (
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-b-0">
            <span className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${dotColor}`} />
            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">{member.name}</p>
                <p className="text-xs text-gray-500 truncate">{member.location}</p>
            </div>
            <span className="text-xs font-medium text-gray-600 shrink-0">{member.status}</span>
        </div>
    )
}

StatusRow.propTypes = {
    member: PropTypes.shape({
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
    }).isRequired,
}

function RowSkeleton() {
    return (
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-b-0 animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-200 shrink-0" />
            <div className="min-w-0 flex-1 space-y-1.5">
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="h-2.5 w-16 bg-gray-100 rounded" />
            </div>
            <div className="h-3 w-14 bg-gray-200 rounded shrink-0" />
        </div>
    )
}

export default function TeamStatus({ open = false }) {
    const [members, setMembers] = useState([])
    const [lastSync, setLastSync] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const { navigate } = useTabNavigation()

    const loadTeamStatus = useCallback(async (isInitial) => {
        if (isInitial) {
            setIsLoading(true)
        } else {
            setIsRefreshing(true)
        }
        try {
            const result = await getTeamStatus()
            setMembers(result?.data || [])
            setLastSync(new Date())
        } finally {
            setIsLoading(false)
            setIsRefreshing(false)
        }
    }, [])

    useEffect(() => {
        if (open)
            loadTeamStatus(true)
    }, [loadTeamStatus, open])

    function handleRefresh() {
        if (isRefreshing) return
        loadTeamStatus(false)
    }

    function handleOpenTeamStatus() {
        navigate('/team/status', {
            id: 'Team-Status',
            label: 'Team Status',
        })
    }

    return (
        <div
            className={`bg-white rounded-xl shadow-sm border hidden lg:flex flex-col max-h-105 overflow-hidden
                transition-[width,opacity,border-color] duration-300 ease-in-out
                ${open ? 'w-75 opacity-100 border-gray-100' : 'w-0 opacity-0 border-transparent'}`}
        >
            <div className="w-75 flex flex-col h-full shrink-0">
                <div className="flex items-start justify-between px-4 pt-4 pb-3 border-b border-gray-100 shrink-0">
                    <div className="min-w-0">
                        <button
                            type="button"
                            onClick={handleOpenTeamStatus}
                            className="inline-flex items-center gap-1.5 group"
                            title="Open Team Status tab"
                        >
                            <h2 className="text-base font-bold text-primary group-hover:underline">Team Status</h2>
                            <svg className="h-3 w-3 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </button>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">
                            Last Sync: {isLoading ? '—' : formatSyncTime(lastSync)}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={isRefreshing || isLoading}
                        title={isRefreshing ? 'Refreshing…' : 'Refresh'}
                        aria-label="Refresh team status"
                        className="inline-flex items-center justify-center w-7 h-7 shrink-0 text-gray-600 bg-gray-50 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed border border-gray-200 rounded-lg transition-colors"
                    >
                        <RefreshIcon spinning={isRefreshing} />
                    </button>
                </div>

                <div className="overflow-y-auto flex-1">
                    {isLoading ? (
                        <div>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <RowSkeleton key={i} />
                            ))}
                        </div>
                    ) : members.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center px-6 py-10">
                            <p className="text-sm font-medium text-gray-500">No team status available.</p>
                            <p className="text-xs text-gray-400 mt-1">Check back later or try refreshing.</p>
                        </div>
                    ) : (
                        <div>
                            {members.map((member, i) => (
                                <StatusRow key={`${member.name}-${i}`} member={member} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

TeamStatus.propTypes = {
    open: PropTypes.bool,
}