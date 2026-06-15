import React from 'react'
import PropTypes from 'prop-types'

const Calendar = ({ selectedDate, onDateSelect, bookingCounts = {} }) => {
    const currentDate = selectedDate ? new Date(selectedDate) : new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // Get first day of month and total days
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay() // 0 = Sunday

    // Get previous month's last days
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    const prevMonthDays = startingDayOfWeek

    // Month names
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    // Generate calendar days
    const calendarDays = []

    // Previous month's days
    for (let i = prevMonthDays - 1; i >= 0; i--) {
        calendarDays.push({
            day: prevMonthLastDay - i,
            isCurrentMonth: false,
            isPrevMonth: true,
            date: new Date(year, month - 1, prevMonthLastDay - i)
        })
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push({
            day,
            isCurrentMonth: true,
            isPrevMonth: false,
            date: new Date(year, month, day)
        })
    }

    // Next month's days to fill the grid
    const remainingDays = 42 - calendarDays.length // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
        calendarDays.push({
            day,
            isCurrentMonth: false,
            isPrevMonth: false,
            date: new Date(year, month + 1, day)
        })
    }

    const handlePrevMonth = () => {
        const newDate = new Date(year, month - 1, 1)
        onDateSelect(formatDateToString(newDate))
    }

    const handleNextMonth = () => {
        const newDate = new Date(year, month + 1, 1)
        onDateSelect(formatDateToString(newDate))
    }

    const handleDateClick = (date) => {
        onDateSelect(formatDateToString(date))
    }

    const formatDateToString = (date) => {
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, '0')
        const d = String(date.getDate()).padStart(2, '0')
        return `${y}-${m}-${d}`
    }

    const isToday = (date) => {
        const today = new Date()
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
    }

    const isSelected = (date) => {
        if (!selectedDate) return false
        const selected = new Date(selectedDate)
        return date.getDate() === selected.getDate() &&
            date.getMonth() === selected.getMonth() &&
            date.getFullYear() === selected.getFullYear()
    }

    const getBookingCount = (date) => {
        const dateStr = formatDateToString(date)
        return bookingCounts[dateStr] || 0
    }

    return (
        <div className="bg-white rounded-lg shadow p-3 md:p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 md:mb-4">
                <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    aria-label="Previous month"
                >
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <h2 className="text-base md:text-lg font-semibold text-gray-900">
                    {monthNames[month]} {year}
                </h2>

                <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    aria-label="Next month"
                >
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 gap-0.5 md:gap-1 mb-1 md:mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-center text-[0.65rem] md:text-xs font-semibold text-gray-600 py-1 md:py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-0.5 md:gap-1">
                {calendarDays.map((dateObj, index) => {
                    const bookingCount = getBookingCount(dateObj.date)
                    const hasBookings = bookingCount > 0

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleDateClick(dateObj.date)}
                            className={`
                                relative p-1 md:p-1.5 rounded transition-colors cursor-pointer flex flex-col items-center justify-center min-h-11 md:min-h-12 text-[0.7rem] md:text-xs
                                ${!dateObj.isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                                ${isToday(dateObj.date) ? 'bg-primary/10 font-bold' : ''}
                                ${isSelected(dateObj.date) ? 'bg-primary! text-white font-semibold' : 'hover:bg-gray-100'}
                                ${hasBookings && dateObj.isCurrentMonth && !isSelected(dateObj.date) ? 'bg-primary/10' : ''}
                            `}
                        >
                            <span className="block leading-none">{dateObj.day}</span>
                            {hasBookings && dateObj.isCurrentMonth && (
                                <span className={`block text-[0.5rem] md:text-[0.55rem] leading-none font-semibold whitespace-nowrap mt-0.5 ${isSelected(dateObj.date) ? 'text-white' : 'text-primary'}`}>
                                    ({bookingCount})
                                </span>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

Calendar.propTypes = {
    selectedDate: PropTypes.string,
    onDateSelect: PropTypes.func.isRequired,
    bookingCounts: PropTypes.object,
}

export default Calendar
