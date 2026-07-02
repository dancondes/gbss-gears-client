import PageTemplate from '@/components/PageTemplate'
import Table from '@/components/Table'
import React, { useMemo } from 'react'

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

    const data = [
        {
            name: 'John Doe',
            status: 'ONLINE',
            location: 'HOME'
        },
        {
            name: 'Jane Smith',
            status: 'OFFLINE',
            location: 'OFFICE'
        },
        {
            name: 'Bob Johnson',
            status: 'ONLINE',
            location: 'THREE NEO'
        }
    ]
    return (
        <PageTemplate
            title="Team Status"
        >
            <div className="p-1 sm:p-3">
                <Table
                    columns={columns}
                    data={data}
                    enablePagination={false}
                />
            </div>
        </PageTemplate>
    )
}
