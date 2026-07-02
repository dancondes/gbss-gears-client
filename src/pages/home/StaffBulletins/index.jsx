import PageTemplate from '@/components/PageTemplate'
import Table from '@/components/Table'
import { getStaffBulletins } from '@/services/bulletins-service'
import React, { useMemo, useState } from 'react'
import useSWR from 'swr'
import ViewBodyModal from './components/ViewBodyModal'

export default function StaffBulletins() {
    const { data, isValidating, mutate } = useSWR('/user/staff-bulletins', getStaffBulletins)
    const [selectedBulletin, setSelectedBulletin] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const columns = useMemo(() => ([
        {
            accessorKey: 'createdDate',
            header: 'Date',
            type: 'date',
        },
        {
            accessorKey: 'subject',
            header: 'Subject',
        }
    ]), [])

    function handleRowClick(bulletin) {
        setSelectedBulletin(bulletin)
        setIsModalOpen(true)
    }

    return (
        <PageTemplate
            title="Staff Bulletin"
            mutate={mutate}
        >
            <div className="p-1 sm:p-3">
                <Table
                    data={data}
                    isLoading={isValidating}
                    columns={columns}
                    onRowClick={handleRowClick}
                    enablePagination={false}
                />

                {isModalOpen && (
                    <ViewBodyModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        bulletin={selectedBulletin}
                    />
                )}
            </div>
        </PageTemplate>
    )
}
