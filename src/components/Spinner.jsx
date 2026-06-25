import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

const Spinner = ({
    bgColor = 'white',
    spinnerColor = 'primary',
}) => {
    const [showExtendedMessage, setShowExtendedMessage] = useState(false)

    useEffect(function handleLoadingTimeout() {
        const timer = setTimeout(function() {
            setShowExtendedMessage(true)
        }, 5000)

        return function cleanup() {
            clearTimeout(timer)
        }
    }, [])

    // Map background colors to actual Tailwind classes
    const bgClasses = {
        black: 'bg-black/50',
        white: 'bg-white/90',
        transparent: 'bg-transparent',
    }

    // Map spinner colors to actual Tailwind classes
    const spinnerClasses = {
        primary: 'border-t-primary',
        secondary: 'border-t-secondary',
        white: 'border-t-white',
        black: 'border-t-black',
    }

    return (
        <div className={`fixed inset-0 ${bgClasses[bgColor] || bgClasses.black} flex justify-center items-center z-50`}>
            <div className="flex flex-col items-center gap-4">
                <div className={`animate-spin rounded-full h-16 w-16 border-4 border-gray-300 ${spinnerClasses[spinnerColor] || spinnerClasses.primary}`}></div>
                {showExtendedMessage && (
                    <p className="text-gray-600 text-sm">
                        This is taking a bit longer than expected. We&apos;re still working on it, please wait...
                    </p>
                )}
            </div>
        </div>
    )
}

Spinner.propTypes = {
    bgColor: PropTypes.oneOf(['black', 'white', 'transparent']),
    spinnerColor: PropTypes.oneOf(['primary', 'secondary', 'white', 'black']),
}

export default Spinner