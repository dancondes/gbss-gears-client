import React, { useEffect, useState } from 'react'

function MaintenancePage() {
    const [secondsUntilReload, setSecondsUntilReload] = useState(120)

    useEffect(() => {
        const timer = window.setInterval(() => {
            setSecondsUntilReload((currentSeconds) => {
                if (currentSeconds <= 1) {
                    window.clearInterval(timer)
                    window.location.reload()
                    return 0
                }

                return currentSeconds - 1
            })
        }, 1000)

        return function () {
            window.clearInterval(timer)
        }
    }, [])

    function handleReload() {
        window.location.reload()
    }

    const minutes = Math.floor(secondsUntilReload / 60)
    const seconds = String(secondsUntilReload % 60).padStart(2, '0')

    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-[#fafbfc]">
            <main className="w-full max-w-100 text-center">
                <div className="w-21 h-21 mx-auto mb-3 rounded-full flex items-center justify-center bg-linear-to-br from-[#0d416e] to-dark-primary">
                    <svg
                        className="w-10.5 h-10.5 animate-spin"
                        style={{ animationDuration: '6s' }}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="12" cy="12" r="3" stroke="#ffffff" strokeWidth="1.7" />
                        <path
                            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
                            stroke="#ffffff"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <h1 className="text-2xl font-semibold text-dark-primary mb-2">We&apos;ll be right back</h1>
                <p className="text-sm text-slate-500 leading-relaxed">
                    We&apos;re performing maintenance. Please check back shortly.
                </p>

                <button
                    type="button"
                    onClick={handleReload}
                    className="mt-6 inline-flex items-center px-4 py-2 rounded-md bg-[#0d416e] hover:bg-dark-primary text-white text-sm font-medium transition-colors cursor-pointer"
                >
                    Try Again
                </button>
                <p className="mt-3 text-xs text-slate-400">
                    Retrying automatically in {minutes}:{seconds}
                </p>
            </main>
        </div>
    )
}

export default MaintenancePage