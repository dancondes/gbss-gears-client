// ─── Private helper ──────────────────────────────────────────────────────────
/**
 * Converts any Date to Manila-local date/time components (Asia/Manila, UTC+8).
 * Using Intl.DateTimeFormat is the correct, DST-safe approach — it works even
 * if the JS runtime is running in UTC (e.g. a Node server).
 * @param {Date} date
 * @returns {{ year: number, month: number, day: number, hours: number, minutes: number }}
 */
function getManilaDateParts(date) {
    const fmt = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Manila',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hour12: false,
    })
    const parts = Object.fromEntries(fmt.formatToParts(date).map(p => [p.type, p.value]))
    return {
        year:    parseInt(parts.year),
        month:   parseInt(parts.month),   // 1-based
        day:     parseInt(parts.day),
        hours:   parseInt(parts.hour),    // 0-23
        minutes: parseInt(parts.minute),
    }
}

// ─── Public functions ─────────────────────────────────────────────────────────

/**
 * Returns current date plus specified number of days in "YYYY-MM-DD" format
 * @param {number} days - Number of days to add
 * @returns {string} Date like "2024-07-07" if days=7 and today is "2024-06-30"
 */
export function getCurrentDate(days = 0) {
    const date = new Date()
    date.setDate(date.getDate() + days)
    const { year, month, day } = getManilaDateParts(date)
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

/**
 * Returns current time in 24-hour format (HH:MM) in Manila time
 * @returns {string} Time like "14:30" or "09:15"
 */
export function getCurrentTime() {
    const { hours, minutes } = getManilaDateParts(new Date())
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

/**
 * Format date string (YYYY/MM/DD or ISO 8601) to the specified format.
 * Always interprets the timestamp in Manila time (Asia/Manila, UTC+8).
 * @param {string} dateString - Date string (e.g. "2026-05-22" or "2026-05-22T01:14:47+00:00")
 * @param {string} format - Desired output format (default: "DD/MM/YYYY")
 * @returns {string} Formatted date like "22/05/2026" or "-" if invalid
 */
export function formatDate(dateString, format = 'DD/MM/YYYY') {
    if (!dateString) return '-'

    const date = new Date(dateString)
    if (isNaN(date.getTime())) return '-'

    const { year, month, day } = getManilaDateParts(date)
    const dd = String(day).padStart(2, '0')
    const mm = String(month).padStart(2, '0')

    switch (format) {
        case 'DD/MM/YYYY':
            return `${dd}/${mm}/${year}`
        case 'MM/DD/YYYY':
            return `${mm}/${dd}/${year}`
        case 'YYYY-MM-DD':
            return `${year}-${mm}-${dd}`
        case 'MMM DD, YYYY': {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            return `${monthNames[month - 1]} ${dd}, ${year}`
        }
        default:
            return `${dd}/${mm}/${year}`
    }
}

/**
 * Format 24-hour time string to 12-hour format with AM/PM
 * @param {string} timeString - Time string in HH:MM format (e.g., "15:00")
 * @returns {string} Formatted time like "03:00 PM"
 */
export function formatTime(timeString) {
    if (!timeString) return '-'

    // Split time string into hours and minutes
    const [hours, minutes] = timeString.includes('T') ? timeString.split('T')[1].split(':') : timeString.split(':')

    // Validate input
    if (!hours || !minutes) return timeString

    const hour = parseInt(hours, 10)
    const min = parseInt(minutes, 10)

    // Validate hour and minute values
    if (isNaN(hour) || isNaN(min) || hour < 0 || hour > 23 || min < 0 || min > 59) {
        return timeString
    }

    // Determine AM/PM
    const period = hour >= 12 ? 'PM' : 'AM'

    // Convert to 12-hour format
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour

    // Format with leading zeros
    const formattedHour = String(hour12).padStart(2, '0')
    const formattedMin = String(min).padStart(2, '0')

    return `${formattedHour}:${formattedMin} ${period}`
}

/**
 * Format an ISO 8601 datetime string to "DD/MM/YYYY HH:MM AM/PM" in Manila time.
 * Correctly handles timezone offsets (e.g. "+00:00", "+08:00").
 * @param {string} dateTimeString - ISO 8601 string like "2026-05-22T01:14:47+00:00"
 * @returns {string} Formatted string like "22/05/2026 09:14 AM"
 */
export function formatDateTime(dateTimeString) {
    if (!dateTimeString) return '-'

    const date = new Date(dateTimeString)
    if (isNaN(date.getTime())) return '-'

    const { year, month, day, hours, minutes } = getManilaDateParts(date)
    const dd = String(day).padStart(2, '0')
    const mm = String(month).padStart(2, '0')
    const formattedDate = `${dd}/${mm}/${year}`

    const time24 = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
    const formattedTime = formatTime(time24)

    return `${formattedDate} ${formattedTime}`
}

/**
 * Add exactly 1 month to the given date.
 * Handles month-end edge cases (e.g., Jan 31 + 1 month = Feb 28/29).
 * @param {string|Date} dateInput - Date string (YYYY-MM-DD) or Date object
 * @param {string} format - Desired output format (default: "DD/MM/YYYY")
 * @returns {string} Formatted date string with 1 month added
 */
export function addOneMonth(dateInput, format = 'DD/MM/YYYY') {
    const date = new Date(dateInput)

    if (isNaN(date.getTime())) {
        throw new Error('Invalid date provided')
    }

    const currentDay = date.getDate()
    const currentMonth = date.getMonth()
    const currentYear = date.getFullYear()

    // Create new date for next month, same day
    const newDate = new Date(currentYear, currentMonth + 1, currentDay)

    // Handle month-end edge case: if the day is invalid for the new month,
    // it automatically rolls over to the next month or adjusts to the last day
    if (newDate.getDate() !== currentDay) {
        // Day overflowed, set to last day of previous month (target month)
        newDate.setDate(0)
    }

    return formatDate(newDate, format)
}

/**
 * Convert "01:00 AM" to "01:00" (24-hour format for HTML time input)
 * @param {string} time12h
 * @returns {string|null}
 */
export function convertTo24HourFormat(time12h) {
    if (!time12h) return null

    const [time, modifier] = time12h.split(' ')
    let [hours, minutes] = time.split(':')

    if (hours === '12') {
        hours = modifier === 'AM' ? '00' : '12'
    } else if (modifier === 'PM') {
        hours = String(parseInt(hours, 10) + 12).padStart(2, '0')
    }

    return `${hours.padStart(2, '0')}:${minutes}`
}

/**
 * Convert "01:00" to "01:00 AM" (12-hour format for API)
 * @param {string} time24h
 * @returns {string}
 */
export function convertTo12HourFormat(time24h) {
    if (!time24h) return '01:00 AM'

    const [hours, minutes] = time24h.split(':')
    const hour = parseInt(hours, 10)

    if (hour === 0) {
        return `12:${minutes} AM`
    } else if (hour < 12) {
        return `${String(hour).padStart(2, '0')}:${minutes} AM`
    } else if (hour === 12) {
        return `12:${minutes} PM`
    } else {
        return `${String(hour - 12).padStart(2, '0')}:${minutes} PM`
    }
}

export function spliceDateFromTime(dateTimeString, separator = 'T') {
    if (!dateTimeString) return null
    const [datePart] = dateTimeString.split(separator)
    return datePart
}

/**
 * Returns January 1st of the current year in "YYYY-MM-DD" format
 * @returns {string} Date like "2026-01-01"
 */
export function getJanuaryFirst() {
    const year = new Date().getFullYear()
    return `${year}-01-01`
}

/**
 * @param {string} dateString Should be in "YYYY-MM-DD" format
 * @returns {string|null}
 */
export function extractMonthFromDate(dateString) {
    if (!dateString) return null
    const month = dateString.split('-')?.[1]
    return month
}

export function nextMonday(today = new Date()) {
    const day = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const daysUntilMonday = day === 0 ? 1 : 8 - day; // Sunday → 1, Monday → 7, others → 8 - day

    const result = new Date(today);
    result.setDate(today.getDate() + daysUntilMonday);
    return result.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

export function nextFriday(today = new Date()) {
    const day = today.getDay();
    const daysUntilFriday = (5 - day + 7) % 7 || 7;

    const result = new Date(today);
    result.setDate(today.getDate() + daysUntilFriday);
    return result.toISOString().slice(0, 10);
}