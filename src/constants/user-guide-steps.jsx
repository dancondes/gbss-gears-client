// Ticket Type select value that maps to "Time Amend" in the ticketing form.
const TIME_AMEND_TICKET_TYPE_VALUE = '7'

/**
 * USER_GUIDE_FEATURES
 * One entry per guided feature, shown as a row on the User Guide page.
 *
 * actionName      key into USER_GUIDE_STEPS_BY_MENU_ID, also used to start the guide
 * feature         display name on the User Guide page
 * description     one-line summary on the User Guide page
 * category        section heading used to group rows on the User Guide page
 * triggerSelector selector highlighted when the guide is launched from elsewhere
 * triggerLabel    fallback guide label when `labelGuide` isn't set
 * labelGuide      HTML string used as the guide's launch description (overrides triggerLabel).
 *                 Wrapped in <span> only when it contains HTML tags; plain text is left as-is.
 * menuItemClick   if set, the guide clicks this menu item to open the feature before starting
 */
const USER_GUIDE_FEATURES = [
    {
        actionName: 'Clock-In-Out',
        feature: 'Clock In/Out',
        description: 'Learn how to log check-in, breaks, lunch, and checkout for your daily attendance.',
        category: 'Attendance',
        triggerSelector: '[data-tab-id="Clock-In-Out"]',
        triggerLabel: 'Clock In/Out',
    },
    {
        actionName: 'Plot-Overtime',
        feature: 'Plot Overtime',
        description: 'Learn how to plot your overtime.',
        category: 'Attendance',
        triggerSelector: '[data-guide-item-id="menu-bar-user"]',
        labelGuide: <span>Click <b>User &gt; Overtime</b> to open the Overtime page where you can plot your overtime.</span>,
        menuItemClick: {
            id: 'overtime',
            tabName: 'Overtime',
            path: '/user/overtime',
        },
    },
    {
        actionName: 'Time-Amendment',
        feature: 'Create Time Amendment Request',
        description: 'Learn how to submit a time amendment request for assistance.',
        category: 'Attendance',
        triggerSelector: '[data-guide-item-id="menu-bar-help"]',
        labelGuide: <span>Click <b>Help &gt; Comms</b> to open the Create Ticket page and learn how to submit a time amendment request.</span>,
        menuItemClick: {
            id: 'Comms',
            tabName: 'Ticketing',
            path: '/help/comms',
        },
    },
    {
        actionName: 'COE',
        feature: 'COE Request',
        description: 'Learn how to request and download your Certificate of Employment.',
        category: 'Payroll & Documents',
        triggerSelector: '[data-guide-item-id="menu-bar-user"]',
        labelGuide: <span>Click <b>User &gt; COE</b> to open the COE Request modal and learn how to generate and download your Certificate of Employment.</span>,
        menuItemClick: { action: 'coe-request' },
    },
    {
        actionName: 'Payslip',
        feature: 'Payslip Access',
        description: 'Learn how to verify your PIN and open your payslip page.',
        category: 'Payroll & Documents',
        triggerSelector: '[data-guide-item-id="menu-bar-user"]',
        labelGuide: <span>Click <b>User &gt; Payslip</b> to open the Payslip PIN modal and learn how to verify your PIN and access your payslip.</span>,
        menuItemClick: { action: 'payslip-request' },
    },
    {
        actionName: 'File-Leave',
        feature: 'File a Leave',
        description: 'Learn how to file a leave request.',
        category: 'Leave & Support',
        triggerSelector: '[data-guide-item-id="menu-bar-user"]',
        labelGuide: <span>Click <b>User &gt; Leaves</b> to open the Leaves page where the form for filing a leave will be accessible.</span>,
        menuItemClick: {
            id: 'Leaves',
            tabName: 'Leaves',
            path: '/user/leaves',
        },
    },
    {
        actionName: 'Ticket',
        feature: 'Create Ticket',
        description: 'Learn how to submit a support ticket for assistance.',
        category: 'Leave & Support',
        triggerSelector: '[data-guide-item-id="menu-bar-help"]',
        labelGuide: <span>Click <b>Help &gt; Comms</b> to open the Create Ticket page and learn how to submit a support ticket.</span>,
        menuItemClick: {
            id: 'Comms',
            tabName: 'Ticketing',
            path: '/help/comms',
        },
    },
    {
        actionName: 'Change-Password',
        feature: 'Change Password',
        description: 'Learn how to change your account password.',
        category: 'Account',
        triggerSelector: '[data-guide-item-id="menu-bar-user"]',
        labelGuide: <span>Click <b>User &gt; Personal Details</b> to open the Personal Details page where you can change your password.</span>,
        menuItemClick: {
            id: 'Personal-Details',
            tabName: 'Personal Details',
            path: '/user/personal-details',
        },
    },
    {
        actionName: 'Change-PIN',
        feature: 'Change PIN',
        description: 'Learn how to change your account PIN.',
        category: 'Account',
        triggerSelector: '[data-guide-item-id="menu-bar-user"]',
        labelGuide: <span>Click <b>User &gt; Personal Details</b> to open the Personal Details page where you can change your PIN.</span>,
        menuItemClick: {
            id: 'Personal-Details',
            tabName: 'Personal Details',
            path: '/user/personal-details',
        },
    },
]

/**
 * USER_GUIDE_STEPS_BY_MENU_ID
 * `content` is HTML rendered via dangerouslySetInnerHTML in the tooltip.
 * Wrapped in <span> only when it contains HTML tags; plain text is left as a plain string.
 */
const USER_GUIDE_STEPS_BY_MENU_ID = {
    'Clock-In-Out': [
        {
            target: '.clock-guide-check-in',
            content: 'Start your day here by checking in. This records the beginning of your shift.',
            placement: 'bottom',
            disableBeacon: true,
            clickTargetOnNext: true,
        },
        {
            target: '.clock-guide-breaks',
            content: 'Use these controls to log your break and lunch out/in times as you go.',
            placement: 'top',
            disableBeacon: true,
        },
        {
            target: '.clock-guide-quick-checkout',
            content: 'Use these buttons to check out early using your unused break or lunch time. Your checkout time will be adjusted accordingly.',
            placement: 'top',
            disableBeacon: true,
        },
        {
            target: '.clock-guide-check-out-btn',
            content: 'End your day by checking out. This records the end of your shift.',
            placement: 'bottom',
            disableBeacon: true,
        },
    ],
    'Plot-Overtime': [
        {
            target: '[data-guide-item-id="add-new-btn-overtime"]',
            content: 'Click Add New to open the Overtime Request form.',
            placement: 'bottom',
            disableBeacon: true,
            clickTargetOnNext: true,
        },
        {
            target: '.ot-date-input',
            content: 'You are only allowed to create an overtime request for the current date. The OT Date field is pre-filled and cannot be changed.',
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.ot-num-hours-input',
            content: 'Enter the number of hours you worked overtime. This field is required and must be greater than 0.',
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.ot-approved-by-input',
            content: 'Select the approver for your overtime request. This field is required.',
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '[data-guide-item-id="save-changes-btn-overtime"]',
            content: 'Click Save Changes to submit your overtime request for approval.',
            placement: 'top',
            disableBeacon: true,
        },
    ],
    'Time-Amendment': [
        {
            target: '.ticketing-form-ticket-type',
            content: <span>Select <b>Time Amend</b> from the Ticket Type.</span>,
            placement: 'bottom',
            disableBeacon: true,
            specificAction: () => {
                const ticketTypeSelect = document.querySelector('.ticketing-form-ticket-type select')
                if (ticketTypeSelect) {
                    ticketTypeSelect.value = TIME_AMEND_TICKET_TYPE_VALUE
                    ticketTypeSelect.dispatchEvent(new Event('change', { bubbles: true }))
                }
            },
        },
        {
            target: '.ticketing-form-amend-date',
            content: 'Select the date for which you want to request a time amendment.',
            placement: 'top',
            disableBeacon: true,
        },
        {
            target: '.ticketing-form-amend-type',
            content: 'Choose which time entry type you want to amend.',
            placement: 'top',
            disableBeacon: true,
        },
        {
            target: '.ticketing-form-amend-time',
            content: 'Select the time you want to amend for the selected date.',
            placement: 'top',
            disableBeacon: true,
        },
        {
            target: '.ticketing-form-description',
            content: 'Provide a reason for your time amendment request in this field.',
            placement: 'top',
            disableBeacon: true,
        },
        {
            target: '.ticketing-form-submit',
            content: 'Click Submit to send your time amendment request for review and approval.',
            placement: 'top',
            disableBeacon: true,
        },
    ],
    COE: [
        {
            target: '.user-guide-coe-format',
            content: 'Select the certificate format based on your request type.',
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.user-guide-coe-submit',
            content: 'Click Send Request to generate and download your COE document.',
            placement: 'top',
            disableBeacon: true,
        },
    ],
    Payslip: [
        {
            target: '.user-guide-payslip-pin',
            content: 'Enter your payslip PIN to verify your identity.',
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.user-guide-payslip-submit',
            content: 'Submit your PIN to continue to the Payslip page.',
            placement: 'top',
            disableBeacon: true,
        },
    ],
    'File-Leave': [
        {
            target: '.application-leave-form',
            content: 'Fill out the leave application form with the necessary details.',
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.file-leave-submit-btn',
            content: 'Click Submit to send your leave request for review and approval.',
            placement: 'top',
            disableBeacon: true,
        },
    ],
    Ticket: [
        {
            target: '.ticketing-form-ticket-type',
            content: 'Select the type of ticket you want to create.',
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.ticketing-form-description',
            content: 'Provide a detailed description of your issue or request in this field.',
            placement: 'top',
            disableBeacon: true,
        },
        {
            target: '.ticketing-form-file-dropzone',
            content: 'Attach any relevant files to your ticket by dragging and dropping them here or clicking to browse.',
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '.ticketing-form-submit',
            content: 'Click Submit to send your ticket for review and assistance.',
            placement: 'top',
            disableBeacon: true,
        },
    ],
    'Change-Password': [
        {
            target: '.password-requirements-panel',
            content: 'Review the password requirements before entering a new one.',
            placement: 'top',
            disableBeacon: true,
        },
        {
            target: '.password-input-panel',
            content: 'Enter your new password, and confirm the new password.',
            placement: 'top',
            disableBeacon: true,
        },
        {
            target: '.change-password-submit-btn',
            content: 'Click Change Password to save your new password.',
            placement: 'top',
            disableBeacon: true,
        },
    ],
    'Change-PIN': [
        {
            target: '.change-pin-inputs',
            content: 'Enter your new PIN, and confirm the new PIN.',
            placement: 'top',
            disableBeacon: true,
        },
        {
            target: '.change-pin-submit-btn',
            content: 'Click Change PIN to save your new PIN.',
            placement: 'top',
            disableBeacon: true,
        },
    ],
}

export { USER_GUIDE_FEATURES, USER_GUIDE_STEPS_BY_MENU_ID }