import PageTemplate from '@/components/PageTemplate'
import React, { useState } from 'react'
import LeaveCredits from './components/LeaveCredits'
import ApplicationLeaveFrom from './components/ApplicationLeaveForm'
import VacationLeaveList from './components/VacationLeaveList'
import SickLeaveList from './components/SickLeaveList'
import OpenTicketModal from './components/OpenTicketModal'
import useSWR from 'swr'
import { spliceDateFromTime } from '@/utilities/date-utilities'
import { ENQUIRY_TYPE_ID_FOR_LEAVE } from '@/constants/database-id'
import { useAuthStore } from '@/store'

export default function Leaves() {
    const user = useAuthStore((state) => state.user)
    const { data: leaveCreditsData, isValidating: isLeaveCreditsLoading, mutate: mutateLeaveCredits } = useSWR('/api/leave-credits', () => [])
    const { data: filedLeavesData, isValidating: isFiledLeavesLoading, mutate: mutateFiledLeaves } = useSWR('/api/filed-leaves', () => [])

    // States
    const [selectedLeave, setSelectedLeave] = useState(null)

    const vacationLeaveData = [
        { id: 1, order: 1, workDate: '2024-01-01', description: 'Accrue VL Credit', value: 1.67, balance: 1.67 },
        { id: 2, order: 2, workDate: '2024-02-01', description: 'Accrue VL Credit', value: 1.67, balance: 3.34 },
        { id: 3, order: 3, workDate: '2024-03-01', description: 'Accrue VL Credit', value: 1.67, balance: 5.01 },
        { id: 4, order: 4, workDate: '2024-04-01', description: 'Accrue VL Credit', value: 1.67, balance: 6.68 },
        { id: 5, order: 5, workDate: '2024-05-01', description: 'Accrue VL Credit', value: 1.67, balance: 8.35 },
        { id: 6, order: 6, workDate: '2024-06-01', description: 'Accrue VL Credit', value: 1.67, balance: 10.02 },
        { id: 7, order: 7, workDate: '2024-07-01', description: 'Accrue VL Credit', value: 1.67, balance: 11.69 },
        { id: 8, order: 8, workDate: '2024-08-01', description: 'Accrue VL Credit', value: 1.67, balance: 13.36 },
        { id: 9, order: 9, workDate: '2024-09-01', description: 'Accrue VL Credit', value: 1.67, balance: 15.03 },
        { id: 10, order: 10, workDate: '2024-10-01', description: 'Accrue VL Credit', value: 1.67, balance: 16.70 },
    ]

    const sickLeaveData = [
        { id: 1, order: 1, workDate: '2024-01-01', description: 'Accrue SL Credit', value: 0.58, balance: 0.58 },
        { id: 2, order: 2, workDate: '2024-02-01', description: 'Accrue SL Credit', value: 0.58, balance: 1.16 },
        { id: 3, order: 3, workDate: '2024-03-01', description: 'Accrue SL Credit', value: 0.58, balance: 1.74 },
        { id: 4, order: 4, workDate: '2024-04-01', description: 'Accrue SL Credit', value: 0.58, balance: 2.32 },
        { id: 5, order: 5, workDate: '2024-05-01', description: 'Accrue SL Credit', value: 0.58, balance: 2.90 },
        { id: 6, order: 6, workDate: '2024-06-01', description: 'Accrue SL Credit', value: 0.58, balance: 3.48 },
        { id: 7, order: 7, workDate: '2024-07-01', description: 'Accrue SL Credit', value: 0.58, balance: 4.06 },
        { id: 8, order: 8, workDate: '2024-08-01', description: 'Accrue SL Credit', value: 0.58, balance: 4.64 },
        { id: 9, order: 9, workDate: '2024-09-01', description: 'Accrue SL Credit', value: 0.58, balance: 5.22 },
        { id: 10, order: 10, workDate: '2024-10-01', description: 'Accrue SL Credit', value: 0.58, balance: 5.80 },
        { id: 1, order: 1, workDate: '2024-01-01', description: 'Accrue SL Credit', value: 0.58, balance: 0.58 },
        { id: 2, order: 2, workDate: '2024-02-01', description: 'Accrue SL Credit', value: 0.58, balance: 1.16 },
        { id: 3, order: 3, workDate: '2024-03-01', description: 'Accrue SL Credit', value: 0.58, balance: 1.74 },
        { id: 4, order: 4, workDate: '2024-04-01', description: 'Accrue SL Credit', value: 0.58, balance: 2.32 },
        { id: 5, order: 5, workDate: '2024-05-01', description: 'Accrue SL Credit', value: 0.58, balance: 2.90 },
        { id: 6, order: 6, workDate: '2024-06-01', description: 'Accrue SL Credit', value: 0.58, balance: 3.48 },
        { id: 7, order: 7, workDate: '2024-07-01', description: 'Accrue SL Credit', value: 0.58, balance: 4.06 },
        { id: 8, order: 8, workDate: '2024-08-01', description: 'Accrue SL Credit', value: 0.58, balance: 4.64 },
        { id: 9, order: 9, workDate: '2024-09-01', description: 'Accrue SL Credit', value: 0.58, balance: 5.22 },
        { id: 10, order: 10, workDate: '2024-10-01', description: 'Accrue SL Credit', value: 0.58, balance: 5.80 },
    ]

    function handeLeaveSelect(leave) {
        setSelectedLeave({
            id: leave.leaveId,
            startDate: spliceDateFromTime(leave.startDate),
            endDate: spliceDateFromTime(leave.endDate),
            leaveType: leave.leaveType,
            approvedBy: leave.approvedBy
        })
    }

    function handleMutate() {
        mutateLeaveCredits()
        mutateFiledLeaves()
    }

    return (
        <PageTemplate
            title="Leaves"
            rightSide={<OpenTicketModal concernLabel="Leaves" defaultValues={{ ticketType: ENQUIRY_TYPE_ID_FOR_LEAVE }} />}
            mutate={handleMutate}
        >
            {/* 1st Row */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4">
                {/* Leave Credits */}
                <div className="col-span-1 sm:col-span-3">
                    <LeaveCredits
                        leavesCreditsData={leaveCreditsData}
                        isLeaveCreditsLoading={isLeaveCreditsLoading}
                        filedLeavesData={filedLeavesData}
                        isFiledLeavesLoading={isFiledLeavesLoading}
                        handeLeaveSelect={handeLeaveSelect}
                    />
                </div>

                {/* Leave From */}
                <div className="col-span-1 sm:col-span-2">
                    <ApplicationLeaveFrom
                        selectedLeave={selectedLeave}
                        isLoading={isFiledLeavesLoading}
                        setSelectedLeave={setSelectedLeave}
                        onSuccess={handleMutate}
                    />
                </div>
            </div>

            {/* 2nd Row */}
            <div className="border-t border-gray-200 pt-4 mt-4">
                <h2 className="text-md text-center font-bold text-primary uppercase trakcking-widest mb-2">
                    History
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Vacation Leave */}
                    <div className="col-span-1 sm:col-span-1">
                        <VacationLeaveList
                            data={vacationLeaveData}
                        />
                    </div>

                    {/* Sick Leave */}
                    <div className="col-span-1 sm:col-span-1">
                        <SickLeaveList
                            data={sickLeaveData}
                        />
                    </div>
                </div>
            </div>
        </PageTemplate>
    )
}
