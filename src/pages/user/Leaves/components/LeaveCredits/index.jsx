import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Table from '@/components/Table'
import FiledLeaves from './FiledLeaves'

function LeaveCredits({
    data = [],
    filedLeavesData = [],
    handeLeaveSelect
}) {

    const columns = useMemo(() => ([
        {
            accessorKey: 'year',
            header: 'Year',
        },
        {
            accessorKey: 'leaveType',
            header: 'Type',
        },
        {
            accessorKey: 'earned',
            header: 'Earned',
        },
        {
            accessorKey: 'additional',
            header: 'Additional',
        },
        {
            accessorKey: 'prevBalance',
            header: 'Prev. Balance',
        },
        {
            accessorKey: 'used',
            header: 'Used',
        },
        {
            accessorKey: 'remaining',
            header: 'Remaining',
        }
    ]), [])

    return (
        <div>
            <h2 className="text-md font-bold text-primary uppercase trakcking-widest mb-2">
                Leave Credits
            </h2>

            <Table
                columns={columns}
                data={data}
                enablePagination={false}
                maxHeight={150}
                defaultSorting={[{ id: 'year', desc: true }]}
            />

            <FiledLeaves
                data={filedLeavesData}
                handeLeaveSelect={handeLeaveSelect}
            />
        </div>
    )
}

LeaveCredits.propTypes = {
    data: PropTypes.array.isRequired,
    filedLeavesData: PropTypes.array.isRequired,
    handeLeaveSelect: PropTypes.func.isRequired
}

export default LeaveCredits
