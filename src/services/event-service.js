import { ROUTES } from "@/constants/routes";
import { del, post, put } from "@/utilities/api";

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