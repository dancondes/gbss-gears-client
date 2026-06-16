import React, { useState, useMemo } from 'react'
import Table from '../../../components/Table'

function MyRequests() {
    const [requests] = useState([
        {
            id: 1,
            workDate: '2026-02-05',
            logTime: '09:00',
            amendmentOn: '2026-02-06',
            requestedTime: '08:30',
            comment: 'Forgot to clock in on time',
            status: 'For Approval'
        },
        {
            id: 2,
            workDate: '2026-02-04',
            logTime: '17:30',
            amendmentOn: '2026-02-05',
            requestedTime: '18:00',
            comment: 'Worked overtime, need to update clock out time',
            status: 'Approved'
        },
        {
            id: 3,
            workDate: '2026-02-03',
            logTime: '09:15',
            amendmentOn: '2026-02-04',
            requestedTime: '09:00',
            comment: 'Traffic delay, requesting clock in adjustment',
            status: 'Rejected'
        },
        {
            id: 4,
            workDate: '2026-02-05',
            logTime: '12:00',
            amendmentOn: '2026-02-06',
            requestedTime: '12:30',
            comment: 'Extended lunch break for client meeting',
            status: 'For Approval'
        },
        {
            id: 5,
            workDate: '2026-02-02',
            logTime: '08:45',
            amendmentOn: '2026-02-03',
            requestedTime: '09:00',
            comment: 'Incorrect time entry correction',
            status: 'Approved'
        },
        {
            id: 6,
            workDate: '2026-02-01',
            logTime: '17:00',
            amendmentOn: '2026-02-02',
            requestedTime: '17:30',
            comment: 'System error during clock out',
            status: 'Cancelled'
        },
        {
            id: 7,
            workDate: '2026-02-05',
            logTime: '18:00',
            amendmentOn: '2026-02-06',
            requestedTime: '19:00',
            comment: 'Emergency work, need to extend clock out',
            status: 'For Approval'
        },
        {
            id: 8,
            workDate: '2026-01-31',
            logTime: '09:30',
            amendmentOn: '2026-02-01',
            requestedTime: '09:00',
            comment: 'Medical appointment delay',
            status: 'Approved'
        }
    ])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'workDate',
                header: 'Work Date',
                type: 'date',
            },
            {
                accessorKey: 'logTime',
                header: 'LogTime',
                type: 'time'
            },
            {
                accessorKey: 'amendmentOn',
                header: 'Amendment On',
                type: 'date'
            },
            {
                accessorKey: 'requestedTime',
                header: 'Requested Time',
                type: 'time'
            },
            {
                accessorKey: 'comment',
                header: 'Comment'
            },
            {
                accessorKey: 'status',
                header: 'Status',
            }
        ],
        []
    )

    const searchFields = useMemo(
        () => [
            { fieldName: 'comment', label: 'Comment' },
            { fieldName: 'status', label: 'Status' }
        ],
        []
    )

    const columnFilters = useMemo(
        () => [
            {
                fieldName: 'workDate',
                label: 'Work Date',
                type: 'daterange',
                defaultValue: {
                    from: '2026-02-05',
                    to: '2026-02-05'
                }
            },
            {
                fieldName: 'status',
                label: 'Status',
                type: 'select',
                defaultValue: 'For Approval',
                exactMatch: true,
                options: [
                    { value: 'For Approval', label: 'For Approval' },
                    { value: 'Approved', label: 'Approved' },
                    { value: 'Rejected', label: 'Rejected' },
                    { value: 'Cancelled', label: 'Cancelled' }
                ]
            }
        ],
        []
    )

    return (
        <main className="container-width px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-primary mb-6">MY REQUESTS</h1>

            <Table
                columns={columns}
                data={requests}
                enablePagination={true}
                enableSorting={true}
                pageSize={10}
                emptyMessage="No requests found"
                searchFields={searchFields}
                columnFilters={columnFilters}
            />
        </main>
    )
}

export default MyRequests
