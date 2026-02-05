import React from 'react'
import PropTypes from 'prop-types'

function TablePagination({ table }) {
    const pageIndex = table.getState().pagination.pageIndex
    const pageSize = table.getState().pagination.pageSize
    const pageCount = table.getPageCount()
    const totalRows = table.getFilteredRowModel().rows.length

    const startRow = pageIndex * pageSize + 1
    const endRow = Math.min((pageIndex + 1) * pageSize, totalRows)

    return (
        <div className="bg-white rounded shadow-sm border border-gray-200 p-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{startRow}</span> to{' '}
                <span className="font-semibold">{endRow}</span> of{' '}
                <span className="font-semibold">{totalRows}</span> results
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    className="px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                    First
                </button>

                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                    Previous
                </button>

                <div className="flex items-center gap-2 px-2">
                    <span className="text-sm text-gray-700">
                        Page <span className="font-semibold">{pageIndex + 1}</span> of{' '}
                        <span className="font-semibold">{pageCount}</span>
                    </span>
                </div>

                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                    Next
                </button>

                <button
                    onClick={() => table.setPageIndex(pageCount - 1)}
                    disabled={!table.getCanNextPage()}
                    className="px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                    Last
                </button>
            </div>
        </div>
    )
}

TablePagination.propTypes = {
    table: PropTypes.object.isRequired
}

export default TablePagination
