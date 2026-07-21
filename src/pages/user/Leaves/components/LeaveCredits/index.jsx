import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Table from '@/components/Table'
import FiledLeaves from './FiledLeaves'

function LeaveCredits({
    leavesCreditsData,
    filedLeavesData,
    handeLeaveSelect,
    isLoading
}) {

    const columns = useMemo(() => ([
        {
            accessorKey: 'fiscalYear',
            header: 'Year',
        },
        {
            accessorKey: 'type',
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
            accessorKey: 'previousBalance',
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
                defaultSorting={[{ id: 'fiscalYear', desc: true }]}
                isLoading={isLoading}
            />

            <FiledLeaves
                data={filedLeavesData}
                isLoading={isLoading}
                handeLeaveSelect={handeLeaveSelect}
            />
        </div>
    )
}

LeaveCredits.propTypes = {
    leavesCreditsData: PropTypes.array.isRequired,
    filedLeavesData: PropTypes.array.isRequired,
    handeLeaveSelect: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
}

export default LeaveCredits
