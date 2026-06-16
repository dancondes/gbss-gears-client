import React, { useState, useMemo } from 'react'
import Table from '../../../components/Table'

function PersonalDetails() {
    const [personalDetails] = useState({
        firstname: 'Jerwin',
        lastname: 'Lalap',
        birthdate: '2002-05-20',
        civilStatus: '',
        mobileNo: '0921 987 3062',
        personalEmail: 'jerwin.jpl@gmail.com',
        street: '327 San Pablo, Batangas Sto. Tomas,',
        emergencyContact: 'Sergia Lalap ( Mother )',
        emergencyNumber: '0909 378 0208',
        sss: '04-4917850-6',
        phic: '10-251575793-4',
        atmNumber: '492-3-492-716171',
        tin: '659-381-808',
        hdmf: '1213-5446-3236'
    })

    const [editingField, setEditingField] = useState(null)
    const [editValue, setEditValue] = useState('')

    const fields = useMemo(
        () => [
            { label: 'Firstname', key: 'firstname', required: true },
            { label: 'Lastname', key: 'lastname', required: true },
            { label: 'Birthdate', key: 'birthdate' },
            { label: 'Civil Status', key: 'civilStatus', required: true },
            { label: 'Mobile No.', key: 'mobileNo' },
            { label: 'Personal Email', key: 'personalEmail', required: true },
            { label: 'Street', key: 'street' },
            { label: 'Emergency Contact', key: 'emergencyContact' },
            { label: 'Emergency Number', key: 'emergencyNumber' },
            { label: 'SSS', key: 'sss', required: true },
            { label: 'PHIC', key: 'phic', required: true },
            { label: 'ATM Number', key: 'atmNumber', required: true },
            { label: 'TIN', key: 'tin', required: true },
            { label: 'HDMF', key: 'hdmf', required: true }
        ],
        []
    )

    const tableData = useMemo(
        () => fields.map(field => ({
            id: field.key,
            fieldLabel: field.label,
            fieldKey: field.key,
            required: field.required,
            value: personalDetails[field.key]
        })),
        [fields, personalDetails]
    )

    const columns = useMemo(
        () => [
            {
                accessorKey: 'fieldLabel',
                header: 'FIELD',
                cell: (info) => {
                    const row = info.row.original
                    return (
                        <span>
                            {row.required ? <span className="text-danger">*</span> : ''}
                            {info.getValue()}
                        </span>
                    )
                }
            },
            {
                accessorKey: 'value',
                header: 'VALUES',
                cell: (info) => info.getValue()
            }
        ],
        []
    )

    function handleFieldClick(field) {
        setEditingField(field.key)
        setEditValue(personalDetails[field.key])
    }

    function handleRowClick(rowData) {
        const field = fields.find(f => f.key === rowData.fieldKey)
        if (field) {
            handleFieldClick(field)
        }
    }

    function handleUpdate() {
        console.log(`Updated ${editingField}: ${editValue}`)
        setEditingField(null)
    }

    function handleCancel() {
        setEditingField(null)
    }

    return (
        <main className="container-width px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-primary mb-6">PERSONAL DETAILS</h1>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left side - Details Table */}
                <div className="flex-1">
                    <Table
                        columns={columns}
                        data={tableData}
                        enablePagination={false}
                        enableSorting={false}
                        enableFiltering={false}
                        enableSearch={false}
                        onRowClick={handleRowClick}
                        emptyMessage="No personal details found"
                    />
                </div>

                {/* Right side - Action Panel */}
                <div className="lg:w-80">
                    <div className="bg-blue-50 rounded shadow-sm border border-blue-200 p-6">
                        <h2 className="text-lg font-bold text-primary mb-4">Action</h2>

                        {editingField ? (
                            <>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        *{fields.find(f => f.key === editingField)?.label}
                                    </label>
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                        autoFocus
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleUpdate}
                                        className="flex-1 px-4 py-2 bg-primary text-white font-semibold rounded hover:bg-dark-primary transition-colors cursor-pointer"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400 transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-gray-600">Click on a field to edit</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PersonalDetails
