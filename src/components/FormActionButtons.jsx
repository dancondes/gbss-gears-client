import React from 'react'
import PropTypes from 'prop-types'
import useConfirmationModal from '@/hooks/use-confirmation-modal'

const FormActionButtons = ({ 
    isAddMode, 
    saving, 
    isDirty, 
    onDelete, 
    onCancel,
    onSave,
    entityName = 'item',
    canDelete = false,
    canSave = false,
    trigger,
    cancelLabel = 'Close',
    cancelDisabled = false,
    deleteLabel = 'Delete',
    deleteConfirmationTitle,
    deleteConfirmationMessage,
    deleteConfirmText = 'Yes, Delete',
    deleteCancelText = 'Cancel',
}) => {
    const { showConfirmationModal } = useConfirmationModal()

    async function handleSaveClick(e) {
        e.preventDefault()
        
        // Validate form before showing confirmation modal
        if (trigger) {
            const isValid = await trigger()
            if (!isValid) {
                return
            }
        }
        
        showConfirmationModal({
            title: 'Save Changes',
            message: `Are you sure you want to save these changes to the ${entityName}?`,
            confirmText: 'Save',
            cancelText: 'Cancel',
            variant: 'info',
            onConfirm: handleConfirmSave,
        })
    }

    function handleDeleteClick() {
        const confirmationTitle = deleteConfirmationTitle || `Delete ${entityName.charAt(0).toUpperCase() + entityName.slice(1)}`
        const confirmationMessage = deleteConfirmationMessage || `Are you sure you want to delete this ${entityName}? This action cannot be undone.`

        showConfirmationModal({
            title: confirmationTitle,
            message: confirmationMessage,
            confirmText: deleteConfirmText,
            cancelText: deleteCancelText,
            variant: 'danger',
            onConfirm: handleConfirmDelete,
        })
    }

    function handleConfirmSave() {
        if (onSave) onSave()
    }

    function handleConfirmDelete() {
        if (onDelete) onDelete()
    }

    return (
        <>
            <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between pt-4 border-t border-gray-200">
                {!isAddMode && canDelete ? (
                    <button
                        type="button"
                        onClick={handleDeleteClick}
                        disabled={saving}
                        className="btn-danger w-full sm:w-auto cursor-pointer"
                    >
                        {deleteLabel}
                    </button>
                ) : (
                    <div></div>
                )}
                <div className={`flex flex-col-reverse sm:flex-row gap-3 ${isAddMode || !canDelete ? 'sm:ml-auto' : ''}`}>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={saving || cancelDisabled}
                        className="btn-white w-full sm:w-auto cursor-pointer"
                    >
                        {cancelLabel}
                    </button>
                    {canSave && (
                        <button
                            type="submit"
                            onClick={handleSaveClick}
                            disabled={saving || !isDirty}
                            className="btn-primary w-full sm:w-auto cursor-pointer"
                            data-guide-item-id={`save-changes-btn-${entityName.toLowerCase()}`}
                        >
                            {saving ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    )}
                </div>
            </div>

        </>
    )
}

FormActionButtons.propTypes = {
    isAddMode: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired,
    isDirty: PropTypes.bool.isRequired,
    onDelete: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    entityName: PropTypes.string,
    canDelete: PropTypes.bool,
    canSave: PropTypes.bool,
    trigger: PropTypes.func,
    cancelLabel: PropTypes.string,
    cancelDisabled: PropTypes.bool,
    deleteLabel: PropTypes.string,
    deleteConfirmationTitle: PropTypes.string,
    deleteConfirmationMessage: PropTypes.string,
    deleteConfirmText: PropTypes.string,
    deleteCancelText: PropTypes.string,
}

export default FormActionButtons
