import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Table from '@/components/Table'
import FiledLeaves from './FiledLeaves'

function LeaveCredits({
    leavesCreditsData,
    isLeaveCreditsLoading,
    filedLeavesData,
    isFiledLeavesLoading,
    handeLeaveSelect
}) {

    const columns = useMemo(() => ([
        {
            accessorKey: 'fiscalYear',
            header: 'Year',
        },
        {
            accessorKey: 'leaveType',
            header: 'Type',
        },
        {
            accessorKey: 'earned',
            header: 'Earned',
            type: 'decimal'
        },
        {
            accessorKey: 'additional',
            header: 'Additional',
            type: 'decimal'
        },
        {
            accessorKey: 'prevBalance',
            header: 'Prev. Balance',
            type: 'decimal'
        },
        {
            accessorKey: 'used',
            header: 'Used',
            type: 'decimal'
        },
        {
            accessorKey: 'remaining',
            header: 'Remaining',
            type: 'decimal'
        }
    ]), [])

    return (
        <div>
            <h2 className="text-md font-bold text-primary uppercase trakcking-widest mb-2">
                Leave Credits
            </h2>

            <Table
                columns={columns}
                data={leavesCreditsData}
                enablePagination={false}
                maxHeight={150}
                defaultSorting={[{ id: 'year', desc: true }]}
                isLoading={isLeaveCreditsLoading}
            />

            <FiledLeaves
                data={filedLeavesData}
                isLoading={isFiledLeavesLoading}
                handeLeaveSelect={handeLeaveSelect}
            />
        </div>
    )
}

LeaveCredits.propTypes = {
    leavesCreditsData: PropTypes.array.isRequired,
    isLeaveCreditsLoading: PropTypes.bool.isRequired,
    filedLeavesData: PropTypes.array.isRequired,
    isFiledLeavesLoading: PropTypes.bool.isRequired,
    handeLeaveSelect: PropTypes.func.isRequired
}

export default LeaveCredits
