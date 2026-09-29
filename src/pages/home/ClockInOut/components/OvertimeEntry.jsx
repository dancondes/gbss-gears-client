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
 * Proposal B: rendered inside the ClockInOut card, directly below "End".
 * Same rhythm as Start / End: SectionHeader, then a two-column row for
 * Check In / Check Out, then a footer row (hint on the left, ticket button
 * on the right). Full width means no dead space; on mobile everything stacks.
 */
function OvertimeEntry({ checkInTime, checkOutTime, onCheckIn, onCheckOut, disabled }) {
    const isComplete = Boolean(checkInTime && checkOutTime)

    return (
        <div className="clock-guide-overtime flex flex-col gap-0 overflow-hidden text-sm">
            <SectionHeader title="Overtime" />

            <div className="grid sm:grid-cols-2 gap-3 px-4 py-3">
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

            <div className="flex flex-wrap items-center justify-between gap-3 px-4 pb-4">
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