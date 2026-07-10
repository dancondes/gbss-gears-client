import React, { useEffect, useMemo } from 'react'
import PageTemplate from '@/components/PageTemplate'
import Table from '@/components/Table'
import ActionButtonGroup from '@/components/ActionButtonGroup'
import useBlobViewerModal from '@/hooks/use-blob-viewer-modal'
import useDownloadFileButton from '@/hooks/use-download-file-button'
import { updatePathFor201Files } from '@/utilities/file-utilities'
import { getUserDocuments } from '@/services/user-service'
import useSWR from 'swr'

function Documents() {

    const { openBlobViewerInNewWindow } = useBlobViewerModal()
    const { downloadFromDocument } = useDownloadFileButton()

    useEffect(() => {
        fetchDocuments()
    }, [])

    async function fetchDocuments() {
        try {
            const result = await getUserDocuments()
            return result.map(doc => ({
                ...doc,
                filename: doc.displayName,
                fullPath: updatePathFor201Files(doc.fullPath),
            }))
        } catch {
            return []
        }
    }

    const { data, isValidating, mutate } = useSWR('user-documents', fetchDocuments)

    const columns = useMemo(
        () => [
            {
                accessorKey: 'filename',
                header: 'File',
            },
            {
                accessorKey: 'submissionDate',
                header: 'Date',
                type: 'date',
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                cell: ({ row }) => {
                    const documentData = row.original
                    const buttons = [
                        { type: 'view', action: handleView },
                        { type: 'download', action: handleDownload },
                    ]

                    return <ActionButtonGroup buttons={buttons} rowData={documentData} />
                }
            }
        ], [])

    function handleView(data) {
        openBlobViewerInNewWindow({
            name: data.displayName,
            path: data.fullPath
        })
    }

    function handleDownload(data) {
        downloadFromDocument({
            name: data.displayName,
            path: data.fullPath
        })
    }

    return (
        <PageTemplate
            title="201 Files"
            subtitle="View and download your documents"
            mutate={mutate}
        >
            <div className="p-1 sm:p-3">
                <Table
                    columns={columns}
                    data={data}
                    enablePagination={false}
                    enableSorting={true}
                    noDataLabel="No documents found"
                    columnFilters={{
                    }}
                    isLoading={isValidating}
                    globalFilterColumns={['filename']}
                />

                {/* <div className="mt-4 text-sm text-gray-500">
                        hello
                    </div> */}
            </div>
        </PageTemplate>
    )
}

export default Documents
