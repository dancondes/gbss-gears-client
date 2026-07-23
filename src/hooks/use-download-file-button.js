import { useCallback } from 'react'
import { getFile } from '@/services/file-service'
import { downloadFile } from '@/utilities/file-utilities'
import { toast } from 'sonner'
import logger from '@/utilities/logger'
import { useNotificationStore } from '@/store'

function useDownloadFileButton(options = {}) {
    const getFileByPath = options.getFileByPath || getFile
    const onError = options.onError
    const addNotification = useNotificationStore((state) => state.addNotification)

    const downloadFromBlob = useCallback(function (blob, filename) {
        if (!blob || !filename) return
        downloadFile(blob, filename)
    }, [])

    const downloadFromDocument = useCallback(async function (document) {
        if (!document?.path || !document?.name) return

        try {
            // a toast notification to inform the user that the download is in progress
            toast.success(`Downloading ${document.name}. Please wait...`, { duration: 3000 })
            const blob = await getFileByPath(document.path)
            downloadFile(blob, document.name)
            addNotification({
                type: 'success',
                title: 'File Downloaded',
                message: `${document.name} has been downloaded successfully.`,
                showToast: true,
            })
        } catch (error) {
            if (typeof onError === 'function') {
                onError(error, document)
                return
            } else {
                addNotification({
                    type: 'error',
                    title: 'File Download Failed',
                    message: `Failed to download ${document.name}. Please try again later.`,
                    showToast: true,
                })
                logger.error('Failed to download file', error, document)
                return
            }

            // throw error
        }
    }, [getFileByPath, onError])

    return {
        downloadFromBlob,
        downloadFromDocument,
    }
}

export default useDownloadFileButton
