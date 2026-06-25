import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@/components/modals/Modal'
import FormSelect from '@/components/form/FormSelect'
import { useForm } from 'react-hook-form'
import useConfirmationModal from '@/hooks/use-confirmation-modal'
import { toast } from 'react-toastify'
import { requestCOE } from '@/services/reports-service'
import { downloadFile } from '@/utilities/file-utilities'

const FORMAT_OPTIONS = [
    { value: 1, label: 'Regular' },
    { value: 0, label: 'Loan' },
]

function COERequests({
    isOpen,
    setIsOpen
}) {

    const { showConfirmationModal } = useConfirmationModal()

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

    async function handleSave(data) {
        try {
            const params = {
                type: data.format,
                personId: 1710
            }

            // create a filename when we have the logged in user details
            toast.success('Processing your COE request. Please do not refresh the page. The document will be downloaded automatically once complete.')
            setIsOpen(false)
            const response = await requestCOE(params)
            downloadFile(response, 'COE.pdf')
            toast.success('COE request successful. The file has been downloaded.')

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
            size="lg"
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
