import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

const Spinner = ({
    bgColor = 'white',
    spinnerColor = 'primary',
}) => {
    const [showExtendedMessage, setShowExtendedMessage] = useState(false)

    useEffect(function handleLoadingTimeout() {
        const timer = setTimeout(function () {
            setShowExtendedMessage(true)
        }, 5000)

        return function cleanup() {
            clearTimeout(timer)
        }
    }, [])

    // Map background colors to actual Tailwind classes
    const bgClasses = {
        black: 'bg-black/50 backdrop-blur-sm',
        white: 'bg-white/80 backdrop-blur-sm',
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
        <div
            role="status"
            aria-live="polite"
            className={`fixed inset-0 z-50 flex items-center justify-center ${bgClasses[bgColor] || bgClasses.black}`}
        >
            <div className="flex flex-col items-center gap-3">
                <div
                    className={`h-10 w-10 animate-spin rounded-full border-[3px] border-gray-200 ${spinnerClasses[spinnerColor] || spinnerClasses.primary}`}
                />
                <span className="sr-only">Loading</span>

                {showExtendedMessage && (
                    <p className="max-w-55 text-center text-xs leading-relaxed text-tertiary motion-safe:animate-[fadeIn_0.3s_ease-out]">
                        This is taking a bit longer than expected. We&apos;re still working on it, please wait...
                    </p>
                )}
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    )
}

Spinner.propTypes = {
    bgColor: PropTypes.oneOf(['black', 'white', 'transparent']),
    spinnerColor: PropTypes.oneOf(['primary', 'secondary', 'white', 'black']),
}

export default Spinner