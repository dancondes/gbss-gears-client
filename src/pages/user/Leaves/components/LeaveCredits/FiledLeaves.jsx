import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Table from '@/components/Table'

function FiledLeaves({
    data = [],
    isLoading = false,
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
            accessorKey: 'leaveTypeDescription',
            header: 'Description',
        }
    ]), [])

    return (
        <div className="mt-4">
            <h2 className="text-sm font-bold text-primary uppercase mb-0!">
                Filed Leaves
            </h2>
            <p className='text-xs text-gray-500 mb-1'>Select a row to edit</p>

            <Table
                columns={columns}
                data={data}
                onRowClick={handeLeaveSelect}
                enablePagination={false}
                maxHeight={200}
                defaultSorting={[{ id: 'startDate', desc: true }]}
                isLoading={isLoading}
            />
        </div>
    )
}

FiledLeaves.propTypes = {
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    handeLeaveSelect: PropTypes.func.isRequired
}

export default FiledLeaves
