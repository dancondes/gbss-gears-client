export const ROUTES = {
    AUTH: {
        LOGIN: '/Auth/login',
    },
    ATTENDANCE: {
        APPROVE_AMENDMENT_REQUEST: (id) => `/Attendance/time-amendments-requests/approve/${id}`,
        REJECT_AMENDMENT_REQUEST: (id) => `/Attendance/time-amendments-requests/reject/${id}`,
    },
    BULLETIN: {
        STAFF_BULLETINS: '/Email/bulletin/Staff'
    },
    EMPLOYEE: {
        GET_DOCUMENTS: (id) => `/Employee/${id}/documents`,
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
    },
    FILE: {
        DOWNLOAD: (path) => `/File/download?blobName=${encodeURIComponent(path)}`,
        DELETE: (path) => `/File/${encodeURIComponent(path)}`,
        UPLOAD: '/File/upload',
        GET_BY_FOLDER_PATH: (folderPath) => `/File/${encodeURIComponent(folderPath)}`,
    },
    LEAVES: {
        GET_LEAVE_CREDITS: (personId) => `/Employee/${personId}/leave-credits`,
        GET_FILED_LEAVES: (personId) => `/Employee/${personId}/leave`,
        FILE_LEAVE: (personId) => `/Employee/${personId}/leave/add`,
        FILE_LEAVE_UNPAID: (personId) => `/Employee/${personId}/leave/add/proceedUnPaid`,
        UPDATE_LEAVE: (personId, leaveId) => `/Employee/${personId}/leave/${leaveId}/update`,
        UPDATE_LEAVE_UNPAID: (personId, leaveId) => `/Employee/${personId}/leave/${leaveId}/update/proceedUnPaid`,
        DELETE_LEAVE: (personId, leaveId) => `/Employee/${personId}/leave/${leaveId}/delete`,
    },
    LOOKUPS: {
        LOG_TYPES: '/Lookups/log-types',
        APPROVERS: '/Lookups/approvers',
        PAY_PERIODS: '/Lookups/pay-periods',
        EMPLOYEE_LIST: '/Lookups/employee-list',
    },
    REPORTS: {
        COE_REQUESTS: '/Reports/Pdf/COE',
    },
    TICKETING: {
        CREATE: '/Ticketing',
    },
    USERS: {
        GET_ALL: '/User',
        GET_BY_ID: (id) => `/User/${id}`,
        CREATE: '/User/create',
        UPDATE: (id) => `/User/${id}/update`,
        GET_WORKSCHED: (empNo) => `/User/WorkSched/${empNo}`,
        GET_DOCUMENTS: '/User/documents',
        UPDATE_PERSONAL_DETAILS: '/User/personal-details/update',
        PAYSLIP: '/User/Payslip',
        COE: (type) => `/User/COE/${type}`,
    }
}