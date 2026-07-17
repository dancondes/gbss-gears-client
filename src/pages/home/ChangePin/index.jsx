import FormInput from '@/components/form/FormInput'
import PageTemplate from '@/components/PageTemplate'
import React from 'react'
import { useForm } from 'react-hook-form'

export const PIN_PATTERN = /^\d{4}$/

export default function ChangePin() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({ mode: 'onSubmit' })

    const newPin = watch('newPin', '')

    async function onSubmit(formValues) {
    }

    return (
        <PageTemplate
            title="Change Pin"
            subtitle="Update your pin to keep your account secure."
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="rounded border border-primary/60 overflow-hidden mb-4">
                    <div className="bg-white px-4 py-2 border-b border-primary/60 border-t-4 border-t-primary/60">
                        <h4 className="text-sm font-semibold text-gray-800">Current Pin</h4>
                    </div>
                    <div className="px-4 py-3">
                        <FormInput
                            type="password"
                            label="Type your old Pin:"
                            name="currentPin"
                            placeholder=""
                            register={register}
                            inputClassName="tracking-[0.3em]"
                            validation={{
                                required: 'Current pin is required',
                                pattern: {
                                    value: PIN_PATTERN,
                                    message: 'Pin must be exactly 4 digits',
                                },
                            }}
                            error={errors.currentPin?.message}
                        />
                    </div>
                </div>

                <div className="rounded border border-primary/60 overflow-hidden">
                    <div className="bg-white px-4 py-2 border-b border-primary/60 border-t-4 border-t-primary/60">
                        <h4 className="text-sm font-semibold text-gray-800">New Pin</h4>
                    </div>
                    <div className="px-4 py-3 space-y-3">
                        <FormInput
                            type="password"
                            label="Type a new Pin:"
                            name="newPin"
                            placeholder=""
                            register={register}
                            inputClassName="tracking-[0.3em]"
                            validation={{
                                required: 'New pin is required',
                                pattern: {
                                    value: PIN_PATTERN,
                                    message: 'Pin must be exactly 4 digits',
                                },
                            }}
                            error={errors.newPin?.message}
                        />
                        <FormInput
                            type="password"
                            label="Type the Pin again to confirm:"
                            name="confirmNewPin"
                            placeholder=""
                            register={register}
                            inputClassName="tracking-[0.3em]"
                            validation={{
                                required: 'Please confirm your new pin',
                                validate: (value) =>
                                    value === newPin || 'Pins do not match',
                            }}
                            error={errors.confirmNewPin?.message}
                        />
                    </div>
                </div>

                {/* Footer: error + actions */}
                <div className="flex items-center justify-end mt-4 gap-3 border-t border-gray-200 pt-4">
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