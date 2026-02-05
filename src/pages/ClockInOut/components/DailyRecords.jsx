import React, { useState, useMemo } from 'react'
import Table from '../../../components/Table'

function DailyRecords() {
    const [fromDate, setFromDate] = useState('2026-02-01')
    const [toDate, setToDate] = useState('2026-02-05')
    
    const [timeLogs] = useState([
        { id: 1, workDate: '2026-02-05', time: '5:50AM', logType: 'Check-in' },
        { id: 2, workDate: '2026-02-04', time: '3:23PM', logType: 'Check-out' },
        { id: 3, workDate: '2026-02-04', time: '5:51AM', logType: 'Check-in' },
        { id: 4, workDate: '2026-02-03', time: '3:12PM', logType: 'Check-out' },
        { id: 5, workDate: '2026-02-03', time: '5:54AM', logType: 'Check-in' },
        { id: 6, workDate: '2026-02-02', time: '3:02PM', logType: 'Check-out' },
        { id: 7, workDate: '2026-02-02', time: '5:49AM', logType: 'Check-in' }
    ])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'workDate',
                header: 'Work Date',
                cell: (info) => new Date(info.getValue()).toLocaleDateString('en-GB')
            },
            {
                accessorKey: 'time',
                header: 'Time'
            },
            {
                accessorKey: 'logType',
                header: 'Log Type'
            }
        ],
        []
    )

    function handleSearch() {
        console.log(`Search from ${fromDate} to ${toDate}`)
    }

    return (
        <main className="container-width px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-primary mb-6">TIME LOGS</h1>

            {/* Date Filter Section */}
            <div className="bg-white rounded shadow-sm border border-gray-200 p-6 mb-6">
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Date</label>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <span className="text-gray-500">-</span>
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 bg-primary text-white font-semibold rounded hover:bg-dark-primary transition-colors cursor-pointer"
                        >
                            🔍
                        </button>
                    </div>
                </div>
            </div>

            {/* Time Logs Table */}
            <Table
                columns={columns}
                data={timeLogs}
                enablePagination={true}
                enableSorting={true}
                enableFiltering={true}
                pageSize={10}
                emptyMessage="No time logs found"
            />
        </main>
    )
}

export default DailyRecords
