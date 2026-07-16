import { ROUTES } from "@/constants/routes";
import { useFetchOptions } from "@/hooks/use-fetch-options";
import { get } from "@/utilities/api";

export function getLogTypes() {
    return get(ROUTES.LOOKUPS.LOG_TYPES)
}

export function getApprovers() {
    return get(ROUTES.LOOKUPS.APPROVERS)
}

export function getPayPeriods() {
    return get(ROUTES.LOOKUPS.PAY_PERIODS)
}

export function getEmployeeList() {
    return get(ROUTES.LOOKUPS.EMPLOYEE_LIST)
}

export function getEnquiryTypes() {
    return get(ROUTES.LOOKUPS.ENQUIRY_TYPES)
}

export function useFetchEmployeeOptions() {
    return useFetchOptions(getEmployeeList, {
        valueKey: 'name',
        labelKey: 'name',
        transform: (list) => list.map(emp => ({
            name: `${emp.firstname} ${emp.lastname}`,
        }))
    })
} 