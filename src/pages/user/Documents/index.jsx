import React, { useEffect, useMemo, useState } from 'react'
import PageTemplate from '@/components/PageTemplate'
import Table from '@/components/Table'
import ActionButtonGroup from '@/components/ActionButtonGroup'
import useBlobViewerModal from '@/hooks/use-blob-viewer-modal'
import useDownloadFileButton from '@/hooks/use-download-file-button'
import { getEmployeeDocuments } from '@/services/employee-service'
import { useAuthStore } from '@/store'
import { updatePathFor201Files } from '@/utilities/file-utilities'

function Documents() {
    const [documentList, setDocumentList] = useState([])
    const [documentListLoading, setDocumentListLoading] = useState(false)
    const user = useAuthStore((state) => state.user)

    const { openBlobViewerInNewWindow } = useBlobViewerModal()
    const { downloadFromDocument } = useDownloadFileButton()

    useEffect(() => {
        if (user?.id) {
            fetchDocuments(user.id)
        }
    }, [user])

    async function fetchDocuments(id) {
        try {
            setDocumentListLoading(true)
            const result = await getEmployeeDocuments(id)
            setDocumentList(result.map(doc => ({
                ...doc,
                fullPath: updatePathFor201Files(doc.fullPath),
            })))
        } catch {
            setDocumentList([])
        } finally {
            setDocumentListLoading(false)
        }
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: 'displayName',
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
        console.log('handleView', data)
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
        >
            <div className="p-1 sm:p-3">
                <Table
                    columns={columns}
                    data={documentList}
                    enablePagination={false}
                    enableSorting={true}
                    // pageSize={10}
                    noDataLabel="No documents found"
                    columnFilters={{
                    }}
                    isLoading={documentListLoading}
                />

                {/* <div className="mt-4 text-sm text-gray-500">
                        hello
                    </div> */}
            </div>
        </PageTemplate>
    )
}

export default Documents
