import { useLocation } from 'react-router-dom'
import { NO_ACCESS } from '@/services/forms-menu-service'
import useFormsMenuStore from '@/store/forms-menu-store'

export function usePageAccess() {
    const location = useLocation()
    const pathAccessMap = useFormsMenuStore((state) => state.pathAccessMap)

    const pathname = location.pathname

    const currentAccess = pathAccessMap.get(pathname)
    const hasAccess = currentAccess && Number(currentAccess.id) !== 3

    return {
        pathname,
        currentAccess: currentAccess || NO_ACCESS,
        hasAccess,
    }
}

export default usePageAccess
