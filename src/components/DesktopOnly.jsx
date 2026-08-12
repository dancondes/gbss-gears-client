import React from 'react'
import { useIsDesktop } from '@/hooks/use-is-desktop'
import { isDeviceBypassed } from '@/lib/device-bypass'

function DesktopOnly({ children }) {
    const isDesktop = useIsDesktop()
    const deviceIsBypassed = isDeviceBypassed()

    if (!isDesktop && !deviceIsBypassed) {
        return <DesktopOnlyFallback />
    }

    return children
}

DesktopOnly.propTypes = {
    children: React.ReactNode,
}

const DesktopOnlyFallback = () => (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <svg
            className="h-12 w-12 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
        <h1 className="text-xl font-semibold text-gray-900">
            Desktop required
        </h1>
        <p className="max-w-sm text-sm text-gray-500">
            This app is currently only available on desktop browsers.
            Please open this page on a desktop or laptop computer to continue.
        </p>
    </div>
)

export default DesktopOnly