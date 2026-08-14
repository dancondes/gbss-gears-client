import React, { useCallback, useEffect, useRef, useState } from 'react'
import PageTemplate from '@/components/PageTemplate'
import SectionHeader from './components/SectionHeader'
import ClockButton from './components/ClockButton'
import TimeDisplay from './components/TimeDisplay'
import { formatTime, parseCustomDateTime } from './helpers'
import BreakRow from './components/BreakRow'
import LunchColumn from './components/LunchColumn'
import CombinedCheckoutButton from './components/CombinedCheckoutButton'
import RunningTime from './components/RunningTime'
import useConfirmationModal from '@/hooks/use-confirmation-modal'
import { LunchOverSound } from '@/assets/audio'
import logger from '@/utilities/logger'
import { useAuthStore, useUIStore } from '@/store'
import LocationModal from './components/LocationModal'
import { createTimeEntry, getTimeEntriesById } from '@/services/event-service'
import { toast } from 'sonner'
import { isResultSuccessful } from '@/utilities'
import { getCurrentDate } from '@/utilities/date-utilities'
import OvertimeConfirmation from './components/OvertimeConfirmation'
import useTabNavigation from '@/hooks/use-tab-navigation'
import TeamStatus from './components/TeamStatus'
import PropTypes from 'prop-types'

function PanelIcon({ open }) {
    return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="16" rx="2" strokeLinejoin="round" />
            <line x1="15" y1="4" x2="15" y2="20" />
            {open && <rect x="16" y="6" width="4" height="12" rx="0.5" fill="currentColor" stroke="none" />}
        </svg>
    )
}

PanelIcon.propTypes = {
    open: PropTypes.bool,
}

function ClockInOut() {
    const { showConfirmationModal } = useConfirmationModal()
    const user = useAuthStore((state) => state.user)
    const setUser = useAuthStore((state) => state.setUser)
    const canViewTeamStatus = useAuthStore((state) => state.canViewTeams() || state.canViewIT())
    const showTeamStatus = useUIStore((state) => state.showTeamStatus)
    const setShowTeamStatus = useUIStore((state) => state.setShowTeamStatus)
    const enableAlertForLunchBreak = useUIStore((state) => state.enableAlertForLunchBreak)
    const { navigate } = useTabNavigation()
    const {
        earlyCheckOut15,
        earlyCheckOut: earlyCheckOut30,
        earlyCheckOut60,
        earlyCheckOut75,
        earlyCheckOut90,
        combinedBreak,
    } = user?.schedule?.[0] || {}

    const [locationModalOpen, setLocationModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(null)
    const [showOvertimeConfirmation, setShowOvertimeConfirmation] = useState(false)
    const [isFetchingEntries, setIsFetchingEntries] = useState(false)
    const isAlertActiveRef = useRef(false)

    // Start
    const [checkInTime, setCheckInTime] = useState(null)

    // Breaks
    const [break1Out, setBreak1Out] = useState(null)
    const [break1In, setBreak1In] = useState(null)
    const [break2Out, setBreak2Out] = useState(null)
    const [break2In, setBreak2In] = useState(null)
    const [combinedOut, setCombinedOut] = useState(null)
    const [combinedIn, setCombinedIn] = useState(null)

    // Lunch
    const [lunchOut, setLunchOut] = useState(null)
    const [lunchIn, setLunchIn] = useState(null)

    // End
    const [checkOutTime, setCheckOutTime] = useState(null)

    // Returns true if it's currently earlier than 12:00 PM Manila time (UTC+8)
    const isBeforeNoonManila = () => {
        const manilaHour = Number(
            new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Manila',
                hour: 'numeric',
                hour12: false,
            }).format(new Date())
        )
        return manilaHour < 12
    }

    const isFieldDisabled = useCallback((field) => {
        // disable all fields if user has already checked out
        if (checkOutTime) {
            return true
        }

        // disable all fields except checkInTime if checkInTime is not set yet
        if (field !== 'checkInTime' && !checkInTime) {
            return true
        }

        // Any pair where "out" has been logged but "in" hasn't yet —
        // meaning the person is still out on that section
        const hasOpenPair = [
            [break1Out, break1In],
            [break2Out, break2In],
            [combinedOut, combinedIn],
            [lunchOut, lunchIn],
        ].some(([out, inTime]) => Boolean(out) && !inTime)

        // disable fields if there's an open pair (out without in) — except for the "in" field of that pair
        if (hasOpenPair) {
            return true
        }

        switch (field) {
            case 'checkInTime':
                return !!checkInTime

            case 'break1Out':
                return combinedOut || lunchOut // no Break 1 if user already took the combined break or lunch

            case 'lunchOut':
                return false // no more validations for Lunch — user can take lunch anytime after check-in

            case 'break2Out':
                return combinedOut || !lunchOut || isBeforeNoonManila() // no Break 2 if user has already taken the combined break, hasn't taken lunch yet, or it's earlier than 12:00 PM Manila time

            case 'combinedOut':
                return !combinedBreak || break1Out || break2Out // no combined break if user has already taken Break 1 or Break 2 TODO: check if this is enabled after lunch

            case 'checkOutTime':
                return !checkInTime

            case 'checkOut15':
                return !earlyCheckOut15 || break1Out && break2Out

            case 'checkOut30':
                return !earlyCheckOut30 || break1Out || break2Out || combinedOut

            case 'checkOut60':
                return !earlyCheckOut60 || lunchOut

            case 'checkOut75':
                return !earlyCheckOut75 || (break1Out && break2Out) || lunchOut

            case 'checkOut90':
                return !earlyCheckOut90 || break1Out || break2Out || combinedOut || lunchOut

            default:
                return false
        }
    }, [checkInTime, checkOutTime, break1Out, break1In, break2Out, break2In, combinedOut, combinedIn, lunchOut, lunchIn,
        combinedBreak, earlyCheckOut15, earlyCheckOut30, earlyCheckOut60, earlyCheckOut75, earlyCheckOut90
    ])

    useEffect(() => {
        refreshTimeEntries()
    }, [])

    useEffect(() => {
        // Dont run if user is not 1710 or if lunchOut is not set or if lunchIn is already set
        if (!enableAlertForLunchBreak || !lunchOut || lunchIn) return

        const LUNCH_LIMIT_MINUTES = 55; // 55 minutes instead of 60 to give a 5-minute warning before the hour is up
        const lunchOutDate = parseCustomDateTime(lunchOut)
        const elapsedMs = lunchOutDate ? Date.now() - lunchOutDate.getTime() : null
        const remainingMs = LUNCH_LIMIT_MINUTES * 60 * 1000 - elapsedMs

        if (remainingMs <= 0) {
            playAlertSound()
            return
        }

        const timerId = setTimeout(() => {
            playAlertSound()
        }, remainingMs)

        return () => clearTimeout(timerId) // cancels if lunchIn is set before time's up, or on unmount
    }, [lunchOut, lunchIn, user])

    const alertAudioRef = useRef(null)

    function playAlertSound() {
        if (isAlertActiveRef.current) return // already alerting, ignore duplicate call
        isAlertActiveRef.current = true

        setTimeout(() => {
            const audio = new Audio(LunchOverSound)
            alertAudioRef.current = audio
            audio.play().catch((err) => logger.error('Audio playback blocked:', err))
        }, 300)

        function stopAlertSound() {
            if (alertAudioRef.current) {
                alertAudioRef.current.pause()
                alertAudioRef.current.currentTime = 0
                alertAudioRef.current = null
            }
            isAlertActiveRef.current = false
        }

        showConfirmationModal({
            title: 'Lunch Break Ending',
            message: 'Your lunch is almost over. Do you want to lunch in now?',
            confirmText: 'Yes',
            cancelText: 'No',
            variant: 'info',
            onConfirm: function () {
                stopAlertSound()
                setTimeout(() => {
                    handleButtonClick('i') // Lunch In
                }, 300)
            },
            onCancel: function () {
                stopAlertSound()
            },
        })
    }

    // show confirmation modal on click
    function handleButtonClick(type, location = null) {
        showConfirmationModal({
            title: 'Action Confirmation',
            message: 'Are you sure you want to perform the selected action?',
            confirmText: 'Yes',
            cancelText: 'No',
            variant: 'info',
            onConfirm: () => {
                handleSaveTimeEntry(type, location)
            }
        })
    }

    /**
     * Log Types:
     * I - Check In
     * O - Check Out
     * o - Lunch-out
     * i - Lunch-in
     * 0 - 1st 15mins Break-out
     * 1 - 1st 15mins Break-in
     * 2 - 2nd 15mins Break-out
     * 3 - 2nd 15mins Break-in
     * 4 - Combined 30mins Break-out
     * 5 - Combined 30mins Break-in
     * g - 1st or 2nd 15mins Break + Check Out
     * F - Combinded 30mins + Check Out
     * Z - 1hr Lunch Break + Check-out
     * Y - 1st or 2nd 15mins Break + 1hr Lunch Break + Check-out
     * X - Combined 30mins Break + 1hr Lunch Break + Check-out
     * 
     * Note: The log types are case-sensitive.
     * 
     * @param {string} type - The type of time entry to save.
     * @param {object} data - Additional data for the time entry (optional).
     */
    async function handleSaveTimeEntry(type, location = null) {
        try {
            setIsSubmitting(true)
            await createTimeEntry(type, location)
            await refreshTimeEntries()

            if (['O', 'g', 'F', 'Z', 'Y', 'X'].includes(type)) {
                setShowOvertimeConfirmation(true)
            }
        } catch (error) {
            logger.error('Error saving time entry:', error)
            toast.error('Failed to save time entry. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    function handleOkayOvertimeConfirmation() {
        setShowOvertimeConfirmation(false)
        const message = '1. Press "YES" if you have Overtime hours that need to be recorded.\n' +
            '2. Press "NO" if you do not have any Overtime hours to log.\n\n' +
            'Ensure that you select the correct option to proceed with your Overtime entry or confirm that there are no Overtime hours to be reported.'

        showConfirmationModal({
            title: 'Action Confirmation',
            subtitle: 'Please select the appropriate options below:',
            message,
            confirmText: 'Yes',
            cancelText: 'No',
            variant: 'info',
            textAlign: 'left',
            onConfirm: () => {
                navigate('/user/overtime', {
                    id: 'Overtime',
                    label: 'Overtime',
                })
            }
        })
    }

    async function refreshTimeEntries() {
        function getTimeEntryValue(entries, entryType, setter) {
            const entry = entries.find((e) => e.logTypeCode === entryType)
            setter(entry?.workdate && entry?.worktime ? `${entry.workdate}T${entry.worktime}` : null)

            if (entryType === 'I') {
                setUser({
                    ...user,
                    loggedAtLoc: entry?.location || null
                })
            }
        }

        try {
            setIsFetchingEntries(true)
            const currentDate = getCurrentDate()
            const params = {
                dateFrom: currentDate,
                dateTo: currentDate
            }
            const result = await getTimeEntriesById(user?.userId, params)

            if (isResultSuccessful(result)) {
                const entries = result.data || []
                getTimeEntryValue(entries, 'I', setCheckInTime)
                getTimeEntryValue(entries, 'o', setLunchOut)
                getTimeEntryValue(entries, 'i', setLunchIn)
                getTimeEntryValue(entries, '0', setBreak1Out)
                getTimeEntryValue(entries, '1', setBreak1In)
                getTimeEntryValue(entries, '2', setBreak2Out)
                getTimeEntryValue(entries, '3', setBreak2In)
                getTimeEntryValue(entries, '4', setCombinedOut)
                getTimeEntryValue(entries, '5', setCombinedIn)

                getTimeEntryValue(entries, 'O', setCheckOutTime)
            }
        } catch (error) {
            logger.error('Error fetching time entries:', error)
            toast.error('Failed to fetch time entries. Please try again.')
        } finally {
            setIsFetchingEntries(false)
        }
    }

    return (
        <PageTemplate
            title="Clock In/Out"
            subtitle={isFetchingEntries ? 'Fetching updated time entries...' : checkOutTime ? 'You\'re checked out for the day. All fields are now disabled.' : 'Log your work hours and breaks'}
            rightSide={(
                <div className="flex items-center gap-2">
                    {canViewTeamStatus && (
                        <button
                            type="button"
                            onClick={() => setShowTeamStatus(!showTeamStatus)}
                            title={showTeamStatus ? 'Hide Team Status panel' : 'Show Team Status panel'}
                            aria-label={showTeamStatus ? 'Hide Team Status panel' : 'Show Team Status panel'}
                            aria-pressed={showTeamStatus}
                            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 h-8 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <PanelIcon open={showTeamStatus} />
                            <span>Team</span>
                        </button>
                    )}
                    <RunningTime />
                </div>
            )}
        >
            <div className='flex gap-4'>
                <fieldset className='flex-1' disabled={isSubmitting || isFetchingEntries}>
                    <div className="flex flex-col gap-0 overflow-hidden text-sm">

                        {/* ── START ─────────────────────────────────────────── */}
                        <SectionHeader title="Start" />
                        <div className="grid sm:grid-cols-2 gap-3 px-4 py-3 border-b border-gray-200">
                            {/* No flex-1 here — let it size to its content */}
                            <div className="flex items-center gap-4 min-w-0">
                                <ClockButton
                                    label="Check In"
                                    onClick={() => setLocationModalOpen(true)}
                                    disabled={isFieldDisabled('checkInTime')}
                                />
                                <TimeDisplay time={formatTime(checkInTime)} large />
                            </div>
                            <button
                                onClick={function () { window.location.reload() }}
                                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded border border-primary/40 bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors focus:outline-none mr-auto sm:ml-auto"
                                title="Refresh [F5]"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh [F5]
                            </button>
                        </div>

                        {/* ── BREAKS ────────────────────────────────────────── */}
                        <SectionHeader title="Breaks" />
                        {/*
                            On small screens all break rows (including Lunch) stack in a
                            single column. On md+ screens the original two-column layout
                            is restored with Lunch in the right column.
                        */}
                        <div className="border-b border-gray-200">

                            {/* md+: two-column grid */}
                            <div className="grid md:grid-cols-2 gap-0">

                                {/* Left column: 1st, 2nd, Combined */}
                                <div className="flex flex-col gap-5 px-4 py-4 md:border-r border-gray-200">
                                    <BreakRow
                                        label="1st (15mins)"
                                        outTime={break1Out}
                                        inTime={break1In}
                                        onOut={() => handleButtonClick('0')}
                                        onIn={() => handleButtonClick('1')}
                                        disabled={isFieldDisabled('break1Out')}
                                    />
                                    <BreakRow
                                        label="2nd (15mins)"
                                        outTime={break2Out}
                                        inTime={break2In}
                                        onOut={() => handleButtonClick('2')}
                                        onIn={() => handleButtonClick('3')}
                                        disabled={isFieldDisabled('break2Out')}
                                    />
                                    <BreakRow
                                        label="Combined (30mins)"
                                        outTime={combinedOut}
                                        inTime={combinedIn}
                                        onOut={() => handleButtonClick('4')}
                                        onIn={() => handleButtonClick('5')}
                                        disabled={isFieldDisabled('combinedOut')}
                                    />
                                </div>

                                {/* Right column: Lunch */}
                                <div className="px-6 py-4">
                                    <LunchColumn
                                        outTime={lunchOut}
                                        inTime={lunchIn}
                                        onOut={() => handleButtonClick('o')}
                                        onIn={() => handleButtonClick('i')}
                                        disabled={isFieldDisabled('lunchOut')}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ── END ───────────────────────────────────────────── */}
                        <SectionHeader title="End" />
                        <div className="flex flex-row flex-wrap justify-between gap-3 px-4 py-3">

                            {/* Check Out row */}
                            <div className="flex items-center gap-4 flex-wrap">
                                <ClockButton
                                    label="Check Out"
                                    onClick={() => handleButtonClick('O')}
                                    disabled={isFieldDisabled('checkOutTime')}
                                />
                                <TimeDisplay time={formatTime(checkOutTime)} large />
                            </div>

                            {/* Combined checkout buttons */}
                            <div>
                                <p className="text-xs text-gray-400 mb-2">Quick checkout with break already taken:</p>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">

                                    <CombinedCheckoutButton
                                        label={'15mins Break\n+ Check Out'}
                                        onClick={function () { handleButtonClick('g') }}
                                        disabled={isFieldDisabled('checkOut15')}
                                    />

                                    <CombinedCheckoutButton
                                        label={'30mins Break\n+ Check Out'}
                                        onClick={function () { handleButtonClick('F') }}
                                        disabled={isFieldDisabled('checkOut30')}
                                    />

                                    <CombinedCheckoutButton
                                        label={'1hr Break\n+ Check Out'}
                                        onClick={function () { handleButtonClick('Z') }}
                                        disabled={isFieldDisabled('checkOut60')}
                                    />

                                    <CombinedCheckoutButton
                                        label={'1hr 15 Break\n+ Check Out'}
                                        onClick={function () { handleButtonClick('Y') }}
                                        disabled={isFieldDisabled('checkOut75')}
                                    />

                                    <CombinedCheckoutButton
                                        label={'1hr 30 Break\n+ Check Out'}
                                        onClick={function () { handleButtonClick('X') }}
                                        disabled={isFieldDisabled('checkOut90')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>

                {
                    canViewTeamStatus && (
                        <TeamStatus open={showTeamStatus} />
                    )
                }
            </div>

            {locationModalOpen && (
                <LocationModal
                    isOpen={locationModalOpen}
                    onClose={() => setLocationModalOpen(false)}
                    onSave={(selectedLocation) => {
                        handleButtonClick('I', selectedLocation)
                        setLocationModalOpen(false)
                    }}
                />
            )}

            {showOvertimeConfirmation && (
                <OvertimeConfirmation
                    isOpen={showOvertimeConfirmation}
                    onClose={() => setShowOvertimeConfirmation(false)}
                    onOkay={handleOkayOvertimeConfirmation}
                />
            )}
        </PageTemplate>
    )
}

ClockInOut.displayName = 'ClockInOut'

export default ClockInOut
