import React, { useState } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table'
import PropTypes from 'prop-types'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TablePagination from './TablePagination'
import TableSearchBar from './TableSearchBar'

function Table({
    columns,
    data,
    enablePagination = true,
    enableSorting = true,
    enableFiltering = true,
    enableSearch = false,
    stripedRows = true,
    pageSize = 10,
    emptyMessage = 'No data found',
    onRowClick = null
}) {
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            sorting,
            columnFilters
        },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
        getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
        initialState: {
            pagination: {
                pageSize
            }
        }
    })

    return (
        <div className="space-y-4">
            {enableSearch && (
                <TableSearchBar value={globalFilter} onChange={setGlobalFilter} />
            )}

            <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <TableHeader table={table} enableSorting={enableSorting} />
                    <TableBody table={table} emptyMessage={emptyMessage} onRowClick={onRowClick} stripedRows={stripedRows} />
                </table>
            </div>

            {enablePagination && <TablePagination table={table} />}
        </div>
    )
}

Table.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    enablePagination: PropTypes.bool,
    enableSorting: PropTypes.bool,
    enableFiltering: PropTypes.bool,
    enableSearch: PropTypes.bool,
    stripedRows: PropTypes.bool,
    pageSize: PropTypes.number,
    emptyMessage: PropTypes.string,
    onRowClick: PropTypes.func
}

export default Table
