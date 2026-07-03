import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table'
import { transformRowsForExport } from '@/utilities/export-utilities'
import ExportToExcel from '@/components/ExportToExcel'
import CollapsibleContainer from '@/components/CollapsibleContainer'
import TableFilters from './TableFilters'
import TablePagination from './TablePagination'
import { useTableFilters, useTableColumns, useRowClick } from './hooks'
import { LOADING_MESSAGE_DELAY } from '@/constants'
import ReactDOMServer from 'react-dom/server'

// ============================================================================
// SORTING ICONS
// ============================================================================

const SortAscIcon = () => (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
)

const SortDescIcon = () => (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
)

const SortNeutralIcon = () => (
    <svg className="w-3 h-3 text-slate-400 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
    </svg>
)

// ============================================================================
// TABLE HEADER COMPONENT
// ============================================================================

const TableHeader = ({ table, enableSorting }) => (
    <thead className="bg-linear-to-r from-slate-700 to-slate-600 sticky top-0 z-10 shadow-sm">
        {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b-2 border-slate-500">
                {headerGroup.headers.map((header) => {
                    const columnDef = header.column.columnDef
                    const hasCustomWidth = columnDef.width !== undefined

                    return (
                        <th
                            key={header.id}
                            className="px-2 py-1 text-left text-[0.85rem] font-semibold text-white uppercase tracking-wide whitespace-nowrap"
                            style={{ width: hasCustomWidth ? columnDef.width : undefined }}
                        >
                            {header.isPlaceholder ? null : (
                                <div
                                    className={
                                        header.column.getCanSort()
                                            ? 'cursor-pointer select-none flex items-center gap-2 hover:text-slate-200 transition-colors'
                                            : 'flex items-center gap-2'
                                    }
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {enableSorting && header.column.getCanSort() && (
                                        <span className="inline-flex text-slate-300">
                                            {header.column.getIsSorted() === 'asc' ? (
                                                <SortAscIcon />
                                            ) : header.column.getIsSorted() === 'desc' ? (
                                                <SortDescIcon />
                                            ) : (
                                                <SortNeutralIcon />
                                            )}
                                        </span>
                                    )}
                                </div>
                            )}
                        </th>
                    )
                })}
            </tr>
        ))}
    </thead>
)

TableHeader.propTypes = {
    table: PropTypes.object.isRequired,
    enableSorting: PropTypes.bool,
}

// ============================================================================
// TABLE BODY COMPONENT
// ============================================================================

const TableBody = ({ noDataLabel, rows, columns, onRowClick, onRowRightClick, isStripes, isClickable, isLoading }) => {
    const [showExtendedMessage, setShowExtendedMessage] = useState(false)

    useEffect(function handleLoadingTimeout() {
        if (isLoading) {
            const timer = setTimeout(function () {
                setShowExtendedMessage(true)
            }, LOADING_MESSAGE_DELAY)

            return function cleanup() {
                clearTimeout(timer)
                setShowExtendedMessage(false)
            }
        }
    }, [isLoading])

    if (isLoading) {
        return (
            <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                    <td colSpan={columns.length} className="p-8 text-center">
                        <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                            <div className="flex items-center gap-3">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                                <span>Loading...</span>
                            </div>
                            {showExtendedMessage && (
                                <p className="text-sm text-gray-400 mt-2">
                                    This is taking a bit longer than expected. We&apos;re still working on it, please wait...
                                </p>
                            )}
                        </div>
                    </td>
                </tr>
            </tbody>
        )
    }

    if (rows.length === 0) {
        return (
            <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                    <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                        {noDataLabel}
                    </td>
                </tr>
            </tbody>
        )
    }

    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, index) => (
                <tr
                    key={row.id}
                    onClick={() => onRowClick(row.original)}
                    onContextMenu={(e) => {
                        if (onRowRightClick) {
                            e.preventDefault()
                            onRowRightClick(e, row.original)
                        }
                    }}
                    className={`
                        hover:bg-slate-50 hover:shadow-sm transition-all duration-150
                        ${isClickable ? 'cursor-pointer' : ''}
                        ${isStripes && index % 2 !== 0 ? 'bg-gray-50/50' : 'bg-white'}
                    `}
                >
                    {row.getVisibleCells().map((cell) => {
                        const columnDef = cell.column.columnDef
                        const hasCustomWidth = columnDef.width !== undefined
                        const displayValue = flexRender(cell.column.columnDef.cell, cell.getContext())

                        return (
                            <td
                                key={cell.id}
                                className="px-2 py-1 whitespace-nowrap text-xs text-gray-700 max-w-80 overflow-hidden text-ellipsis"
                                style={{ width: hasCustomWidth ? columnDef.width : undefined }}
                            // title={displayValue} // not working because the displayValue is an html element, consider adding a custom tooltip component if needed
                            >
                                {displayValue}
                            </td>
                        )
                    })}
                </tr>
            ))}
        </tbody>
    )
}

TableBody.propTypes = {
    noDataLabel: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    onRowClick: PropTypes.func.isRequired,
    onRowRightClick: PropTypes.func,
    isStripes: PropTypes.bool,
    isClickable: PropTypes.bool,
    isLoading: PropTypes.bool,
}

// ============================================================================
// MAIN TABLE COMPONENT
// ============================================================================

/**
 * A feature-rich, reusable table component built on TanStack Table
 * 
 * @component
 * @example
 * // Basic usage
 * <Table
 *   data={users}
 *   columns={[
 *     { accessorKey: 'name', header: 'Name' },
 *     { accessorKey: 'email', header: 'Email' },
 *   ]}
 * />
 * 
 * @example
 * // With filtering and pagination
 * <Table
 *   data={users}
 *   columns={columns}
 *   globalFilterColumns={['name', 'email']}
 *   columnFilters={{
 *     status: {
 *       label: 'Status',
 *       options: [{ value: 'active', label: 'Active' }],
 *       rowAccessor: (row) => row.isActive ? 'active' : 'inactive',
 *     },
 *   }}
 *   enablePagination={true}
 *   pageSize={10}
 * />
 */
const Table = ({
    // Data
    data = [],
    noDataLabel = 'No data available',
    columns,

    // Features
    enableSorting = true,
    defaultSorting = [],
    enablePagination = true,
    pageSize = 10,

    // Filtering
    globalFilterColumns = [],
    columnFilters: externalColumnFilters = {},
    dateRange = {},
    onSearch,

    // Row interactions
    onRowClick,
    onRowRightClick,
    onDoubleClick,
    doubleClickDelay = 300,

    // Appearance
    isStripes = true,
    initialColumnVisibility = {},
    minHeight,
    maxHeight,
    isCollapsible = false,
    defaultOpen = false,
    isLoading = false,
    showTableHeader = true,

    // Export
    exportToExcel = null,

    // State persistence
    storageKey,

    // For demonstration purposes
    showToggle = {},
}) => {
    // ========== STATE ==========
    const [sorting, setSorting] = useState(defaultSorting)
    const [columnVisibility, setColumnVisibility] = useState(initialColumnVisibility)
    const tableRef = useRef(null)
    const initialSearchCalledRef = useRef(false)

    // Call onSearch on mount with any pre-set default values from server-side columnFilters and dateRange
    useEffect(function () {
        if (!onSearch || initialSearchCalledRef.current) return
        initialSearchCalledRef.current = true

        const filters = {}
        Object.entries(externalColumnFilters).forEach(function ([columnId, config]) {
            if (config.serverSide && config.value && config.value !== 'all') {
                filters[columnId] = config.value
            }
        })

        if (dateRange.serverSide) {
            if (dateRange.start) filters.dateFrom = dateRange.start
            if (dateRange.end) filters.dateTo = dateRange.end
        }

        if (Object.keys(filters).length > 0) {
            onSearch(filters)
        }
    }, [])

    useEffect(() => {
        table.setPageIndex(0)
    }, [data])

    // ========== HOOKS ==========
    const {
        searchValue,
        debouncedSearchValue,
        columnFilters,
        pendingColumnFilters,
        dateRangeFilter,
        hasFilters,
        setSearchValue,
        handleSearch,
        handleColumnFilterChange,
        handleDateRangeChange,
        handleReset,
        setColumnFilters,
        globalFilterFn,
        dateRangeFilterFn,
    } = useTableFilters({
        externalColumnFilters,
        dateRange,
        globalFilterColumns,
        storageKey,
    })

    // Memoize handler to prevent TableFilters re-renders
    const memoizedHandleSearch = useCallback(() => {
        handleSearch()
        // Call parent onSearch callback with server-side pending filters and dateRange
        if (onSearch) {
            const filters = {}
            Object.entries(pendingColumnFilters).forEach(([columnId, value]) => {
                if (!externalColumnFilters[columnId]?.serverSide) return
                if (value && value !== 'all') {
                    filters[columnId] = value
                }
            })
            if (dateRange.serverSide) {
                if (dateRangeFilter.start) filters.dateFrom = dateRangeFilter.start
                if (dateRangeFilter.end) filters.dateTo = dateRangeFilter.end
            }
            onSearch(filters)
        }
    }, [handleSearch, onSearch, pendingColumnFilters, externalColumnFilters, dateRange, dateRangeFilter])

    const memoizedHandleReset = useCallback(() => {
        handleReset()
        // Call parent onSearch callback with default server-side filters and dateRange
        if (onSearch) {
            const filters = {}
            Object.entries(externalColumnFilters).forEach(([columnId, config]) => {
                if (!config.serverSide) return
                if (config.value && config.value !== 'all') {
                    filters[columnId] = config.value
                }
            })
            if (dateRange.serverSide) {
                if (dateRange.start) filters.dateFrom = dateRange.start
                if (dateRange.end) filters.dateTo = dateRange.end
            }
            onSearch(filters)
        }
    }, [handleReset, onSearch, externalColumnFilters, dateRange])
    const memoizedHandleColumnFilterChange = useCallback(handleColumnFilterChange, [handleColumnFilterChange])
    const memoizedHandleDateRangeChange = useCallback(handleDateRangeChange, [handleDateRangeChange])
    const memoizedSetSearchValue = useCallback(setSearchValue, [setSearchValue])

    const processedColumns = useTableColumns({
        columns,
        columnFilters: externalColumnFilters,
    })

    const handleRowClick = useRowClick({
        onRowClick,
        onDoubleClick,
        doubleClickDelay,
    })

    // ========== TABLE INSTANCE ==========
    const table = useReactTable({
        data,
        columns: processedColumns,
        state: {
            sorting,
            globalFilter: debouncedSearchValue,
            columnFilters,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setSearchValue,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        globalFilterFn: globalFilterColumns.length > 0 ? globalFilterFn : undefined,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        initialState: {
            pagination: { pageSize },
        },
    })

    // ========== DERIVED DATA ==========
    // Get sorting state for reactivity
    const currentSorting = table.getState().sorting

    const filteredRows = useMemo(() => {
        // Use getSortedRowModel() to get rows after filtering AND sorting
        // If sorting is disabled, fall back to getFilteredRowModel()
        const rows = enableSorting
            ? table.getSortedRowModel().rows
            : table.getFilteredRowModel().rows
        return rows.filter((row) => dateRangeFilterFn(row))
    }, [table, data, debouncedSearchValue, columnFilters, dateRangeFilterFn, currentSorting, enableSorting])

    // Get pagination state for reactivity
    const { pageIndex, pageSize: currentPageSize } = table.getState().pagination

    const currentPageRows = useMemo(() => {
        if (!enablePagination) return filteredRows

        const startIdx = pageIndex * currentPageSize
        const endIdx = startIdx + currentPageSize

        return filteredRows.slice(startIdx, endIdx)
    }, [enablePagination, filteredRows, pageIndex, currentPageSize])

    // ============================================================================
    // EXPORT HELPERS
    // ============================================================================

    const getCellDisplayValue = (cell) => {
        const rendered = flexRender(cell.column.columnDef.cell, cell.getContext())

        if (rendered === null || rendered === undefined) return ''
        if (typeof rendered === 'string' || typeof rendered === 'number') return String(rendered)

        // JSX cell (e.g. wrapped in a <span>, badge, icon+text, etc.) — render to
        // static HTML and strip tags to get the same text the user sees on screen
        try {
            const html = ReactDOMServer.renderToStaticMarkup(rendered)
            return html
                .replace(/<[^>]*>/g, ' ')   // strip tags
                .replace(/&nbsp;/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()
        } catch {
            // Fallback to raw underlying value if the cell can't be stringified
            return String(cell.getValue() ?? '')
        }
    }

    const exportData = useMemo(() => {
        if (!exportToExcel) return { headers: [], rows: [] }

        const headers = table.getVisibleFlatColumns().map((col) => ({
            key: col.id,
            label: typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id,
        }))

        const rows = filteredRows.map((row) => {
            const rowData = {}
            row.getVisibleCells().forEach((cell) => {
                rowData[cell.column.id] = getCellDisplayValue(cell)
            })
            return rowData
        })

        return { headers, rows }
    }, [exportToExcel, filteredRows, table])

    // ========== RENDER ==========
    const isClickable = Boolean(onRowClick || onDoubleClick)

    const exportPosition = exportToExcel?.position || 'top-right'
    const isTopExport = exportPosition.startsWith('top')
    const isBottomExport = exportPosition.startsWith('bottom')
    const exportJustifyClass = exportPosition.endsWith('left') ? 'justify-start' : 'justify-end'

    return (
        <div className={`w-full ${minHeight ? `min-h-[${minHeight}]!` : ''}`}>
            {/* Filters Section */}
            {hasFilters && (
                <div className="w-full mb-3">
                    {isCollapsible ? (
                        <CollapsibleContainer title="Search & Filter" defaultOpen={defaultOpen} className="w-full">
                            <div className="space-y-4">
                                <TableFilters
                                    globalFilterColumns={globalFilterColumns}
                                    searchValue={searchValue}
                                    onSearchChange={memoizedSetSearchValue}
                                    onSearchSubmit={memoizedHandleSearch}
                                    onReset={memoizedHandleReset}
                                    dateRangeColumn={dateRange.column}
                                    dateRangeFilter={dateRangeFilter}
                                    onDateRangeChange={memoizedHandleDateRangeChange}
                                    dateRangeStartHidden={dateRange.startHidden ?? false}
                                    dateRangeEndHidden={dateRange.endHidden ?? false}
                                    pendingColumnFilters={pendingColumnFilters}
                                    externalColumnFilters={externalColumnFilters}
                                    onColumnFilterChange={memoizedHandleColumnFilterChange}
                                    showToggle={showToggle}
                                />
                                {exportToExcel?.fileName && isTopExport && (
                                    <div className={`flex ${exportJustifyClass} pt-3 border-t border-gray-200`}>
                                        <ExportToExcel data={exportData} fileName={exportToExcel.fileName} buttonLabel={exportToExcel?.buttonLabel} />
                                    </div>
                                )}
                            </div>
                        </CollapsibleContainer>
                    ) : (
                        <div className="space-y-4">
                            <TableFilters
                                globalFilterColumns={globalFilterColumns}
                                searchValue={searchValue}
                                onSearchChange={memoizedSetSearchValue}
                                onSearchSubmit={memoizedHandleSearch}
                                onReset={memoizedHandleReset}
                                dateRangeColumn={dateRange.column}
                                dateRangeFilter={dateRangeFilter}
                                onDateRangeChange={memoizedHandleDateRangeChange}
                                dateRangeStartHidden={dateRange.startHidden ?? false}
                                dateRangeEndHidden={dateRange.endHidden ?? false}
                                pendingColumnFilters={pendingColumnFilters}
                                externalColumnFilters={externalColumnFilters}
                                onColumnFilterChange={memoizedHandleColumnFilterChange}
                                showToggle={showToggle}
                            />
                            {exportToExcel?.fileName && isTopExport && (
                                <div className={`flex ${exportJustifyClass} pt-3 border-t border-gray-200`}>
                                    <ExportToExcel data={exportData} fileName={exportToExcel.fileName} buttonLabel={exportToExcel?.buttonLabel} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Standalone Export (when no filters, top position) */}
            {exportToExcel?.fileName && isTopExport && !hasFilters && (
                <div className={`flex ${exportJustifyClass} mb-3 pb-3 border-b border-gray-200`}>
                    <ExportToExcel data={exportData} fileName={exportToExcel.fileName} buttonLabel={exportToExcel?.buttonLabel} />
                </div>
            )}

            {/* Table */}
            <div
                className={`overflow-x-auto overflow-y-auto rounded-lg border border-gray-300 shadow-sm`}
                style={{ maxHeight: maxHeight || '650px' }}
            >
                <table ref={tableRef} className="min-w-full divide-y divide-gray-300 table-fixed bg-white">
                    {showTableHeader && <TableHeader table={table} enableSorting={enableSorting} />}
                    <TableBody
                        noDataLabel={noDataLabel}
                        rows={currentPageRows}
                        columns={columns}
                        onRowClick={handleRowClick}
                        onRowRightClick={onRowRightClick}
                        isStripes={isStripes}
                        isClickable={isClickable}
                        isLoading={isLoading}
                    />
                </table>
            </div>

            {/* Pagination */}
            {enablePagination && filteredRows.length > 0 && (
                <TablePagination
                    pageIndex={table.getState().pagination.pageIndex}
                    pageSize={table.getState().pagination.pageSize}
                    pageCount={Math.ceil(filteredRows.length / table.getState().pagination.pageSize)}
                    totalItems={filteredRows.length}
                    canPreviousPage={table.getState().pagination.pageIndex > 0}
                    canNextPage={
                        table.getState().pagination.pageIndex <
                        Math.ceil(filteredRows.length / table.getState().pagination.pageSize) - 1
                    }
                    onFirstPage={() => table.setPageIndex(0)}
                    onPreviousPage={() => table.previousPage()}
                    onNextPage={() => table.nextPage()}
                    onLastPage={() =>
                        table.setPageIndex(
                            Math.ceil(filteredRows.length / table.getState().pagination.pageSize) - 1
                        )
                    }
                    onPageChange={(page) => table.setPageIndex(page)}
                />
            )}

            {/* Bottom Export */}
            {exportToExcel?.fileName && isBottomExport && (
                <div className={`flex ${exportJustifyClass} mt-3 pt-3 border-t border-gray-200`}>
                    <ExportToExcel data={exportData} fileName={exportToExcel.fileName} buttonLabel={exportToExcel?.buttonLabel} />
                </div>
            )}
        </div>
    )
}

// ============================================================================
// PROP TYPES
// ============================================================================

Table.propTypes = {
    /** Array of data objects to display */
    data: PropTypes.array.isRequired,

    noDataLabel: PropTypes.string,

    /** Column definitions for the table */
    columns: PropTypes.array.isRequired,

    /** Enable column sorting */
    enableSorting: PropTypes.bool,

    /** 
     * Default sorting configuration
     * @example [{ id: 'createdDate', desc: true }]
     * @example [{ id: 'name', desc: false }]
     */
    defaultSorting: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            desc: PropTypes.bool,
        })
    ),

    /** Enable pagination controls */
    enablePagination: PropTypes.bool,

    /** Number of rows per page */
    pageSize: PropTypes.number,

    /** Column IDs to include in global search */
    globalFilterColumns: PropTypes.arrayOf(PropTypes.string),

    /** 
     * Column filter configurations
     * @example
     * {
     *   status: {
     *     label: 'Status',
     *     allLabel: 'All', // Optional: custom label for the 'All' option. Defaults to 'All {label}'
     *     options: [{ value: 'active', label: 'Active' }],
     *     exactValue: true, // Default: true - exact match only
     *     filterAccessor: (val) => val.id, // For nested values
     *     rowAccessor: (row) => row.status, // For computed values
     *   }
     * }
     */
    columnFilters: PropTypes.objectOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            allLabel: PropTypes.string,
            noAll: PropTypes.bool,
            type: PropTypes.oneOf(['date', 'typeahead']),
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired,
                })
            ).isRequired,
            exactValue: PropTypes.bool,
            filterAccessor: PropTypes.func,
            rowAccessor: PropTypes.func,
        })
    ),

    /** Date range filter configuration */
    dateRange: PropTypes.shape({
        column: PropTypes.string.isRequired,
        start: PropTypes.string,
        end: PropTypes.string,
    }),

    /** Callback when search button is clicked with applied filters */
    onSearch: PropTypes.func,

    /** Callback when a row is clicked */
    onRowClick: PropTypes.func,

    /** Callback when a row is right-clicked */
    onRowRightClick: PropTypes.func,

    /** Callback when a row is double-clicked */
    onDoubleClick: PropTypes.func,

    /** Time window for double-click detection (ms) */
    doubleClickDelay: PropTypes.number,

    /** Enable alternating row colors */
    isStripes: PropTypes.bool,

    /** Initial column visibility state */
    initialColumnVisibility: PropTypes.object,

    /** Minimum height for the table container */
    minHeight: PropTypes.string,

    /** Maximum height for the table container */
    maxHeight: PropTypes.string,

    /** Wrap filters in a collapsible container */
    isCollapsible: PropTypes.bool,

    /** Show loading state in table body */
    isLoading: PropTypes.bool,

    /** Show or hide the table header row */
    showTableHeader: PropTypes.bool,

    /** Whether the collapsible filters section is open by default */
    defaultOpen: PropTypes.bool,

    /** Filename for Excel export (enables export button) */
    exportToExcel: PropTypes.shape({
        fileName: PropTypes.string.isRequired,
        buttonLabel: PropTypes.string,
        position: PropTypes.oneOf(['top-right', 'top-left', 'bottom-right', 'bottom-left']),
    }),

    /** Unique key for persisting table state in sessionStorage */
    storageKey: PropTypes.string,

    /** Show toggle switch in filters section (for demonstration purposes) */
    showToggle: PropTypes.shape({
        toggleState: PropTypes.bool.isRequired,
        onToggleChange: PropTypes.func.isRequired,
    }),
}

export default React.memo(Table)
