import { useCallback } from 'react'
import { toast } from 'sonner'
import logger from '@/utilities/logger'
import { useNotificationStore, useUIStore } from '@/store'
import useMessageModal from '@/hooks/use-message-modal'
import { requestClearanceFormReport, requestCOEReport, requestExitInterviewReport } from '@/services/reports-service'
import { downloadFile } from '@/utilities/file-utilities'

export const EMPLOYEE_HR_DOCS = [
    'Certificate of Employment',
    'Certificate of Employment and Income',
    'Employee Clearance Form',
    'Exit Interview'
]

export function getEmployeeHRDocs(includeCOEWithIncome = false) {
    if (includeCOEWithIncome)
        return EMPLOYEE_HR_DOCS

    return EMPLOYEE_HR_DOCS.filter(doc => doc !== 'Certificate of Employment and Income')
}

function generateNameForFilename(employee, capitalize = true) {
    const { id, firstname, lastname } = employee || {}
    const namePart = (
        ((capitalize ? firstname?.toUpperCase() : firstname) || '') +
        ' ' +
        ((capitalize ? lastname?.toUpperCase() : lastname) || '')
    ).trim()
    return namePart || id || 'Unknown_Employee'
}

export const useHrDocs = () => {
    const addNotification = useNotificationStore((state) => state.addNotification)
    const setEmployeeClearanceFormModalOpen = useUIStore((state) => state.setEmployeeClearanceFormModalOpen)
    const { showMessageModal } = useMessageModal()

    const showModal = useCallback(() => {
        showMessageModal('Your document is being generated and will be downloaded once completed. Please do not close or reload this page.', {
            type: 'info',
            title: 'Generating document...',
        });
    }, [showMessageModal]);

    const addSuccessNotification = useCallback((documentName, employee) => {
        addNotification({
            type: 'success',
            title: 'Document Downloaded',
            message: `${documentName} for ${employee ? `${employee.firstname} ${employee.lastname}` : 'the employee'} has been downloaded. Check your downloads folder.`,
        })
    }, [addNotification])

    const addErrorNotification = useCallback((documentName, employee) => {
        addNotification({
            type: 'error',
            title: 'Document Generation Failed',
            message: `Failed to generate ${documentName} for ${employee ? `${employee.firstname} ${employee.lastname}` : 'the employee'}. Please try again.`,
        })
    }, [addNotification])

    // Certificate of Employment
    const generateCOEDocument = useCallback(async (employee) => {
        try {
            const personId = employee?.id
            if (!personId) {
                toast.error('Employee ID is required')
                return
            }

            showModal()

            const filename = `Certificate of Employment - ${generateNameForFilename(employee)}.pdf`
            const result = await requestCOEReport({ type: 1, personId })
            downloadFile(result, filename)
            addSuccessNotification('Certificate of Employment', employee)
        } catch (error) {
            logger.error('Error generating COE document:', error)
            addErrorNotification('Certificate of Employment', employee)
        }
    }, [addSuccessNotification, addErrorNotification, showModal])

    // Certificate of Employment and Income
    const generateCOEIncomeDocument = useCallback(async (employee) => {
        const personId = employee?.id
        try {
            if (!personId) {
                toast.error('Employee ID is required')
                return
            }

            showModal()

            const filename = `Certificate of Employment with Compensation - ${generateNameForFilename(employee)}.pdf`
            const result = await requestCOEReport({ type: 0, personId })
            downloadFile(result, filename)
            addSuccessNotification('Certificate of Employment and Income', employee)
        } catch (error) {
            logger.error('Error generating COE + Income document:', error)
            addErrorNotification('Certificate of Employment and Income', employee)
        }
    }, [addSuccessNotification, addErrorNotification, showModal])

    // Employee Clearance Form
    const generateClearanceFormDocument = useCallback(async (employee, params) => {
        const personId = employee?.id
        try {
            if (!personId) {
                toast.error('Employee ID is required')
                return
            }

            showModal()

            const result = await requestClearanceFormReport(personId, params)
            const filename = `${generateNameForFilename(employee, false)} - Clearance Form.pdf`
            downloadFile(result, filename)
            addSuccessNotification('Clearance Form', employee)
        } catch (error) {
            logger.error('Error generating clearance form document:', error)
            addErrorNotification('Clearance Form', employee)
        }
    }, [addSuccessNotification, addErrorNotification, showModal])

    // Exit Interview
    const generateExitInterviewDocument = useCallback(async (employee) => {
        const personId = employee?.id
        try {
            if (!personId) {
                toast.error('Employee ID is required')
                return
            }

            showModal()

            const result = await requestExitInterviewReport(personId)
            const filename = `${generateNameForFilename(employee, false)} - Exit Interview.pdf`
            downloadFile(result, filename)
            addSuccessNotification('Exit Interview', employee)
        } catch (error) {
            logger.error('Error generating exit interview document:', error)
            addErrorNotification('Exit Interview', employee)
        }
    }, [addSuccessNotification, addErrorNotification, showModal])

    const handleHrDocClick = useCallback(async (docName, employee) => {
        if (!docName || !employee) {
            toast.error('Document name and employee are required')
            return
        }

        switch (docName) {
            case 'Certificate of Employment':
                await generateCOEDocument(employee)
                break
            case 'Certificate of Employment and Income':
                await generateCOEIncomeDocument(employee)
                break
            case 'Employee Clearance Form':
                setEmployeeClearanceFormModalOpen(true, employee)
                break
            case 'Exit Interview':
                await generateExitInterviewDocument(employee)
                break
            default:
                toast.warning(`No handler for document: ${docName}`)
                logger.warn(`Unhandled HR document: ${docName}`)
        }
    }, [generateCOEDocument, generateCOEIncomeDocument, generateClearanceFormDocument, generateExitInterviewDocument])

    return {
        handleHrDocClick,
        generateClearanceFormDocument,
    }
}
