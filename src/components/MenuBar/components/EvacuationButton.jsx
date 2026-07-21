import React, { useState } from 'react'
import PropTypes from 'prop-types'
import EvacTriggerModal from './EvacTriggerModal'

const DEFAULT_SITES = [
    { id: '20f-three-neo', label: '20F Three NEO' },
    { id: '7f-philplans', label: '7F Floor PhilPlans Corporate Center' },
]

const EvacuationButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSend = async (selectedSiteIds) => {
        console.log('Evacuation triggered for sites:', selectedSiteIds)
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={`inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-sm font-medium text-red-700 transition-colors hover:border-red-300 hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 cursor-pointer`}
            >
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
                Trigger evacuation
            </button>

            <EvacTriggerModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                sites={DEFAULT_SITES}
                onSend={handleSend}
            />
        </>
    )
}

EvacuationButton.propTypes = {
    sites: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
        })
    ),
    onSend: PropTypes.func,
    className: PropTypes.string,
}

export default EvacuationButton