import { ROUTES } from "@/constants/routes";
import { del, get, post, put } from "@/utilities/api";

export function createTimeEntry(type, data) {
    return post(ROUTES.EVENT.CREATE_TIME_ENTRY(type), data ? JSON.stringify(data) : '')
}

export function updateTimeEntry(id, data) {
    return put(ROUTES.EVENT.UPDATE_TIME_ENTRY(id), data)
}

export function deleteTimeEntry(id) {
    return del(ROUTES.EVENT.DELETE_TIME_ENTRY(id))
}

export function getTimeEntries(data) {
    return post(ROUTES.EVENT.GET_TIME_ENTRIES, data)
}

export function getTimeEntriesById(id, data) {
    return post(ROUTES.EVENT.GET_TIME_ENTRIES_BY_ID(id), data)
}

// Overtime
export function createOvertime(data) {
    return post(ROUTES.EVENT.CREATE_OVERTIME, data)
}

export function updateOvertime(id, data) {
    return put(ROUTES.EVENT.UPDATE_OVERTIME(id), data)
}

export function deleteOvertime(id) {
    return del(ROUTES.EVENT.DELETE_OVERTIME(id))
}

export function getOvertime() {
    return get(ROUTES.EVENT.GET_OVERTIME)
}

// Ticket
export function createTicket(data) {
    return post(ROUTES.EVENT.CREATE_TICKET, data)
}

// Time Amendment
export function createTimeAmendment(data) {
    return post(ROUTES.EVENT.CREATE_TIME_AMENDMENT, data)
}

export function timeAmendApproval(id, status, data) {
    return post(ROUTES.EVENT.TIME_AMEND_APPROVAL(id, status), data)
}