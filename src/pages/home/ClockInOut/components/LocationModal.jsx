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

function SpinnerIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
            </path>
        </svg>
    )
}

function AlertIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5" />
            <path d="M12 16h.01" />
        </svg>
    )
}

const ICONS = {
    home: HomeIcon,
    pin: PinIcon
}

// Free, keyless reverse-geocoding lookup. BigDataCloud's client endpoint
// has no API key and no meaningful rate limit for this kind of usage.
async function reverseGeocode(latitude, longitude) {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Reverse geocode request failed')
    const data = await res.json()

    return {
        city: data.city || data.locality || null,
        region: data.principalSubdivision || null,
        country: data.countryName || null
    }
}

function formatLocation({ city, region, country }) {
    return [city, region, country].filter(Boolean).join(', ') || 'Unknown location'
}

function LocationModal({
    isOpen,
    onClose,
    onSave
}) {
    const [selected, setSelected] = useState(null)
    const [homeLocation, setHomeLocation] = useState(null) // { city, region, country }
    const [homeCoords, setHomeCoords] = useState(null)
    const [locating, setLocating] = useState(false)
    const [locationError, setLocationError] = useState(null)

    const handleSelect = (locId) => {
        setSelected(locId)

        if (locId !== 'HOME') return

        // Already have it, no need to re-fetch
        if (homeLocation) return

        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported on this device.')
            return
        }

        setLocating(true)
        setLocationError(null)

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords
                setHomeCoords({ latitude, longitude })
                try {
                    const location = await reverseGeocode(latitude, longitude)
                    setHomeLocation(location)
                } catch {
                    setLocationError('Could not determine your city.')
                } finally {
                    setLocating(false)
                }
            },
            (error) => {
                setLocating(false)
                setLocationError(
                    error.code === error.PERMISSION_DENIED
                        ? 'Location permission denied.'
                        : 'Unable to retrieve your location.'
                )
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        )
    }

    const handleProceed = () => {
        if (!selected) return
        // onSave(selected)
        onSave(selected, selected === 'HOME' ? homeLocation : null)
        resetState()
    }

    const handleCancel = () => {
        resetState()
        onClose()
    }

    const resetState = () => {
        setSelected(null)
        setHomeLocation(null)
        setHomeCoords(null)
        setLocating(false)
        setLocationError(null)
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

                <div className="mb-3 grid grid-cols-3 gap-3">
                    {LOCATIONS.map((loc) => {
                        const Icon = ICONS[loc.icon]
                        const isActive = selected === loc.id
                        return (
                            <button
                                key={loc.id}
                                type="button"
                                onClick={() => handleSelect(loc.id)}
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

                {selected === 'HOME' && (
                    <div className="mb-5 flex min-h-6 items-center justify-center text-xs">
                        {locating && (
                            <span className="flex items-center gap-1.5 text-gray-500">
                                <SpinnerIcon className="h-3.5 w-3.5" />
                                Detecting your location…
                            </span>
                        )}
                        {!locating && homeLocation && (
                            <span className="flex items-center gap-1.5 font-medium text-primary">
                                <PinIcon className="h-3.5 w-3.5 shrink-0" />
                                <span>Detected Location: {formatLocation(homeLocation)}</span>
                            </span>
                        )}
                        {!locating && locationError && (
                            <span className="flex items-center gap-1.5 text-red-500">
                                <AlertIcon className="h-3.5 w-3.5 shrink-0" />
                                {locationError}
                            </span>
                        )}
                    </div>
                )}

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
                        disabled={!selected || locating}
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