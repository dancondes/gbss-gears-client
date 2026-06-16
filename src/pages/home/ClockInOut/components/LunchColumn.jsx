import React from 'react'
import PropTypes from 'prop-types'
import { calcDuration, formatTime } from '../helpers'
import TimeDisplay from './TimeDisplay'
import ClockButton from './ClockButton'
import BreakRow from './BreakRow'

function LunchColumn({ outTime, inTime, onOut, onIn }) {
    const duration = calcDuration(outTime, inTime)

    return (
        <>
            <div className="hidden md:flex flex-col gap-3">
                <span className="text-md text-primary font-bold">
                    LUNCH <span className="text-primary/80">[ {duration} min(s) ]</span>
                </span>
                <div className="flex flex-col gap-1.5 items-start">
                    <ClockButton label="Out" onClick={onOut} disabled={!!outTime} />
                    <TimeDisplay time={formatTime(outTime)} />
                </div>
                <div className="flex flex-col gap-1.5 items-start">
                    <ClockButton label="In" onClick={onIn} disabled={!outTime || !!inTime} />
                    <TimeDisplay time={formatTime(inTime)} />
                </div>
            </div>

            <div className="block md:hidden border-t border-gray-200 pt-3">
                <div className="text-md text-primary font-bold mb-2">
                    LUNCH <span className="text-primary/80">[ {duration} min(s) ]</span>
                </div>

                <BreakRow
                    outTime={outTime}
                    inTime={inTime}
                    onOut={onOut}
                    onIn={onIn}
                />
            </div>
        </>
    )
}

LunchColumn.propTypes = {
    outTime: PropTypes.string,
    inTime: PropTypes.string,
    onOut: PropTypes.func.isRequired,
    onIn: PropTypes.func.isRequired,
}

export default LunchColumn
