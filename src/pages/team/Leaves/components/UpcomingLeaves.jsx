import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Table from '@/components/Table'

function UpcomingLeaves({
    data
}) {

    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'fromDate',
            header: 'From Date',
            type: 'date',
        },
        {
            accessorKey: 'toDate',
            header: 'To Date',
            type: 'date',
        },
        {
            accessorKey: 'reason',
            header: 'Reason',
        }
    ], [])

    return (
        <div>
            <h2 className="text-md font-semibold text-gray-500 uppercase mb-1">
                Upcoming Leaves
            </h2>

            <Table
                columns={columns}
                data={data}
                enablePagination={false}
                enableSorting={true}
                exportToExcel={{
                    fileName: 'Team\'s Upcoming Leaves',
                    position: 'bottom-right',
                    buttonLabel: 'Download to Excel'
                }}
            />
        </div>
    )
}

UpcomingLeaves.propTypes = {
    data: PropTypes.array.isRequired
}

export default UpcomingLeaves
