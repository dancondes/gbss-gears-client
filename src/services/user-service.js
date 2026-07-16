import { ROUTES } from '@/constants/routes'
import { get, put, post } from '@/utilities/api'
import { useFetchOptions } from '@/hooks/use-fetch-options'


export const getAllUsers = () => {
    return get(ROUTES.USERS.GET_ALL)
}

export const getUserById = (id) => {
    return get(ROUTES.USERS.GET_BY_ID(id))
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