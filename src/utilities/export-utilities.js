/**
 * Transform filtered rows and columns into exportable data format
 * @param {Array} rows - TanStack filtered rows
 * @param {Array} columns - Column definitions
 * @returns {Object} { headers: Array, rows: Array } - Clean data format for export
 */
export const transformRowsForExport = (rows, columns) => {
    // Extract headers from column definitions
    const headers = columns
        .filter(col => col.accessorKey) // Only include columns with accessorKey
        .map(col => ({
            key: col.accessorKey,
            label: typeof col.header === 'string' ? col.header : col.accessorKey,
            column: col
        }))

    // Transform rows to plain objects with only needed columns
    const transformedRows = rows.map(row => {
        const rowData = {}
        headers.forEach(header => {
            const rawValue = row.original[header.key]
            let displayValue = rawValue

            // Use exportFormatter if provided
            if (header.column.exportFormatter && typeof header.column.exportFormatter === 'function') {
                try {
                    displayValue = header.column.exportFormatter(rawValue, row.original)
                } catch {
                    // If exportFormatter fails, fallback to raw value
                    displayValue = rawValue
                }
            } else if (header.column.cell && typeof header.column.cell === 'function') {
                // If column has a custom cell renderer, use it to get the display value
                try {
                    const cellContext = {
                        getValue: () => rawValue,
                        row: { original: row.original },
                        cell: { value: rawValue }
                    }
                    displayValue = header.column.cell(cellContext)
                } catch {
                    // If cell renderer fails, fallback to raw value
                    displayValue = rawValue
                }
            }

            // Handle object values that weren't handled by exportFormatter or cell renderer
            if (displayValue !== null && displayValue !== undefined && typeof displayValue === 'object') {
                // Try common display patterns
                if (displayValue.name) {
                    displayValue = displayValue.name
                } else if (displayValue.label) {
                    displayValue = displayValue.label
                } else {
                    // Convert object to string representation
                    displayValue = JSON.stringify(displayValue)
                }
            }

            // Handle null/undefined values
            rowData[header.key] = displayValue !== null && displayValue !== undefined ? displayValue : ''
        })
        return rowData
    })

    return {
        headers: headers,
        rows: transformedRows
    }
}
