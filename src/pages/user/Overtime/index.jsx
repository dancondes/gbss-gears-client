import React, { useState, useMemo } from 'react'
import Table from '../../../components/Table'
import PageTemplate from '@/components/PageTemplate'
import { getCurrentDate } from '@/utilities/date-utilities'

function Overtime() {
    const [overtimeList] = useState([])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'date',
                header: 'Date',
                type: 'date',
            },
            {
                accessorKey: 'numOfHours',
                header: 'No. of Hours',
                type: 'number',
            },
            {
                accessorKey: 'approvedBy',
                header: 'Approved By',
            },
            {
                accessorKey: 'datePlotted',
                header: 'Date Plotted',
                type: 'date',
            }
        ],
        []
    )

    return (
        <PageTemplate
            title="Overtime"
            subtitle="View and manage your overtime records"
        >
            <div className="p-1 sm:p-3">
                <Table
                    columns={columns}
                    data={overtimeList}
                    enablePagination={true}
                    enableSorting={true}
                    pageSize={10}
                    noDataLabel="No overtime found"
                    // globalFilterColumns={['comment']}
                    dateRange={{
                        column: 'date',
                        start: getCurrentDate(),
                        end: getCurrentDate(),
                    }}
                    columnFilters={{
                        // workDate: {
                        //     label: 'Work Date',
                        //     type: 'date',
                        // },
                        // status: {
                        //     label: 'Status',
                        //     options: formatArrayOfStringsAsSelectOptions(['For Approval', 'Approved', 'Rejected', 'Cancelled'])
                        // }
                    }}
                />

                <div className="mt-4 text-sm text-gray-500">
                    hello
                </div>
            </div>
        </PageTemplate>
    )
}

export default Overtime
