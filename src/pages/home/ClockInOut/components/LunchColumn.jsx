import React from 'react'
import PropTypes from 'prop-types'
import { calcDuration, formatTime } from '../helpers'
import TimeDisplay from './TimeDisplay'
import ClockButton from './ClockButton'
import BreakRow from './BreakRow'

function LunchColumn({ outTime, inTime, onOut, onIn, disabled, outTitle, inTitle }) {
    const duration = calcDuration(outTime, inTime)

    return (
        <>
            <div className="hidden md:flex flex-col gap-3">
                <span className="text-md text-primary font-bold">
                    LUNCH <span className="text-primary/80">[ {duration} min(s) ]</span>
                </span>
                <div className="flex flex-col gap-1.5 items-start">
                    <ClockButton label="Out" onClick={onOut} disabled={!!outTime || disabled} title={outTitle} />
                    <TimeDisplay time={formatTime(outTime)} />
                </div>
                <div className="flex flex-col gap-1.5 items-start">
                    <ClockButton label="In" onClick={onIn} disabled={!outTime || !!inTime} title={inTitle} />
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
                    disabled={disabled}
                    outTitle={outTitle}
                    inTitle={inTitle}
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
    disabled: PropTypes.bool,
    outTitle: PropTypes.string,
    inTitle: PropTypes.string,
}

export default LunchColumn
