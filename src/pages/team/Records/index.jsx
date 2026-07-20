import PageTemplate from '@/components/PageTemplate'
import Table from '@/components/Table'
import { LOCATION_OPTIONS } from '@/constants'
import { useFetchOptions } from '@/hooks/use-fetch-options'
import { getTimeEntries } from '@/services/event-service'
import { getLogTypes, useFetchEmployeeOptions } from '@/services/lookups-service'
import { useAuthStore, useTabStore } from '@/store'
import { formatArrayOfStringsAsSelectOptions } from '@/utilities'
import { getCurrentDate } from '@/utilities/date-utilities'
import React, { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

export default function Records() {
    const currentDate = getCurrentDate()
    const user = useAuthStore((state) => state.user)
    const activeTabId = useTabStore((state) => state.activeTabId)
    const [filters, setFilters] = useState({
        dateFrom: currentDate,
        dateTo: currentDate
    })
    const { options: logTypeOptions } = useFetchOptions(getLogTypes, {
        valueKey: 'definition',
        labelKey: 'definition'
    })

    async function fetchTeamRecords() {
        try {
            const result = await getTimeEntries(filters)
            return result?.data?.map(log => ({
                ...log,
                name: `${log?.firstname} ${log?.lastname}`,
            })) || []
        } catch {
            return []
        }
    }

    const { data, isValidating, mutate } = useSWR(user?.userId ? ['team-records', user?.userId, filters] : null, fetchTeamRecords)
    const { options: employeeOptions } = useFetchEmployeeOptions()

    useEffect(() => {
        if (activeTabId === 'Team-Records') {
            mutate()
        }
    }, [user?.userId, mutate, activeTabId])

    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'workdate',
            header: 'Work Date',
            type: 'date',
        },
        {
            accessorKey: 'worktime',
            header: 'Time',
        },
        {
            accessorKey: 'logTypeDescription',
            header: 'Log Type',
        },
        {
            accessorKey: 'location',
            header: 'Location',
        }
    ], [])

    async function handleSearch(serverFilters) {
        const mappedFilters = {
            dateFrom: serverFilters.dateFrom || currentDate,
            dateTo: serverFilters.dateTo || currentDate,
        }

        setFilters(mappedFilters)
    }

    return (
        <PageTemplate
            title="Records"
            subtitle="View your team members' time logs"
            mutate={mutate}
        >
            <div className="p-1 sm:p-3">
                <Table
                    columns={columns}
                    data={data || []}
                    enableSorting={true}
                    pageSize={50}
                    isLoading={isValidating}
                    onSearch={handleSearch}
                    exportToExcel={{
                        fileName: 'Time Logs',
                        position: 'bottom-right',
                        buttonLabel: 'Export to Excel'
                    }}
                    dateRange={{
                        column: 'workdate',
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
                        logTypeDescription: {
                            label: 'Log Type',
                            options: logTypeOptions,
                        },
                        location: {
                            label: 'Location',
                            options: formatArrayOfStringsAsSelectOptions(LOCATION_OPTIONS)
                        }
                    }}
                />
            </div>
        </PageTemplate>
    )
}
