import PageTemplate from '@/components/PageTemplate'
import React, { useState } from 'react'
import LeaveCredits from './components/LeaveCredits'
import ApplicationLeaveFrom from './components/ApplicationLeaveForm'
import VacationLeaveList from './components/VacationLeaveList'
import SickLeaveList from './components/SickLeaveList'

export default function Leaves() {

    const [selectedLeave, setSelectedLeave] = useState(null)

    const leaveCreditsData = [
        {
            year: 2025,
            leaveType: 'Annual-Paid',
            earned: 11.670,
            additional: 0.000,
            prevBalance: 0.000,
            used: 0.000,
            remaining: 11.670
        },
        {
            year: 2025,
            leaveType: 'Illness-Paid',
            earned: 4.080,
            additional: 0.000,
            prevBalance: 0.000,
            used: 0.000,
            remaining: 4.080
        },
        {
            year: 2026,
            leaveType: 'Freeday',
            earned: 1.080,
            additional: 0.000,
            prevBalance: 0.000,
            used: 0.000,
            remaining: 1.080
        },
    ]

    const filedLeavesData = [
        {
            startDate: '2025-01-01',
            endDate: '2025-01-01',
            approvedBy: 'John Doe',
            leaveType: 'Holiday-Paid',
            description: 'New Year'
        },
        {
            startDate: '2024-02-01',
            endDate: '2024-02-01',
            approvedBy: 'Jane Smith',
            leaveType: 'Annual-Paid',
            description: 'Vacation Leave'
        },
        {
            startDate: '2024-03-08',
            endDate: '2024-03-08',
            approvedBy: 'John Doe',
            leaveType: 'Annual-Paid',
            description: 'Vacation Leave'
        },
        {
            startDate: '2024-04-09',
            endDate: '2024-04-10',
            approvedBy: 'Jane Smith',
            leaveType: 'Holiday-Paid',
            description: 'Holy Week'
        },
        {
            startDate: '2024-05-15',
            endDate: '2024-05-15',
            approvedBy: 'John Doe',
            leaveType: 'Sick-Paid',
            description: 'Not feeling well'
        },
        {
            startDate: '2024-06-03',
            endDate: '2024-06-03',
            approvedBy: 'Jane Smith',
            leaveType: 'Annual-Paid',
            description: 'Personal errand'
        },
        {
            startDate: '2024-07-22',
            endDate: '2024-07-22',
            approvedBy: 'John Doe',
            leaveType: 'Sick-Paid',
            description: 'Medical appointment'
        },
        {
            startDate: '2024-08-26',
            endDate: '2024-08-26',
            approvedBy: 'Jane Smith',
            leaveType: 'Holiday-Paid',
            description: 'National Heroes Day'
        },
        {
            startDate: '2024-09-10',
            endDate: '2024-09-11',
            approvedBy: 'John Doe',
            leaveType: 'Annual-Paid',
            description: 'Family trip'
        },
        {
            startDate: '2024-11-01',
            endDate: '2024-11-02',
            approvedBy: 'Jane Smith',
            leaveType: 'Holiday-Paid',
            description: 'All Saints Day'
        },
        {
            startDate: '2024-12-24',
            endDate: '2024-12-26',
            approvedBy: 'John Doe',
            leaveType: 'Holiday-Paid',
            description: 'Christmas Holiday'
        },
        {
            startDate: '2024-12-31',
            endDate: '2024-12-31',
            approvedBy: 'Jane Smith',
            leaveType: 'Annual-Paid',
            description: 'New Year Eve'
        },
    ]

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
        setSelectedLeave(leave)
    }

    return (
        <PageTemplate
            title="Leaves"
            rightSide="" // TODO: update this
        >
            {/* 1st Row */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4">
                {/* Leave Credits */}
                <div className="col-span-1 sm:col-span-3">
                    <LeaveCredits
                        data={leaveCreditsData}
                        filedLeavesData={filedLeavesData}
                        handeLeaveSelect={handeLeaveSelect}
                    />
                </div>

                {/* Leave From */}
                <div className="col-span-1 sm:col-span-2">
                    <ApplicationLeaveFrom
                        selectedLeave={selectedLeave}
                        setSelectedLeave={setSelectedLeave}
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
