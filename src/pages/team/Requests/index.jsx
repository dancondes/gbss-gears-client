import PageTemplate from '@/components/PageTemplate'
import Table from '@/components/Table'
import { AMENDMENT_STATUS } from '@/constants'
import useConfirmationModal from '@/hooks/use-confirmation-modal'
import useInputModal from '@/hooks/use-input-modal '
import { timeAmendApproval } from '@/services/event-service'
import { useFetchEmployeeOptions } from '@/services/lookups-service'
import { getTeamRequests } from '@/services/user-service'
import { useAuthStore } from '@/store'
import { isResultSuccessful } from '@/utilities'
import { getCurrentDate } from '@/utilities/date-utilities'
import logger from '@/utilities/logger'
import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import useSWR from 'swr'

const currentDate = getCurrentDate()

export default function Requests() {
    const { showConfirmationModal } = useConfirmationModal()
    const { showInputModal } = useInputModal()
    const { options: employeeOptions } = useFetchEmployeeOptions()
    const user = useAuthStore((state) => state.user)
    const [filters, setFilters] = useState({
        dateFrom: currentDate,
        dateTo: currentDate,
        status: 3,
    })

    async function fetchTeamRequests() {
        try {
            const params = {
                dateFrom: filters.dateFrom,
                dateTo: filters.dateTo,
            }
            const result = await getTeamRequests(filters.status || 4, params)
            return result?.data || []
        } catch {
            return []
        }
    }

    const { data, isValidating, mutate } = useSWR(user?.userId ? ['team-requests', user?.userId, filters] : null, fetchTeamRequests)

    function showReasonForRejectionModal(request) {
        showInputModal({
            title: 'Reason for Rejection',
            fields: [
                { name: 'reason', label: 'Reason', type: 'textarea' },
            ],
            onConfirm: (data) => handleDisapproveClick(request, data.reason?.trim()),
        })
    }

    function handleApproveClick(request) {
        showConfirmationModal({
            title: 'Approve Amendment Request',
            message: `Are you sure you want to approve this attendance amendment request for ${request?.name || 'this employee'}?`,
            confirmText: 'Yes, Approve',
            cancelText: 'Cancel',
            variant: 'info',
            onConfirm: () => handleAmendmentAction(request, true),
        })
    }

    function handleDisapproveClick(request, reason = '') {
        showConfirmationModal({
            title: 'Disapprove Amendment Request',
            message: `Are you sure you want to disapprove this attendance amendment request for ${request?.name || 'this employee'}?`,
            confirmText: 'Yes, Disapprove',
            cancelText: 'Cancel',
            variant: 'danger',
            onConfirm: () => handleAmendmentAction(request, false, reason),
        })
    }

    async function handleAmendmentAction(request, approve, reason = '') {
        try {
            const result = await timeAmendApproval(request.rid, approve, reason)
            if (isResultSuccessful(result)) {
                mutate() // Refresh the data after approval/rejection
                toast.success(result.message || `Amendment request ${approve ? 'approve' : 'rejecte'}d successfully`)
            } else {
                toast.error(result.message || `Failed to ${approve ? 'approve' : 'rejecte'} amendment request`)
            }
        } catch (error) {
            logger.error(`Failed to ${approve ? 'approve' : 'rejected'} amendment request:`, error)
            toast.error(`Failed to ${approve ? 'approve' : 'rejected'} amendment request`)
        }
    }

    const columns = useMemo(() => [
        // {
        //     accessorKey: 'pid',
        //     header: 'PID',
        // },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'workDate',
            header: 'Work Date',
            // type: 'date',
        },
        {
            accessorKey: 'logTime',
            header: 'LogTime',
            type: 'time',
        },
        {
            accessorKey: 'amendmentOn',
            header: 'Amendment On',
            // type: 'date',
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
        // {
        //     accessorKey: 'rid',
        //     header: 'RID',
        // },
        {
            accessorKey: 'reason',
            header: 'Reason',
        },
        {
            id: 'action',
            header: 'Action',
            cell: ({ row }) => {
                const request = row.original
                if (request.status === 'For Approval') {
                    return (
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    showReasonForRejectionModal(request)
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
        }
    ], [])

    function handleSearch(serverFilters) {
        setFilters({
            dateFrom: serverFilters.dateFrom || currentDate,
            dateTo: serverFilters.dateTo || currentDate,
            status: serverFilters.status || 3,
        })
    }

    return (
        <PageTemplate
            title="My Team's Requests"
            subtitle="View and manage your team members' amendment requests"
            mutate={mutate}
        >
            <div className="p-1 sm:p-3">
                <Table
                    columns={columns}
                    data={data || []}
                    enableSorting={true}
                    pageSize={50}
                    dateRange={{
                        column: 'workDate',
                        start: currentDate,
                        end: currentDate,
                        serverSide: true,
                    }}
                    columnFilters={{
                        name: {
                            label: 'Employee',
                            options: employeeOptions,
                            type: 'typeahead'
                        },
                        status: {
                            label: 'Status',
                            options: AMENDMENT_STATUS,
                            serverSide: true,
                            noAll: true,
                            value: 3, // For Approval
                        }
                    }}
                    isLoading={isValidating}
                    onSearch={handleSearch}
                />
            </div>
        </PageTemplate>
    )
}
