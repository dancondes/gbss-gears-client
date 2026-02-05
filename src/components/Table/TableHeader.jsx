import React from 'react'
import { flexRender } from '@tanstack/react-table'
import PropTypes from 'prop-types'

const SortAscIcon = () => (
    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
)

const SortDescIcon = () => (
    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
)

const SortNeutralIcon = () => (
    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
    </svg>
)

function TableHeader({ table, enableSorting }) {
    return (
        <thead>
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-primary text-white">
                    {headerGroup.headers.map((header) => (
                        <th
                            key={header.id}
                            className="px-4 py-3 text-left text-sm font-semibold"
                            style={{
                                width: header.getSize() !== 150 ? header.getSize() : undefined,
                                cursor: enableSorting && header.column.getCanSort() ? 'pointer' : 'default'
                            }}
                            onClick={header.column.getToggleSortingHandler()}
                        >
                            <div className="flex items-center gap-2">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {enableSorting && header.column.getCanSort() && (
                                    <>
                                        {header.column.getIsSorted() === 'asc' && <SortAscIcon />}
                                        {header.column.getIsSorted() === 'desc' && <SortDescIcon />}
                                        {!header.column.getIsSorted() && <SortNeutralIcon />}
                                    </>
                                )}
                            </div>
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
    )
}

TableHeader.propTypes = {
    table: PropTypes.object.isRequired,
    enableSorting: PropTypes.bool
}

export default TableHeader
