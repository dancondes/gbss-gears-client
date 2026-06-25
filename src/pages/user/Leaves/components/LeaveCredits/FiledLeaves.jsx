import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Table from '@/components/Table'

function FiledLeaves({
    data = [],
    handeLeaveSelect
}) {

    const columns = useMemo(() => ([
        {
            accessorKey: 'startDate',
            header: 'Start Date',
            type: 'date',
        },
        {
            accessorKey: 'endDate',
            header: 'End Date',
            type: 'date',
        },
        {
            accessorKey: 'approvedBy',
            header: 'Approved By',
        },
        {
            accessorKey: 'description',
            header: 'Description',
        }
    ]), [])

    return (
        <div className="mt-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                Filed Leaves
            </h2>

            <Table
                columns={columns}
                data={data}
                onRowClick={handeLeaveSelect}
                enablePagination={false}
                maxHeight={200}
                defaultSorting={[{ id: 'startDate', desc: true }]}
            />
        </div>
    )
}

FiledLeaves.propTypes = {
    data: PropTypes.array.isRequired,
    handeLeaveSelect: PropTypes.func.isRequired
}

export default FiledLeaves
