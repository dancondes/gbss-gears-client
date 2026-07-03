import React from 'react';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';

const ExportToExcel = ({ data, fileName, buttonLabel = 'Excel' }) => {
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
                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} />
                <path strokeLinecap="round" strokeWidth={1.5} d="M3 9h18M9 3v18M15 3v18" />
                <path strokeLinecap="round" strokeWidth={1.5} d="M3 15h18" />
            </svg>
            {buttonLabel}
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
    buttonLabel: PropTypes.string
}

export default ExportToExcel;