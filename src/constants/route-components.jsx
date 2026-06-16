import { lazy } from 'react'
import PageTemplate from '@/components/PageTemplate'
import FormNotFound from '@/components/FormNotFound'

const IMPORT_MAP = {
    '/clock-in-out': { main: () => import('@/pages/home/ClockInOut') },

    // user
    '/user/personal-details': { main: () => import('@/pages/user/PersonalDetails') },
    '/user/daily-records': { main: () => import('@/pages/user/DailyRecords') },
    '/user/my-requests': { main: () => import('@/pages/user/MyRequests') },
}

function buildRouteComponents() {
    const components = {}
    for (const path in IMPORT_MAP) {
        const imports = IMPORT_MAP[path]
        const entry = { main: lazy(imports.main) }
        if (imports.profile) entry.profile = lazy(imports.profile)
        if (imports.edit) entry.edit = lazy(imports.edit)
        components[path] = entry
    }
    return components
}

export const ROUTE_COMPONENTS = buildRouteComponents()

const componentCache = new Map()

function RouteFormNotFound() {
    return (
        <PageTemplate>
            <FormNotFound />
        </PageTemplate>
    )
}

export function getComponentForPath(path) {
    if (componentCache.has(path)) return componentCache.get(path)

    let component = null

    if (ROUTE_COMPONENTS[path]) {
        component = ROUTE_COMPONENTS[path].main
    } else {
        for (const key in ROUTE_COMPONENTS) {
            if (path.includes(key)) {
                const route = ROUTE_COMPONENTS[key]

                if (path.endsWith('/edit') && route.edit) {
                    component = route.edit
                    break
                }

                if (path !== key && route.profile) {
                    component = route.profile
                    break
                }
            }
        }
    }

    if (!component) {
        component = RouteFormNotFound
    }

    componentCache.set(path, component)
    return component
}

export function preloadComponent(path) {
    if (IMPORT_MAP[path]) {
        IMPORT_MAP[path].main()
        return
    }

    for (const key in IMPORT_MAP) {
        if (path.includes(key)) {
            const imports = IMPORT_MAP[key]

            if (path.endsWith('/edit') && imports.edit) {
                imports.edit()
            } else if (path !== key && imports.profile) {
                imports.profile()
            } else {
                imports.main()
            }
            return
        }
    }
}
