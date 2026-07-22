import React, { useState, useCallback, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import Alert from './Alert'
import Table from './Table'
import Modal from './modals/Modal'
import FormActionButtons from './FormActionButtons'
import { toast } from 'sonner'
import logger from '@/utilities/logger'
import { getAlertMessageForAddAndSave } from '@/utilities/text-utilities'

/**
 * Modal-based component for managing lists of data with edit/add/delete functionality
 * Features a clean table view with modal forms for editing/adding
 * Best UX for users - minimal cognitive load, full focus on task
 * 
 * @param {Object} props
 * @param {Array} props.data - The list data to display
 * @param {Array} props.columns - Table columns configuration
 * @param {React.Component} props.FormComponent - Component that renders the form fields
 * @param {Function} props.onSave - Callback function when saving (REQUIRED). Called with (item, index, isAddMode)
 * @param {Function} props.onDelete - Callback function when deleting (REQUIRED). Called with (index)
 * @param {Object} props.defaultItem - Default values for new items
 * @param {string} props.singularName - Singular name for labels (e.g., 'Address', 'Schedule')
 * @param {Object} props.formConfig - Configuration for form fields validation and rendering
 * @param {Array} props.searchableFields - Array of field names to enable search functionality (e.g., ['description', 'name'])
 * @param {boolean} props.isLoading - Loading state to show loading indicator in table
 * @param {boolean} props.canAdd - Permission to add new items
 * @param {boolean} props.canSave - Permission to edit/save items
 * @param {boolean} props.canDelete - Permission to delete items
 */
const EditableListTabModal = forwardRef(function EditableListTabModal({
    data = [],
    columns,
    FormComponent,
    defaultItem,
    singularName = 'Item',
    formConfig = {},
    onSave,
    validation,
    onDelete,
    formProps = {},
    tableProps = {},
    showAddButton = true,
    onDoubleClick,
    excelFileName,
    searchableFields = [],
    isLoading = false,
    onRowClick = (row) => row, // Default to identity function if not provided
    canAdd = false,
    canSave = false,
    canDelete = false,
    modalSize = '3xl',
    handleCloseModal: parentHandleCloseModal, // Optional prop to allow parent to control modal close
    noActionButtons = false, // Option to hide action buttons in the form modal
    forceEnableForm = false, // Option to force enable form fields even if canSave is false (for view-only mode with enabled fields)
}, ref) {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false)
    const [isAddMode, setIsAddMode] = useState(false)
    const [saving, setSaving] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [isLoadingData, setIsLoadingData] = useState(false)

    const {
        register,
        reset,
        getValues,
        setValue,
        control,
        trigger,
        formState: { errors, dirtyFields },
        watch,
        handleSubmit,
        setError
    } = useForm({ mode: 'onBlur' })

    // Use dirtyFields instead of isDirty for accurate dirty state tracking
    const hasUnsavedChanges = Object.keys(dirtyFields).length > 0

    const handleRowClick = useCallback(async (row) => {
        try {
            setIsAddMode(false)
            setIsFormModalOpen(true)
            setIsLoadingData(true)
            const data = await onRowClick(row)
            reset(data)
            setSelectedRow(data)
        } finally {
            setIsLoadingData(false)
        }
    }, [data, reset, onRowClick, formProps])

    const handleAddNew = useCallback(() => {
        if (!canAdd) return
        const newItem = defaultItem || {}
        reset(newItem)
        setSelectedRow(null)
        setIsAddMode(true)
        setIsFormModalOpen(true)
    }, [data.length, defaultItem, reset, canAdd])

    const handleCloseModal = useCallback(() => {
        if (hasUnsavedChanges) parentHandleCloseModal()
        setIsFormModalOpen(false)
        setSelectedRow(null)
        setIsAddMode(false)
        reset({})
    }, [reset, parentHandleCloseModal])

    useImperativeHandle(ref, function () {
        return {
            closeModal: handleCloseModal
        }
    }, [handleCloseModal])

    const handleSave = async () => {
        if ((!isAddMode && !canSave) || (isAddMode && !canAdd)) return

        if (validation) {
            const isValid = await validation(getValues(), { setError })
            if (!isValid) {
                return
            }
        }

        setSaving(true)

        const itemToSave = getValues()

        try {
            await onSave(itemToSave)
            handleCloseModal()
        } catch (error) {
            if (!error?.silent) {
                toast.error('Unsuccessful. ' + error.message)
                logger.error('Error saving:', error)
            }
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!canDelete) return
        setSaving(true)

        try {
            if (onDelete) await onDelete(selectedRow)
            handleCloseModal()
        } catch (error) {
            toast.error('Error deleting: ' + (error?.message || 'Unknown error'))
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="space-y-2">
            {/* Header with Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <Alert
                    text={getAlertMessageForAddAndSave(canAdd, canSave, singularName.toLowerCase())}
                    type="info"
                />
                {(canAdd && showAddButton) && (
                    <button
                        type="button"
                        onClick={handleAddNew}
                        className="btn-primary whitespace-nowrap cursor-pointer w-full sm:w-auto"
                        title={`Add New ${singularName}`}
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New
                    </button>
                )}
            </div>

            {/* Table - Full Width */}
            <Table
                data={data}
                columns={columns}
                enableSorting={true}
                enablePagination={true}
                pageSize={10}
                onRowClick={handleRowClick}
                onDoubleClick={onDoubleClick}
                excelFileName={excelFileName}
                globalFilterColumns={searchableFields}
                isLoading={isLoading}
                {...tableProps}
            />

            {/* Form Modal */}
            <Modal
                isOpen={isFormModalOpen}
                onClose={handleCloseModal}
                title={isAddMode ? `Add New ${singularName}` : canSave ? `Edit ${singularName}` : `View ${singularName}`}
                size={modalSize}
                isLoading={isLoadingData}
            // closeOnBackdropClick={false}
            >
                <form onSubmit={handleSubmit(handleSave)} className="space-y-3">

                    {
                        isLoadingData ? (
                            <div className="flex-1 flex flex-col items-center justify-center gap-2 py-12">
                                <svg className="w-6 h-6 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                <p className="text-sm text-gray-400 italic">Loading form...</p>
                            </div>
                        ) : (
                            <fieldset disabled={saving || (!forceEnableForm && !isAddMode && !canSave)}>
                                {/* Form Fields */}
                                <FormComponent
                                    register={register}
                                    control={control}
                                    setError={setError}
                                    errors={errors}
                                    reset={reset}
                                    setValue={setValue}
                                    watch={watch}
                                    getValues={getValues}
                                    formConfig={formConfig}
                                    isAddMode={isAddMode}
                                    data={selectedRow}
                                    canAdd={canAdd}
                                    canSave={canSave}
                                    canDelete={canDelete}
                                    {...formProps}
                                />
                            </fieldset>
                        )
                    }

                    {/* Action Buttons */}
                    {!noActionButtons && (
                        <FormActionButtons
                            isAddMode={isAddMode}
                            saving={saving}
                            isDirty={hasUnsavedChanges}
                            onDelete={handleDelete}
                            onCancel={handleCloseModal}
                            onSave={handleSave}
                            entityName={singularName.toLowerCase()}
                            trigger={trigger}
                            canDelete={canDelete}
                            canSave={canSave || isAddMode}
                        />
                    )}
                </form>
            </Modal>
        </div>
    )
})

EditableListTabModal.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    FormComponent: PropTypes.elementType.isRequired,
    defaultItem: PropTypes.object,
    singularName: PropTypes.string,
    formConfig: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    validation: PropTypes.func,
    onDelete: PropTypes.func,
    formProps: PropTypes.object,
    tableProps: PropTypes.object,
    showAddButton: PropTypes.bool,
    onDoubleClick: PropTypes.func,
    excelFileName: PropTypes.string,
    searchableFields: PropTypes.array,
    isLoading: PropTypes.bool,
    onRowClick: PropTypes.func,
    canAdd: PropTypes.bool,
    canSave: PropTypes.bool,
    canDelete: PropTypes.bool,
    modalSize: PropTypes.string,
    handleCloseModal: PropTypes.func, // Optional prop to allow parent to control modal close 
    noActionButtons: PropTypes.bool, // Option to hide action buttons in the form modal
    forceEnableForm: PropTypes.bool, // Option to force enable form fields even if canSave is false (for view-only mode with enabled fields)
}

export default EditableListTabModal
