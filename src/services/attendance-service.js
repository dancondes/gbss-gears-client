import { ROUTES } from "@/constants/routes";
import { post } from "@/utilities/api";

export function approveAmendmentRequest(id) {
    return post(ROUTES.ATTENDANCE.APPROVE_AMENDMENT_REQUEST(id), {}, {}, true);
}

export function rejectAmendmentRequest(id) {
    return post(ROUTES.ATTENDANCE.REJECT_AMENDMENT_REQUEST(id), {}, {}, true);
}