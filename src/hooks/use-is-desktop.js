import { useState } from 'react'
import { isDesktop as isDesktopByUA } from '@/utilities/ua-parser'

export function useIsDesktop() {
    const [isDesktop] = useState(() => isDesktopByUA())

    return isDesktop
}

export default useIsDesktop
