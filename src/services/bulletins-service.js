import { ROUTES } from "@/constants/routes";
import { get } from "@/utilities/api";

export function getStaffBulletins() {
    return get(ROUTES.BULLETIN.STAFF_BULLETINS, {}, true)
}