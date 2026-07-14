import { ROUTES } from "@/constants/routes";
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