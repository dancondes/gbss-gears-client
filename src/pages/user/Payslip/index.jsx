import React, { useMemo, useState } from 'react'
import PageTemplate from '@/components/PageTemplate'
import Table from '@/components/Table'
import ActionButtonGroup from '@/components/ActionButtonGroup'
import { getPayPeriods } from '@/services/lookups-service'
import useSWR from 'swr'
import { getPayslip } from '@/services/user-service'
import logger from '@/utilities/logger'
import { toast } from 'sonner'
import { downloadFile } from '@/utilities/file-utilities'
import { useAuthStore } from '@/store'
import PayslipPinInputModal from './PayslipPinInputModal'
import OpenTicketModal from '../Leaves/components/OpenTicketModal'
import { ENQUIRY_TYPE_ID_FOR_PAYROLL } from '@/constants/database-id'

function Payslip() {
    const user = useAuthStore((state) => state.user)
    const [showPinInputModal, setShowPinInputModal] = useState(!user?.payslipPinVerified)

    async function fetchPayslipPeriods() {
        try {
            const result = await getPayPeriods()
            return result || []
        } catch {
            return []
        }
    }

    const { data: payslipList, isValidating, mutate } = useSWR('payslipPeriods', fetchPayslipPeriods)

    const columns = useMemo(
        () => [
            {
                accessorKey: 'payPeriod',
                header: 'Pay Period',
            },
            {
                accessorKey: 'startDate',
                header: 'Cut Off Start Date',
                type: 'date',
            },
            {
                accessorKey: 'endDate',
                header: 'Cut Off End Date',
                type: 'date',
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                cell: ({ row }) => {
                    const documentData = row.original
                    const buttons = [
                        // { type: 'view', action: handleView },
                        { type: 'download', action: handleDownload },
                    ]

                    return <ActionButtonGroup buttons={buttons} rowData={documentData} />
                }
            }
        ], [])

    async function handleDownload(data) {
        try {
            toast.success('Payslip request started. The document will be downloaded once generated.')
            const result = await getPayslip(data)
            const filename = `${user?.employeeInfo?.empNo}_${data?.payPeriod}_Payslip.pdf`
            downloadFile(result, filename)
            toast.success('Payslip request successful. The document will be downloaded automatically.')
        } catch (error) {
            logger.error('Error downloading payslip:', error)
            toast.error('Failed to download payslip. Please try again later.')
        }
    }

    return (
        <PageTemplate
            title="Payslips"
            subtitle="Download your payslips for the selected pay period"
            rightSide={<OpenTicketModal concernLabel="Payroll" defaultValues={{ ticketType: ENQUIRY_TYPE_ID_FOR_PAYROLL }} />}
            mutate={mutate}
        >
            <div className="p-1 sm:p-3">
                {
                    user?.payslipPinVerified ? (
                        <Table
                            columns={columns}
                            data={payslipList || []}
                            enablePagination={false}
                            enableSorting={true}
                            noDataLabel="No payslips found"
                            columnFilters={{
                            }}
                            isLoading={isValidating}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-3 py-14 px-6 text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-300"
                            >
                                <rect x="3" y="11" width="18" height="10" rx="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>

                            <p className="text-sm text-gray-500 max-w-xs">
                                You do not have permission to view payslips.
                            </p>

                            <button
                                type="button"
                                className="text-sm font-medium text-primary hover:underline"
                                onClick={() => setShowPinInputModal(true)}
                            >
                                Enter your PIN to continue
                            </button>
                        </div>
                    )
                }
            </div>

            {showPinInputModal && (
                <PayslipPinInputModal
                    isOpen={showPinInputModal}
                    setIsOpen={setShowPinInputModal}
                // showCloseButton={false}
                />
            )}
        </PageTemplate>
    )
}

export default Payslip
