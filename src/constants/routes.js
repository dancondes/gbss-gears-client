export const ROUTES = {
    ATTENDANCE: {
        APPROVE_AMENDMENT_REQUEST: (id) => `/Attendance/time-amendments-requests/approve/${id}`,
        REJECT_AMENDMENT_REQUEST: (id) => `/Attendance/time-amendments-requests/reject/${id}`,
    },
    BULLETIN: {
        STAFF_BULLETINS: '/Email/bulletin/Staff'
    },
    FILE: {
        DOWNLOAD: (path) => `/File/download?blobName=${encodeURIComponent(path)}`,
        DELETE: (path) => `/File/${encodeURIComponent(path)}`,
        UPLOAD: '/File/upload',
        GET_BY_FOLDER_PATH: (folderPath) => `/File/${encodeURIComponent(folderPath)}`,
    },
    EMPLOYEE: {
        GET_DOCUMENTS: (id) => `/Employee/${id}/documents`,
    },
    REPORTS: {
        COE_REQUESTS: '/Reports/Pdf/COE',
    },
    TICKETING: {
        CREATE: '/Ticketing',
    }
}