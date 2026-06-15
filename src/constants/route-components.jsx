import { lazy } from 'react'
import PageTemplate from '@/components/PageTemplate'
import FormNotFound from '@/components/FormNotFound'
import { buildFormsMenuPath } from '@/utilities/forms-menu-utilities.jsx'

const IMPORT_MAP = {
    '/home/dashboard': { main: () => import('@/pages/home/Dashboard') },
    '/home/conference/booking': { main: () => import('@/pages/home/ConferenceBooking') },
    '/home/biometrics/records': { main: () => import('@/pages/home/BiometricsRecords') },
    '/home/hr-system/hr': { main: () => import('@/pages/home/HRSystem') },
    '/home/quick-reference/information': { main: () => import('@/pages/home/QuickReferenceInfo') },
    // '/home/quick-reference/contacts': { main: () => import('@/pages/home/QuickReferenceContacts') },
    '/home/quick-reference/contacts': {
        main: () => import('@/pages/home/QuickReferenceContacts'),
        profile: () => import('@/pages/home/QuickReferenceContacts/Profile')
    },
    '/home/payroll': { main: () => import('@/pages/home/Payroll') },

    '/reports/admin/select': { main: () => import('@/pages/reports/AdminSelect') },
    '/reports/admin/excel': { main: () => import('@/pages/reports/AdminExcel') },
    '/reports/admin/finance-and-accounting': { main: () => import('@/pages/reports/AdminFinanceReports') },
    '/reports/admin/human-resource-and-recruitment': { main: () => import('@/pages/reports/AdminHumanResourceReports') },
    '/reports/admin/build': { main: () => import('@/pages/reports/AdminBuild') },
    [buildFormsMenuPath('Reports', 'Reports', 'Finance and Accounting')]: { main: () => import('@/pages/reports/AdminFinanceReports') },
    [buildFormsMenuPath('Reports', 'Reports', 'Human Resource and Recruitment')]: { main: () => import('@/pages/reports/AdminHumanResourceReports') },

    '/tools/admin/users': {
        main: () => import('@/pages/tools/AdminUsers'),
        profile: () => import('@/pages/tools/AdminUsers/Profile'),
        // edit: () => import('@/pages/tools/AdminUsers/Edit')
    },
    '/tools/admin/roles': { main: () => import('@/pages/tools/AdminRoles') },
    '/tools/admin/permissions': { main: () => import('@/pages/tools/AdminPermissions') },
    '/tools/admin/user-permissions': { main: () => import('@/pages/tools/AdminUserPermissions') },
    '/tools/admin/web-users': { main: () => import('@/pages/tools/WebUsers') },
    '/tools/admin/gbssp-id': { main: () => import('@/pages/tools/GBSSPID') },
    '/tools/emails/recipients': { main: () => import('@/pages/tools/EmailsRecipients') },
    '/tools/emails/logs': { main: () => import('@/pages/tools/EmailsLogs') },
    '/tools/accounting/upload-payroll': { main: () => import('@/pages/tools/AccountingUploadPayroll') },

    '/staff-bulletin/view': { main: () => import('@/pages/bulletins/staff-bulletin/StaffBulletinView') },
    '/client-bulletin/view': { main: () => import('@/pages/bulletins/client-bulletin/ClientBulletinView') },
    [buildFormsMenuPath('Staff Bulletin', 'Staff Bulletin', 'View')]: { main: () => import('@/pages/bulletins/staff-bulletin/StaffBulletinView') },
    [buildFormsMenuPath('Client Bulletin', 'Client Bulletin', 'View')]: { main: () => import('@/pages/bulletins/client-bulletin/ClientBulletinView') },

    '/settings/maintenance/civil-status': { main: () => import('@/pages/settings/CivilStatus') },
    '/settings/maintenance/countries': { main: () => import('@/pages/settings/Countries') },
    '/settings/maintenance/deduction-types': { main: () => import('@/pages/settings/DeductionTypes') },
    '/settings/maintenance/document-types': { main: () => import('@/pages/settings/DocumentTypes') },
    '/settings/maintenance/holiday-types': { main: () => import('@/pages/settings/HolidayTypes') },
    '/settings/maintenance/late-reasons': { main: () => import('@/pages/settings/LateReasons') },
    '/settings/maintenance/leave-types': { main: () => import('@/pages/settings/LeaveTypes') },
    '/settings/maintenance/positions': { main: () => import('@/pages/settings/Positions') },
    '/settings/maintenance/punctuality-types': { main: () => import('@/pages/settings/PunctualityTypes') },
    '/settings/maintenance/statuses': { main: () => import('@/pages/settings/Statuses') },
    '/settings/maintenance/workschedule-types': { main: () => import('@/pages/settings/WorkscheduleTypes') },
    '/app-settings': { main: () => import('@/pages/settings/AppSettings') },
    [buildFormsMenuPath('Settings', 'Application', 'Settings')]: { main: () => import('@/pages/settings/AppSettings') },

    '/records/tasks': {
        main: () => import('@/pages/tasks/DailyLogs'),
        profile: () => import('@/pages/tasks/DailyLogs/Profile')
    },
    [buildFormsMenuPath('Tasks', 'User Request')]: {
        main: () => import('@/pages/tasks/UserRequests'),
        profile: () => import('@/pages/tasks/UserRequests/Profile')
    },
    // [buildFormsMenuPath('Tasks', 'Daily Logs', 'Daily Logs')]: {
    //     main: () => import('@/pages/tasks/DailyLogs'),
    //     profile: () => import('@/pages/tasks/DailyLogs/Profile')
    // },

    '/records/employees': {
        main: () => import('@/pages/records/Employees'),
        profile: () => import('@/pages/records/Employees/Profile')
    },
    '/records/applicants': {
        main: () => import('@/pages/records/Applicants'),
        profile: () => import('@/pages/records/Applicants/Profile')
    },
    '/records/applicant-scheds': { main: () => import('@/pages/records/ApplicantScheds') },
    '/records/attendance': { main: () => import('@/pages/records/Attendance') },
    '/records/clients': {
        main: () => import('@/pages/records/Clients'),
        profile: () => import('@/pages/records/Clients/Profile')
    },
    '/records/email-subscriptions': { main: () => import('@/pages/records/EmailSubscriptions') },
    '/records/holidays': { main: () => import('@/pages/records/Holidays') },
    '/records/late-notifications': { main: () => import('@/pages/records/LateNotifications') },
    '/records/vacant-positions': {
        main: () => import('@/pages/records/VacantPositions'),
        profile: () => import('@/pages/records/VacantPositions/Profile')
    },
    '/records/visits-meetings': { main: () => import('@/pages/records/VisitsMeetings') },
    '/records/documents': { main: () => import('@/pages/records/Documents') }
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
            <FormNotFound
                title="Form Not Found"
                description="This form is not found or does not exist. Contact administrator if you think this is an issue."
            />
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
