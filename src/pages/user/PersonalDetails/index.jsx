import React, { useState, useMemo, useEffect, useRef } from 'react'
import Table from '../../../components/Table'
import PageTemplate from '@/components/PageTemplate'
import { useAuthStore, useTabStore } from '@/store'
import { updatePersonalDetails } from '@/services/user-service'
import logger from '@/utilities/logger'
import { toast } from 'sonner'
import { isResultSuccessful } from '@/utilities'
import ChangePassword from '@/pages/home/ChangePassword'
import ChangePin from '@/pages/home/ChangePin'
import OpenTicketModal from '../Leaves/components/OpenTicketModal'
import { ENQUIRY_TYPE_ID_FOR_HR } from '@/constants/database-id'

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
    const editInputRef = useRef(null)

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

    useEffect(() => {
        if (editingField) {
            editInputRef.current?.focus()
        }
    }, [editingField])

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
                    const isActive = editingField === row.fieldKey
                    return (
                        <span className={`inline-flex items-center gap-1.5 ${isActive ? 'font-semibold text-primary' : ''}`}>
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
                                    className={isActive ? 'text-primary' : 'text-gray-400'}
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
                cell: (info) => info.getValue() || <span className="text-gray-300">—</span>
            }
        ],
        [editingField]
    )

    function handleFieldClick(field) {
        setEditingField(field.key)
        setEditValue(personalDetails[field.key] || '')
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

    function handleKeyDown(e) {
        if (e.key === 'Enter') handleUpdate()
        if (e.key === 'Escape') handleCancel()
    }

    return (
        <div>
            <PageTemplate
                title="Personal Details"
                subtitle="View and update your personal information"
                rightSide={<OpenTicketModal concernLabel="Details" defaultValues={{ ticketType: ENQUIRY_TYPE_ID_FOR_HR }} />}
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
                            <div className="sticky top-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-primary"
                                    >
                                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                        <path d="m15 5 4 4" />
                                    </svg>
                                    <h2 className="text-sm font-semibold text-gray-800">Edit field</h2>
                                </div>

                                <div className="px-4 py-4">
                                    {editingField ? (
                                        <>
                                            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-400">
                                                {fields.find(f => f.key === editingField)?.label}
                                            </label>
                                            <input
                                                ref={editInputRef}
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                disabled={isSaving}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none ring-primary/30 transition-shadow focus:border-primary focus:ring-2"
                                            />

                                            <div className="mt-4 flex gap-2">
                                                <button
                                                    onClick={handleUpdate}
                                                    disabled={isSaving}
                                                    className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-dark-primary disabled:opacity-50 cursor-pointer"
                                                >
                                                    {isSaving ? 'Saving…' : 'Save'}
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    disabled={isSaving}
                                                    className="flex-1 rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 py-4 text-center">
                                            {/* <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.75"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-gray-300"
                                            >
                                                <path d="M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74" />
                                                <path d="M17 13.5V9a2 2 0 1 0-4 0v.5" />
                                                <path d="M13 9V7a2 2 0 1 0-4 0v6.5" />
                                                <path d="M5 15c-.6-1.2-1-1.9-1-3a2 2 0 1 1 4 0" />
                                                <path d="M4.5 15.5c-.9 2.5.5 6.5 5.5 6.5h1c4 0 6-2.5 6-6v-4" />
                                            </svg> */}
                                            <p className="text-sm text-gray-500">
                                                Click a row to edit it.
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Only fields with a <span className="whitespace-nowrap">pencil icon</span> can be edited.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageTemplate>

            <PageTemplate>
                <div className='grid grid-cols-1 md:grid-cols-6'>
                    <div ref={changePasswordRef} className='col-span-1 md:col-span-4 scroll-mt-24'>
                        <ChangePassword />
                    </div>

                    <div ref={changePinRef} className='col-span-2 scroll-mt-24'>
                        <ChangePin />
                    </div>
                </div>
            </PageTemplate>


        </div>
    )
}

export default PersonalDetails