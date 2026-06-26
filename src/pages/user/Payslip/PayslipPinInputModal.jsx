import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@/components/modals/Modal'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAuthStore } from '@/store'
import FormInput from '@/components/form/FormInput'
import useTabNavigation from '@/hooks/use-tab-navigation'


function PayslipPinInputModal({
    isOpen,
    setIsOpen
}) {
    const user = useAuthStore((state) => state.user)
    const navigate = useTabNavigation().navigate

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'onBlur'
    })

    async function onSubmit(data) {
        try {
            const params = {
                pin: data.pin,
                personId: user?.id
            }

            console.log('Payslip PIN submitted:', params)

            navigate('/user/payslip', {
                id: 'Payslip',
                label: 'Payslip',
            })

            setIsOpen(false)

        } catch (error) {
            toast.error(error.message || 'An error occurred while processing your request.')
        }
    }


    function handleClose() {
        setIsOpen(false)
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="View Payslip"
            size="md"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormInput
                    name="pin"
                    type="password"
                    label="Enter Payslip PIN"
                    register={register}
                    validation={{ required: 'Please enter your PIN' }}
                    error={errors.pin?.message}
                />

                <div className="flex justify-end mt-4 border-t border-gray-200 pt-">
                    <button
                        type="submit"
                        className="mt-3 btn-primary"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </Modal>
    )
}

PayslipPinInputModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired
}

export default PayslipPinInputModal
