import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Modal from '@/components/modals/Modal'

function getInitialValues(fields) {
    const values = {}

    fields.forEach((field) => {
        values[field.name] = field.defaultValue ?? ''
    })

    return values
}

function FieldInput({ field, value, error, onChange }) {
    const baseClassName =
        'w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary disabled:bg-gray-100'

    const fieldClassName = [baseClassName, field.className].filter(Boolean).join(' ')

    if (field.type === 'textarea') {
        return (
            <textarea
                name={field.name}
                value={value}
                placeholder={field.placeholder}
                rows={field.rows || 3}
                className={fieldClassName}
                onChange={(e) => onChange(field.name, e.target.value)}
            />
        )
    }

    return (
        <input
            type={field.type || 'text'}
            name={field.name}
            value={value}
            placeholder={field.placeholder}
            className={fieldClassName}
            onChange={(e) => onChange(field.name, e.target.value)}
        />
    )
    // eslint-disable-next-line no-unreachable
    void error
}

FieldInput.propTypes = {
    field: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['text', 'number', 'textarea', 'date']),
        placeholder: PropTypes.string,
        className: PropTypes.string,
        rows: PropTypes.number,
    }).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default function InputModal({
    isOpen,
    onClose,
    title,
    subtitle,
    fields,
    className,
    confirmText,
    cancelText,
    loading,
    onConfirm,
    onCancel,
}) {
    const [values, setValues] = useState(() => getInitialValues(fields))
    const [errors, setErrors] = useState({})

    // Reset form whenever the modal is (re)opened with a fresh field set
    useEffect(() => {
        if (isOpen) {
            setValues(getInitialValues(fields))
            setErrors({})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    function handleChange(name, value) {
        setValues((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: null }))
    }

    function validate() {
        const nextErrors = {}

        fields.forEach((field) => {
            const value = values[field.name]
            const isEmpty = value === undefined || value === null || String(value).trim() === ''

            if (field.required && isEmpty) {
                nextErrors[field.name] = `${field.label || field.name} is required`
            }
        })

        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }

    function handleConfirm() {
        if (loading) return
        if (!validate()) return

        if (typeof onConfirm === 'function') {
            onConfirm(values)
        }
    }

    function handleCancel() {
        if (typeof onCancel === 'function') {
            onCancel()
        }

        if (typeof onClose === 'function') {
            onClose()
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleCancel}
            title={title}
            size="md"
            closeOnEsc={!loading}
        >
            <div className={['space-y-4', className].filter(Boolean).join(' ')}>
                {subtitle ? (
                    <p className="text-sm text-gray-500">{subtitle}</p>
                ) : null}

                <div className="space-y-3">
                    {fields.map((field) => (
                        <div key={field.name} className="space-y-1">
                            {field.label ? (
                                <label
                                    htmlFor={field.name}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {field.label}
                                    {field.required ? (
                                        <span className="text-red-500 ml-0.5">*</span>
                                    ) : null}
                                </label>
                            ) : null}

                            <FieldInput
                                field={field}
                                value={values[field.name]}
                                error={errors[field.name]}
                                onChange={handleChange}
                            />

                            {errors[field.name] ? (
                                <p className="text-xs text-red-500">{errors[field.name]}</p>
                            ) : null}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={loading}
                        className="btn-white cursor-pointer disabled:opacity-50"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={loading}
                        className="btn-primary cursor-pointer disabled:opacity-50"
                    >
                        {loading ? 'Please wait...' : confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    )
}

InputModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string,
            type: PropTypes.oneOf(['text', 'number', 'textarea', 'date']),
            placeholder: PropTypes.string,
            defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            required: PropTypes.bool,
            className: PropTypes.string,
            rows: PropTypes.number,
        })
    ).isRequired,
    className: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    loading: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
}

InputModal.defaultProps = {
    onClose: null,
    title: 'Input Required',
    subtitle: null,
    className: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    loading: false,
    onConfirm: null,
    onCancel: null,
}