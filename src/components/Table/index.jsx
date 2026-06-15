import React, { useState, useMemo } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from '@tanstack/react-table'
import PropTypes from 'prop-types'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TablePagination from './TablePagination'
import TableSearchAndFilter from './TableSearchAndFilter'
import { formatCellValue } from './utils/formatters'

function Table({
    columns,
    data,
    enablePagination = true,
    enableSorting = true,
    stripedRows = true,
    pageSize = 10,
    emptyMessage = 'No data found',
    onRowClick = null,
    searchFields = [],
    columnFilters: columnFiltersConfig = []
}) {
    const [searchValue, setSearchValue] = useState('')
    const [appliedSearchValue, setAppliedSearchValue] = useState('')
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [filterValues, setFilterValues] = useState(() => {
        const initialValues = {}
        columnFiltersConfig.forEach((filter) => {
            if (filter.type === 'daterange') {
                initialValues[`${filter.fieldName}_from`] = filter.defaultValue?.from || ''
                initialValues[`${filter.fieldName}_to`] = filter.defaultValue?.to || ''
            } else {
                initialValues[filter.fieldName] = filter.defaultValue || ''
            }
        })
        return initialValues
    })

    function handleFilterChange(fieldName, value) {
        setFilterValues((prev) => ({
            ...prev,
            [fieldName]: value
        }))
    }

    function handleApplySearch() {
        setAppliedSearchValue(searchValue)
        
        const filters = []
        
        columnFiltersConfig.forEach((filterConfig) => {
            if (filterConfig.type === 'daterange') {
                const fromValue = filterValues[`${filterConfig.fieldName}_from`]
                const toValue = filterValues[`${filterConfig.fieldName}_to`]
                
                if (fromValue || toValue) {
                    filters.push({
                        id: filterConfig.fieldName,
                        value: { from: fromValue, to: toValue }
                    })
                }
            } else {
                const value = filterValues[filterConfig.fieldName]
                if (value !== undefined && value !== '' && value !== null) {
                    filters.push({
                        id: filterConfig.fieldName,
                        value: filterConfig.exactMatch ? { exact: value } : value
                    })
                }
            }
        })
        
        setColumnFilters(filters)
    }

    const filteredData = useMemo(() => {
        if (columnFilters.length === 0) return data

        return data.filter((row) => {
            return columnFilters.every((filter) => {
                const filterConfig = columnFiltersConfig.find(f => f.fieldName === filter.id)
                const rowValue = row[filter.id]

                if (filterConfig?.type === 'daterange') {
                    const { from, to } = filter.value
                    const rowDate = new Date(rowValue)
                    
                    if (from && new Date(from) > rowDate) return false
                    if (to && new Date(to) < rowDate) return false
                    return true
                }

                if (filter.value?.exact) {
                    return rowValue === filter.value.exact
                }

                if (typeof rowValue === 'string' && typeof filter.value === 'string') {
                    return rowValue.toLowerCase().includes(filter.value.toLowerCase())
                }

                return rowValue === filter.value
            })
        })
    }, [data, columnFilters, columnFiltersConfig])

    const searchFilteredData = useMemo(() => {
        if (!appliedSearchValue || searchFields.length === 0) return filteredData

        return filteredData.filter((row) => {
            return searchFields.some((field) => {
                const value = row[field.fieldName]
                if (value === null || value === undefined) return false
                return String(value).toLowerCase().includes(appliedSearchValue.toLowerCase())
            })
        })
    }, [filteredData, appliedSearchValue, searchFields])

    const formattedColumns = useMemo(() => {
        return columns.map((column) => ({
            ...column,
            cell: column.cell || ((info) => formatCellValue(info.getValue(), column.type, column.format))
        }))
    }, [columns])

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data: searchFilteredData,
        columns: formattedColumns,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
        initialState: {
            pagination: {
                pageSize
            }
        }
    })

    return (
        <div className="space-y-4">
            {((searchFields && searchFields.length > 0) || (columnFiltersConfig && columnFiltersConfig.length > 0)) && (
                <TableSearchAndFilter
                    searchFields={searchFields}
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    columnFilters={columnFiltersConfig}
                    filterValues={filterValues}
                    onFilterChange={handleFilterChange}
                    onApplySearch={handleApplySearch}
                />
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
    stripedRows: PropTypes.bool,
    pageSize: PropTypes.number,
    emptyMessage: PropTypes.string,
    onRowClick: PropTypes.func,
    searchFields: PropTypes.arrayOf(
        PropTypes.shape({
            fieldName: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ),
    columnFilters: PropTypes.arrayOf(
        PropTypes.shape({
            fieldName: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['text', 'select', 'date', 'daterange']),
            defaultValue: PropTypes.any,
            exactMatch: PropTypes.bool,
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.any.isRequired,
                    label: PropTypes.string.isRequired
                })
            )
        })
    )
}

export default Table
