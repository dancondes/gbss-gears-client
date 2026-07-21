import React, { useMemo, useRef } from 'react'
import Table from '../../../components/Table'
import PageTemplate from '@/components/PageTemplate'
import { getCurrentDate } from '@/utilities/date-utilities'
import { AMENDMENT_STATUS } from '@/constants'
import useSWR from 'swr'
import { getMyRequests } from '@/services/user-service'
import { useAuthStore } from '@/store'
import OpenTicketModal from '../Leaves/components/OpenTicketModal'
import { ENQUIRY_TYPE_ID_FOR_TIME_AMEND } from '@/constants/database-id'

const currentDate = getCurrentDate()
const DEFAUL_STATUS = 3 // For Approval

function MyRequests() {
    const user = useAuthStore((state) => state.user)
    // const [filters, setFilters] = useState({
    //     dateFrom: currentDate,
    //     dateTo: currentDate,
    //     status: DEFAUL_STATUS,
    // })
    const filters = useRef({
        dateFrom: currentDate,
        dateTo: currentDate,
        status: DEFAUL_STATUS,
    })

    async function fetchMyRequests() {
        try {
            const currentFilter = filters.current
            const params = {
                dateFrom: currentFilter.dateFrom,
                dateTo: currentFilter.dateTo,
            }
            const result = await getMyRequests(currentFilter.status ?? 0, params)
            return result?.data || []
        } catch {
            return []
        }
    }

    const { data, isValidating, mutate } = useSWR(user?.userId ? ['team-records', user?.userId, filters] : null, fetchMyRequests)

    async function handleSearch(newFilters) {
        const mappedFilters = {
            dateFrom: newFilters.dateFrom || currentDate,
            dateTo: newFilters.dateTo || currentDate,
            status: newFilters.status ?? DEFAUL_STATUS,
        }
        filters.current = mappedFilters
        const result = await fetchMyRequests()
        mutate(result, false)
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
            rightSide={<OpenTicketModal concernLabel="Time Entry" defaultValues={{ ticketType: ENQUIRY_TYPE_ID_FOR_TIME_AMEND }} />}
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
                            value: DEFAUL_STATUS,
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
