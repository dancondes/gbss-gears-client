import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import EmailInput from '@/components/form/EmailInput'
import Alert from '@/components/Alert'
import CompanyBrand from '@/components/CompanyBrand'
import DevelopmentBanner from '@/components/DevelopmentBanner'
import { gbss_logo } from '@/assets/images'
import { useAuthStore } from '@/store'
import { useMessage } from '@/hooks/use-message'
import { GBSS_DOMAIN } from '@/constants'
import { requestPasswordReset, requestSendVerificationEmail } from '@/services/user-service'
import { isResultSuccessful } from '@/utilities'
import ResetLinkSent from './ResetLinkSent'
import VerificationLinkSent from './VerificationLinkSent'
import EmailNotVerified from './EmailNotVerified'
import EmailNotRegistered from './EmailNotRegistered'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const token = useAuthStore((state) => state.token)
    const [formError, setFormError] = useMessage()
    const [loading, setLoading] = useState(false)
    const [verificationLoading, setVerificationLoading] = useState(false)
    const [submittedEmail, setSubmittedEmail] = useState('')
    const [status, setStatus] = useState(null) // 'reset-sent', 'not-verified', 'not-registered'

    useEffect(() => {
        if (token) {
            navigate('/', { replace: true })
        }
    }, [token, navigate])

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: ''
        }
    })

    async function onSubmit(data) {
        setFormError('')
        const email = data.email?.trim() || ''
        const fullEmail = email?.endsWith(GBSS_DOMAIN) ? email : `${email}${GBSS_DOMAIN}`

        try {
            setLoading(true)
            const result = await requestPasswordReset(fullEmail)
            
            if (isResultSuccessful(result)) {
                setSubmittedEmail(fullEmail)
                setStatus('reset-sent')
            } else if (result?.status === 500 && result?.message?.includes('Email is unverified!')) {
                setSubmittedEmail(fullEmail)
                setStatus('not-verified')
            } else if (result?.status === 500 && result?.message?.includes('Email does not exist!')) {
                setSubmittedEmail(fullEmail)
                setStatus('not-registered')
            } else {
                setFormError(result?.message || 'Failed to process request. Please try again.')
            }
        } catch (err) {
            if (err?.status === 500 && err?.message?.includes('Email is unverified!')) {
                setSubmittedEmail(fullEmail)
                setStatus('not-verified')
            } else if (err?.status === 500 && err?.message?.includes('Email does not exist!')) {
                setSubmittedEmail(fullEmail)
                setStatus('not-registered')
            } else {
                setFormError(err?.message || 'Failed to send reset email. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    async function handleSendVerification() {
        try {
            setVerificationLoading(true)
            const result = await requestSendVerificationEmail(submittedEmail)
            
            if (result?.status === 200) {
                setFormError('')
                setStatus('verification-sent')
            } else {
                setFormError(result?.message || 'Failed to send verification email. Please try again.')
            }
        } catch (err) {
            setFormError(err?.message || 'Failed to send verification email. Please try again.')
        } finally {
            setVerificationLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <DevelopmentBanner />
            <div className="flex flex-1">
                <CompanyBrand
                    title="Reset Your Password"
                description="Enter your email address and we'll send you a link to reset your password."
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

                    {!status ? (
                        <>
                            <div>
                                <h2 className="text-center text-3xl font-extrabold text-primary">
                                    Forgot Password?
                                </h2>
                                <p className="mt-2 text-center text-sm text-tertiary">
                                    Enter your email address below and we&apos;ll send you a link to reset your password.
                                </p>
                            </div>

                            {formError && (
                                <Alert text={formError} type="error" />
                            )}

                            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                                <div className="space-y-4">
                                    <EmailInput
                                        name="email"
                                        placeholder="yourname"
                                        label="Email"
                                        showDomain={true}
                                        autoComplete="username"
                                        error={errors.email?.message}
                                        register={register}
                                        validation={{
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+(@gbss\.com\.au)?$/,
                                                message: 'Please enter a valid email'
                                            }
                                        }}
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 transition-colors cursor-pointer"
                                    >
                                        {loading ? 'Sending...' : 'Send Reset Link'}
                                    </button>
                                </div>
                            </form>

                            <div className="text-center">
                                <p className="text-sm text-tertiary">
                                    Remember your password?{' '}
                                    <Link to="/login" className="font-medium text-primary hover:underline">
                                        Back to login
                                    </Link>
                                </p>
                            </div>
                        </>
                    ) : status === 'reset-sent' ? (
                        <ResetLinkSent submittedEmail={submittedEmail} />
                    ) : status === 'not-verified' ? (
                        <EmailNotVerified
                            submittedEmail={submittedEmail}
                            formError={formError}
                            verificationLoading={verificationLoading}
                            onSendVerification={handleSendVerification}
                        />
                    ) : status === 'verification-sent' ? (
                        <VerificationLinkSent submittedEmail={submittedEmail} />
                    ) : status === 'not-registered' && (
                        <EmailNotRegistered submittedEmail={submittedEmail} />
                    )}

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

export default ForgotPassword
