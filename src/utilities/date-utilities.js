export function formatDate(value, format = 'dd/mm/yyyy') {
    if (!value) return '-'
    
    const parts = value.split('-')
    if (parts.length !== 3) return value
    
    const [year, month, day] = parts
    
    return format
        .replace('yyyy', year)
        .replace('mm', month)
        .replace('dd', day)
}

export function formatTime(value) {
    if (!value) return '-'
    
    const [hours, minutes] = value.split(':')
    const hour = parseInt(hours, 10)
    const period = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    
    return `${hour12}:${minutes} ${period}`
}
