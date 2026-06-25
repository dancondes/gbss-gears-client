export const ROUTES = {
    FILE: {
        DOWNLOAD: (path) => `/File/download?blobName=${encodeURIComponent(path)}`,
        DELETE: (path) => `/File/${encodeURIComponent(path)}`,
        UPLOAD: '/File/upload',
        GET_BY_FOLDER_PATH: (folderPath) => `/File/${encodeURIComponent(folderPath)}`,
    },
    REPORTS: {
        COE_REQUESTS: '/Reports/Pdf/COE',
    }
}