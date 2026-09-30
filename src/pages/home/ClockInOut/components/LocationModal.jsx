import React, { useEffect, useState } from 'react'
import Modal from '@/components/modals/Modal'
import PropTypes from 'prop-types'
import TypeaheadInput from '@/components/form/TypeaheadInput'
import { useForm, Controller } from 'react-hook-form'
import FileDropzone from '@/components/form/FileDropzone'
import { useFetchOptions } from '@/hooks/use-fetch-options'
import { getApprovers } from '@/services/lookups-service'

const LOCATIONS = [
    { id: 'HOME', label: 'Home', icon: 'home' },
    { id: 'Three NEO', label: 'Three NEO', icon: 'pin' },
    { id: 'PhilPlans', label: 'PhilPlans', icon: 'pin' }
]

const DEFAULT_VALUES = {
    location: '',
    address: null, // { city, region, country } — only used when location is HOME
    approvedBy: null, // overtime only
    files: [] // overtime only
}

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

function FieldLabel({ children }) {
    return <p className="mb-2 text-sm font-medium text-gray-700">{children}</p>
}

FieldLabel.propTypes = {
    children: PropTypes.node.isRequired
}

function FieldError({ message }) {
    if (!message) return null
    return (
        <p role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-red-500">
            <AlertIcon className="h-3.5 w-3.5 shrink-0" />
            {message}
        </p>
    )
}

FieldError.propTypes = {
    message: PropTypes.string
}

function ApprovedByField({ control, error }) {
    const { options } = useFetchOptions(getApprovers, {}, 'name')

    return (
        <TypeaheadInput
            name="approvedBy"
            label="Approved By"
            control={control}
            options={options}
            error={error}
            validation={{
                required: 'Approved By is required'
            }}
        />
    )
}

ApprovedByField.propTypes = {
    control: PropTypes.object.isRequired,
    error: PropTypes.string
}

function LocationModal({
    isOpen,
    onClose,
    onSave,
    forOvertime = false
}) {
    // UI-only state for the geolocation lookup. The result itself lives in the form.
    const [locating, setLocating] = useState(false)
    const [locationError, setLocationError] = useState(null)

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        getValues,
        clearErrors,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: DEFAULT_VALUES
    })

    const selectedLocation = watch('location')
    const address = watch('address')
    const isHome = selectedLocation === 'HOME'
    const homeError = locationError || errors.address?.message

    // Start fresh every time the modal closes
    useEffect(() => {
        if (!isOpen) {
            reset(DEFAULT_VALUES)
            setLocating(false)
            setLocationError(null)
        }
    }, [isOpen, reset])

    const detectHomeAddress = () => {
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported on this device.')
            return
        }

        setLocating(true)
        setLocationError(null)
        clearErrors('address')

        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                try {
                    const result = await reverseGeocode(coords.latitude, coords.longitude)
                    setValue('address', result, { shouldValidate: true })
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

    const handleSelect = (field, locId) => {
        field.onChange(locId)

        if (locId !== 'HOME') {
            clearErrors('address')
            return
        }

        // Already have it, no need to re-fetch
        if (!getValues('address')) detectHomeAddress()
    }

    const onSubmit = async (data) => {
        const homeAddress = data.location === 'HOME' ? data.address : null

        if (forOvertime) {
            await onSave({
                location: data.location,
                address: homeAddress,
                approvedBy: data.approvedBy,
                files: data.files
            })
        } else {
            await onSave(data.location, homeAddress)
        }
    }

    const proceedDisabled = isSubmitting || (isHome && locating)

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={forOvertime ? 'Overtime Location' : 'Check-in Confirmation'}
            size={forOvertime ? '3xl' : 'xl'}
        >
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-6 pb-6 pt-2">
                <p className="mb-6 text-sm text-tertiary">
                    {forOvertime
                        ? 'Confirm where you’re working from and add your overtime approval. All fields are required.'
                        : 'Confirm where you’re checking in from to continue.'}
                </p>

                <div className="flex flex-col gap-6">
                    {/* Location */}
                    <section>
                        <FieldLabel>Location</FieldLabel>

                        <Controller
                            name="location"
                            control={control}
                            rules={{ required: 'Select a location to continue' }}
                            render={({ field }) => (
                                <div role="radiogroup" aria-label="Location" className="grid grid-cols-3 gap-3">
                                    {LOCATIONS.map((loc) => {
                                        const Icon = ICONS[loc.icon]
                                        const isActive = field.value === loc.id
                                        return (
                                            <button
                                                key={loc.id}
                                                type="button"
                                                role="radio"
                                                aria-checked={isActive}
                                                onClick={() => handleSelect(field, loc.id)}
                                                className={`relative flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                                                    isActive
                                                        ? 'border-primary bg-primary/5 shadow-sm'
                                                        : errors.location
                                                            ? 'border-red-300 bg-white hover:bg-gray-50'
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
                            )}
                        />
                        <FieldError message={errors.location?.message} />

                        {/* Registers the reverse-geocoded address and requires it when HOME is selected */}
                        <Controller
                            name="address"
                            control={control}
                            rules={{
                                validate: (value) =>
                                    getValues('location') !== 'HOME' ||
                                    !!value ||
                                    'We couldn’t detect your address. Try again to continue.'
                            }}
                            render={() => null}
                        />

                        {isHome && (
                            <div
                                aria-live="polite"
                                className="mt-3 flex min-h-10 items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 text-xs"
                            >
                                {locating ? (
                                    <span className="flex items-center gap-2 text-gray-500">
                                        <SpinnerIcon className="h-3.5 w-3.5" />
                                        Detecting your location…
                                    </span>
                                ) : homeError ? (
                                    <>
                                        <span className="flex flex-1 items-center gap-2 text-red-500">
                                            <AlertIcon className="h-3.5 w-3.5 shrink-0" />
                                            {homeError}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={detectHomeAddress}
                                            className="shrink-0 rounded-lg px-2 py-1 font-semibold text-primary transition-colors hover:bg-primary/10 cursor-pointer"
                                        >
                                            Try again
                                        </button>
                                    </>
                                ) : address ? (
                                    <span className="flex items-center gap-2 font-medium text-primary">
                                        <PinIcon className="h-3.5 w-3.5 shrink-0" />
                                        <span>Detected: {formatLocation(address)}</span>
                                    </span>
                                ) : null}
                            </div>
                        )}
                    </section>

                    {/* Overtime details */}
                    {forOvertime && (
                        <>
                            <ApprovedByField control={control} error={errors.approvedBy?.message} />

                            <Controller
                                name="files"
                                control={control}
                                rules={{
                                    validate: (files) =>
                                        (files && files.length > 0) || 'Attach at least one file'
                                }}
                                render={({ field, fieldState }) => (
                                    <FileDropzone
                                        files={field.value}
                                        onFilesChange={field.onChange}
                                        multiple={true}
                                        maxFiles={10}
                                        maxFileSize={10 * 1024 * 1024}
                                        placeholder="Drag and drop files here, or click to browse"
                                        disabled={isSubmitting}
                                        className="ticketing-form-file-dropzone"
                                        error={fieldState.error?.message}
                                    />
                                )}
                            />
                        </>
                    )}
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex-1 rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={proceedDisabled}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer"
                    >
                        {isSubmitting && <SpinnerIcon className="h-4 w-4" />}
                        Proceed
                    </button>
                </div>
            </form>
        </Modal>
    )
}

LocationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    forOvertime: PropTypes.bool
}

export default LocationModal