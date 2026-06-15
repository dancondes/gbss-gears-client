import { useMemo } from 'react'
import { formatDate, formatDateTime, formatTime } from '@/utilities/date-utilities'
import { formatFileSize, formatNumberWithCommas } from '@/utilities'

/**
 * Built-in cell formatters for common data types
 * Can be used by specifying `type` on a column definition
 */
const CELL_FORMATTERS = {
    date: ({ getValue }) => formatDate(getValue()),
    time: ({ getValue }) => formatTime(getValue()),
    datetime: ({ getValue }) => formatDateTime(getValue()),
    number: ({ getValue }) => {
        const value = getValue()
        return value || value === 0 ? formatNumberWithCommas(value) : '-'
    },
    decimal: ({ getValue }) => {
        const value = getValue()
        return value || value === 0 ? formatNumberWithCommas(parseFloat(value).toFixed(3)) : '-'
    },
    boolean: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
    link: ({ getValue }) => {
        const url = getValue()
        return url ? (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
            >
                {url}
            </a>
        ) : (
            '-'
        )
    },
    email: ({ getValue }) => {
        const email = getValue()
        return email ? (
            <a
                href={`mailto:${email}`}
                className="text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
            >
                {email}
            </a>
        ) : (
            '-'
        )
    },
    filesize: ({ getValue }) => {
        const size = getValue()
        return formatFileSize(size)
    },
}

/**
 * Extracts a sortable value from an object by checking common field names
 * 
 * @param {*} value - The value to extract from (object or primitive)
 * @returns {*} Sortable primitive value
 */
function extractSortableValue(value) {
    if (value === null || value === undefined) return ''
    if (typeof value !== 'object') return value

    const commonFields = ['description', 'name', 'label', 'title', 'text', 'value']
    
    for (const field of commonFields) {
        if (value[field] !== undefined && value[field] !== null) {
            return value[field]
        }
    }

    const stringFields = Object.keys(value).filter(key => typeof value[key] === 'string')
    if (stringFields.length > 0) {
        return value[stringFields[0]]
    }

    return String(value)
}

/**
 * Creates a custom sorting function that handles both primitives and objects
 * 
 * @returns {Function} TanStack Table sorting function
 */
function createSmartSortingFn() {
    return (rowA, rowB, columnId) => {
        const valueA = rowA.getValue(columnId)
        const valueB = rowB.getValue(columnId)

        const sortableA = extractSortableValue(valueA)
        const sortableB = extractSortableValue(valueB)

        if (sortableA === sortableB) return 0
        if (sortableA === '' || sortableA === null || sortableA === undefined) return 1
        if (sortableB === '' || sortableB === null || sortableB === undefined) return -1

        if (typeof sortableA === 'string' && typeof sortableB === 'string') {
            return sortableA.localeCompare(sortableB, undefined, { numeric: true, sensitivity: 'base' })
        }

        return sortableA < sortableB ? -1 : 1
    }
}

/**
 * Creates a custom filter function for columns with nested objects or computed values
 * 
 * @param {Object} filterConfig - The filter configuration
 * @param {boolean} filterConfig.exactValue - If true (default), performs exact matching; if false, performs partial/inclusive matching
 * @param {string} filterConfig.type - Column type (e.g., 'date')
 * @param {Array} filterConfig.customOptions - Optional array of custom filter options with ids
 * @returns {Function} TanStack Table filter function
 */
const createColumnFilterFn = (filterConfig) => {
    return (row, columnId, filterValue) => {
        if (!filterValue || filterValue === 'all') return true

        let valueToCompare
        if (filterConfig.rowAccessor) {
            valueToCompare = filterConfig.rowAccessor(row.original)
        } else if (filterConfig.filterAccessor) {
            const cellValue = row.getValue(columnId)
            valueToCompare = filterConfig.filterAccessor(cellValue)
        } else {
            valueToCompare = row.getValue(columnId)
        }

        // Handle custom options with ID arrays
        if (filterConfig.customOptions) {
            const customOption = filterConfig.customOptions.find(
                opt => String(opt.label).toLowerCase() === String(filterValue).toLowerCase()
            )
            if (customOption && customOption.ids) {
                // Check if value is in the custom option's ids array
                return customOption.ids.includes(valueToCompare)
            }
        }

        if (filterConfig.type === 'date') {
            if (!valueToCompare) return false
            
            const cellDateObj = new Date(valueToCompare)
            cellDateObj.setHours(0, 0, 0, 0)
            const cellDate = cellDateObj.getTime()
            
            const filterDateObj = new Date(filterValue)
            filterDateObj.setHours(0, 0, 0, 0)
            const filterDate = filterDateObj.getTime()
            
            return cellDate === filterDate
        }

        // Default to exact matching (exactValue defaults to true)
        const exactValue = filterConfig.exactValue !== false

        const valueStr = String(valueToCompare).toLowerCase()
        const filterStr = String(filterValue).toLowerCase()

        if (exactValue) {
            // Exact match: value must equal filter value exactly
            return valueStr === filterStr
        } else {
            // Partial match: filter value can be anywhere in the value
            return valueStr.includes(filterStr)
        }
    }
}

/**
 * Custom hook for processing table columns
 * Adds type-specific formatters, widths, and custom filter functions
 * 
 * @param {Object} options - Configuration options
 * @param {Array} options.columns - Column definitions
 * @param {Object} options.columnFilters - External column filter configurations
 * @returns {Array} Processed columns ready for TanStack Table
 * 
 * @example
 * const columns = [
 *   { accessorKey: 'name', header: 'Name' },
 *   { accessorKey: 'createdAt', header: 'Created', type: 'date' },
 *   { accessorKey: 'amount', header: 'Amount', type: 'decimal', width: 120 },
 * ]
 * 
 * const processedColumns = useTableColumns({ columns, columnFilters })
 */
export const useTableColumns = ({ columns, columnFilters = {} }) => {
    const processedColumns = useMemo(() => {
        return columns.map((column) => {
            let processedColumn = { ...column }

            if (column.type && CELL_FORMATTERS[column.type]) {
                processedColumn.cell = CELL_FORMATTERS[column.type]
            }

            if (column.width) {
                processedColumn.size = column.width
            }

            const filterConfig = columnFilters[column.accessorKey]
            if (filterConfig) {
                // Always use custom filter function when a filter config exists
                // This ensures exactValue flag is respected
                processedColumn.filterFn = createColumnFilterFn(filterConfig)
            }

            if (!column.sortingFn) {
                processedColumn.sortingFn = createSmartSortingFn()
            }

            return processedColumn
        })
    }, [columns, columnFilters])

    return processedColumns
}

/**
 * Available column types for automatic formatting
 */
export const COLUMN_TYPES = {
    DATE: 'date',
    TIME: 'time',
    DATETIME: 'datetime',
    DECIMAL: 'decimal',
    BOOLEAN: 'boolean',
    LINK: 'link',
}
