import React from 'react'
import PropTypes from 'prop-types'

function TimeDisplay({ time, large }) {
    if (large) {
        return (
            <span className="text-xl font-bold text-gray-800 tabular-nums">
                {time || '__:__:__ AM/PM'}
            </span>
        )
    }
    return (
        <span className="text-sm text-gray-500 tabular-nums">
            {time || '__:__ AM/PM'}
        </span>
    )
}

TimeDisplay.propTypes = {
    time: PropTypes.string,
    large: PropTypes.bool,
}

export default TimeDisplay
