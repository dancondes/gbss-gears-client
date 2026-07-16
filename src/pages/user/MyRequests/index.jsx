import React, { useState, useMemo } from 'react'
import Table from '../../../components/Table'
import PageTemplate from '@/components/PageTemplate'
import { getCurrentDate } from '@/utilities/date-utilities'
import { AMENDMENT_STATUS } from '@/constants'
import useSWR from 'swr'
import { getMyRequests } from '@/services/user-service'
import { useAuthStore } from '@/store'

const currentDate = getCurrentDate()

function MyRequests() {
    const user = useAuthStore((state) => state.user)
    const [filters, setFilters] = useState({
        dateFrom: currentDate,
        dateTo: currentDate,
        status: 3,
    })

    async function fetchMyRequests() {
        try {
            const params = {
                dateFrom: filters.dateFrom,
                dateTo: filters.dateTo,
            }
            const result = await getMyRequests(filters.status || 4, params)
            return result?.data || []
        } catch {
            return []
        }
    }

    const { data, isValidating, mutate } = useSWR(user?.userId ? ['team-records', user?.userId, filters] : null, fetchMyRequests)

    async function handleSearch(newFilters) {
        setFilters({
            dateFrom: newFilters.dateFrom || currentDate,
            dateTo: newFilters.dateTo || currentDate,
            status: newFilters.status ?? 3,
        })
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: 'workDate',
                header: 'Work Date',
                // type: 'date',
            },
            {
                accessorKey: 'logTime',
                header: 'LogTime',
                type: 'time'
            },
            {
                accessorKey: 'amendmentOn',
                header: 'Amendment On',
                // type: 'date'
            },
            {
                accessorKey: 'requestedTime',
                header: 'Requested Time',
                type: 'time'
            },
            {
                accessorKey: 'comment',
                header: 'Comment'
            },
            {
                accessorKey: 'status',
                header: 'Status',
            }
        ],
        []
    )

    return (
        <PageTemplate
            title="My Requests"
            subtitle="View and manage your requests"
            mutate={mutate}
        >
            <div className="p-1 sm:p-3">
                <Table
                    columns={columns}
                    data={data || []}
                    enablePagination={true}
                    enableSorting={true}
                    pageSize={10}
                    noDataLabel="No requests found"
                    globalFilterColumns={['comment']}
                    dateRange={{
                        column: 'workDate',
                        start: currentDate,
                        end: currentDate,
                        serverSide: true,
                    }}
                    columnFilters={{
                        status: {
                            label: 'Status',
                            options: AMENDMENT_STATUS,
                            serverSide: true,
                            value: 3, // For Approval
                            noAll: true
                        }
                    }}
                    isLoading={isValidating}
                    onSearch={handleSearch}
                />
            </div>
        </PageTemplate>
    )
}

export default MyRequests
