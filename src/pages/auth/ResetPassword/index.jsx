import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FormInput from '@/components/form/FormInput'
import Alert from '@/components/Alert'
import CompanyBrand from '@/components/CompanyBrand'
import DevelopmentBanner from '@/components/DevelopmentBanner'
import { gbss_logo } from '@/assets/images'
import { useMessage } from '@/hooks/use-message'
import { useAuthStore } from '@/store'
import { resetUserPassword } from '@/services/user-service'
import { PASSWORD_VALIDATION } from '@/constants/password-validation'
// import { PASSWORD_VALIDATION } from '@/constants/password-validation'


const ResetPassword = () => {
    const navigate = useNavigate()
    const { encryptedEmail } = useParams()
    const logout = useAuthStore((state) => state.logout)
    const [formError, setFormError] = useMessage()
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(function() {
        logout()
    }, [logout])

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            password: '',
            confirmPassword: ''
        },
        mode: 'onBlur'
    })

    const password = watch('password')

    async function onSubmit(data) {
        setFormError('')
        setSuccessMessage('')

        if (!encryptedEmail) {
            setFormError('Invalid reset link. Please request a new password reset.')
            return
        }

        try {
            setLoading(true)
            const result = await resetUserPassword(encryptedEmail, data.password)

            if (result?.status === 200) {
                setSuccessMessage('Password reset successful! Redirecting to login...')
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            }
        } catch (err) {
            setFormError(err?.message || 'Failed to reset password. Please try again or request a new reset link.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <DevelopmentBanner />
            <div className="flex flex-1">
                <CompanyBrand
                    title="Reset Your Password"
                description="Enter your new password to regain access to your account."
            />

            <div className="flex-1 flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 py-12 border-l border-gray-200">
                <div className="max-w-md w-full space-y-8">
                    <div className="md:hidden text-center mb-8">
                        <img
                            src={gbss_logo}
                            alt="GBSS Logo"
                            className="mx-auto h-16 w-auto"
                        />
                    </div>

                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-primary">
                            Reset Password
                        </h2>
                        <p className="mt-2 text-center text-sm text-tertiary">
                            Enter your new password below
                        </p>
                    </div>

                    {formError && (
                        <Alert text={formError} type="error" />
                    )}

                    {successMessage && (
                        <Alert text={successMessage} type="success" />
                    )}

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="space-y-4">
                            <FormInput
                                name="password"
                                type="password"
                                placeholder="New Password"
                                label="New Password"
                                autoComplete="new-password"
                                error={errors.password?.message}
                                register={register}
                                validation={PASSWORD_VALIDATION}
                            />

                            <FormInput
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                label="Confirm Password"
                                autoComplete="new-password"
                                error={errors.confirmPassword?.message}
                                register={register}
                                validation={{
                                    required: 'Please confirm your password',
                                    validate: (value) => value === password || 'Passwords do not match'
                                }}
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading || !!successMessage}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 transition-colors cursor-pointer"
                            >
                                {loading ? 'Resetting...' : successMessage ? 'Success!' : 'Reset Password'}
                            </button>
                        </div>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-tertiary">
                            Remember your password?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="font-medium text-primary hover:underline cursor-pointer"
                            >
                                Back to login
                            </button>
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-xs text-tertiary">
                            © {new Date().getFullYear()} GBSS. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ResetPassword
