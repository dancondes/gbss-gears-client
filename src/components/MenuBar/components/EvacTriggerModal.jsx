import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from '@/components/modals/Modal'

const EvacTriggerModal = ({ isOpen, onClose, sites, onSend }) => {
    const [selectedSites, setSelectedSites] = useState([])
    const [isSending, setIsSending] = useState(false)

    const toggleSite = (siteId) => {
        setSelectedSites((prev) =>
            prev.includes(siteId) ? prev.filter((id) => id !== siteId) : [...prev, siteId]
        )
    }

    const handleClose = () => {
        if (isSending) return
        setSelectedSites([])
        onClose()
    }

    const handleSend = async () => {
        if (selectedSites.length === 0 || isSending) return
        setIsSending(true)
        try {
            await onSend(selectedSites)
            setSelectedSites([])
            onClose()
        } finally {
            setIsSending(false)
        }
    }

    const selectedCount = selectedSites.length

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Evacuation Trigger" size="lg">
            <div className="flex flex-col gap-5">
                {/* Intro */}
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4.5 w-4.5 text-red-600"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                            />
                        </svg>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed pt-1.5">
                        Select the site or sites that need to evacuate. A notice will be sent
                        immediately to everyone checked in at that location.
                    </p>
                </div>

                {/* Site selection */}
                <div className="flex flex-col gap-2" role="group" aria-label="Sites to evacuate">
                    {sites.map((site) => {
                        const checked = selectedSites.includes(site.id)
                        return (
                            <button
                                key={site.id}
                                type="button"
                                onClick={() => toggleSite(site.id)}
                                aria-pressed={checked}
                                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all cursor-pointer ${checked
                                        ? 'border-red-600 bg-red-50/60 ring-1 ring-red-600'
                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <span
                                    className={`text-sm font-medium ${checked ? 'text-red-700' : 'text-gray-700'
                                        }`}
                                >
                                    {site.label}
                                </span>
                                <span
                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${checked
                                            ? 'border-red-600 bg-red-600'
                                            : 'border-gray-300 bg-white'
                                        }`}
                                >
                                    {checked && (
                                        <svg
                                            viewBox="0 0 12 12"
                                            className="h-3 w-3 fill-white"
                                            aria-hidden="true"
                                        >
                                            <path d="M4.5 8.3 2.2 6l-.9.9L4.5 10l6.2-6.2-.9-.9z" />
                                        </svg>
                                    )}
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3 pt-1">
                    <span className="text-xs text-gray-500">
                        {selectedCount === 0
                            ? 'No sites selected'
                            : `${selectedCount} site${selectedCount > 1 ? 's' : ''} selected`}
                    </span>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isSending}
                            className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSend}
                            disabled={selectedCount === 0 || isSending}
                            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-600 cursor-pointer"
                        >
                            {isSending ? (
                                <svg
                                    className="h-4 w-4 animate-spin"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4Z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                >
                                    <path d="M12 2a1 1 0 011 1v1.06A6.002 6.002 0 0118 10v6h1a1 1 0 010 2H5a1 1 0 010-2h1v-6a6.002 6.002 0 015-5.94V3a1 1 0 011-1z" />
                                    <rect x="9" y="19" width="6" height="2" rx="1" />
                                </svg>
                            )}
                            {isSending ? 'Sending…' : 'Send notice'}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

EvacTriggerModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    sites: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    onSend: PropTypes.func.isRequired,
}

export default EvacTriggerModal