import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Table from '@/components/Table'
import ExportToExcel from '@/components/ExportToExcel'

function LeaveCredits({
    data = []
}) {

    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'leaveType',
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
            />
        </div>
    )
}

LeaveCredits.propTypes = {
    data: PropTypes.array.isRequired
}

export default LeaveCredits
