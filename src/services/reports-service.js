import { ROUTES } from "@/constants/routes";
import { post } from "@/utilities/api";

export function requestCOE(data) {
    return post(ROUTES.REPORTS.COE_REQUESTS, data, { responseType: 'blob' }, true)
}