import { useState, useEffect } from 'react'
import { isDesktop as isDesktopByUA } from '@/hooks/ua-parser'

const DESKTOP_MIN_WIDTH = 768

/**
 * Returns true only when BOTH conditions hold:
 *   1. The device itself is detected as desktop (UA + touch-point check
 *      from ua-parser.js - handles the Mac vs iPad ambiguity)
 *   2. The current viewport is at least 768px wide
 *
 * The UA/touch check is computed once (a device's hardware doesn't
 * change mid-session). The width check re-evaluates on every resize,
 * so a desktop browser window narrowed below 768px will flip to false,
 * and widening it back will flip to true again.
 */
export function useIsDesktop() {
    const [uaIsDesktop] = useState(() => isDesktopByUA())

    const getWidthOk = () =>
        typeof window !== 'undefined' && window.innerWidth >= DESKTOP_MIN_WIDTH

    const [isDesktop, setIsDesktop] = useState(() => uaIsDesktop && getWidthOk())

    useEffect(() => {
        if (!uaIsDesktop) {
            setIsDesktop(false)
            return
        }

        const handleResize = () => setIsDesktop(getWidthOk())

        handleResize()

        if (typeof window === 'undefined') {
            return undefined
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [uaIsDesktop])

    return isDesktop
}

export default useIsDesktop
