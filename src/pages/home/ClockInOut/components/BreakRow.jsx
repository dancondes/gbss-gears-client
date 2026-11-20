import React from 'react'
import PropTypes from 'prop-types'
import { calcDuration, formatTime } from '../helpers'
import ClockButton from './ClockButton'
import TimeDisplay from './TimeDisplay'

function BreakRow({ label, outTime, inTime, onOut, onIn, disabled, outTitle, inTitle }) {
    const duration = calcDuration(outTime, inTime)

    return (
        <div className="flex flex-col gap-2">
            {/* Label + duration */}
            {label && (
                <span className="text-xs text-gray-400 font-medium">
                    {label} <span>[ {duration} min(s) ]</span>
                </span>
            )}

            {/* Out row */}
            <div className="flex items-center gap-3">
                <ClockButton label="Out" onClick={onOut} disabled={!!outTime || disabled} title={outTitle} small />
                <TimeDisplay time={formatTime(outTime)} />
            </div>

            {/* In row */}
            <div className="flex items-center gap-3">
                <ClockButton label="In" onClick={onIn} disabled={!outTime || !!inTime} title={inTitle} small />
                <TimeDisplay time={formatTime(inTime)} />
            </div>
        </div>
    )
}

BreakRow.propTypes = {
    label: PropTypes.string.isRequired,
    outTime: PropTypes.instanceOf(Date),
    inTime: PropTypes.instanceOf(Date),
    onOut: PropTypes.func.isRequired,
    onIn: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    outTitle: PropTypes.string,
    inTitle: PropTypes.string,
}

export default BreakRow