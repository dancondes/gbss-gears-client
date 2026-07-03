import PageTemplate from '@/components/PageTemplate'
import Table from '@/components/Table'
import useConfirmationModal from '@/hooks/use-confirmation-modal'
import { approveAmendmentRequest, rejectAmendmentRequest } from '@/services/attendance-service'
import { formatArrayOfStringsAsSelectOptions, isResultSuccessful } from '@/utilities'
import { getCurrentDate } from '@/utilities/date-utilities'
import logger from '@/utilities/logger'
import React, { useMemo } from 'react'
import { toast } from 'react-toastify'

export default function Requests() {
    const currentDate = getCurrentDate()
    const { showConfirmationModal } = useConfirmationModal()

    function handleApproveClick(request) {
        showConfirmationModal({
            title: 'Approve Amendment Request',
            message: `Are you sure you want to approve this attendance amendment request for ${request?.name || 'this employee'}?`,
            confirmText: 'Yes, Approve',
            cancelText: 'Cancel',
            variant: 'info',
            onConfirm: () => handleConfirmApprove(request),
        })
    }

    function handleDisapproveClick(request) {
        showConfirmationModal({
            title: 'Disapprove Amendment Request',
            message: `Are you sure you want to disapprove this attendance amendment request for ${request?.name || 'this employee'}?`,
            confirmText: 'Yes, Disapprove',
            cancelText: 'Cancel',
            variant: 'danger',
            onConfirm: () => handleConfirmDisapprove(request),
        })
    }

    function handleConfirmApprove(request) {
        return handleAmendmentAction(request, 'approve')
    }

    function handleConfirmDisapprove(request) {
        return handleAmendmentAction(request, 'disapprove')
    }

    async function handleAmendmentAction(request, actionName) {
        try {
            const actionFn = actionName === 'approve' ? approveAmendmentRequest : rejectAmendmentRequest
            const result = await actionFn(request.id)
            if (isResultSuccessful(result)) {
                // const updatedList = amendmentRequests.filter(req => req.id !== selectedRequest.id)
                // mutate(updatedList, false) // TODO: update this to mutate after action
                toast.success(result.message || `Amendment request ${actionName}d successfully`)
            } else {
                toast.error(result.message || `Failed to ${actionName} amendment request`)
            }
        } catch (error) {
            logger.error(`Failed to ${actionName} amendment request:`, error)
            toast.error(`Failed to ${actionName} amendment request`)
        }
    }

    const columns = useMemo(() => [
        {
            accessorKey: 'pid',
            header: 'PID',
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'workDate',
            header: 'Work Date',
            type: 'date',
        },
        {
            accessorKey: 'logTime',
            header: 'LogTime',
            type: 'time',
        },
        {
            accessorKey: 'amendmentOn',
            header: 'Amendment On',
            type: 'date',
        },
        {
            accessorKey: 'requestedTime',
            header: 'Requested Time',
            type: 'time',
        },
        {
            accessorKey: 'comment',
            header: 'Comment',
        },
        {
            accessorKey: 'status',
            header: 'Status',
        },
        {
            accessorKey: 'rid',
            header: 'RID',
        },
        {
            accessorKey: 'reason',
            header: 'Reason',
        },
        {
            id: 'action',
            header: 'Action',
            cell: ({ row }) => {
                const request = row.original
                return (
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                handleDisapproveClick(request)
                            }}
                            className="btn-danger py-2! text-xs!"
                            title="Disapprove request"
                        >
                            Disapprove
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                handleApproveClick(request)
                            }}
                            className="btn-primary py-1! text-xs!"
                            title="Approve request"
                        >
                            Approve
                        </button>
                    </div>
                )
            }
        }
    ], [])

    const data = [
        {
            pid: '1001',
            name: 'Marcus Blaze',
            workDate: currentDate,
            logTime: '08:45',
            amendmentOn: currentDate,
            requestedTime: '08:00',
            comment: 'Forgot to tap in, arrived on time',
            status: 'Pending',
            rid: '2001',
            reason: 'System did not register check-in',
        },
        {
            pid: '1002',
            name: 'Tremaine Sky',
            workDate: currentDate,
            logTime: '12:40',
            amendmentOn: currentDate,
            requestedTime: '12:00',
            comment: 'Lunch out was logged late',
            status: 'Approved',
            rid: '2002',
            reason: 'Biometric scanner malfunction',
        },
        {
            pid: '1003',
            name: 'Deshawn Rivers',
            workDate: currentDate,
            logTime: '17:50',
            amendmentOn: currentDate,
            requestedTime: '17:05',
            comment: 'Left on time, log delayed',
            status: 'Rejected',
            rid: '2003',
            reason: 'No supporting evidence provided',
        },
        {
            pid: '1004',
            name: 'Jaylen Storm',
            workDate: currentDate,
            logTime: '09:15',
            amendmentOn: currentDate,
            requestedTime: '08:05',
            comment: 'Stuck in traffic, checked in late',
            status: 'Pending',
            rid: '2004',
            reason: 'Heavy traffic due to road closure',
        },
        {
            pid: '1005',
            name: 'Antoine Fury',
            workDate: currentDate,
            logTime: '13:10',
            amendmentOn: currentDate,
            requestedTime: '13:00',
            comment: 'Lunch-in logged 10 mins late',
            status: 'Approved',
            rid: '2005',
            reason: 'Approved by supervisor via email',
        },
    ]

    return (
        <PageTemplate
            title="My Team's Requests"
        >
            <div className="p-1 sm:p-3">
                <Table
                    columns={columns}
                    data={data}
                    enableSorting={true}
                    pageSize={50}
                    dateRange={{
                        column: 'workDate',
                        start: currentDate,
                        end: currentDate,
                    }}
                    columnFilters={{
                        name: {
                            label: 'Employee',
                            options: formatArrayOfStringsAsSelectOptions(data.map(d => d.name).filter((value, index, self) => self.indexOf(value) === index)),
                            type: 'typeahead'
                        },
                        status: {
                            label: 'Status',
                            options: [
                                { value: 'Pending', label: 'Pending' },
                                { value: 'Approved', label: 'Approved' },
                                { value: 'Rejected', label: 'Rejected' }
                            ],
                        }
                    }}
                />
            </div>
        </PageTemplate>
    )
}
