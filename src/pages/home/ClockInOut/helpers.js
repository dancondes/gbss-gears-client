export function formatTime(dateString) {
    const date = parseCustomDateTime(dateString)
    if (!date) return '__:__:__ AM/PM'
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export function formatTimeShort(date) {
    if (!date) return '__:__ AM/PM'
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function calcDuration(outTime, inTime) {
    if (!outTime || !inTime) return '0.00'
    const diffMs = parseCustomDateTime(inTime) - parseCustomDateTime(outTime)
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

export function parseCustomDateTime(dateString) {
    if (!dateString) return null

    const match = dateString.match(/^(\d{4}-\d{2}-\d{2})T(\d{1,2}):(\d{2})(AM|PM)$/i)
    if (!match) return null

    const [, datePart, hoursRaw, minutes, period] = match
    let hours = parseInt(hoursRaw, 10) % 12
    if (period.toUpperCase() === 'PM') hours += 12

    const date = new Date(datePart)
    date.setHours(hours, parseInt(minutes, 10), 0, 0)

    return isNaN(date.getTime()) ? null : date
}