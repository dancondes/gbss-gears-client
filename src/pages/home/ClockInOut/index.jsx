import React, { useCallback, useEffect, useRef, useState } from 'react'
import PageTemplate from '@/components/PageTemplate'
import SectionHeader from './components/SectionHeader'
import ClockButton from './components/ClockButton'
import TimeDisplay from './components/TimeDisplay'
import { formatTime } from './helpers'
import BreakRow from './components/BreakRow'
import LunchColumn from './components/LunchColumn'
import CombinedCheckoutButton from './components/CombinedCheckoutButton'
import RunningTime from './components/RunningTime'
import useConfirmationModal from '@/hooks/use-confirmation-modal'
import { LunchOverSound } from '@/assets/audio'
import logger from '@/utilities/logger'
import { useAuthStore } from '@/store'

function ClockInOut() {
    const { showConfirmationModal } = useConfirmationModal()
    const user = useAuthStore((state) => state.user)
    const {
        earlyCheckOut15,
        earlyCheckOut: earlyCheckOut30,
        earlyCheckOut60,
        earlyCheckOut75,
        earlyCheckOut90,
        combinedBreak,
    } = user?.schedule?.[0] || {}

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

    const isFieldDisabled = useCallback((field) => {
        // Any pair where "out" has been logged but "in" hasn't yet —
        // meaning the person is still out on that section
        const hasOpenPair = [
            [break1Out, break1In],
            [break2Out, break2In],
            [combinedOut, combinedIn],
            [lunchOut, lunchIn],
        ].some(([out, inTime]) => Boolean(out) && !inTime)

        // disable all fields if user has already checked out
        if (checkOutTime) {
            return true
        }

        // disable all fields except checkInTime if checkInTime is not set yet
        if (field !== 'checkInTime' && !checkInTime) {
            return true
        }

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
                return combinedOut || !lunchOut // no Break 2 if user has already taken the combined break or hasn't taken lunch yet

            case 'combinedOut':
                return break1Out || break2Out // no combined break if user has already taken Break 1 or Break 2 TODO: check if this is enabled after lunch

            case 'checkOutTime':
                return !checkInTime

            case 'checkOut15':
                return break1Out && break2Out

            case 'checkOut30':
                return break1Out || break2Out || combinedOut

            case 'checkOut60':
                return lunchOut

            case 'checkOut75':
                return (break1Out && break2Out) || lunchOut

            case 'checkOut90':
                return break1Out || break2Out || combinedOut || lunchOut

            default:
                return false
        }
    }, [checkInTime, checkOutTime, break1Out, break1In, break2Out, break2In, combinedOut, combinedIn, lunchOut, lunchIn])

    useEffect(() => {
        if (!lunchOut || lunchIn) return // only run while lunch is "open"

        const LUNCH_LIMIT_MINUTES = 55; // 55 minutes instead of 60 to give a 5-minute warning before the hour is up
        const elapsedMs = Date.now() - new Date(lunchOut).getTime()
        const remainingMs = LUNCH_LIMIT_MINUTES * 60 * 1000 - elapsedMs

        if (remainingMs <= 0) {
            playAlertSound()
            return
        }

        const timerId = setTimeout(() => {
            playAlertSound()
        }, remainingMs)

        return () => clearTimeout(timerId) // cancels if lunchIn is set before time's up, or on unmount
    }, [lunchOut, lunchIn])

    const alertAudioRef = useRef(null)

    function playAlertSound() {
        const audio = new Audio(LunchOverSound)
        alertAudioRef.current = audio
        audio.play().catch((err) => logger.error('Audio playback blocked:', err))

        function stopAlertSound() {
            if (alertAudioRef.current) {
                alertAudioRef.current.pause()
                alertAudioRef.current.currentTime = 0
                alertAudioRef.current = null
            }
        }

        showConfirmationModal({
            title: 'Lunch Break Ending',
            message: 'Your lunch is almost over. Do you want to lunch in now?',
            confirmText: 'Yes',
            cancelText: 'No',
            variant: 'info',
            onConfirm: function () {
                stopAlertSound()
                setLunchIn(new Date())
            },
            onCancel: function () {
                stopAlertSound()
            },
        })
    }

    function stamp() { return new Date() }

    // show confirmation modal on click
    function handleButtonClick(action, type = 'info') {
        showConfirmationModal({
            title: 'Action Confirmation',
            message: 'Are you sure you want to perform the selected action?',
            confirmText: 'Yes',
            cancelText: 'No',
            variant: type || 'info',
            onConfirm: function () {
                action(new Date())
            },
        })
    }

    return (
        <PageTemplate
            title="Clock In/Out"
            rightSide={(
                <RunningTime />
            )}
        >
            <div className="flex flex-col gap-0 overflow-hidden text-sm">

                {/* ── START ─────────────────────────────────────────── */}
                <SectionHeader title="Start" />
                <div className="grid sm:grid-cols-2 gap-3 px-4 py-3 border-b border-gray-200">
                    {/* No flex-1 here — let it size to its content */}
                    <div className="flex items-center gap-4 min-w-0">
                        <ClockButton
                            label="Check In"
                            onClick={() => handleButtonClick(setCheckInTime)}
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
                        <div className="flex flex-col gap-5 px-4 py-4 border-r border-gray-200">
                            <BreakRow
                                label="1st (15mins)"
                                outTime={break1Out}
                                inTime={break1In}
                                onOut={() => handleButtonClick(setBreak1Out)}
                                onIn={() => handleButtonClick(setBreak1In)}
                                disabled={isFieldDisabled('break1Out')}
                            />
                            <BreakRow
                                label="2nd (15mins)"
                                outTime={break2Out}
                                inTime={break2In}
                                onOut={() => handleButtonClick(setBreak2Out)}
                                onIn={() => handleButtonClick(setBreak2In)}
                                disabled={isFieldDisabled('break2Out')}
                            />
                            {combinedBreak && (
                                <BreakRow
                                    label="Combined (30mins)"
                                    outTime={combinedOut}
                                    inTime={combinedIn}
                                    onOut={() => handleButtonClick(setCombinedOut)}
                                    onIn={() => handleButtonClick(setCombinedIn)}
                                    disabled={isFieldDisabled('combinedOut')}
                                />
                            )}
                        </div>

                        {/* Right column: Lunch */}
                        <div className="px-6 py-4">
                            <LunchColumn
                                outTime={lunchOut}
                                inTime={lunchIn}
                                onOut={() => handleButtonClick(setLunchOut)}
                                onIn={() => handleButtonClick(setLunchIn)}
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
                            onClick={() => handleButtonClick(setCheckOutTime)}
                            disabled={isFieldDisabled('checkOutTime')}
                        />
                        <TimeDisplay time={formatTime(checkOutTime)} large />
                    </div>

                    {/* Combined checkout buttons */}
                    {
                        (earlyCheckOut15 || earlyCheckOut30 || earlyCheckOut60 || earlyCheckOut75 || earlyCheckOut90 || combinedBreak) && (
                            <div>
                                <p className="text-xs text-gray-400 mb-2">Quick checkout with break already taken:</p>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">

                                    {earlyCheckOut15 && (
                                        <CombinedCheckoutButton
                                            label={'15mins Break\n+ Check Out'}
                                            onClick={function () {
                                                setBreak1Out(stamp())
                                                setTimeout(function () {
                                                    setBreak1In(stamp())
                                                    setCheckOutTime(stamp())
                                                }, 100)
                                            }}
                                            disabled={isFieldDisabled('checkOut15')}
                                        />
                                    )}

                                    {earlyCheckOut30 && (
                                        <CombinedCheckoutButton
                                            label={'30mins Break\n+ Check Out'}
                                            onClick={function () {
                                                setCombinedOut(stamp())
                                                setTimeout(function () {
                                                    setCombinedIn(stamp())
                                                    setCheckOutTime(stamp())
                                                }, 100)
                                            }}
                                            disabled={isFieldDisabled('checkOut30')}
                                        />
                                    )}

                                    {earlyCheckOut60 && (
                                        <CombinedCheckoutButton
                                            label={'1hr Break\n+ Check Out'}
                                            onClick={function () { setCheckOutTime(stamp()) }}
                                            disabled={isFieldDisabled('checkOut60')}
                                        />
                                    )}

                                    {earlyCheckOut75 && (
                                        <CombinedCheckoutButton
                                            label={'1hr 15 Break\n+ Check Out'}
                                            onClick={function () { setCheckOutTime(stamp()) }}
                                            disabled={isFieldDisabled('checkOut75')}
                                        />
                                    )}

                                    {earlyCheckOut90 && (
                                        <CombinedCheckoutButton
                                            label={'1hr 30 Break\n+ Check Out'}
                                            onClick={function () { setCheckOutTime(stamp()) }}
                                            disabled={isFieldDisabled('checkOut90')}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </PageTemplate>
    )
}

ClockInOut.displayName = 'ClockInOut'

export default ClockInOut
