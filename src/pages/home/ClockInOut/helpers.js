export function formatTime(date) {
    if (!date) return '__:__:__ AM/PM'
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export function formatTimeShort(date) {
    if (!date) return '__:__ AM/PM'
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function calcDuration(outTime, inTime) {
    if (!outTime || !inTime) return '0.00'
    const diffMs = inTime - outTime
    if (diffMs <= 0) return '0.00'
    return (diffMs / 1000 / 60).toFixed(2)
}

export function formatDateTime(date) {
    if (!date) return ''
    const day = date.toLocaleDateString([], { weekday: 'long' })
    const d = date.getDate()
    const month = date.toLocaleDateString([], { month: 'long' })
    const year = date.getFullYear()
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }).toUpperCase()
    return `${day}, ${d} ${month} ${year} ${time}`
}