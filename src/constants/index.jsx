export const API_CALL_TIMEOUT_LIMIT = 180 * 1000; // 3 minutes
export const LOADING_MESSAGE_DELAY = 10 * 1000; // 10 seconds
export const GBSS_DOMAIN = '@gbss.com.au';

export const FILE_PATHS = {
    TASK_DOCUMENTS: (ticketId) => `Attachments/Tickets/${ticketId}/`,
    APPLICANT_DOCUMENTS: (applicantId) => `Documents/Applicants/${applicantId}`,
    HR_SYSTEM: 'Assets/HR System/',
    PAYROLL: 'Payroll Registry/',
    EMPLOYEE_PICTURES: 'Images/PPs/',
    EMPLOYEE_SIGNATURES: 'Images/e-Signatures/'
}

export const LOCATION_OPTIONS = [
    // 'Home',
    // 'Three NEO',
    // 'PhilPlans',
    { value: 'HOME', label: 'Home' },
    { value: 'Three NEO', label: 'Three NEO' },
    { value: 'PhilPlans', label: 'PhilPlans' }
]

export const AMENDMENT_STATUS = [
    // {value: 0, label: 'Pending'},
    { value: 0, label: 'All' },
    { value: 1, label: 'Approved' },
    { value: 2, label: 'Rejected' },
    { value: 3, label: 'For Approval' },
]