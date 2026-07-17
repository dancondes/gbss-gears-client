export const ROUTES = {
    AUTH: {
        LOGIN: '/Auth/login',
    },
    EVENT: {
        CREATE_TIME_ENTRY: (type) => `/Event/time-entry/create/${type}`,
        UPDATE_TIME_ENTRY: (id) => `/Event/time-entry/${id}/update`,
        DELETE_TIME_ENTRY: (id) => `/Event/time-entry/${id}/delete`,
        GET_TIME_ENTRIES: `/Event/time-entry/get`,
        GET_TIME_ENTRIES_BY_ID: (id) => `/Event/time-entry/get/${id}`,

        // Overtime
        CREATE_OVERTIME: '/Event/overtime/create',
        UPDATE_OVERTIME: (id) => `/Event/overtime/${id}/update`,
        DELETE_OVERTIME: (id) => `/Event/overtime/${id}/remove`,
        GET_OVERTIME: '/Event/overtime',

        // Tickets
        CREATE_TICKET: '/Event/ticket/create',

        // Time Amendment
        CREATE_TIME_AMENDMENT: '/Event/time-amend/create',
        TIME_AMEND_APPROVAL: (id, status) => `/Event/time-amend/approval/${id}/${status}`,
    },
    FILE: {
        DOWNLOAD: (path) => `/File/download?blobName=${encodeURIComponent(path)}`,
        DELETE: (path) => `/File/${encodeURIComponent(path)}`,
        UPLOAD: '/File/upload',
        GET_BY_FOLDER_PATH: (folderPath) => `/File/${encodeURIComponent(folderPath)}`,
    },
    LOOKUPS: {
        LOG_TYPES: '/Lookups/log-types',
        APPROVERS: '/Lookups/approvers',
        PAY_PERIODS: '/Lookups/pay-periods',
        EMPLOYEE_LIST: '/Lookups/employee-list',
        ENQUIRY_TYPES: '/Lookups/enquiry-types',
        ROLES: '/Lookups/roles',
    },
    USERS: {
        GET_BY_ID: (id) => `/User/${id}`,

        // Manage Users
        GET_ALL: '/User',
        CREATE: '/User/create',
        UPDATE: (id) => `/User/${id}/update`,

        GET_WORKSCHED: (empNo) => `/User/WorkSched/${empNo}`,
        GET_DOCUMENTS: '/User/documents',
        UPDATE_PERSONAL_DETAILS: '/User/personal-details/update',
        PAYSLIP: '/User/Payslip',
        COE: (type) => `/User/COE/${type}`,
        MY_REQUESTS: (status) => `/User/my-requests/${status}`,
        TEAM_REQUESTS: (status) => `/User/team-requests/${status}`,
        TEAM_STATUS: '/User/team-status',
        CHANGE_PASSWORD_PIN: '/User/password-pin/update',
        TEAM_LEAVES: '/User/team-leaves',
        UPCOMING_LEAVES: '/User/upcoming-leaves',
    }
}