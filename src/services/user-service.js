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

/**
 * Custom hook to fetch user options for select/typeahead components
 * @returns {object} - Object containing options array, loading state, and error
 */
export function useUserOptions(valueKey = 'userId') {
    return useFetchOptions(getAllUsers, {
        valueKey,
        labelKey: 'name',
        transform: (data) => data
            .filter(user => user.firstName && user.lastName) // Filter out users with missing names
            .map(user => ({
                [valueKey]: valueKey === 'userId' ? user.userId?.toUpperCase() : user?.[valueKey],
                name: `${user.firstName} ${user.lastName}`
            }))
    })
}