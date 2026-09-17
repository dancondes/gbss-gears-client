import React, { useEffect } from 'react'
import { enableDeviceBypass } from '@/lib/device-bypass'

function EnableDeviceBypassPage() {
    useEffect(function () {
        // Soft convenience mechanism only: this route isn't a real security control.
        enableDeviceBypass()
    }, [])

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-white px-6">
            <div className="flex max-w-md flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <svg
                        className="h-7 w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M5 12.5l4.5 4.5L19 3.5" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Bypass enabled for this device</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        This device can now access the app without the desktop-only gate.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EnableDeviceBypassPage
