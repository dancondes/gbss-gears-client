import React, { useEffect, useState } from 'react'
import { formatDateTime } from '../helpers'

function RunningTime() {
    const [now, setNow] = useState(new Date())

    useEffect(function () {
        const timer = setInterval(function () {
            setNow(new Date())
        }, 1000)
        return function () { clearInterval(timer) }
    }, [])

    return (
        <p
            className="text-xs sm:text-sm text-primary font-medium truncate max-w-[200px] sm:max-w-none"
            title={formatDateTime(now)}
        >
            {formatDateTime(now)}
        </p>
    )
}

export default RunningTime
