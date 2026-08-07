import React, { useState } from 'react'
import Modal from '@/components/modals/Modal'
import PropTypes from 'prop-types'

const LOCATIONS = [
    { id: 'HOME', label: 'Home', icon: 'home' },
    { id: 'Three NEO', label: 'Three NEO', icon: 'pin' },
    { id: 'PhilPlans', label: 'PhilPlans', icon: 'pin' }
]

// Custom inline icons — no icon package, color comes from currentColor so it
// follows whatever text-* class is applied by the parent (active vs inactive).
function HomeIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M3 10.5L12 3l9 7.5" />
            <path d="M5.5 9.5V20a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1V9.5" />
        </svg>
    )
}

function PinIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.25" />
        </svg>
    )
}

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M20 6 9 17l-5-5" />
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
                <p className="mb-7 text-center text-sm text-tertiary">
                    Confirm your location, then tap{' '}
                    <span className="font-medium text-primary">Proceed</span> to continue —
                    or <span className="font-medium text-primary">Cancel</span> to go back.
                </p>

                <div className="mb-8 grid grid-cols-3 gap-3">
                    {LOCATIONS.map((loc) => {
                        const Icon = ICONS[loc.icon]
                        const isActive = selected === loc.id
                        return (
                            <button
                                key={loc.id}
                                type="button"
                                onClick={() => setSelected(loc.id)}
                                aria-pressed={isActive}
                                className={`relative flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 transition-colors cursor-pointer ${
                                    isActive
                                        ? 'border-primary bg-primary/5 shadow-sm'
                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                {isActive && (
                                    <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white">
                                        <CheckIcon className="h-2.5 w-2.5" />
                                    </span>
                                )}
                                <Icon className={`h-6 w-6 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                                <span className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-gray-600'}`}>
                                    {loc.label}
                                </span>
                            </button>
                        )
                    })}
                </div>

                <div className="flex items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleProceed}
                        disabled={!selected}
                        className="flex-1 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer"
                    >
                        Proceed
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