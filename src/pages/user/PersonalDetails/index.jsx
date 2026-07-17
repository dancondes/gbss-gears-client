import React, { useState, useMemo, useEffect, useRef } from 'react'
import Table from '../../../components/Table'
import PageTemplate from '@/components/PageTemplate'
import { useAuthStore, useTabStore } from '@/store'
import { updatePersonalDetails } from '@/services/user-service'
import logger from '@/utilities/logger'
import { toast } from 'react-toastify'
import { isResultSuccessful } from '@/utilities'
import ChangePassword from '@/pages/home/ChangePassword'
import ChangePin from '@/pages/home/ChangePin'

function PersonalDetails() {
    const user = useAuthStore((state) => state.user)
    const setUser = useAuthStore((state) => state.setUser)
    const [personalDetails, setPersonalDetails] = useState({})
    const [isSaving, setIsSaving] = useState(false)
    const getActiveTab = useTabStore((state) => state.getActiveTab)
    const clearTabState = useTabStore((state) => state.clearTabState)

    const [editingField, setEditingField] = useState(null)
    const [editValue, setEditValue] = useState('')

    const changePasswordRef = useRef(null)
    const changePinRef = useRef(null)

    useEffect(() => {
        const activeTab = getActiveTab()

        if (activeTab?.state?.goToChangePassword) {
            changePasswordRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }

        if (activeTab?.state?.goToChangePin) {
            changePinRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }

        clearTabState(activeTab?.id)
    }, [getActiveTab, clearTabState])

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
            { label: 'Mobile No.', key: 'mobile', editable: true },
            { label: 'Personal Email', key: 'personalEmail', required: true },
            { label: 'Street', key: 'address', editable: true },
            { label: 'Emergency Contact', key: 'emergencyContactName', editable: true },
            { label: 'Emergency Number', key: 'emergencyContactNumber', editable: true },
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
            value: personalDetails[field.key] || '',
            editable: field.editable || false
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
                        <span className="inline-flex items-center gap-1.5">
                            {info.getValue()}
                            {row.editable && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-gray-400"
                                    title='Editable field'
                                >
                                    <title>Editable field</title>
                                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                    <path d="m15 5 4 4" />
                                </svg>
                            )}
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
        if (field && field.editable) {
            handleFieldClick(field)
        } else {
            setEditingField(null)
        }
    }

    async function handleUpdate() {
        try {

            if (editValue.trim() === '') {
                toast.error('Value cannot be empty.')
                return
            }

            setIsSaving(true)
            const updatedDetails = {
                ...personalDetails,
                [editingField]: editValue
            }
            const result = await updatePersonalDetails({
                mobile: updatedDetails.mobile,
                address: updatedDetails.address,
                emergencyContactName: updatedDetails.emergencyContactName,
                emergencyContactNumber: updatedDetails.emergencyContactNumber
            })

            if (isResultSuccessful(result)) {
                setUser({
                    ...user,
                    personalDetails: updatedDetails
                })
                toast.success('Personal details updated successfully.')
                setEditingField(null)
            } else {
                toast.error('Failed to update personal details. Please try again later.')
            }
        } catch (error) {
            logger.error('Failed to update personal details:', error)
            toast.error('Failed to update personal details. Please try again later.')
        } finally {
            setIsSaving(false)
        }
    }

    function handleCancel() {
        setEditingField(null)
    }

    return (
        <div>
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
                            <div className="bg-primary/10 rounded shadow-sm border border-primary/50 p-6">
                                <h2 className="text-lg font-bold text-primary mb-4">Action</h2>

                                {editingField ? (
                                    <>
                                        <div className="mb-4">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                {fields.find(f => f.key === editingField)?.label}
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
                                                disabled={isSaving}
                                                className="flex-1 px-4 py-2 bg-primary text-white font-semibold rounded hover:bg-dark-primary transition-colors cursor-pointer"
                                            >
                                                {isSaving ? 'Saving...' : 'Save'}
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                disabled={isSaving}
                                                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400 transition-colors cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-sm text-gray-600">Click on an editable field to edit</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </PageTemplate>

            <div className='grid grid-cols-1 md:grid-cols-6'>
                <div ref={changePasswordRef} className='col-span-1 md:col-span-4 scroll-mt-24'>
                    <ChangePassword />
                </div>

                <div ref={changePinRef} className='col-span-2 scroll-mt-24'>
                    <ChangePin />
                </div>
            </div>


        </div>
    )
}

export default PersonalDetails