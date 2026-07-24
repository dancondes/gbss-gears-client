import FormInput from '@/components/form/FormInput'
import PageTemplate from '@/components/PageTemplate'
import { MAX_PIN_LENGTH, PIN_PATTERN, PIN_PATTERN_MESSAGE } from '@/constants/password-validation'
import { useRefreshToken } from '@/hooks/use-refresh-token'
import { changePasswordPin } from '@/services/user-service'
import { isResultSuccessful } from '@/utilities'
import logger from '@/utilities/logger'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

function LockIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
    )
}

LockIcon.propTypes = {
    className: PropTypes.string,
}

export default function ChangePin() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        reset
    } = useForm({ mode: 'onSubmit' })
    const { refresh } = useRefreshToken()

    const newPin = watch('newPin', '')

    async function onSubmit(formData) {
        try {
            const params = {
                pin: formData.newPin,
            }

            const result = await changePasswordPin(params)
            if (isResultSuccessful(result)) {
                reset()
                await refresh() // Refresh the token after changing the PIN
                toast.success('PIN changed successfully.')
            } else {
                toast.error('Failed to change PIN. Please try again later.')
            }
        } catch (error) {
            logger.error('Error changing PIN:', error)
            toast.error('Failed to change PIN. Please try again later.')
        }
    }

    return (
        <PageTemplate
            title="Change Pin"
            subtitle="Update your pin to keep your account secure."
            hasBorder={false}
        >
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-xl border border-gray-200 shadow-sm bg-white overflow-hidden">
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-primary/5">
                            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary">
                                <LockIcon className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900">
                                    New Pin
                                </h4>
                                <p className="text-xs text-gray-500">
                                    Must be exactly 4 digits
                                </p>
                            </div>
                        </div>

                        <div className="px-5 py-5 space-y-4">
                            <FormInput
                                type="password"
                                label="New Pin"
                                name="newPin"
                                placeholder="••••"
                                register={register}
                                inputClassName="tracking-[0.5em]"
                                maxLength={MAX_PIN_LENGTH}
                                validation={{
                                    required: 'New pin is required',
                                    pattern: {
                                        value: PIN_PATTERN,
                                        message: PIN_PATTERN_MESSAGE,
                                    },
                                }}
                                error={errors.newPin?.message}
                            />
                            <FormInput
                                type="password"
                                label="Confirm Pin"
                                name="confirmNewPin"
                                placeholder="••••"
                                register={register}
                                inputClassName="tracking-[0.5em]"
                                maxLength={4}
                                validation={{
                                    required: 'Please confirm your new pin',
                                    validate: (value) =>
                                        value === newPin || 'Pins do not match',
                                }}
                                error={errors.confirmNewPin?.message}
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary w-full sm:w-auto"
                            >
                                {isSubmitting ? 'Saving...' : 'Change Pin'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </PageTemplate>
    )
}