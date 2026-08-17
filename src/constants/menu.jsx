export const DEFAULT_TABS = [{
    id: "Clock-In-Out",
    label: "Clock In/Out",
    path: "/clock-in-out",
    state: null,
    rowId: null,
    pinned: false,
    isDefault: true
}]

export const MENU_ITEMS = [
    {
        name: null, // Icon-only menu (no name displayed)
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
        submenu: [
            // {
            //     id: 'Staff-News',
            //     name: 'Staff News',
            //     path: '/user/staff-news',
            //     icon: (
            //         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
            //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            //         </svg>
            //     )
            // },
            // {
            //     id: 'Staff-Bulletins',
            //     name: 'Staff Bulletins',
            //     tabName: 'Staff Bulletin',
            //     path: '/user/staff-bulletins',
            //     icon: (
            //         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
            //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            //         </svg>
            //     )
            // },
            {
                id: 'Change-Password',
                name: 'Change Password',
                action: 'change-password',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                )
            },
            {
                id: 'Change-Pin',
                name: 'Change Pin',
                action: 'change-pin',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                )
            },
        ]
    },
    {
        name: 'User',
        submenu: [
            {
                id: 'Personal-Details',
                name: 'Personal Details',
                path: '/user/personal-details',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20c0-4 3.582-7 8-7s8 3 8 7" />
                    </svg>
                )
            },
            {
                id: 'Daily-Records',
                name: 'Daily Records',
                path: '/user/daily-records',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                )
            },
            {
                id: 'My-Requests',
                name: 'My Requests',
                path: '/user/my-requests',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                )
            },
            {
                id: 'Overtime',
                name: 'Overtime',
                path: '/user/overtime',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            },
            {
                id: 'Leaves',
                name: 'Leaves',
                path: '/user/leaves',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                )
            },
            {
                id: 'COE',
                name: 'COE',
                action: 'coe-request',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                )
            },
            {
                id: 'Payslip',
                name: 'Payslip',
                action: 'payslip-request',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                )
            },
            {
                id: 'Documents',
                name: 'Documents',
                path: '/user/documents',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                )
            },
        ]
    },
    {
        name: 'Team',
        submenu: [
            {
                id: 'Team-Records',
                name: 'Records',
                tabName: 'Time Logs',
                path: '/team/records',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                )
            },
            {
                id: 'Team-Leaves',
                name: 'Leaves',
                tabName: 'Team Leaves',
                path: '/team/leaves',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                )
            },
            {
                id: 'Team-Status',
                name: 'Status',
                tabName: 'Team Status',
                path: '/team/status',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                )
            },
            {
                id: 'Team-Requests',
                name: 'Team Requests',
                path: '/team/requests',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                )
            }
        ]
    },
    {
        name: 'IT',
        submenu: [
            {
                id: 'Manage-Users',
                name: 'Manage Users',
                path: '/it/manage-users',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                )
            },
        ]
    },
    {
        name: 'Help',
        submenu: [
            {
                id: 'User-Guide',
                name: 'User Guide',
                path: '/help/user-guide',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                )
            },
            {
                id: 'About',
                name: 'About',
                url: 'https://gbss.com.au/company/',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            },
            {
                id: 'Comms',
                name: 'Comms',
                tabName: 'Ticketing',
                path: '/help/comms',
                // shortcut: 'F1',
                icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                )
            },
        ]
    },
    {
        name: 'Code of Conduct',
        path: '/code-of-conduct',
        inNewTab: true,
        url: 'https://drive.google.com/file/d/10JCyNtn-0PFWvu7-HfqvX3_W8LDHAgRJ/view',
        // icon: (
        //     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#0d416e">
        //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        //     </svg>
        // ),
        submenu: null // Direct navigation, no submenu
    },
];

// ButtonIDs
export const BUTTON_IDS = {
    TASKS: "Tasks",
    TASKS_VIEW_DETAILS: "Tasks-View-Details",
    TASKS_NEW: "Tasks-New",
    TASKS_DELETE: "Tasks-Delete",
    TASKS_SAVE: "Tasks-Save",
    TASKS_VIEW_DOCUMENT: "Tasks-View-Document",
    TASKS_DELETE_DOCUMENT: "Tasks-Delete-Document",
    EMPLOYEES: "Employees",
    EMPLOYEE_DETAILS_TAB: "Employee-Details-Tab",
    EMPLOYEE_ADDRESS_TAB: "Employee-Address-Tab",
    EMPLOYEE_WORK_SCHEDULE_TAB: "Employee-Work-Schedule-Tab",
    EMPLOYEE_ATTENDANCE_TAB: "Employee-Attendance-Tab",
    EMPLOYEE_LEAVE_CREDITS_TAB: "Employee-Leave-Credits-Tab",
    EMPLOYEE_LEAVES_TAB: "Employee-Leaves-Tab",
    EMPLOYEE_SALARY_TAB: "Employee-Salary-Tab",
    EMPLOYEE_13TH_MONTH_TAB: "Employee-13th-Month-Tab",
    EMPLOYEE_LOANS_TAB: "Employee-Loans-Tab",
    EMPLOYEE_DOCUMENTS_TAB: "Employee-Documents-Tab",
    EMPLOYEE_HR_TAB: "Employee-HR-Tab",
    EMPLOYEE_IT_TAB: "Employee-IT-Tab",
    EMPLOYEE_REFERRALS_TAB: "Employee-Referrals-Tab",
    EMPLOYEE_HMO_TAB: "Employee-HMO-Tab",
    EMPLOYEE_OVERTIME_TAB: "Employee-Overtime-Tab",
    EMPLOYEE_DEPARTURE_TAB: "Employee-Departure-Tab",
    EMPLOYEE_PROBATION_SUMMARY_TAB: "Employee-Probation-Summary-Tab",
    EMPLOYEE_CLINIC_TAB: "Employee-Clinic-Tab",
    EMPLOYEE_DETAILS_UNDO_HIRE: "Employee-Details-Undo-Hire",
    EMPLOYEE_DETAILS_SAVE: "Employee-Details-Save",
    EMPLOYEE_ADDRESS_NEW: "Employee-Address-New",
    EMPLOYEE_ADDRESS_SAVE: "Employee-Address-Save",
    EMPLOYEE_ADDRESS_DELETE: "Employee-Address-Delete",
    EMPLOYEE_WORK_SCHEDULE_NEW: "Employee-Work-Schedule-New",
    EMPLOYEE_WORK_SCHEDULE_SAVE: "Employee-Work-Schedule-Save",
    EMPLOYEE_WORK_SCHEDULE_DELETE: "Employee-Work-Schedule-Delete",
    EMPLOYEE_ATTENDANCE_EXCEL: "Employee-Attendance-Excel",
    EMPLOYEE_LEAVE_CREDITS_NEW: "Employee-Leave-Credits-New",
    EMPLOYEE_LEAVE_CREDITS_SAVE: "Employee-Leave-Credits-Save",
    EMPLOYEE_LEAVES_NEW: "Employee-Leaves-New",
    EMPLOYEE_LEAVES_SAVE: "Employee-Leaves-Save",
    EMPLOYEE_LEAVES_DELETE: "Employee-Leaves-Delete",
    EMPLOYEE_SALARY_NEW: "Employee-Salary-New",
    EMPLOYEE_SALARY_SAVE: "Employee-Salary-Save",
    EMPLOYEE_13TH_MONTH_NEW: "Employee-13th-Month-New",
    EMPLOYEE_13TH_MONTH_SAVE: "Employee-13th-Month-Save",
    EMPLOYEE_13TH_MONTH_DELETE: "Employee-13th-Month-Delete",
    EMPLOYEE_LOANS_NEW: "Employee-Loans-New",
    EMPLOYEE_LOANS_SAVE: "Employee-Loans-Save",
    EMPLOYEE_LOANS_DELETE: "Employee-Loans-Delete",
    EMPLOYEE_DOCUMENTS_NEW: "Employee-Documents-New",
    EMPLOYEE_DOCUMENTS_SAVE: "Employee-Documents-Save",
    EMPLOYEE_DOCUMENTS_DELETE: "Employee-Documents-Delete",
    EMPLOYEE_DOCUMENTS_VIEW: "Employee-Documents-View",
    EMPLOYEE_HR_SAVE: "Employee-HR-Save",
    EMPLOYEE_IT_SAVE: "Employee-IT-Save",
    EMPLOYEE_REFERRALS_NEW: "Employee-Referrals-New",
    EMPLOYEE_REFERRALS_SAVE: "Employee-Referrals-Save",
    EMPLOYEE_REFERRALS_DELETE: "Employee-Referrals-Delete",
    EMPLOYEE_HMO_SAVE: "Employee-HMO-Save",
    EMPLOYEE_OVERTIME_NEW: "Employee-Overtime-New",
    EMPLOYEE_OVERTIME_SAVE: "Employee-Overtime-Save",
    EMPLOYEE_OVERTIME_DELETE: "Employee-Overtime-Delete",
    EMPLOYEE_DEPARTURE_SAVE: "Employee-Departure-Save",
    EMPLOYEE_PROBATION_SUMMARY_SAVE: "Employee-Probation-Summary-Save",
    EMPLOYEE_CLINIC_NEW: "Employee-Clinic-New",
    EMPLOYEE_CLINIC_SAVE: "Employee-Clinic-Save",
    EMPLOYEE_CLINIC_DELETE: "Employee-Clinic-Delete",
    APPLICANTS: "Applicants",
    APPLICANT_VIEW_DETAILS: "Applicant-View-Details",
    APPLICANTS_NEW: "Applicants-New",
    APPLICANTS_SAVE: "Applicants-Save",
    APPLICANTS_EMPLOY_APPLICANT: "Applicants-Employ-Applicant",
    APPLICANTS_VIEW_DOCUMENT: "Applicants-View-Document",
    APPLICANTS_DELETE_DOCUMENT: "Applicants-Delete-Document",
    APPLICANTS_NEW_COMMENT: "Applicants-New-Comment",
    APPLICANTS_SAVE_COMMENT: "Applicants-Save-Comment",
    APPLICANTS_DELETE_COMMENT: "Applicants-Delete-Comment",
    APPLICANT_SCHEDS: "Applicant-Scheds",
    APPLICANT_SCHEDS_NEW_COMMENT: "Applicant-Scheds-New-Comment",
    APPLICANT_SCHEDS_SAVE_COMMENT: "Applicant-Scheds-Save-Comment",
    APPLICANT_SCHEDS_DELETE_COMMENT: "Applicant-Scheds-Delete-Comment",
    ATTENDANCE: "Attendance",
    ATTENDANCE_NEW: "Attendance-New",
    ATTENDANCE_DELETE: "Attendance-Delete",
    ATTENDANCE_SAVE: "Attendance-Save",
    AMENDMENT_REQUESTS: "Amendment-Requests",
    AMENDMENT_REQUESTS_SAVE: "Amendment-Requests-Save",
    CLIENTS: "Clients",
    CLIENT_VIEW_DETAILS: "Client-View-Details",
    CLIENTS_NEW: "Clients-New",
    CLIENTS_SAVE: "Clients-Save",
    CLIENTS_EMAIL_RECIPIENTS_SAVE: "Clients-Email-Recipients-Save",
    CLIENTS_EMAIL_RECIPIENTS_DELETE: "Clients-Email-Recipients-Delete",
    CLIENTS_INTERACTION_NEW: "Clients-Interaction-New",
    EMAIL_SUBSCRIPTIONS: "Email-Subscriptions",
    EMAIL_SUBSCRIPTIONS_NEW: "Email-Subscriptions-New",
    EMAIL_SUBSCRIPTIONS_DELETE: "Email-Subscriptions-Delete",
    EMAIL_SUBSCRIPTIONS_SAVE: "Email-Subscriptions-Save",
    HOLIDAYS: "Holidays",
    HOLIDAYS_NEW: "Holidays-New",
    HOLIDAYS_SAVE: "Holidays-Save",
    LATE_NOTIFICATIONS: "Late-Notifications",
    LATE_NOTIFICATIONS_NEW: "Late-Notifications-New",
    LATE_NOTIFICATIONS_DELETE: "Late-Notifications-Delete",
    LATE_NOTIFICATIONS_SAVE: "Late-Notifications-Save",
    VACANT_POSITIONS: "Vacant-Positions",
    VACANT_POSITIONS_NEW: "Vacant-Positions-New",
    VACANT_POSITIONS_SAVE: "Vacant-Positions-Save",
    VISITS_MEETINGS: "Visits-Meetings",
    VISITS_MEETINGS_NEW: "Visits-Meetings-New",
    VISITS_MEETINGS_DELETE: "Visits-Meetings-Delete",
    VISITS_MEETINGS_SAVE: "Visits-Meetings-Save",
    DOCUMENTS: "Documents",
    DOCUMENTS_NEW: "Documents-New",
    DOCUMENTS_DELETE: "Documents-Delete",
    DOCUMENTS_SAVE: "Documents-Save",
    DOCUMENTS_VIEW: "Documents-View",
    BOOKING: "Booking",
    BOOKING_NEW: "Booking-New",
    BOOKING_SAVE: "Booking-Save",
    BOOKING_DELETE: "Booking-Delete",
    RECORDS: "Records",
    HR: "HR",
    CONTACTS: "Contacts",
    CONTACT_VIEW_DETAILS: "Contact-View-Details",
    CONTACTS_NEW: "Contacts-New",
    CONTACTS_SAVE: "Contacts-Save",
    CONTACTS_DELETE: "Contacts-Delete",
    FINANCE_AND_ACCOUNTING: "Finance-And-Accounting",
    HUMAN_RESOURCE_AND_RECRUITMENT: "Human-Resource-And-Recruitment",
    STAFF_BULLETIN: "Staff-Bulletin",
    STAFF_BULLETIN_NEW: "Staff-Bulletin-New",
    STAFF_BULLETIN_SAVE: "Staff-Bulletin-Save",
    CLIENT_BULLETIN: "Client-Bulletin",
    CLIENT_BULLETIN_NEW: "Client-Bulletin-New",
    CLIENT_BULLETIN_SAVE: "Client-Bulletin-Save",
    USERS: "Users",
    USER_VIEW_DETAILS: "User-View-Details",
    USERS_SAVE: "Users-Save",
    USERS_ACTIVATE: "Users-Activate",
    USERS_SEND_VERIFICATION_LINK: "Users-Send-Verification-Link",
    ROLES: "Roles",
    ROLES_NEW: "Roles-New",
    ROLES_SAVE: "Roles-Save",
    ROLES_DELETE: "Roles-Delete",
    PERMISSIONS: "Permissions",
    PERMISSIONS_NEW: "Permissions-New",
    PERMISSIONS_SAVE: "Permissions-Save",
    PERMISSIONS_DELETE: "Permissions-Delete",
    WEB_USERS: "Web-Users",
    WEB_USERS_NEW: "Web-Users-New",
    WEB_USERS_SAVE: "Web-Users-Save",
    WEB_USERS_DELETE: "Web-Users-Delete",
    GBSSP_ID: "GBSSP-ID",
    GBSSP_ID_NEW: "GBSSP-ID-New",
    GBSSP_ID_SAVE: "GBSSP-ID-Save",
    UPLOAD_PAYROLL: "Upload-Payroll",
    UPLOAD_PAYROLL_UPLOAD_DOCUMENT: "Upload-Payroll-Upload-Document",
    CIVIL_STATUS: "Civil-Status",
    CIVIL_STATUS_NEW: "Civil-Status-New",
    CIVIL_STATUS_SAVE: "Civil-Status-Save",
    CIVIL_STATUS_DELETE: "Civil-Status-Delete",
    COUNTRIES: "Countries",
    COUNTRIES_NEW: "Countries-New",
    COUNTRIES_SAVE: "Countries-Save",
    COUNTRIES_DELETE: "Countries-Delete",
    DEDUCTION_TYPES: "Deduction-Types",
    DEDUCTION_TYPES_NEW: "Deduction-Types-New",
    DEDUCTION_TYPES_SAVE: "Deduction-Types-Save",
    DEDUCTION_TYPES_DELETE: "Deduction-Types-Delete",
    DOCUMENT_TYPES: "Document-Types",
    DOCUMENT_TYPES_NEW: "Document-Types-New",
    DOCUMENT_TYPES_SAVE: "Document-Types-Save",
    DOCUMENT_TYPES_DELETE: "Document-Types-Delete",
    HOLIDAY_TYPES: "Holiday-Types",
    HOLIDAY_TYPES_NEW: "Holiday-Types-New",
    HOLIDAY_TYPES_SAVE: "Holiday-Types-Save",
    HOLIDAY_TYPES_DELETE: "Holiday-Types-Delete",
    LATE_REASONS: "Late-Reasons",
    LATE_REASONS_NEW: "Late-Reasons-New",
    LATE_REASONS_SAVE: "Late-Reasons-Save",
    LATE_REASONS_DELETE: "Late-Reasons-Delete",
    LEAVE_TYPES: "Leave-Types",
    LEAVE_TYPES_NEW: "Leave-Types-New",
    LEAVE_TYPES_SAVE: "Leave-Types-Save",
    LEAVE_TYPES_DELETE: "Leave-Types-Delete",
    POSITIONS: "Positions",
    POSITIONS_NEW: "Positions-New",
    POSITIONS_SAVE: "Positions-Save",
    POSITIONS_DELETE: "Positions-Delete",
    PUNCTUALITY_TYPES: "Punctuality-Types",
    PUNCTUALITY_TYPES_NEW: "Punctuality-Types-New",
    PUNCTUALITY_TYPES_SAVE: "Punctuality-Types-Save",
    PUNCTUALITY_TYPES_DELETE: "Punctuality-Types-Delete",
    STATUSES: "Statuses",
    STATUSES_NEW: "Statuses-New",
    STATUSES_SAVE: "Statuses-Save",
    STATUSES_DELETE: "Statuses-Delete",
    WORKSCHEDULE_TYPES: "Workschedule-Types",
    WORKSCHEDULE_TYPES_NEW: "Workschedule-Types-New",
    WORKSCHEDULE_TYPES_SAVE: "Workschedule-Types-Save",
    WORKSCHEDULE_TYPES_DELETE: "Workschedule-Types-Delete",
    PROCESS_AND_PROCEDURE: "Process-And-Procedure"
}