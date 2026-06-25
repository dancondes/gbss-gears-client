export function formatNumber(value) {
    if (value === null || value === undefined) return '-'
    if (isNaN(value)) return value
    return Number(value).toLocaleString()
}

export function formatLink(value) {
    if (!value) return '-'
    return (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {value}
        </a>
    )
}

export { formatDate, formatTime } from './date-utilities'
