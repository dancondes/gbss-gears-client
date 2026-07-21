import { ROUTES } from '@/constants/routes'
import { get, put, post } from '@/utilities/api'


export const getAllUsers = () => {
    return get(ROUTES.USERS.GET_ALL)
}

export const getUserById = (id) => {
    return get(ROUTES.USERS.GET_BY_ID(id))
}

export const createUser = (userData) => {
    return post(ROUTES.USERS.CREATE, userData)
}

export const updateUser = (id, userData) => {
    return put(ROUTES.USERS.UPDATE(id), userData)
}

export function getUserDocuments() {
    return get(ROUTES.USERS.GET_DOCUMENTS)
}

export function updatePersonalDetails(personalDetails) {
    return post(ROUTES.USERS.UPDATE_PERSONAL_DETAILS, personalDetails)
}

export function getUserWorkSched(empNo) {
    return get(ROUTES.USERS.GET_WORKSCHED(empNo))
}

export function getPayslip(data) {
    return post(ROUTES.USERS.PAYSLIP, data, { responseType: 'blob' })
}

export function getCOE(type) {
    return post(ROUTES.USERS.COE(type), {}, { responseType: 'blob' })
}

export function getMyRequests(status, data) {
    return post(ROUTES.USERS.MY_REQUESTS(status), data)
}

export function getTeamRequests(status, data) {
    return post(ROUTES.USERS.TEAM_REQUESTS(status), data)
}

export function getTeamStatus() {
    return get(ROUTES.USERS.TEAM_STATUS)
}

export function changePasswordPin(data) {
    return put(ROUTES.USERS.CHANGE_PASSWORD_PIN, data)
}

export function getTeamLeaves() {
    return get(ROUTES.USERS.TEAM_LEAVES)
}

export function getUpcomingLeaves() {
    return get(ROUTES.USERS.UPCOMING_LEAVES)
}

export function getAllLeaves() {
    return get(ROUTES.USERS.GET_ALL_LEAVES)
}

export function getLeaveById(id) {
    return get(ROUTES.USERS.GET_LEAVE_BY_ID(id))
}

export function updateLeave(id, data) {
    return put(ROUTES.USERS.UPDATE_LEAVE(id), data)
}

export function updateUnpaidLeave(id, data) {
    return put(ROUTES.USERS.UPDATE_UNPAID_LEAVE(id), data)
}