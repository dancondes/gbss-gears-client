import React from 'react'
import PropTypes from 'prop-types'
import ClockButton from './ClockButton'
import TimeDisplay from './TimeDisplay'
import SectionHeader from './SectionHeader'
import OpenTicketModal from '@/pages/user/Leaves/components/OpenTicketModal'
import { ENQUIRY_TYPE_ID_FOR_TIME_AMEND } from '@/constants/database-id'
import { calcDuration, formatTime } from '../helpers'

const TICKET_DEFAULTS = { ticketType: ENQUIRY_TYPE_ID_FOR_TIME_AMEND }

/**
 * Rendered by ClockInOut as the right-hand half of the page once the user has
 * checked out. The parent controls the width (50% on lg+, full width stacked
 * on mobile); this component only lays out its own content.
 *
 * checkInTime / checkOutTime are the raw values from the time entries
 * (e.g. "2025-01-01T18:00:00") — formatting happens here.
 */
function OvertimeEntry({ checkInTime, checkOutTime, onCheckIn, onCheckOut, disabled }) {
    const isComplete = Boolean(checkInTime && checkOutTime)

    return (
        <div className="flex flex-col gap-0 overflow-hidden text-sm">
            <SectionHeader title="Overtime" />

            <div className="flex flex-col gap-5 px-4 py-4">
                <div className="flex items-center gap-4 flex-wrap min-w-0">
                    <ClockButton
                        label="Check In"
                        onClick={onCheckIn}
                        disabled={disabled || Boolean(checkInTime)}
                    />
                    <TimeDisplay time={formatTime(checkInTime)} large />
                </div>

                <div className="flex items-center gap-4 flex-wrap min-w-0">
                    <ClockButton
                        label="Check Out"
                        onClick={onCheckOut}
                        disabled={disabled || !checkInTime || Boolean(checkOutTime)}
                    />
                    <TimeDisplay time={formatTime(checkOutTime)} large />
                </div>
            </div>

            <div className="flex flex-col items-start gap-3 px-4 pb-4">
                <p className="text-xs text-gray-400">
                    {isComplete
                        ? <>Overtime logged <span className="text-primary/80">[ {calcDuration(checkInTime, checkOutTime)} min(s) ]</span></>
                        : 'Log your overtime hours today, after checking out.'}
                </p>
                <OpenTicketModal concernLabel="Time Entry" defaultValues={TICKET_DEFAULTS} />
            </div>
        </div>
    )
}

OvertimeEntry.propTypes = {
    checkInTime: PropTypes.string,
    checkOutTime: PropTypes.string,
    onCheckIn: PropTypes.func.isRequired,
    onCheckOut: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}

export default OvertimeEntry