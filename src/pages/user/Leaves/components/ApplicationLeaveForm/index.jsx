import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import FormInput from '@/components/form/FormInput'
import FormSelect from '@/components/form/FormSelect'
import TypeaheadSelect from '@/components/form/TypeaheadSelect'
import useConfirmationModal from '@/hooks/use-confirmation-modal'
import { toast } from 'react-toastify'
import logger from '@/utilities/logger'
import { useAuthStore } from '@/store'
import { isResultSuccessful } from '@/utilities'
import { getApprovers, useFetchLeaveTypeOptions } from '@/services/lookups-service'
import { useFetchOptions } from '@/hooks/use-fetch-options'
import { updateLeave } from '@/services/user-service'

const DEFAULT_FORM_VALUES = {
    id: null,
    dateFrom: '',
    dateTo: '',
    leaveTypeId: '',
    approvedBy: ''
}

function ApplicationLeaveFrom({
    selectedLeave = null,
    setSelectedLeave,
    onSuccess = () => { }
}) {
    const user = useAuthStore((state) => state.user)
    const { showConfirmationModal } = useConfirmationModal()
    const { options: leaveTypeOptions } = useFetchLeaveTypeOptions()
    const { options: approvedByOptions } = useFetchOptions(getApprovers, {
        valueKey: 'name',
        labelKey: 'name',
    })

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset
    } = useForm({
        defaultValues: DEFAULT_FORM_VALUES,
        mode: 'onBlur',
    })

    useEffect(() => {
        if (selectedLeave) {
            reset({
                id: selectedLeave.id,
                dateFrom: selectedLeave.startDate,
                dateTo: selectedLeave.endDate,
                leaveTypeId: selectedLeave.leaveTypeId,
                approvedBy: selectedLeave.approvedBy
            })
        } else {
            reset(DEFAULT_FORM_VALUES)
        }
    }, [selectedLeave, reset])

    async function onSubmit(formData) {
        showConfirmationModal({
            title: selectedLeave ? 'Update Leave' : 'File a Leave',
            message: selectedLeave
                ? 'Are you sure you want to update this leave?'
                : 'Are you sure you want to file this leave?',
            confirmText: selectedLeave ? 'Update' : 'File Leave',
            cancelText: 'Cancel',
            onConfirm: () => {
                handleSave(formData)
            },
        })
    }

    async function handleSave(formData) {
        try {
            const leaveId = formData.id
            const params = {
                startDate: formData.dateFrom,
                endDate: formData.dateTo,
                leaveTypeId: formData.leaveTypeId,
                comment: formData.approvedBy,
            }
            
            const result = await (leaveId ? updateLeave(leaveId, params) : updateLeave())
            if (isResultSuccessful(result)) {
                toast.success(selectedLeave ? 'Leave updated successfully.' : 'Leave filed successfully.')
                setSelectedLeave(null)
                reset(DEFAULT_FORM_VALUES)
                onSuccess()
            }
        } catch (error) {
            toast.error('Failed to save leave. Please try again.')
            logger.error('Failed to save leave:', error)
        }
    }

    function handleCancel() {
        setSelectedLeave(null)
    }

    function handleReset() {
        reset(DEFAULT_FORM_VALUES)
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h2 className="text-md font-bold text-primary uppercase trakcking-widest">
                Application (Leave Form)
            </h2>
            <p className="text-sm text-gray-500 tracking-wide mb-2">
                {selectedLeave ? 'Edit an Existing Leave' : 'Plot a New Leave'}
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <FormInput
                        name='dateFrom'
                        label='Date From'
                        type='date'
                        register={register}
                        error={errors.dateFrom?.message}
                        validation={{
                            required: 'Date From is required'
                        }}
                        className="mb-0!"
                    />

                    <FormInput
                        name='dateTo'
                        label='Date To'
                        type='date'
                        register={register}
                        error={errors.dateFrom?.message}
                        validation={{
                            required: 'Date From is required'
                        }}
                        className="mb-0!"
                    />
                </div>

                <FormSelect
                    name='leaveTypeId'
                    label='Leave Type'
                    register={register}
                    options={leaveTypeOptions}
                    error={errors.leaveTypeId?.message}
                    validation={{
                        required: 'Leave Type is required'
                    }}
                />

                <FormSelect
                    name='approvedBy'
                    label='Approved By'
                    register={register}
                    options={approvedByOptions}
                    error={errors.approvedBy?.message}
                    validation={{
                        required: 'Approved By is required'
                    }}
                />

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 mt-4">
                    <button
                        type="button"
                        onClick={selectedLeave ? handleCancel : handleReset}
                        className="btn-white py-1.5! px-4!"
                    >
                        {selectedLeave ? 'Cancel' : 'Reset'}
                    </button>
                    {selectedLeave && (
                        <button
                            type="button"
                            // onClick=
                            className="btn-danger py-1.5! px-4!"
                        >
                            Delete
                        </button>
                    )}
                    <button
                        type="submit"
                        className="btn-primary py-1.5! px-4!"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

ApplicationLeaveFrom.propTypes = {
    selectedLeave: PropTypes.object,
    setSelectedLeave: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
}

export default ApplicationLeaveFrom
