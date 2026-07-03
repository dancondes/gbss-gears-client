import { ROUTES } from "@/constants/routes";
import { del, get, post, put } from "@/utilities/api";

export function getLeaveCredits(id) {
    return get(ROUTES.LEAVES.GET_LEAVE_CREDITS(id), {}, true)
}

export function getFiledLeaves(id) {
    return get(ROUTES.LEAVES.GET_FILED_LEAVES(id), {}, true)
}

export function fileLeave(id, leaveData) {
    return post(ROUTES.LEAVES.FILE_LEAVE(id), leaveData, {}, true)
}

export function fileLeaveUnpaid(id, leaveData) {
    return post(ROUTES.LEAVES.FILE_LEAVE_UNPAID(id), leaveData, {}, true)
}

export function updateLeave(id, leaveId, leaveData) {
    return put(ROUTES.LEAVES.UPDATE_LEAVE(id, leaveId), leaveData, {}, true)
}

export function updateLeaveUnpaid(id, leaveId, leaveData) {
    return put(ROUTES.LEAVES.UPDATE_LEAVE_UNPAID(id, leaveId), leaveData, {}, true)
}

export function deleteLeave(id, leaveId) {
    return del(ROUTES.LEAVES.DELETE_LEAVE(id, leaveId), {}, {}, true)
}