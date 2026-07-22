import { ROUTES } from "@/constants/routes";
import { del, get, post, put, uploadFile } from "@/utilities/api";

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
export function createTicket(ticketData, files = [], onUploadProgress = null) {
    const formData = new FormData()
    formData.append('EnquiryTypeId', ticketData.enquiryTypeId)
    formData.append('Details', ticketData.details)
    files.forEach(function (file) {
        formData.append('Attachments', file)
    })
    return uploadFile(ROUTES.EVENT.CREATE_TICKET, formData, onUploadProgress, 'post')
}

// Time Amendment
export function createTimeAmendment(ticketData, files = [], onUploadProgress = null) {
    const formData = new FormData()
    formData.append('WorkDate', ticketData.workDate)
    formData.append('LogTime', ticketData.logTime || '')
    formData.append('LogType', ticketData.logType)
    formData.append('RequestedTime', ticketData.requestedTime)
    formData.append('Comment', ticketData.comment)
    formData.append('Location', ticketData.location)
    files.forEach(function (file) {
        formData.append('Attachments', file)
    })

    return uploadFile(ROUTES.EVENT.CREATE_TIME_AMENDMENT, formData, onUploadProgress, 'post')
}

export function timeAmendApproval(id, status, reasonString) {
    return post(ROUTES.EVENT.TIME_AMEND_APPROVAL(id, status), reasonString)
}

export function triggerEvacuation(location) {
    return post(ROUTES.EVENT.TRIGGER_EVACUATION(location))
}