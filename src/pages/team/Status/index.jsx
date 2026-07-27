import PageTemplate from '@/components/PageTemplate'
import Table from '@/components/Table'
import { LOCATION_OPTIONS } from '@/constants'
import useRefetchOnTabActive from '@/hooks/use-refresh-tab-on-tab-active'
import { getTeamStatus } from '@/services/user-service'
import { formatArrayOfStringsAsSelectOptions } from '@/utilities'
import React, { useMemo } from 'react'
import useSWR from 'swr'

export default function Status() {
    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'status',
            header: 'Status',
        },
        {
            accessorKey: 'location',
            header: 'Location',
        }
    ], [])

    const { data, isValidating, mutate } = useSWR('team-status', fetchTeamStatus)

    async function fetchTeamStatus() {
        try {
            const result = await getTeamStatus()
            return result?.data || []
        } catch {
            return []
        }
    }

    useRefetchOnTabActive('Team-Status', mutate)

    return (
        <PageTemplate
            title="Team Status"
            subtitle="View the current status of your team members"
            mutate={mutate}
        >
            <div className="p-1 sm:p-3">
                <Table
                    columns={columns}
                    data={data || []}
                    enablePagination={false}
                    isLoading={isValidating}
                    globalFilterColumns={['name']}
                    columnFilters={{
                        status: {
                            label: 'Status',
                            options: formatArrayOfStringsAsSelectOptions(['ONLINE', 'OFFLINE'])
                        },
                        location: {
                            label: 'Location',
                            options: LOCATION_OPTIONS
                        }
                    }}
                />
            </div>
        </PageTemplate>
    )
}
