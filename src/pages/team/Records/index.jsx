import PageTemplate from '@/components/PageTemplate'
import Table from '@/components/Table'
import { formatArrayOfStringsAsSelectOptions } from '@/utilities'
import { getCurrentDate } from '@/utilities/date-utilities'
import React, { useMemo } from 'react'

export default function Records() {

    const currentDate = getCurrentDate()

    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'workDate',
            header: 'Work Date',
            type: 'date',
        },
        {
            accessorKey: 'time',
            header: 'Time',
            type: 'time',
        },
        {
            accessorKey: 'logType',
            header: 'Log Type',
        },
        {
            accessorKey: 'location',
            header: 'Location',
        }
    ], [])

    const data = [
        // Marcus Blaze
        { name: 'Marcus Blaze', workDate: currentDate, time: '08:02', logType: 'Check-in', location: 'Three NEO' },
        { name: 'Marcus Blaze', workDate: currentDate, time: '12:01', logType: 'Lunch-out', location: 'Three NEO' },
        { name: 'Marcus Blaze', workDate: currentDate, time: '13:00', logType: 'Lunch-in', location: 'Three NEO' },
        { name: 'Marcus Blaze', workDate: currentDate, time: '17:05', logType: 'Check-out', location: 'Three NEO' },

        // Tremaine Sky
        { name: 'Tremaine Sky', workDate: currentDate, time: '08:15', logType: 'Check-in', location: 'HOME' },
        { name: 'Tremaine Sky', workDate: currentDate, time: '12:10', logType: 'Lunch-out', location: 'HOME' },
        { name: 'Tremaine Sky', workDate: currentDate, time: '13:05', logType: 'Lunch-in', location: 'HOME' },
        { name: 'Tremaine Sky', workDate: currentDate, time: '17:20', logType: 'Check-out', location: 'HOME' },

        // Deshawn Rivers
        { name: 'Deshawn Rivers', workDate: currentDate, time: '07:58', logType: 'Check-in', location: 'Three NEO' },
        { name: 'Deshawn Rivers', workDate: currentDate, time: '11:55', logType: 'Lunch-out', location: 'Three NEO' },
        { name: 'Deshawn Rivers', workDate: currentDate, time: '12:50', logType: 'Lunch-in', location: 'Three NEO' },
        { name: 'Deshawn Rivers', workDate: currentDate, time: '17:02', logType: 'Check-out', location: 'Three NEO' },

        // Jaylen Storm
        { name: 'Jaylen Storm', workDate: currentDate, time: '08:00', logType: 'Check-in', location: 'Three NEO' },
        { name: 'Jaylen Storm', workDate: currentDate, time: '12:15', logType: 'Lunch-out', location: 'Three NEO' },
        { name: 'Jaylen Storm', workDate: currentDate, time: '13:10', logType: 'Lunch-in', location: 'Three NEO' },
        { name: 'Jaylen Storm', workDate: currentDate, time: '17:00', logType: 'Check-out', location: 'Three NEO' },
    ]

    return (
        <PageTemplate
            title="Records"
        >
            <div className="p-1 sm:p-3">
                <Table
                    columns={columns}
                    data={data}
                    enableSorting={true}
                    pageSize={50}
                    exportToExcel={{
                        fileName: 'Time Logs',
                        position: 'bottom-right',
                        buttonLabel: 'Export to Excel'
                    }}
                    dateRange={{
                        column: 'workDate',
                        start: currentDate,
                        end: currentDate,
                    }}
                    columnFilters={{
                        name: {
                            label: 'Employee',
                            options: formatArrayOfStringsAsSelectOptions(data.map(d => d.name).filter((value, index, self) => self.indexOf(value) === index)),
                            type: 'typeahead'
                        },
                        logType: {
                            label: 'Log Type',
                            options: formatArrayOfStringsAsSelectOptions(data.map(d => d.logType).filter((value, index, self) => self.indexOf(value) === index))
                        },
                        location: {
                            label: 'Location',
                            options: formatArrayOfStringsAsSelectOptions(data.map(d => d.location).filter((value, index, self) => self.indexOf(value) === index))
                        }
                    }}
                />
            </div>
        </PageTemplate>
    )
}
