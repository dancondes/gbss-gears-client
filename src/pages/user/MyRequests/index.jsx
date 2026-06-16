import React, { useState, useMemo } from 'react'
import Table from '../../../components/Table'
import PageTemplate from '@/components/PageTemplate'
import { formatArrayOfStringsAsSelectOptions } from '@/utilities'
import { getCurrentDate } from '@/utilities/date-utilities'

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

    return (
        <PageTemplate
            title="My Requests"
            subtitle="View and manage your requests"
        >
            <div className="p-1 sm:p-3">
                <Table
                    columns={columns}
                    data={requests}
                    enablePagination={true}
                    enableSorting={true}
                    pageSize={10}
                    noDataLabel="No requests found"
                    globalFilterColumns={['comment']}
                    dateRange={{
                        column: 'workDate',
                        start: getCurrentDate(-7),
                        end: getCurrentDate(),
                    }}
                    columnFilters={{
                        // workDate: {
                        //     label: 'Work Date',
                        //     type: 'date',
                        // },
                        status: {
                            label: 'Status',
                            options: formatArrayOfStringsAsSelectOptions(['For Approval', 'Approved', 'Rejected', 'Cancelled'])
                        }
                    }}
                />
            </div>
        </PageTemplate>
    )
}

export default MyRequests
