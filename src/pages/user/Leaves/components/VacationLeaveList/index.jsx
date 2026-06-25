import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Table from '@/components/Table'

function VacationLeaveList({ data }) {

    const columns = useMemo(() => ([
        {
            accessorKey: 'order',
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
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                Vacation Leave
            </h2>

            <Table
                columns={columns}
                data={data}
                enablePagination={false}
                maxHeight={300}
                defaultSorting={[{ id: 'order', desc: true }]}
            />
        </div>
    )
}

VacationLeaveList.propTypes = {
    data: PropTypes.array.isRequired
}

export default VacationLeaveList
