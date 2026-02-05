import { formatDate, formatTime, formatNumber, formatLink } from '../../../utilities'

export function formatCellValue(value, type, format) {
    if (!type) return value || '-'

    switch (type.toLowerCase()) {
        case 'date':
            return formatDate(value, format)
        case 'time':
            return formatTime(value)
        case 'number':
            return formatNumber(value)
        case 'link':
            return formatLink(value)
        default:
            return value || '-'
    }
}
