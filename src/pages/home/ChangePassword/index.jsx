import FormInput from '@/components/form/FormInput'
import PageTemplate from '@/components/PageTemplate'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'

const PASSWORD_REQUIREMENTS = [
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
    } = useForm({ mode: 'onSubmit' })

    const newPassword = watch('newPassword', '')

    async function onSubmit(formValues) {
    }

    return (
        <PageTemplate
            title="Change Password"
            subtitle="Update your password to keep your account secure."
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-4">
                    {/* Left: password fields */}
                    <div className="space-y-4">
                        <div className="rounded border border-primary/60 overflow-hidden">
                            <div className="bg-white px-4 py-2 border-b border-primary/60 border-t-4 border-t-primary/60">
                                <h4 className="text-sm font-semibold text-gray-800">Current Password</h4>
                            </div>
                            <div className="px-4 py-3">
                                <FormInput
                                    type="password"
                                    label="Type your old password:"
                                    name="currentPassword"
                                    placeholder=""
                                    register={register}
                                    validation={{
                                        required: 'Current password is required',
                                    }}
                                    error={errors.currentPassword?.message}
                                />
                            </div>
                        </div>

                        <div className="rounded border border-primary/60 overflow-hidden">
                            <div className="bg-white px-4 py-2 border-b border-primary/60 border-t-4 border-t-primary/60">
                                <h4 className="text-sm font-semibold text-gray-800">New Password</h4>
                            </div>
                            <div className="px-4 py-3 space-y-3">
                                <FormInput
                                    type="password"
                                    label="Type a new password:"
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
                                    label="Type the password again to confirm:"
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
                        </div>
                    </div>

                    {/* Right: requirements panel */}
                    <div className="rounded border border-gray-200 px-4 py-3 h-fit">
                        <h4 className="text-sm font-semibold text-dark mb-2 pb-2 border-b border-dashed border-gray-300">
                            Requirements - Password must :
                        </h4>
                        <ul className="space-y-1.5">
                            {PASSWORD_REQUIREMENTS.map((req) => {
                                const met = newPassword.length > 0 && req.test(newPassword)
                                return (
                                    <li
                                        key={req.label}
                                        className={`flex items-start gap-1.5 text-sm ${met ? 'text-green-600' : 'text-dark'}`}
                                    >
                                        {met ? (
                                            <CheckIcon className="h-4 w-4 mt-0.5 shrink-0" />
                                        ) : (
                                            <span className="mt-0.5 shrink-0">-</span>
                                        )}
                                        <span>{req.label}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                {/* Footer: error + actions */}
                <div className="flex items-center justify-end gap-3 mt-4 border-t border-gray-200 pt-4">
                    {/* <button
                        type="button"
                        onClick={handleClose}
                        className="btn-white"
                    >
                        Cancel
                    </button> */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary"
                    >
                        Change
                    </button>
                </div>
            </form>
        </PageTemplate>
    )
}