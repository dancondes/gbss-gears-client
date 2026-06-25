import React from 'react';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';

const ExportToExcel = ({ data, fileName }) => {
    const exportToExcel = () => {
        if (!data || !data.headers || !data.rows) {
            return;
        }

        // Create worksheet data with headers and rows
        const worksheetData = [
            data.headers.map(h => h.label), // Header row
            ...data.rows.map(row =>
                data.headers.map(h => row[h.key] || '')
            )
        ];

        // Create worksheet from array of arrays
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // Auto-size columns based on content
        const columnWidths = data.headers.map((h) => {
            const maxLength = Math.max(
                h.label.length,
                ...data.rows.map(row => String(row[h.key] || '').length)
            );
            return { wch: Math.min(maxLength + 2, 50) }; // Max width of 50
        });
        worksheet['!cols'] = columnWidths;

        // Create workbook and add worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Generate filename with timestamp
        const timestamp = new Date().toISOString().slice(0, 10);
        const finalFileName = `${fileName}_${timestamp}.xlsx`;

        // Write the file
        XLSX.writeFile(workbook, finalFileName);
    };

    return (
        <button
            onClick={exportToExcel}
            title='Export to Excel'
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium cursor-pointer transition-colors"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Excel
        </button>
    );
}

ExportToExcel.propTypes = {
    data: PropTypes.shape({
        headers: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired
            })
        ).isRequired,
        rows: PropTypes.array.isRequired
    }).isRequired,
    fileName: PropTypes.string.isRequired,
}

export default ExportToExcel;