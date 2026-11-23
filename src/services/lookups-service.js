import { HALFDAY_EARLY_OUT_LEAVE_TYPE_ID, HALFDAY_LATE_LEAVE_TYPE_ID, LEAVE_TYPE_OPTION_IDS } from "@/constants/database-id";
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

export function getTimeLogsEmployeeList() {
    return get(ROUTES.LOOKUPS.TIME_LOGS_EMPLOYEE_LIST)
}

export function getEnquiryTypes() {
    return get(ROUTES.LOOKUPS.ENQUIRY_TYPES)
}

export function getRoles() {
    return get(ROUTES.LOOKUPS.ROLES)
}

export function getLeaveTypes() {
    return get(ROUTES.LOOKUPS.LEAVE_TYPES)
}

export function useFetchEmployeeOptions(config, isTimeLogs = false) {
    const { valueKey, labelKey } = config || {}
    return useFetchOptions(isTimeLogs ? getTimeLogsEmployeeList : getEmployeeList, {
        valueKey: valueKey || 'name',
        labelKey: labelKey || 'name',
        transform: (list) => list.map(emp => ({
            ...emp,
            name: `${emp.firstname} ${emp.lastname}`,
        }))
    })
}

export function useFetchLeaveTypeOptions(config) {
    const { valueKey, labelKey } = config || {}
    return useFetchOptions(getLeaveTypes, {
        valueKey: valueKey || 'id',
        labelKey: labelKey || 'description',
        sort: false,
        transform: (list) => {
            return list.map(leaveType => {
                if (LEAVE_TYPE_OPTION_IDS.includes(leaveType.id)) {
                    if (leaveType.id == HALFDAY_EARLY_OUT_LEAVE_TYPE_ID) {
                        return {
                            id: leaveType.id,
                            description: 'Half Day (AM) deducted from VL'
                        }
                    }

                    if (leaveType.id == HALFDAY_LATE_LEAVE_TYPE_ID) {
                        return {
                            id: leaveType.id,
                            description: 'Half Day (PM) deducted from VL'
                        }
                    }

                    return {
                        id: leaveType.id,
                        description: leaveType.description
                    }
                }
            }).filter(leaveType => leaveType !== undefined)
        },
    })
}