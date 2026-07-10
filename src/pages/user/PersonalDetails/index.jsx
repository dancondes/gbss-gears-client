import React, { useState, useMemo, useEffect } from 'react'
import Table from '../../../components/Table'
import PageTemplate from '@/components/PageTemplate'
import { useAuthStore } from '@/store'

function PersonalDetails() {
    const user = useAuthStore((state) => state.user)
    const [personalDetails, setPersonalDetails] = useState({})

    const [editingField, setEditingField] = useState(null)
    const [editValue, setEditValue] = useState('')

    useEffect(() => {
        if (user?.personalDetails) {
            setPersonalDetails({
                ...user.personalDetails
            })
        }
    }, [user])

    const fields = useMemo(
        () => [
            { label: 'Firstname', key: 'firstname', required: true },
            { label: 'Lastname', key: 'lastname', required: true },
            { label: 'Birthdate', key: 'birthdate' },
            { label: 'Civil Status', key: 'civilStatus', required: true },
            { label: 'Mobile No.', key: 'mobile' },
            { label: 'Personal Email', key: 'personalEmail', required: true },
            { label: 'Street', key: 'address' },
            { label: 'Emergency Contact', key: 'emergencyContactName' },
            { label: 'Emergency Number', key: 'emergencyContactNumber' },
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
            value: personalDetails[field.key] || ''
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
        <PageTemplate
            title="Personal Details"
            subtitle="View and update your personal information"
        >
            <div className="p-1 sm:p-3">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left side - Details Table */}
                    <div className="flex-1">
                        <Table
                            columns={columns}
                            data={tableData}
                            enablePagination={false}
                            enableSorting={true}
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
            </div>
        </PageTemplate>
    )
}

export default PersonalDetails
