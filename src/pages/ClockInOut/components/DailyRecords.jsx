import React, { useState } from 'react'

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
            <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="px-4 py-3 text-left text-sm font-semibold">Work Date</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Time</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Log Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeLogs.map((log) => (
                            <tr
                                key={log.id}
                                className={`border-t border-gray-200 hover:bg-gray-50 transition-colors`}
                            >
                                <td className="px-4 py-3 text-sm text-primary font-medium">
                                    {new Date(log.workDate).toLocaleDateString('en-GB')}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">{log.time}</td>
                                <td className="px-4 py-3 text-sm text-primary font-medium">{log.logType}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default DailyRecords
