import PageTemplate from '@/components/PageTemplate'
import Table from '@/components/Table'
import { LOCATION_OPTIONS, USER_ID_FOR_COUNTER } from '@/constants'
import { useFetchOptions } from '@/hooks/use-fetch-options'
import useRefetchOnTabActive from '@/hooks/use-refresh-tab-on-tab-active'
import { getTimeEntries } from '@/services/event-service'
import { getLogTypes, useFetchEmployeeOptions } from '@/services/lookups-service'
import { useAuthStore } from '@/store'
import { formatDate, getCurrentDate } from '@/utilities/date-utilities'
import React, { useMemo, useState } from 'react'
import useSWR from 'swr'

const LOCATION_KEYS = {
    home: 'wfh',
    threeneo: 'wfo',
    philplans: 'wfo',
}

function countCheckInsByDate(logs = []) {
    const counts = logs.reduce((acc, log) => {
        if (log.logTypeCode !== 'I') return acc // case-sensitive

        acc[log.workdate] ??= { workdate: log.workdate, wfo: 0, wfh: 0, total: 0 }

        // case-insensitive, ignores spaces: "THREE NEO" -> "threeneo"
        const key = LOCATION_KEYS[log.location?.replace(/\s/g, '').toLowerCase()]
        if (key) {
            acc[log.workdate][key]++
            acc[log.workdate].total++
        }

        return acc
    }, {})

    // oldest first
    return Object.values(counts).sort((a, b) => a.workdate.localeCompare(b.workdate))
}

export default function Records() {
    const currentDate = getCurrentDate()
    const user = useAuthStore((state) => state.user)
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

    const { data, mutate, isValidating } = useSWR(
        user?.userId ? ['team-records', user.userId, filters.dateFrom, filters.dateTo] : null,
        fetchTeamRecords
    )
    const { options: employeeOptions } = useFetchEmployeeOptions(null, true)

    const checkInCounter = useMemo(() => countCheckInsByDate(data), [data])

    useRefetchOnTabActive('Team-Records', mutate)

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

    const counterColumns = useMemo(() => [
        {
            accessorKey: 'workdate',
            header: 'Work Date',
            type: 'date',
        },
        {
            accessorKey: 'wfo',
            header: 'WFO',
        },
        {
            accessorKey: 'wfh',
            header: 'WFH',
        },
        {
            accessorKey: 'total',
            header: 'Total',
        }
    ], [])

    function handleSearch(serverFilters) {
        const dateFrom = serverFilters.dateFrom || currentDate
        const dateTo = serverFilters.dateTo || currentDate

        // keeping the same object when the dates haven't changed avoids a re-render
        setFilters(prev =>
            prev.dateFrom === dateFrom && prev.dateTo === dateTo
                ? prev
                : { dateFrom, dateTo }
        )
    }

    function getDateRangeFilters() {
        const { dateFrom, dateTo } = filters

        if (dateFrom === dateTo) {
            return formatDate(dateFrom, 'DD-MM-YYYY')
        }

        return `${formatDate(dateFrom, 'DD-MM-YYYY')} to ${formatDate(dateTo, 'DD-MM-YYYY')}`
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
                    pageSize={300}
                    isLoading={isValidating}
                    onSearch={handleSearch}
                    maxHeight={350}
                    exportToExcel={{
                        fileName: `Time Logs_${getDateRangeFilters()}`,
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
                            options: LOCATION_OPTIONS
                        }
                    }}
                />

                {USER_ID_FOR_COUNTER.includes(user?.userId) && (
                    <>
                        <hr className="my-4 border-gray-300" />

                        <Table
                            columns={counterColumns}
                            data={checkInCounter}
                            enableSorting={true}
                            pageSize={300}
                            isLoading={isValidating}
                            maxHeight={350}
                            exportToExcel={{
                                fileName: `Time Logs Location Count_${getDateRangeFilters()}`,
                                position: 'bottom-right',
                                buttonLabel: 'Export to Excel'
                            }}
                        />
                    </>
                )}
            </div>
        </PageTemplate>
    )
}