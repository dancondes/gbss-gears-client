import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Table from '@/components/Table'
import { getCurrentDate, spliceDateFromTime } from '@/utilities/date-utilities'

const currentDate = getCurrentDate()
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

    function rowCondition(row) {
        const startDate = spliceDateFromTime(row.startDate)
        const endDate = spliceDateFromTime(row.endDate)

        if (startDate < currentDate || endDate < currentDate) {
            return true
        }
    }

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
                rowCondition={rowCondition}
                rowConditionClassName="bg-gray-100 hover:bg-gray-200! text-gray-400 cursor-not-allowed!"
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
