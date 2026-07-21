import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Table from '@/components/Table'

function LeaveCredits({
    data = [],
    isLoading = false
}) {

    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'type',
            header: 'Type',
        },
        {
            accessorKey: 'earned',
            header: 'Earned',
            type: 'decimal',
        },
        {
            accessorKey: 'additional',
            header: 'Additional',
            type: 'decimal',
        },
        {
            accessorKey: 'used',
            header: 'Used',
            type: 'decimal',
        },
        {
            accessorKey: 'remaining',
            header: 'Remaining',
            type: 'decimal',
        }
    ])

    return (
        <div className="mb-4">
            <h2 className="text-md font-semibold text-gray-500 uppercase mb-1">
                Team Leave Credits
            </h2>

            <Table
                columns={columns}
                data={data}
                enablePagination={false}
                enableSorting={true}
                exportToExcel={{
                    fileName: 'Team Leave Credits',
                    position: 'bottom-right',
                    buttonLabel: 'Download to Excel'
                }}
                isLoading={isLoading}
            />
        </div>
    )
}

LeaveCredits.propTypes = {
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
}

export default LeaveCredits
