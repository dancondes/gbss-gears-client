import PageTemplate from '@/components/PageTemplate'
import React, { useState } from 'react'
import LeaveCredits from './components/LeaveCredits'
import ApplicationLeaveFrom from './components/ApplicationLeaveForm'
import VacationLeaveList from './components/VacationLeaveList'
import SickLeaveList from './components/SickLeaveList'
import OpenTicketModal from './components/OpenTicketModal'
import useSWR from 'swr'
import { ddmmyyyyToIso, getCurrentDate } from '@/utilities/date-utilities'
import { ENQUIRY_TYPE_ID_FOR_LEAVE, LEAVE_TYPE_OPTION_IDS } from '@/constants/database-id'
import { useAuthStore } from '@/store'
import { getAllLeaves } from '@/services/user-service'
import { toast } from 'sonner'

const currentDate = getCurrentDate()

export default function Leaves() {
    const user = useAuthStore((state) => state.user)
    const { data: leavesData, isValidating, mutate } = useSWR(user?.userId ? ['/api/leave-credits', user?.userId] : null, fetchLeaveCreditsData)

    async function fetchLeaveCreditsData() {
        try {
            const result = await getAllLeaves()
            return result?.data || []
        } catch {
            return []
        }
    }

    // States
    const [selectedLeave, setSelectedLeave] = useState(null)

    function handeLeaveSelect(leave) {
        if (currentDate >= ddmmyyyyToIso(leave.startDate) || currentDate >= ddmmyyyyToIso(leave.endDate)) {
            toast.error("You can't edit a leave request from a past or current date. Please submit a support ticket for assistance.")
            setSelectedLeave(null)
            return
        }

        if (!LEAVE_TYPE_OPTION_IDS.includes(leave.leaveTypeId)) {
            toast.error('This leave type is not supported for editing. Please submit a support ticket for assistance.')
            setSelectedLeave(null)
            return
        }

        setSelectedLeave({
            id: leave.leaveId,
            startDate: ddmmyyyyToIso(leave.startDate),
            endDate: ddmmyyyyToIso(leave.endDate),
            leaveTypeId: leave.leaveTypeId,
            approvedBy: leave.approvedBy
        })
    }

    return (
        <PageTemplate
            title="Leaves"
            subtitle="Manage your leaves and view your leave history"
            rightSide={<OpenTicketModal concernLabel="Leaves" defaultValues={{ ticketType: ENQUIRY_TYPE_ID_FOR_LEAVE }} />}
            mutate={mutate}
        >
            {/* 1st Row */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4">
                {/* Leave Credits */}
                <div className="col-span-1 sm:col-span-3">
                    <LeaveCredits
                        leavesCreditsData={leavesData?.leaveCredits || []}
                        isLoading={isValidating}
                        filedLeavesData={leavesData?.filedLeaves || []}
                        handeLeaveSelect={handeLeaveSelect}
                    />
                </div>

                {/* Leave From */}
                <div className="col-span-1 sm:col-span-2">
                    <ApplicationLeaveFrom
                        selectedLeave={selectedLeave}
                        isLoading={isValidating}
                        setSelectedLeave={setSelectedLeave}
                        onSuccess={mutate}
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
                            data={leavesData?.vlHistory || []}
                            isLoading={isValidating}
                        />
                    </div>

                    {/* Sick Leave */}
                    <div className="col-span-1 sm:col-span-1">
                        <SickLeaveList
                            data={leavesData?.slHistory || []}
                            isLoading={isValidating}
                        />
                    </div>
                </div>
            </div>
        </PageTemplate>
    )
}
