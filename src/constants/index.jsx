export const API_CALL_TIMEOUT_LIMIT = 180 * 1000; // 3 minutes
export const LOADING_MESSAGE_DELAY = 10 * 1000; // 10 seconds
export const GBSS_DOMAIN = '@gbss.com.au';
export const CLIENT_PAYMENT_TERMS_DAYS = Array.from({ length: 31 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString()
}))
const DPI = 96
const MM_PER_INCH = 25.4

export const ID_W = (54 / MM_PER_INCH) * DPI    // 204.0944...
export const ID_H = (85.6 / MM_PER_INCH) * DPI  // 323.3385...
export const COMPANY_NAME = 'GBSS'

export const FILE_PATHS = {
    TASK_DOCUMENTS: (ticketId) => `Attachments/Tickets/${ticketId}/`,
    APPLICANT_DOCUMENTS: (applicantId) => `Documents/Applicants/${applicantId}`,
    HR_SYSTEM: 'Assets/HR System/',
    PAYROLL: 'Payroll Registry/',
    EMPLOYEE_PICTURES: 'Images/PPs/',
    EMPLOYEE_SIGNATURES: 'Images/e-Signatures/'
}

// for Bulletins
export const BULLETIN_TYPES = {
    STAFF: 'Staff',
    CLIENT: 'Client'
}

export const BULLETIN_PROC_TYPES = {
    SEND: 'send',
    DRAFT: 'draft',
    SCHEDULE_SEND: 'schedule-send'
}

export const BULLETIN_STATUS = {
    SENT: 'Sent',
    DRAFT: 'Draft',
    SCHEDULED: 'Schedule-Send'
}