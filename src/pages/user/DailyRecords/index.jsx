import React, { useState, useMemo } from 'react'
import Table from '../../../components/Table'
import PageTemplate from '@/components/PageTemplate'
import { getCurrentDate } from '@/utilities/date-utilities'
import { formatArrayOfStringsAsSelectOptions } from '@/utilities'

function DailyRecords() {
    const [timeLogs] = useState([
        { id: 1, workDate: getCurrentDate(), time: '05:50', logType: 'Check-in' },
        { id: 2, workDate: getCurrentDate(), time: '15:23', logType: 'Check-out' },
        { id: 3, workDate: getCurrentDate(), time: '05:51', logType: 'Check-in' },
        { id: 4, workDate: getCurrentDate(), time: '15:12', logType: 'Check-out' },
        { id: 5, workDate: getCurrentDate(), time: '05:54', logType: 'Check-in' },
        { id: 6, workDate: getCurrentDate(), time: '15:02', logType: 'Check-out' },
        { id: 7, workDate: getCurrentDate(), time: '05:49', logType: 'Check-in' }
    ])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'workDate',
                header: 'Work Date',
                type: 'date'
            },
            {
                accessorKey: 'time',
                header: 'Time',
                type: 'time'
            },
            {
                accessorKey: 'logType',
                header: 'Log Type'
            }
        ],
        []
    )

    return (
        <PageTemplate
            title="Daily Records"
            subtitle="View your daily clock-in and clock-out records"
        >
            <div className="p-1 sm:p-3">
                {/* Time Logs Table */}
                <Table
                    columns={columns}
                    data={timeLogs}
                    enablePagination={true}
                    enableSorting={true}
                    enableFiltering={true}
                    pageSize={10}
                    noDataLabel="No time logs found"
                    columnFilters={{
                        workDate: {
                            label: 'Work Date',
                            type: 'date',
                            value: getCurrentDate()
                        },
                        logType: {
                            label: 'Log Type',
                            options: formatArrayOfStringsAsSelectOptions(['Check-in', 'Check-out'])
                        }
                    }}
                />
            </div>
        </PageTemplate>
    )
}

export default DailyRecords
