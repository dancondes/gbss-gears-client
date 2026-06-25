import React, { useState } from 'react'
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

function ClockInOut() {
    const { showConfirmationModal } = useConfirmationModal()

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
                            disabled={!!checkInTime}
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
                            />
                            <BreakRow
                                label="2nd (15mins)"
                                outTime={break2Out}
                                inTime={break2In}
                                onOut={() => handleButtonClick(setBreak2Out)}
                                onIn={() => handleButtonClick(setBreak2In)}
                            />
                            <BreakRow
                                label="Combined (30mins)"
                                outTime={combinedOut}
                                inTime={combinedIn}
                                onOut={() => handleButtonClick(setCombinedOut)}
                                onIn={() => handleButtonClick(setCombinedIn)}
                            />
                        </div>

                        {/* Right column: Lunch */}
                        <div className="px-6 py-4">
                            <LunchColumn
                                outTime={lunchOut}
                                inTime={lunchIn}
                                onOut={() => handleButtonClick(setLunchOut)}
                                onIn={() => handleButtonClick(setLunchIn)}

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
                            disabled={!!checkOutTime}
                        />
                        <TimeDisplay time={formatTime(checkOutTime)} large />
                    </div>

                    {/* Combined checkout buttons */}
                    <div>
                        <p className="text-xs text-gray-400 mb-2">Quick checkout with break already taken:</p>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                            <CombinedCheckoutButton
                                label={'15mins Break\n+ Check Out'}
                                onClick={function () {
                                    setBreak1Out(stamp())
                                    setTimeout(function () {
                                        setBreak1In(stamp())
                                        setCheckOutTime(stamp())
                                    }, 100)
                                }}
                                disabled={!!checkOutTime}
                            />
                            <CombinedCheckoutButton
                                label={'30mins Break\n+ Check Out'}
                                onClick={function () {
                                    setCombinedOut(stamp())
                                    setTimeout(function () {
                                        setCombinedIn(stamp())
                                        setCheckOutTime(stamp())
                                    }, 100)
                                }}
                                disabled={!!checkOutTime}
                            />
                            <CombinedCheckoutButton
                                label={'1hr Break\n+ Check Out'}
                                onClick={function () { setCheckOutTime(stamp()) }}
                                disabled={!!checkOutTime}
                            />
                            <CombinedCheckoutButton
                                label={'1hr 15 Break\n+ Check Out'}
                                onClick={function () { setCheckOutTime(stamp()) }}
                                disabled={!!checkOutTime}
                            />
                            <CombinedCheckoutButton
                                label={'1hr 30 Break\n+ Check Out'}
                                onClick={function () { setCheckOutTime(stamp()) }}
                                disabled={!!checkOutTime}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PageTemplate>
    )
}

ClockInOut.displayName = 'ClockInOut'

export default ClockInOut
