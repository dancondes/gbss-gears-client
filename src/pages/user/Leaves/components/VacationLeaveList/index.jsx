import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Table from '@/components/Table'

function VacationLeaveList({ data, isLoading }) {

    const columns = useMemo(() => ([
        {
            accessorKey: 'sortOrder',
            header: 'S.Order',
        },
        {
            accessorKey: 'workDate',
            header: 'Work Date',
            type: 'date',
        },
        {
            accessorKey: 'description',
            header: 'Description',
        },
        {
            accessorKey: 'value',
            header: 'Value',
            type: 'decimal'
        },
        {
            accessorKey: 'balance',
            header: 'Balance',
            type: 'decimal'
        }
    ]), [])

    return (
        <div>
            <h2 className="text-sm font-semibold text-primary uppercase mb-1">
                Vacation Leave
            </h2>

            <Table
                columns={columns}
                data={data}
                enablePagination={false}
                maxHeight={300}
                defaultSorting={[{ id: 'sortOrder', desc: true }]}
                isLoading={isLoading}
            />
        </div>
    )
}

VacationLeaveList.propTypes = {
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool
}

export default VacationLeaveList
