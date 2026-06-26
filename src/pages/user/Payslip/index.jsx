import React, { useEffect, useMemo, useState } from 'react'
import PageTemplate from '@/components/PageTemplate'
import Table from '@/components/Table'
import ActionButtonGroup from '@/components/ActionButtonGroup'
import useBlobViewerModal from '@/hooks/use-blob-viewer-modal'
import useDownloadFileButton from '@/hooks/use-download-file-button'
import { getEmployeeDocuments } from '@/services/employee-service'
import { useAuthStore } from '@/store'
import { updatePathFor201Files } from '@/utilities/file-utilities'

function Payslip() {
    const [payslipList, setPayslipList] = useState([])
    const [payslipListLoading, setPayslipListLoading] = useState(false)
    const user = useAuthStore((state) => state.user)

    const { openBlobViewerInNewWindow } = useBlobViewerModal()
    const { downloadFromDocument } = useDownloadFileButton()

    useEffect(() => {
        if (user?.id) {
            fetchPayslips(user.id)
        }
    }, [user])

    async function fetchPayslips(id) {
        try {
            setPayslipListLoading(true)
            // TODO: udpate endpoint to get payslips instead of documents once the backend is ready
            const result = await getEmployeeDocuments(id)
            setPayslipList(result.map(doc => ({
                ...doc,
                fullPath: updatePathFor201Files(doc.fullPath),
            })))
        } catch {
            setPayslipList([])
        } finally {
            setPayslipListLoading(false)
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
            title="Payslips"
            subtitle="View and download your payslips"
        >
            <div className="p-1 sm:p-3">
                <Table
                    columns={columns}
                    data={payslipList}
                    enablePagination={false}
                    enableSorting={true}
                    noDataLabel="No payslips found"
                    columnFilters={{
                    }}
                    isLoading={payslipListLoading}
                />
            </div>
        </PageTemplate>
    )
}

export default Payslip
