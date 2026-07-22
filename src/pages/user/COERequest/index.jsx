import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@/components/modals/Modal'
import FormSelect from '@/components/form/FormSelect'
import { useForm } from 'react-hook-form'
import useConfirmationModal from '@/hooks/use-confirmation-modal'
import { toast } from 'sonner'
import { downloadFile } from '@/utilities/file-utilities'
import { useAuthStore, useNotificationStore } from '@/store'
import { getCOE } from '@/services/user-service'

const FORMAT_OPTIONS = [
    { value: 1, label: 'Regular' },
    { value: 0, label: 'Loan' },
]

function COERequests({
    isOpen,
    setIsOpen
}) {

    const { showConfirmationModal } = useConfirmationModal()
    const user = useAuthStore((state) => state.user)
    const addNotification = useNotificationStore((state) => state.addNotification)

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'onBlur'
    })

    async function onSubmit(data) {
        showConfirmationModal({
            title: 'COE Request',
            message: 'Please be informed that this will take several seconds to complete. Do you want to continue?',
            confirmText: 'Yes',
            cancelText: 'No',
            onConfirm: () => {
                handleSave(data)
            },
        })
    }

    function generateNameForFilename(employee, capitalize = true) {
        const { id, firstname, lastname } = employee || {}
        const namePart = (
            ((capitalize ? firstname?.toUpperCase() : firstname) || '') +
            ' ' +
            ((capitalize ? lastname?.toUpperCase() : lastname) || '')
        ).trim()
        return namePart || id || 'Unknown_Employee'
    }

    async function handleSave(data) {
        try {
            // create a filename when we have the logged in user details
            setIsOpen(false)
            toast.success('Processing your COE request. Please do not refresh the page. The document will be downloaded automatically once complete.')
            const response = await getCOE(data.format)
            const filename = `Certificate of Employment${data.format == 1 ? '' : ' with Compensation'} - ${generateNameForFilename(user?.employeeInfo)}.pdf`
            downloadFile(response, filename)
            addNotification({
                type: 'success',
                title: `COE${data.format == 1 ? '' : ' with Compensation'}`,
                message: `COE for ${user?.employeeInfo ? `${user?.employeeInfo.firstname} ${user?.employeeInfo.lastname}` : 'the employee'} has been downloaded. Check your downloads folder.`,
                showToast: true,
            })
            // toast.success('COE request successful. The file has been downloaded.')

        } catch (error) {
            toast.error(error.message || 'An error occurred while processing your request. Please try again later.')
        }
    }

    function handleClose() {
        setIsOpen(false)
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="COE Request"
            size="md"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormSelect
                    name="format"
                    label="Select Format"
                    options={FORMAT_OPTIONS}
                    register={register}
                    validation={{ required: 'Please select a format' }}
                    error={errors.format?.message}
                />

                <div className="flex justify-end mt-4 border-t border-gray-200 pt-">
                    <button
                        type="submit"
                        className="mt-3 btn-primary"
                    >
                        Send Request
                    </button>
                </div>
            </form>
        </Modal>
    )
}

COERequests.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired
}

export default COERequests
