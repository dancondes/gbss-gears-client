import React, { useState, useMemo } from 'react'
import Table from '../../../components/Table'

function MyRequests() {
    const [fromDate, setFromDate] = useState('2026-02-05')
    const [toDate, setToDate] = useState('2026-02-05')
    const [status, setStatus] = useState('For Approval')
    
    const [requests] = useState([])

    const statusOptions = [
        'For Approval',
        'Approved',
        'Rejected',
        'Cancelled'
    ]

    const columns = useMemo(
        () => [
            {
                accessorKey: 'workDate',
                header: 'Work Date',
                cell: (info) => new Date(info.getValue()).toLocaleDateString('en-GB')
            },
            {
                accessorKey: 'logTime',
                header: 'LogTime'
            },
            {
                accessorKey: 'amendmentOn',
                header: 'Amendment On'
            },
            {
                accessorKey: 'requestedTime',
                header: 'Requested Time'
            },
            {
                accessorKey: 'comment',
                header: 'Comment'
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: (info) => {
                    const value = info.getValue()
                    return (
                        <span
                            className={`px-3 py-1 rounded text-xs font-semibold ${
                                value === 'Approved'
                                    ? 'bg-green-100 text-green-800'
                                    : value === 'Rejected'
                                    ? 'bg-red-100 text-red-800'
                                    : value === 'For Approval'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                            {value}
                        </span>
                    )
                }
            }
        ],
        []
    )

    function handleFilter() {
        console.log(`Filter requests from ${fromDate} to ${toDate} with status ${status}`)
    }

    return (
        <main className="container-width px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-primary mb-6">MY REQUESTS</h1>

            {/* Filter Section */}
            <div className="bg-white rounded shadow-sm border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    {/* Date Range */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Date</label>
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
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64"
                        >
                            {statusOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    onClick={handleFilter}
                    className="px-4 py-2 bg-primary text-white font-semibold rounded hover:bg-dark-primary transition-colors cursor-pointer flex items-center gap-2"
                >
                    🔍 Filter
                </button>
            </div>

            {/* Requests Table */}
            <Table
                columns={columns}
                data={requests}
                enablePagination={true}
                enableSorting={true}
                enableFiltering={true}
                pageSize={10}
                emptyMessage="No requests found"
            />
        </main>
    )
}

export default MyRequests
