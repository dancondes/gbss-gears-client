import React, { useState, useEffect } from 'react'
import PageTemplate from '@/components/PageTemplate'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTime(date) {
    if (!date) return '__:__:__ AM/PM'
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function formatTimeShort(date) {
    if (!date) return '__:__ AM/PM'
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function calcDuration(outTime, inTime) {
    if (!outTime || !inTime) return '0.00'
    const diffMs = inTime - outTime
    if (diffMs <= 0) return '0.00'
    return (diffMs / 1000 / 60).toFixed(2)
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionHeader({ title }) {
    return (
        <div className="flex items-center gap-0">
            <span className="text-sm font-semibold text-primary px-3 py-1">{title}</span>
            <div className="flex-1 h-px bg-primary" />
        </div>
    )
}

function ClockButton({ label, onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="min-w-[120px] px-6 py-2 rounded border border-primary/40 bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
            {label}
        </button>
    )
}

function TimeDisplay({ time, large }) {
    if (large) {
        return (
            <span className="text-xl font-bold text-gray-800 tabular-nums">
                {time || '__:__:__ AM/PM'}
            </span>
        )
    }
    return (
        <span className="text-sm text-gray-500 tabular-nums">
            {time || '__:__ AM/PM'}
        </span>
    )
}

function BreakRow({ label, outTime, inTime, onOut, onIn }) {
    const duration = calcDuration(outTime, inTime)
    const durationLabel = `[ ${duration} min(s) ]`

    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-xs text-gray-400 font-medium">
                {label} <span className="text-gray-400">{durationLabel}</span>
            </span>
            <div className="flex items-center gap-3">
                <ClockButton label="Out" onClick={onOut} disabled={!!outTime} />
                <ClockButton label="In" onClick={onIn} disabled={!outTime || !!inTime} />
                <div className="flex flex-col gap-0.5 ml-1">
                    <TimeDisplay time={formatTimeShort(outTime)} />
                    <TimeDisplay time={formatTimeShort(inTime)} />
                </div>
            </div>
        </div>
    )
}

function LunchColumn({ outTime, inTime, onOut, onIn }) {
    const duration = calcDuration(outTime, inTime)

    return (
        <div className="flex flex-col gap-3">
            <span className="text-xs text-gray-400 font-medium">
                LUNCH <span className="text-gray-400">[ {duration} min(s) ]</span>
            </span>
            <div className="flex flex-col gap-1.5 items-start">
                <ClockButton label="Out" onClick={onOut} disabled={!!outTime} />
                <TimeDisplay time={formatTimeShort(outTime)} />
            </div>
            <div className="flex flex-col gap-1.5 items-start">
                <ClockButton label="In" onClick={onIn} disabled={!outTime || !!inTime} />
                <TimeDisplay time={formatTimeShort(inTime)} />
            </div>
        </div>
    )
}

function CombinedCheckoutButton({ label, onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="flex flex-col items-center justify-center px-3 py-2 rounded border border-primary/40 bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[100px] text-center leading-snug"
        >
            {label.split('\n').map((line, i) => (
                <span key={i}>{line}</span>
            ))}
        </button>
    )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

function ClockInOut() {
    const [now, setNow] = useState(new Date())

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

    // Live clock
    useEffect(function () {
        const timer = setInterval(function () {
            setNow(new Date())
        }, 1000)
        return function () { clearInterval(timer) }
    }, [])

    function stamp() { return new Date() }

    // Status bar mock data
    const statusBar = {
        mac: '00:15:5D:DC:0D:00',
        ip: '10.8.225.11',
        loc: 'HOME',
        shift: 'FLEXI 6:00am-8:00am',
        gRole: 'User',
        company: 'GBSS',
    }

    return (
        <PageTemplate
            title="Clock In/Out"
            hasBorder
        >
            <div className="flex flex-col gap-0 overflow-hidden text-sm">

                {/* ── START ─────────────────────────────────────────── */}
                <SectionHeader title="Start" />
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-4">
                        <ClockButton
                            label="Check In"
                            onClick={function () { setCheckInTime(stamp()) }}
                            disabled={!!checkInTime}
                        />
                        <TimeDisplay time={formatTime(checkInTime || now)} large />
                    </div>
                    <button
                        onClick={function () { setNow(new Date()) }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded border border-primary/40 bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors focus:outline-none"
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
                <div className="flex gap-0 border-b border-gray-200">

                    {/* Left: 1st, 2nd, Combined */}
                    <div className="flex flex-col gap-5 px-4 py-4 flex-1 border-r border-gray-200">
                        <BreakRow
                            label="1st (15mins)"
                            outTime={break1Out}
                            inTime={break1In}
                            onOut={function () { setBreak1Out(stamp()) }}
                            onIn={function () { setBreak1In(stamp()) }}
                        />
                        <BreakRow
                            label="2nd (15mins)"
                            outTime={break2Out}
                            inTime={break2In}
                            onOut={function () { setBreak2Out(stamp()) }}
                            onIn={function () { setBreak2In(stamp()) }}
                        />
                        <BreakRow
                            label="Combined (30mins)"
                            outTime={combinedOut}
                            inTime={combinedIn}
                            onOut={function () { setCombinedOut(stamp()) }}
                            onIn={function () { setCombinedIn(stamp()) }}
                        />
                    </div>

                    {/* Right: Lunch */}
                    <div className="px-6 py-4 min-w-65">
                        <LunchColumn
                            outTime={lunchOut}
                            inTime={lunchIn}
                            onOut={function () { setLunchOut(stamp()) }}
                            onIn={function () { setLunchIn(stamp()) }}
                        />
                    </div>
                </div>

                {/* ── END ───────────────────────────────────────────── */}
                <SectionHeader title="End" />
                <div className="flex items-center gap-4 px-4 py-3 flex-wrap">
                    <ClockButton
                        label="Check Out"
                        onClick={function () { setCheckOutTime(stamp()) }}
                        disabled={!!checkOutTime}
                    />
                    <TimeDisplay time={formatTimeShort(checkOutTime)} large />

                    <div className="flex items-center gap-2 ml-auto flex-wrap">
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

                {/* ── STATUS BAR ────────────────────────────────────── */}
                <div className="flex items-center gap-0 border-t border-gray-300 bg-gray-50 px-3 py-1 text-xs text-gray-500 flex-wrap">
                    {[
                        `MAC Addr: ${statusBar.mac}`,
                        `IP Addr: ${statusBar.ip}`,
                        `Loc : ${statusBar.loc}`,
                        `Shift : ${statusBar.shift}`,
                        `G-Role : ${statusBar.gRole}`,
                        `Company : ${statusBar.company}`,
                    ].map(function (item, i) {
                        return (
                            <React.Fragment key={i}>
                                {i > 0 && <span className="mx-2 text-gray-300">|</span>}
                                <span>{item}</span>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </PageTemplate>
    )
}

ClockInOut.displayName = 'ClockInOut'

export default ClockInOut