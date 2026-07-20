import React, { useState } from 'react'
import Modal from '@/components/modals/Modal'
import PropTypes from 'prop-types'

const LOCATIONS = [
    { id: 'Home', label: 'Home', icon: 'home' },
    { id: 'Three Neo', label: 'Three NEO', icon: 'pin' },
    { id: 'PhilPlans', label: 'PhilPlans', icon: 'pin' }
]

function HomeIcon({ active }) {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M3 10.5L12 3l9 7.5"
                stroke={active ? '#0d416e' : '#64748b'}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.5 9.5V20a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1V9.5"
                stroke={active ? '#0d416e' : '#64748b'}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function PinIcon({ active }) {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"
                stroke={active ? '#0d416e' : '#64748b'}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle
                cx="12"
                cy="9.5"
                r="2.25"
                stroke={active ? '#0d416e' : '#64748b'}
                strokeWidth="1.8"
            />
        </svg>
    )
}

const ICONS = {
    home: HomeIcon,
    pin: PinIcon
}

function LocationModal({
    isOpen,
    onClose,
    onSave
}) {
    const [selected, setSelected] = useState(null)

    const handleProceed = () => {
        if (!selected) return
        onSave(selected)
        setSelected(null)
    }

    const handleCancel = () => {
        setSelected(null)
        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Check-in Confirmation"
            size="xl"
        >
            <div className="px-6 pb-6 pt-2">
                <p className="text-primary text-center text-sm font-medium mb-6">
                    Please confirm your location then &quot;Proceed&quot; to continue
                    login or click &quot;Cancel&quot; otherwise.
                </p>

                <div className="flex items-center justify-around mb-8">
                    {LOCATIONS.map((loc) => {
                        const Icon = ICONS[loc.icon]
                        const isActive = selected === loc.id
                        return (
                            <button
                                key={loc.id}
                                type="button"
                                onClick={() => setSelected(loc.id)}
                                className="flex flex-col items-center gap-2 group focus:outline-none"
                            >
                                <span
                                    className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-colors ${
                                        isActive
                                            ? 'border-primary bg-primary/10'
                                            : 'border-slate-200 bg-white group-hover:border-slate-300'
                                    }`}
                                >
                                    <Icon active={isActive} />
                                </span>
                                <span
                                    className={`text-sm font-medium ${
                                        isActive ? 'text-primary' : 'text-slate-600'
                                    }`}
                                >
                                    {loc.label}
                                </span>
                            </button>
                        )
                    })}
                </div>

                <div className="flex items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={handleProceed}
                        disabled={!selected}
                        className={`px-6 py-2 rounded-md text-sm font-semibold border transition-colors ${
                            selected
                                ? 'bg-primary border-primary text-white hover:bg-primary'
                                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                    >
                        Proceed
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-2 rounded-md text-sm font-semibold border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    )
}

LocationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
}

export default LocationModal