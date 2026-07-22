import FormInput from '@/components/form/FormInput'
import PageTemplate from '@/components/PageTemplate'
import { changePasswordPin } from '@/services/user-service'
import { isResultSuccessful } from '@/utilities'
import logger from '@/utilities/logger'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const PASSWORD_REQUIREMENTS = [
    {
        label: 'have a length of atleast 15 characters',
        test: (v) => v.length >= 15,
    },
    {
        label: 'have an UPPERCASE character',
        test: (v) => /[A-Z]/.test(v),
    },
    {
        label: 'have a LOWERCASE character',
        test: (v) => /[a-z]/.test(v),
    },
    {
        label: 'have a number/digit',
        test: (v) => /\d/.test(v),
    },
    {
        label: 'have a special character',
        test: (v) => /[^A-Za-z0-9]/.test(v),
    },
]

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

function CheckIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
        </svg>
    )
}

CheckIcon.propTypes = {
    className: PropTypes.string,
}

export default function ChangePassword() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        reset
    } = useForm({ mode: 'onSubmit' })

    const newPassword = watch('newPassword', '')

    async function onSubmit(formData) {
        try {
            const params = {
                password: formData.newPassword,
            }
            const result = await changePasswordPin(params)
            if (isResultSuccessful(result)) {
                reset()
                toast.success('Password changed successfully.')
            } else {
                toast.error('Failed to change password. Please try again later.')
            }
        } catch (error) {
            logger.error('Error changing password:', error)
            toast.error('Failed to change password. Please try again later.')
        }
    }

    return (
        <PageTemplate
            title="Change Password"
            subtitle="Update your password to keep your account secure."
            hasBorder={false}
        >
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-xl border border-gray-200 shadow-sm bg-white overflow-hidden">
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-primary/5">
                            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary">
                                <LockIcon className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900">
                                    New Password
                                </h4>
                                <p className="text-xs text-gray-500">
                                    Choose a strong password to protect your account
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                            {/* Left: password fields */}
                            <div className="px-5 py-5 space-y-4">
                                <FormInput
                                    type="password"
                                    label="New Password"
                                    name="newPassword"
                                    placeholder=""
                                    register={register}
                                    validation={{
                                        required: 'New password is required',
                                        validate: (value) => {
                                            const failed = PASSWORD_REQUIREMENTS.find(r => !r.test(value))
                                            return failed ? `Password must ${failed.label}` : true
                                        },
                                    }}
                                    error={errors.newPassword?.message}
                                />
                                <FormInput
                                    type="password"
                                    label="Confirm Password"
                                    name="confirmNewPassword"
                                    placeholder=""
                                    register={register}
                                    validation={{
                                        required: 'Please confirm your new password',
                                        validate: (value) =>
                                            value === newPassword || 'Passwords do not match',
                                    }}
                                    error={errors.confirmNewPassword?.message}
                                />
                            </div>

                            {/* Right: requirements panel */}
                            <div className="px-5 py-5">
                                <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                                    Requirements
                                </h4>
                                <ul className="space-y-2">
                                    {PASSWORD_REQUIREMENTS.map((req) => {
                                        const met = newPassword.length > 0 && req.test(newPassword)
                                        return (
                                            <li
                                                key={req.label}
                                                className={`flex items-start gap-2 text-sm transition-colors ${met ? 'text-green-600' : 'text-gray-500'}`}
                                            >
                                                {met ? (
                                                    <CheckIcon className="h-4 w-4 mt-0.5 shrink-0" />
                                                ) : (
                                                    <span className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center">
                                                        <span className="w-1 h-1 rounded-full bg-gray-400" />
                                                    </span>
                                                )}
                                                <span>{req.label}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary w-full sm:w-auto"
                            >
                                {isSubmitting ? 'Saving...' : 'Change Password'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </PageTemplate>
    )
}