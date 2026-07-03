export const ROUTES = {
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
    REPORTS: {
        COE_REQUESTS: '/Reports/Pdf/COE',
    },
    TICKETING: {
        CREATE: '/Ticketing',
    }
}