import React, { useCallback, useMemo, useRef, useState } from 'react'
import Table from '../../../components/Table'
import PageTemplate from '@/components/PageTemplate'
import { getCurrentDate } from '@/utilities/date-utilities'
import useSWR from 'swr'
import { useAuthStore } from '@/store'
import { getTimeEntriesById } from '@/services/event-service'
import { useFetchOptions } from '@/hooks/use-fetch-options'
import { getLogTypes } from '@/services/lookups-service'
import { toast } from 'react-toastify'
import OpenTicketModal from '../Leaves/components/OpenTicketModal'
import { ENQUIRY_TYPE_ID_FOR_TIME_AMEND } from '@/constants/database-id'

function DailyRecords() {
    const user = useAuthStore((state) => state.user)
    const [isSearching, setIsSearching] = useState(false)
    const previousWorkDateRef = useRef(getCurrentDate())
    const { options: logTypeOptions } = useFetchOptions(getLogTypes, {
        valueKey: 'definition',
        labelKey: 'definition'
    })

    const fetchTimeEntries = useCallback(async () => {
        try {
            const params = {
                dateFrom: previousWorkDateRef.current,
                dateTo: previousWorkDateRef.current
            }
            const result = await getTimeEntriesById(user?.userId, params)
            return result?.data || []
        } catch {
            return []
        }
    }, [user?.userId])

    const { data, isValidating, mutate } = useSWR('daily-records', fetchTimeEntries)

    const handleSearch = useCallback(async (filters) => {
        const workDate = filters.workdate
        if (workDate && workDate !== previousWorkDateRef.current) {
            previousWorkDateRef.current = workDate
            try {
                setIsSearching(true)
                const result = await fetchTimeEntries()
                mutate(result, false)
            } catch {
                mutate([], false)
                toast.error('Failed to fetch time logs. Please try again.')
            } finally {
                setIsSearching(false)
            }
        }
    }, [fetchTimeEntries, mutate])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'workdate',
                header: 'Work Date',
                type: 'date'
            },
            {
                accessorKey: 'worktime',
                header: 'Time',
            },
            {
                accessorKey: 'logTypeDescription',
                header: 'Log Type'
            },
            {
                accessorKey: 'location',
                header: 'Location'
            }
        ],
        []
    )

    const columnFilters = useMemo(
        () => ({
            workdate: {
                label: 'Work Date',
                type: 'date',
                value: getCurrentDate(),
                serverSide: true,
            },
            logTypeDescription: {
                label: 'Log Type',
                options: logTypeOptions
            }
        }),
        [logTypeOptions]
    )

    return (
        <PageTemplate
            title="Daily Records"
            subtitle="View your daily clock-in and clock-out records"
            mutate={mutate}
            rightSide={<OpenTicketModal concernLabel="Time Entry" defaultValues={{ ticketType: ENQUIRY_TYPE_ID_FOR_TIME_AMEND }} />}
        >
            <div className="p-1 sm:p-3">
                {/* Time Logs Table */}
                <Table
                    columns={columns}
                    data={data || []}
                    enablePagination={true}
                    enableSorting={true}
                    enableFiltering={true}
                    pageSize={15}
                    noDataLabel="No time logs found"
                    isLoading={isValidating || isSearching}
                    columnFilters={columnFilters}
                    onSearch={handleSearch}
                />
            </div>
        </PageTemplate>
    )
}

export default DailyRecords
