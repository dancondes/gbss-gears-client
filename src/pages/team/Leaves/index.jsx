import PageTemplate from '@/components/PageTemplate'
import TicketingModal from '@/pages/help/Ticketing/components/TicketingModal'
import OpenTicketModal from '@/pages/user/Leaves/components/OpenTicketModal'
import React, { useState } from 'react'
import LeaveCredits from './components/LeaveCredits'
import UpcomingLeaves from './components/UpcomingLeaves'

export default function Leaves() {
    // States
    const [isModalOpen, setIsModalOpen] = useState(false)

    const data = {
        leaveCredits: [
            {
                name: 'John Doe',
                leaveType: 'Annual-Paid',
                earned: 10.0,
                additional: 2.0,
                used: 5.0,
                remaining: 7.0
            },
            {
                name: 'John Doe',
                leaveType: 'Illness-Paid',
                earned: 5.0,
                additional: 1.0,
                used: 2.0,
                remaining: 4.0
            },
            {
                name: 'John Doe',
                leaveType: 'Freeday',
                earned: 2.0,
                additional: 0.0,
                used: 1.0,
                remaining: 1.0
            }
        ],
        upcomingLeaves: [
            {
                name: 'John Doe',
                fromDate: '2026-08-01',
                toDate: '2026-08-05',
                reason: 'Annual-Paid'
            },
            {
                name: 'John Doe',
                fromDate: '2026-08-11',
                toDate: '2026-08-15',
                reason: 'Annual-Paid'
            },
        ],
    }

    return (
        <PageTemplate
            title="Team Leaves"
            rightSide={<OpenTicketModal setIsOpen={setIsModalOpen} />}
        >
            <div className="p-1 sm:p-3">
                <LeaveCredits data={data.leaveCredits} />
                <UpcomingLeaves data={data.upcomingLeaves} />
            </div>

            {isModalOpen && (
                <TicketingModal
                    defaultValues={{
                        ticketType: 'Leave',
                    }}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </PageTemplate>
    )
}
