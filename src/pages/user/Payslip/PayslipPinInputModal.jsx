import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@/components/modals/Modal'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useAuthStore } from '@/store'
import FormInput from '@/components/form/FormInput'
import useTabNavigation from '@/hooks/use-tab-navigation'
import { getPIN } from '@/utilities/jwt-utils'
import { MAX_PIN_LENGTH } from '@/constants/password-validation'


function PayslipPinInputModal({
    isOpen,
    setIsOpen,
    showCloseButton = true,
}) {
    const token = useAuthStore((state) => state.token)
    const user = useAuthStore((state) => state.user)
    const setUser = useAuthStore((state) => state.setUser)
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

            const inputPIN = data.pin
            const userPIN = getPIN(token)

            if (inputPIN !== userPIN) {
                toast.error('Invalid PIN. Please try again.')
                return
            }

            setUser({ ...user, payslipPinVerified: true })
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
            size="sm"
            showCloseButton={showCloseButton}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormInput
                    name="pin"
                    type="password"
                    label="Enter Payslip PIN"
                    className="user-guide-payslip-pin"
                    register={register}
                    validation={{ required: 'Please enter your PIN' }}
                    error={errors.pin?.message}
                    inputClassName="tracking-[0.5em]"
                    maxLength={MAX_PIN_LENGTH}
                    autoFocus
                />

                <div className="flex justify-end mt-4 border-t border-gray-200 pt-">
                    <button
                        type="submit"
                        className="mt-3 btn-primary user-guide-payslip-submit"
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
    setIsOpen: PropTypes.func.isRequired,
    showCloseButton: PropTypes.bool,
}

export default PayslipPinInputModal
