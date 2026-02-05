import React from 'react'
import { flexRender } from '@tanstack/react-table'
import PropTypes from 'prop-types'

function TableBody({ table, emptyMessage, onRowClick, stripedRows = true }) {
    const rows = table.getRowModel().rows

    if (rows.length === 0) {
        return (
            <tbody>
                <tr>
                    <td
                        colSpan={table.getAllColumns().length}
                        className="px-4 py-8 text-center text-gray-500 text-sm"
                    >
                        {emptyMessage}
                    </td>
                </tr>
            </tbody>
        )
    }

    return (
        <tbody>
            {rows.map((row, index) => (
                <tr
                    key={row.id}
                    onClick={() => onRowClick?.(row.original)}
                    className={`border-t border-gray-200 transition-colors ${
                        stripedRows && index % 2 === 1 ? 'bg-gray-50' : ''
                    } hover:bg-gray-100 ${
                        onRowClick ? 'cursor-pointer' : ''
                    }`}
                >
                    {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3 text-sm text-gray-700">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}

TableBody.propTypes = {
    table: PropTypes.object.isRequired,
    emptyMessage: PropTypes.string,
    onRowClick: PropTypes.func,
    stripedRows: PropTypes.bool
}

export default TableBody
