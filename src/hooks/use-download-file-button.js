import { useCallback } from 'react'
import { getFile } from '@/services/file-service'
import { downloadFile } from '@/utilities/file-utilities'

function useDownloadFileButton(options = {}) {
    const getFileByPath = options.getFileByPath || getFile
    const onError = options.onError

    const downloadFromBlob = useCallback(function (blob, filename) {
        if (!blob || !filename) return
        downloadFile(blob, filename)
    }, [])

    const downloadFromDocument = useCallback(async function (document) {
        if (!document?.path || !document?.name) return

        try {
            const blob = await getFileByPath(document.path)
            downloadFile(blob, document.name)
        } catch (error) {
            if (typeof onError === 'function') {
                onError(error, document)
                return
            }

            throw error
        }
    }, [getFileByPath, onError])

    return {
        downloadFromBlob,
        downloadFromDocument,
    }
}

export default useDownloadFileButton
