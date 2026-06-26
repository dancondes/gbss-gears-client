import { ROUTES } from "@/constants/routes";
import { get } from "@/utilities/api";

export function getEmployeeDocuments(personId) {
    return get(ROUTES.EMPLOYEE.GET_DOCUMENTS(personId), {}, true)
}