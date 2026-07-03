import { ROUTES } from "@/constants/routes";
import { get, del, uploadFile as apiUploadFile } from "@/utilities/api";

export function getFile(url) {
    return get(ROUTES.FILE.DOWNLOAD(url), { responseType: 'blob' }, true)
}

export function deleteFile(url) {
    return del(ROUTES.FILE.DELETE(url), {}, true);
}

export function uploadFile(file, folderPath, onUploadProgress, shouldOverwrite = false) {
    const formData = new FormData()
    formData.append('file', file)

    const url = `${ROUTES.FILE.UPLOAD}/${shouldOverwrite}?folder=${encodeURIComponent(folderPath)}`
    return apiUploadFile(url, formData, onUploadProgress, 'post', true)
}

export function getByFolderPath(folderPath) {
    return get(ROUTES.FILE.GET_BY_FOLDER_PATH(folderPath), {}, true)
}