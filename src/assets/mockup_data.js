import { getCurrentDate } from "@/utilities/date-utilities"

export const PDF_PATH = '/sample.pdf'

export const MOCK_BUTTON_PERMISSIONS = [
    'Tasks',
    'Tasks-View-Details',
    'Tasks-New',
    'Tasks-Delete',
    'Tasks-Save',
    'Tasks-View-Document',
    'Tasks-Delete-Document',
    'Employees',
    'Employee-Details-Tab',
    'Employee-Address-Tab',
    'Employee-Work-Schedule-Tab',
    'Employee-Attendance-Tab',
    'Employee-Leave-Credits-Tab',
    'Employee-Leaves-Tab',
    'Employee-Salary-Tab',
    'Employee-13th-Month-Tab',
    'Employee-Loans-Tab',
    'Employee-Documents-Tab',
    'Employee-HR-Tab',
    'Employee-IT-Tab',
    'Employee-Referrals-Tab',
    'Employee-HMO-Tab',
    'Employee-Overtime-Tab',
    'Employee-Departure-Tab',
    'Employee-Probation-Summary-Tab',
    'Employee-Clinic-Tab',
    'Employee-Details-Undo-Hire',
    'Employee-Details-Save',
    'Employee-Address-New',
    'Employee-Address-Save',
    'Employee-Address-Delete',
    'Employee-Work-Schedule-New',
    'Employee-Work-Schedule-Save',
    'Employee-Work-Schedule-Delete',
    'Employee-Attendance-Excel',
    'Employee-Leave-Credits-New',
    'Employee-Leave-Credits-Save',
    'Employee-Leaves-New',
    'Employee-Leaves-Save',
    'Employee-Leaves-Delete',
    'Employee-Salary-New',
    'Employee-Salary-Save',
    'Employee-13th-Month-New',
    'Employee-13th-Month-Save',
    'Employee-13th-Month-Delete',
    'Employee-Loans-New',
    'Employee-Loans-Save',
    'Employee-Loans-Delete',
    'Employee-Documents-New',
    'Employee-Documents-Save',
    'Employee-Documents-Delete',
    'Employee-Documents-View',
    'Employee-HR-Save',
    'Employee-IT-Save',
    'Employee-Referrals-New',
    'Employee-Referrals-Save',
    'Employee-Referrals-Delete',
    'Employee-HMO-Save',
    'Employee-Overtime-New',
    'Employee-Overtime-Save',
    'Employee-Overtime-Delete',
    'Employee-Departure-Save',
    'Employee-Probation-Summary-Save',
    'Employee-Clinic-New',
    'Employee-Clinic-Save',
    'Employee-Clinic-Delete',
    'Applicants',
    'Applicant-View-Details',
    'Applicants-New',
    'Applicants-Save',
    'Applicants-Employ-Applicant',
    'Applicants-View-Document',
    'Applicants-Delete-Document',
    'Applicants-New-Comment',
    'Applicants-Save-Comment',
    'Applicants-Delete-Comment',
    'Applicant-Scheds',
    'Applicant-Scheds-New-Comment',
    'Applicant-Scheds-Save-Comment',
    'Applicant-Scheds-Delete-Comment',
    'Attendance',
    'Attendance-New',
    'Attendance-Delete',
    'Attendance-Save',
    'Amendment-Requests',
    'Amendment-Requests-Save',
    'Clients',
    'Client-View-Details',
    'Clients-New',
    'Clients-Save',
    'Clients-Email-Recipients-Save',
    'Clients-Email-Recipients-Delete',
    'Clients-Interaction-New',
    'Email-Subscriptions',
    'Email-Subscriptions-New',
    'Email-Subscriptions-Delete',
    'Email-Subscriptions-Save',
    'Holidays',
    'Holidays-New',
    'Holidays-Save',
    'Late-Notifications',
    'Late-Notifications-New',
    'Late-Notifications-Delete',
    'Late-Notifications-Save',
    'Vacant-Positions',
    'Vacant-Positions-New',
    'Vacant-Positions-Save',
    'Visits-Meetings',
    'Visits-Meetings-New',
    'Visits-Meetings-Delete',
    'Visits-Meetings-Save',
    'Documents',
    'Documents-New',
    'Documents-Delete',
    'Documents-Save',
    'Documents-View',
    'Booking',
    'Booking-New',
    'Booking-Save',
    'Booking-Delete',
    'Records',
    'HR',
    'Information',
    'Information-New',
    'Information-Save',
    'Information-Delete',
    'Contacts',
    'Contact-View-Details',
    'Contacts-New',
    'Contacts-Save',
    'Contacts-Delete',
    'Finance-And-Accounting',
    'Human-Resource-And-Recruitment',
    'Staff-Bulletin',
    'Staff-Bulletin-New',
    'Staff-Bulletin-Save',
    'Client-Bulletin',
    'Client-Bulletin-New',
    'Client-Bulletin-Save',
    'Users',
    'User-View-Details',
    'Users-Save',
    'Users-Activate',
    'Users-Send-Verification-Link',
    'Roles',
    'Roles-New',
    'Roles-Save',
    'Roles-Delete',
    'Permissions',
    'Permissions-New',
    'Permissions-Save',
    'Permissions-Delete',
    'User-Permissions',
    'User-Permissions-New',
    'User-Permissions-Save',
    'User-Permissions-Delete',
    'Web-Users',
    'Web-Users-New',
    'Web-Users-Save',
    'Web-Users-Delete',
    'GBSSP-ID',
    'GBSSP-ID-New',
    'GBSSP-ID-Save',
    // 'GBSSP-ID-Delete', // no delete function for GBSSP-ID as of now
    'Recipients',
    'Recipients-New',
    'Recipients-Save',
    // 'Recipients-Delete', // no delete function for recipients as of now
    'Logs',
    'Upload-Payroll',
    'Upload-Payroll-Upload-Document',
    'Civil-Status',
    'Civil-Status-New',
    'Civil-Status-Save',
    'Civil-Status-Delete',
    'Countries',
    'Countries-New',
    'Countries-Save',
    'Countries-Delete',
    'Deduction-Types',
    'Deduction-Types-New',
    'Deduction-Types-Save',
    'Deduction-Types-Delete',
    'Document-Types',
    'Document-Types-New',
    'Document-Types-Save',
    'Document-Types-Delete',
    'Holiday-Types',
    'Holiday-Types-New',
    'Holiday-Types-Save',
    'Holiday-Types-Delete',
    'Late-Reasons',
    'Late-Reasons-New',
    'Late-Reasons-Save',
    'Late-Reasons-Delete',
    'Leave-Types',
    'Leave-Types-New',
    'Leave-Types-Save',
    'Leave-Types-Delete',
    'Positions',
    'Positions-New',
    'Positions-Save',
    'Positions-Delete',
    'Punctuality-Types',
    'Punctuality-Types-New',
    'Punctuality-Types-Save',
    'Punctuality-Types-Delete',
    'Statuses',
    'Statuses-New',
    'Statuses-Save',
    'Statuses-Delete',
    'Workschedule-Types',
    'Workschedule-Types-New',
    'Workschedule-Types-Save',
    'Workschedule-Types-Delete',
    'Request',
    'Request-View-Details',
    'Request-New',
    'Request-Save',
    'Request-Delete',
    'Request-View-Document',
    'Request-Delete-Document',
    'Process-And-Procedure'
]

export const USERS = [
    {
        id: 1,
        email: 'admin.test@gbss.com.au',
        firstName: 'Admin',
        lastName: 'Test',
        username: 'atest',
        password: 'admin123',
        role: 1, // Administrator
        accountStatus: 'active',
        reportsTo: 'John Doe'
    },
    {
        id: 2,
        email: 'dan.test@gbss.com.au',
        firstName: 'Dan',
        lastName: 'Test',
        username: 'dtest',
        password: 'dan123',
        role: 1, // Administrator
        accountStatus: 'active',
        reportsTo: null
    },
    {
        id: 3,
        email: 'jerwin.test@gbss.com.au',
        firstName: 'Jerwin',
        lastName: 'Test',
        username: 'jtest',
        password: 'jerwin123',
        role: 1, // Administrator
        accountStatus: 'not_verified',
        reportsTo: null
    },
    {
        id: 4,
        email: 'sarah.test@gbss.com.au',
        firstName: 'Sarah',
        lastName: 'Test',
        username: 'stest',
        password: 'sarah123',
        role: 11, // Team Leader
        accountStatus: 'active',
        reportsTo: 'Admin Test'
    },
    {
        id: 5,
        email: 'michael.test@gbss.com.au',
        firstName: 'Michael',
        lastName: 'Test',
        username: 'mtest',
        password: 'michael123',
        role: 8, // Employee
        accountStatus: 'active',
        reportsTo: 'Sarah Test'
    },
    {
        id: 6,
        email: 'emily.test@gbss.com.au',
        firstName: 'Emily',
        lastName: 'Test',
        username: 'etest',
        password: 'emily123',
        role: 8, // Employee
        accountStatus: 'inactive',
        reportsTo: 'Sarah Test'
    },
    {
        id: 7,
        email: 'james.test@gbss.com.au',
        firstName: 'James',
        lastName: 'Test',
        username: 'jatest',
        password: 'james123',
        role: 11, // Team Leader
        accountStatus: 'active',
        reportsTo: 'Admin Test'
    },
    {
        id: 8,
        email: 'lisa.test@gbss.com.au',
        firstName: 'Lisa',
        lastName: 'Test',
        username: 'ltest',
        password: 'lisa123',
        role: 2, // BCW Reconciliation - Invoice Method
        accountStatus: 'not_verified',
        reportsTo: 'James Test'
    },
    {
        id: 9,
        email: 'robert.test@gbss.com.au',
        firstName: 'Robert',
        lastName: 'Test',
        username: 'rtest',
        password: 'robert123',
        role: 3, // BCW Reconciliation - Sal Pac Method
        accountStatus: 'active',
        reportsTo: 'James Test'
    },
    {
        id: 10,
        email: 'jennifer.test@gbss.com.au',
        firstName: 'Jennifer',
        lastName: 'Test',
        username: 'jetest',
        password: 'jennifer123',
        role: 12, // Underwriter
        accountStatus: 'active',
        reportsTo: 'Sarah Test'
    },
    {
        id: 11,
        email: 'david.test@gbss.com.au',
        firstName: 'David',
        lastName: 'Test',
        username: 'datest',
        password: 'david123',
        role: 7, // Commercial Lender Asssessor
        accountStatus: 'active',
        reportsTo: 'Jennifer Test'
    },
    {
        id: 12,
        email: 'amanda.test@gbss.com.au',
        firstName: 'Amanda',
        lastName: 'Test',
        username: 'amtest',
        password: 'amanda123',
        role: 6, // Collections Officer - Mortgage
        accountStatus: 'inactive',
        reportsTo: 'Jennifer Test'
    },
    {
        id: 13,
        email: 'kevin.test@gbss.com.au',
        firstName: 'Kevin',
        lastName: 'Test',
        username: 'ktest',
        password: 'kevin123',
        role: 4, // Broker SUpport
        accountStatus: 'active',
        reportsTo: 'James Test'
    },
    {
        id: 14,
        email: 'nicole.test@gbss.com.au',
        firstName: 'Nicole',
        lastName: 'Test',
        username: 'ntest',
        password: 'nicole123',
        role: 10, // Social Media and Marketing Specialist
        accountStatus: 'not_verified',
        reportsTo: 'Kevin Test'
    },
    {
        id: 15,
        email: 'christopher.test@gbss.com.au',
        firstName: 'Christopher',
        lastName: 'Test',
        username: 'ctest',
        password: 'chris123',
        role: 9, // Instructional Designer & eLearning Specialist
        accountStatus: 'active',
        reportsTo: 'Kevin Test'
    },
    {
        id: 16,
        email: 'jessica.test@gbss.com.au',
        firstName: 'Jessica',
        lastName: 'Test',
        username: 'jestest',
        password: 'jessica123',
        role: 11, // Team Leader
        accountStatus: 'active',
        reportsTo: 'Admin Test'
    },
    {
        id: 17,
        email: 'matthew.test@gbss.com.au',
        firstName: 'Matthew',
        lastName: 'Test',
        username: 'matest',
        password: 'matthew123',
        role: 8, // Employee
        accountStatus: 'active',
        reportsTo: 'Jessica Test'
    },
    {
        id: 18,
        email: 'ashley.test@gbss.com.au',
        firstName: 'Ashley',
        lastName: 'Test',
        username: 'astest',
        password: 'ashley123',
        role: 5, // Client
        accountStatus: 'inactive',
        reportsTo: 'Jessica Test'
    },
    {
        id: 19,
        email: 'daniel.test@gbss.com.au',
        firstName: 'Daniel',
        lastName: 'Test',
        username: 'dantest',
        password: 'daniel123',
        role: 12, // Underwriter
        accountStatus: 'active',
        reportsTo: 'Jessica Test'
    },
    {
        id: 20,
        email: 'michelle.test@gbss.com.au',
        firstName: 'Michelle',
        lastName: 'Test',
        username: 'mitest',
        password: 'michelle123',
        role: 8, // Employee
        accountStatus: 'not_verified',
        reportsTo: 'Daniel Test'
    }
]

export const ROLES = [
    { 
        id: 1, 
        name: 'Administrator', 
        description: 'Full system access with all permissions',
        permissionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
    },
    { 
        id: 2, 
        name: 'HR 1',
        description: 'HR Staff Level 1',
        permissionIds: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 81, 82, 84]
    },
    { 
        id: 3, 
        name: 'HR 2',
        description: 'HR Staff Level 2',
        permissionIds: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 81, 82, 84, 85]
    },
    { 
        id: 4, 
        name: 'HR 3',
        description: 'HR Staff Level 3',
        permissionIds: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 81, 82, 83, 84, 85, 86]
    },
    { 
        id: 5, 
        name: 'HR Manager',
        description: 'HR Department Manager',
        permissionIds: [1, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 27, 28, 81, 82, 83, 84, 85, 86, 140, 142, 143, 144]
    },
    { 
        id: 6, 
        name: 'TA1',
        description: 'Talent Acquisition Staff Level 1',
        permissionIds: [1, 67, 69, 70, 81, 82, 83, 84]
    },
    { 
        id: 7, 
        name: 'TA2',
        description: 'Talent Acquisition Staff Level 2',
        permissionIds: [1, 67, 68, 69, 70, 71, 72, 73, 81, 82, 83, 84]
    },
    { 
        id: 8, 
        name: 'TA Manager',
        description: 'Talent Acquisition Manager',
        permissionIds: [1, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85]
    },
    { 
        id: 9, 
        name: 'IT Support 1',
        description: 'IT Support Staff Level 1',
        permissionIds: [112, 113, 114, 115, 116]
    },
    { 
        id: 10, 
        name: 'IT Support 2',
        description: 'IT Support Staff Level 2',
        permissionIds: [112, 113, 114, 115, 116, 117, 118, 119]
    },
    { 
        id: 11, 
        name: 'IT Manager',
        description: 'IT Department Manager',
        permissionIds: [112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 140, 142, 143, 144]
    },
    { 
        id: 12, 
        name: 'Finance 1',
        description: 'Finance Staff Level 1',
        permissionIds: [122, 127, 128, 129, 134, 137]
    },
    { 
        id: 13, 
        name: 'Finance 2',
        description: 'Finance Staff Level 2',
        permissionIds: [122, 127, 128, 129, 134, 135, 136, 137, 138]
    },
    { 
        id: 14, 
        name: 'Finance Manager',
        description: 'Finance Department Manager',
        permissionIds: [122, 127, 128, 129, 134, 135, 136, 137, 138, 139, 140, 142, 143, 144]
    },
    { 
        id: 15, 
        name: 'Employee',
        description: 'Standard employee access',
        permissionIds: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 81, 122, 127, 128, 129, 134, 137]
    }
]

export const EMPLOYEES = [
    {
        personId: 1,
        empNo: '001',
        basic: {
            personId: 1,
            empNo: '001',
            firstname: 'John',
            middleName: 'Michael',
            preferedName: 'John',
            lastname: 'Test',
            client: {
                accountId: 7,
                name: "GBSS",
            },
            position: { id: 66, description: "Web Developer", },
            reportsTo: 'Sarah Test',
            altReportsTo1: 'Admin Test',
            altReportsTo2: '',
            hrPartner: 'Michael Test',
            phone: '+61 2 9876 5001',
            mobile: '+61 412 345 678',
            email: 'john.test@gbss.com.au',
            personalEmail: 'john.personal@email.com',
            emergencyNumber: '+61 412 999 888',
            emergencyContact: 'Jane Test',
            hrDocs: 'Complete',
            regularizationDate: '2020-07-15',
            startDate: getCurrentDate(300),
            endDate: null,
            civilStatus: 'Married',
            numberOfKids: '2',
            birthdate: '1990-05-20',
            tin: '123-456-789-001',
            sss: '34-1234567-1',
            phic: '12-345678901-2',
            hdmf: '1234-5678-9001',
            hdmfMp2: '1234-5678-MP2',
            hmoAcctNo: 'HMO-001-2024',
            accountNo: 'ACC-001',
            lockerKey: 'L-101',
            location: 'PhilPlans',
            hc: 'HC-001',
            gender: 'Male',
            employmentStatus: 'Active',
            status: 'Active',
            reason: '',
            considersReemployment: 'N/A',
            image: null
        },
        firstDose: '2021-03-15',
        fullyVaccinated: '2021-04-15',
        boosterShotDate: '2022-01-10',

        addresses: [
            {
                id: 1,
                street: '123 Main Street, Unit 5B',
                city: 'Manila',
                country: 'Philippines',
                travelTime: '45 minutes',
                comment: 'Living with parents'
            },
            {
                id: 2,
                street: '456 Rizal Avenue, Brgy. San Antonio',
                city: 'Quezon City',
                country: 'Philippines',
                travelTime: '30 minutes',
                comment: 'Near LRT station'
            }
        ],

        workSchedules: [
            {
                id: 1,
                schedule: '6:00 AM - 3:00 PM',
                startTime: '06:00',
                endTime: '15:00',
                breaks: ['Combined Break', 'Break Check-Out (15)'],
                restDays: ['Saturday', 'Sunday'],
                description: '',
                startDate: '2024-01-01',
                endDate: null
            }
        ],

        attendance: [
            {
                id: 1,
                date: getCurrentDate(-1),
                punctualityType: 'Absent',
                timeLength: 13,
                deductedFrom: 'Payroll',
                absentType: 'Late',
                comments: 'Traffic delay',
                reason: 'Heavy traffic due to road construction',
                loggedBy: 'Sarah Test'
            },
            {
                id: 2,
                date: '2024-06-05',
                punctualityType: 'Late',
                timeLength: 2,
                deductedFrom: 'Leave Credits',
                absentType: 'Sick Leave',
                comments: 'Fever and cold',
                reason: 'Medical appointment',
                loggedBy: 'Sarah Test'
            }
        ],

        leaveCredits: [
            {
                id: 1,
                fiscalYear: 2025,
                anniversaryDate: '2025-05-20',
                leaveType: 'Annual-Paid',
                payout: 0,
                forfeit: 0,
                prevBalance: 0,
                earned: 2,
                additional: 0,
                used: 1,
                remaining: 1,
                comments: '1.66 per month'
            },
            {
                id: 2,
                fiscalYear: 2025,
                anniversaryDate: '2025-05-20',
                leaveType: 'Illness-Paid',
                payout: 0,
                forfeit: 0,
                prevBalance: 0,
                earned: 2,
                additional: 0,
                used: 0,
                remaining: 2,
                comments: ''
            }
        ],

        leaves: [
            {
                id: 1,
                startDate: '2024-06-10',
                endDate: '2024-06-12',
                leaveType: 'Annual-Paid',
                comment: 'Family vacation',
                outTime: null
            }
        ],

        leavePayout: [
            {
                id: 1,
                fiscalYear: 2024,
                leaveType: 'Annual-Paid',
                balance: 5,
                paid: 1,
                datePaid: '2024-05-15',
                taggedBy: 'Admin Test'
            }
        ],

        loans: [
            {
                id: 1,
                loanDate: '2024-01-15',
                startDate: '2024-02-01',
                type: 'Personal Loan',
                loanAmount: 5000,
                deduction: 500,
                isRepaid: false
            }
        ],

        salary: [
            {
                id: 1,
                amount: 80000,
                acquiredDate: '2025-02-01'
            },
            {
                id: 2,
                amount: 85000,
                acquiredDate: '2025-07-01'
            },
            {
                id: 3,
                amount: 90000,
                acquiredDate: '2025-11-01'
            }
        ],

        documents: [
            {
                id: 1,
                type: '201 Files',
                isWarning: true,
                date: '2024-03-01',
                remarks: 'Updated emergency contact info',
                filename: 'Emergency_Contact_Update.pdf',
                location: '/asfas/asdaf/Emergency_Contact_Update.pdf'
            }
        ],

        overtime: [
            {
                id: 1,
                date: '2024-05-20',
                hours: 3,
                approvedBy: 'Sarah Test',
                createdBy: 'John Test',
                comments: 'Completed urgent project tasks'
            }
        ],

        hr: {
            nbiClearance: {
                status: 'Yes',
                advisedDateOfSubmission: '2024-01-10',
                lastModifiedBy: 'Sarah Test',
                dateModified: '2024-01-15'
            },
            bir2316: {
                status: 'Yes',
                lastModifiedBy: 'Sarah Test',
                dateModified: '2024-02-20'
            },
            companyId: {
                status: 'Yes',
                lastModifiedBy: 'Admin Test',
                dateModified: '2024-01-20'
            },
            workstationName: {
                status: 'Yes',
                lastModifiedBy: 'Admin Test',
                dateModified: '2024-01-25'
            },
            lockerKey: {
                status: 'Yes',
                lastModifiedBy: 'HR Admin',
                dateModified: '2024-02-01'
            },
            lockerName: {
                status: 'Yes',
                lastModifiedBy: 'HR Admin',
                dateModified: '2024-02-01'
            },
            sssEnrolled: {
                status: 'Yes',
                lastModifiedBy: 'HR Partner',
                dateModified: '2024-01-15'
            },
            phicEnrolled: {
                status: 'Yes',
                lastModifiedBy: 'HR Partner',
                dateModified: '2024-01-15'
            },
            hdmfEnrolled: {
                status: 'Yes',
                lastModifiedBy: 'HR Partner',
                dateModified: '2024-01-15'
            },
            bankEnrollmentCompleted: {
                status: 'Yes',
                lastModifiedBy: 'Finance Team',
                dateModified: '2024-02-10'
            },
            atmCardIssued: {
                status: 'Yes',
                lastModifiedBy: 'Finance Team',
                dateModified: '2024-02-15'
            },
            soloParentId: {
                status: '',
                lastModifiedBy: null,
                dateModified: null
            },
            soloParentIdExpiration: {
                status: null,
                lastModifiedBy: null,
                dateModified: null
            }
        },

        uponRegularization: {
            hmoPrincipalEnrolled: {
                status: 'Yes',
                lastModifiedBy: 'HR Partner',
                dateModified: '2024-03-01'
            },
            hmoDependentEnrolled: {
                status: 'Yes',
                lastModifiedBy: 'HR Partner',
                dateModified: '2024-03-01'
            },
            hmo2ndDependentEnrolled: {
                status: '',
                lastModifiedBy: null,
                dateModified: null
            },
            hmoCardIssued: {
                status: 'Yes',
                lastModifiedBy: 'HR Partner',
                dateModified: '2024-03-15'
            },
            mostRecentCovidChecklist: {
                date: '2024-08-20',
                lastModifiedBy: 'HR Admin',
                dateModified: '2024-08-20'
            },
            engagementDiscussion: {
                date: '2024-07-10',
                lastModifiedBy: 'Sarah Test',
                dateModified: '2024-07-10'
            },
            concerns: {
                text: 'Employee requested flexible hours for personal commitments',
                lastModifiedBy: 'HR Partner',
                dateModified: '2024-06-30'
            },
            includeInIdleEmails: {
                status: 'Yes',
                lastModifiedBy: 'Admin Test',
                dateModified: '2024-05-15'
            }
        },

        clinic: [
            {
                id: 1,
                date: '2024-06-15',
                comments: 'Annual health check-up completed',
                recordedBy: 'Clinic Admin',
                sendEmail: false,
                emailedTo: ''
            },
            {
                id: 2,
                date: '2024-06-30',
                comments: 'Flu vaccination administered',
                recordedBy: 'Clinic Admin',
                sendEmail: true,
                emailedTo: 'asfa@gmail.com'
            }
        ],

        referrals: [
            {
                id: 1,
                name: 'John Test',
                partialpayment: true,
                fullPayment: true,
                comments: 'Referred by current employee John Referrer.'
            }
        ],

        it: {
            pcSetUp: 'Yes',
            phoneSetup: 'Yes',
            phoneNumAdvised: 'Yes',
            pcHeadsetSetup: 'Yes',
            phoneHeadsetSetup: 'N/A',
            webcamSetup: 'No',
            pcUsername: '',
            pcPassword: '',
            comments: '',

            readyToWFH: 'Yes',
            wfhComments: 'Laptop issued, internet stable.',

            hardwareIssuedAtHome: [
                'Laptop'
            ],

            additionalCommentForWFH: 'Desktop, PLDT, 300 Mbps',
            dateSent: '',
            dateReturned: ''
        },

        hmo: {
            // employee
            employeeEnrolment: '2024-01-15',
            employeeRenewal: '2025-01-15',
            employeeAnnualPremium: '12000',
            employeeProratedPremium: '12000',
            employeeAcctNo: 'HMO-EMP-001',
            numOfDependents: '2',
            relationshipToDependents: 'Mother, Father',
            approvalDate: '2024-01-10',
            hmInvoiceNo: 'HMO-INV-001',
            // dependents
            dependentEnrolment: '2024-01-15',
            dependentRenewal: '2025-01-15',
            dependentAnnualPremium: '8000',
            dependentProratedPremium: '8000',
            firstDependentAcctNo: 'HMO-DEP-001',
            secondDependentAcctNo: 'HMO-DEP-002',
            clientInvoicingNo: 'CLIENT-INV-001',
            clientInvoicingDate: '2024-01-20'
        },

        probation: {
            induction: true,
            inductionDate: '2020-01-10',
            day1Agent: true,
            day1AgentDate: '2020-01-15',
            day1AgentRemarks: 'Completed orientation and initial training successfully.',
            day30Agent: true,
            day30AgentDate: '2020-02-15',
            day30AgentRemarks: 'Showing good progress with tasks. Needs more practice with technical tools.',
            day30Client: true,
            day30ClientDate: '2020-02-20',
            day30ClientRemarks: 'Client feedback positive. Communication skills are excellent.',
            day60Agent: true,
            day60AgentDate: '2020-03-15',
            day60AgentRemarks: 'Performance improved significantly. Meeting all KPIs consistently.',
            day60Client: true,
            day60ClientDate: '2020-03-20',
            day60ClientRemarks: 'Client very satisfied with quality of work and responsiveness.',
            day90Agent: true,
            day90AgentDate: '2020-04-15',
            day90AgentRemarks: 'Exceeded expectations. Ready for regularization. Shows leadership potential.',
            day90Client: true,
            day90ClientDate: '2020-04-20',
            day90ClientRemarks: 'Outstanding performance. Client requested to keep this agent on their account.',
            day150Agent: true,
            day150AgentDate: '2020-06-15',
            day150AgentRemarks: 'Continuing excellent performance post-regularization. Recommended for advanced training.',
            day150Client: true,
            day150ClientDate: '2020-06-20',
            day150ClientRemarks: 'Maintains high quality standards. Client considers this agent a key team member.',
            adviseClientForRegularization: true,
            adviseClientForRegularizationDate: '2020-07-01',
            forRegularization: 'Yes'
        },

        departure: {
            // General Info
            nature: 'Resignation',
            reason: 'Career Growth',
            return: 'Maybe',
            replace: 'Yes',
            employeeDiscussion: 'Employee expressed interest in pursuing a management role which is not currently available. Discussed career path options and expressed openness to return if such opportunity arises in the future.',
            clientDiscussion: 'Client was notified of the employee\'s decision. Client expressed satisfaction with the employee\'s work and requested to be informed if employee applies again in the future.',

            // HR Actions Required
            hrActions: {
                exit: 'Yes',
                hmo: 'Yes',
                sss: 'Yes',
                phic: 'Yes',
                hdmf: 'Yes'
            },

            // IT Actions Required
            itActions: {
                accessCard: 'Yes',
                logons: 'Yes',
                pc: 'Yes',
                tel: 'N/A'
            },

            // Payroll Actions Required
            payrollActions: {
                finalPay: 'Yes',
                invoiced: 'Yes'
            },

            reasonForNoOrNA: 'Tel marked as N/A because employee was using personal phone for work calls.'
        },

        thirteenthMonth: {
            debits: [
                {
                    id: 1,
                    dateAdded: '2024-03-15',
                    appliedDate: '2024-03-20',
                    amount: 5000,
                    reason: 'Advance'
                },
                {
                    id: 2,
                    dateAdded: '2024-07-10',
                    appliedDate: '2024-07-15',
                    amount: 3000,
                    reason: 'Loan Payment'
                }
            ]
        }
    },

    // =========================
    //  Employees 002 - 025 (Mock light records)
    // =========================
    ...Array.from({ length: 24 }).map((_, i) => {
        const num = (i + 2).toString().padStart(3, '0');
        return {
            personId: i + 2,
            empNo: num,
            basic: {
                personId: i + 2,
                empNo: num,
                firstname: `Employee${num}`,
                middleName: `M${num}`,
                preferedName: `Emp${num}`,
                lastname: i % 2 === 0 ? 'Test' : 'Admin',
                client: {
                    accountId: 7,
                    name: "GBSS",
                },
                position: { id: 66, description: "Web Developer", },
                reportsTo: 'Manager Test',
                altReportsTo1: 'Admin Test',
                altReportsTo2: '',
                hrPartner: 'Support Test',
                phone: '',
                mobile: '',
                email: `employee${num}@mock.com`,
                personalEmail: '',
                emergencyNumber: '',
                emergencyContact: '',
                hrDocs: 'Pending',
                regularizationDate: null,
                startDate: '2024-01-01',
                endDate: null,
                civilStatus: 'Single',
                numberOfKids: '0',
                birthdate: '1995-01-01',
                tin: '',
                sss: '',
                phic: '',
                hdmf: '',
                hmoAcctNo: '',
                accountNo: '',
                lockerKey: '',
                location: 'MockLocation',
                hc: '',
                gender: i % 2 === 0 ? 'Male' : 'Female',
                employmentStatus: 'Active',
                status: 'Active',
                reason: '',
                considersReemployment: '',
                image: null
            },
            addresses: [],
            workSchedules: [],
            attendance: [],
            leaveCredits: [],
            leaves: [],
            leavePayout: [],
            loans: [],
            salary: [],
            documents: [],
            overtime: [],
            hr: {},
            uponRegularization: {},
            clinic: []
        };
    })
];

export const HR_DOCS = [
    // 'Acknowledgment.rpt',
    // 'Certificate of Employment and Income GEARS.rpt',
    'Certificate of Employment and Income.rpt',
    'Certificate of Employment.rpt',
    'Employee Clearance Form.rpt',
    'Exit Interview.rpt',
    // 'Invite Letter for AU Visa Processing Template.rpt',
    // 'Last Pay with Prev Company.rpt',
    // 'Performance Evaluation.rpt',
    // 'Probationary Employment Contract with Annex.rpt',
    // 'Probationary Employment Contract.rpt',
    // 'Quitclaim.rpt',
    // 'Rregular Employment Contract.rpt',
    // 'Salary Adjustment - Reismac.rpt',
    // 'Salary Adjustment.rpt',
    // 'Termination of Contract.rpt',
    // 'Warning - Standard.rpt',
    // 'Warning With Notice To Explain.rpt'
]


// Employee form options
export const CIVIL_STATUS_OPTIONS = [
    { value: 'Single', label: 'Single' },
    { value: 'Married', label: 'Married' },
    { value: 'Widowed', label: 'Widowed' },
    { value: 'Separated', label: 'Separated' },
    { value: 'Divorced', label: 'Divorced' },
]

export const GENDER_OPTIONS = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
]

export const EMPLOYMENT_STATUS_OPTIONS = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'On Leave', label: 'On Leave' },
    { value: 'Terminated', label: 'Terminated' },
    { value: 'Resigned', label: 'Resigned' },
]

export const TERMINATION_REASON_OPTIONS = [
    { value: '', label: 'N/A' },
    { value: 'Voluntary Resignation', label: 'Voluntary Resignation' },
    { value: 'End of Contract', label: 'End of Contract' },
    { value: 'Termination', label: 'Termination' },
    { value: 'Retirement', label: 'Retirement' },
    { value: 'AWOL', label: 'AWOL' },
    { value: 'Other', label: 'Other' },
]

export const YES_NO_OPTIONS = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
]

export const YES_NO_NA_OPTIONS = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
    { value: 'N/A', label: 'N/A' },
]

export const YES_NO_MAYBE_OPTIONS = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
    { value: 'Maybe', label: 'Maybe' },
]

export const YES_NO_TBA_OPTIONS = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
    { value: 'TBA', label: 'TBA' },
]

export const YES_ONLY_OPTIONS = [
    { value: 'Yes', label: 'Yes' },
]

export const NA_YES_OPTIONS = [
    { value: 'N/A', label: 'N/A' },
    { value: 'Yes', label: 'Yes' },
]

export const DEPARTURE_NATURE_OPTIONS = [
    { value: 'Resignation', label: 'Resignation' },
    { value: 'Termination', label: 'Termination' },
    { value: 'End of Contract', label: 'End of Contract' },
    { value: 'Retirement', label: 'Retirement' },
    { value: 'Redundancy', label: 'Redundancy' },
]

export const DEPARTURE_REASON_OPTIONS = [
    { value: 'Personal Reasons', label: 'Personal Reasons' },
    { value: 'Career Growth', label: 'Career Growth' },
    { value: 'Relocation', label: 'Relocation' },
    { value: 'Health Issues', label: 'Health Issues' },
    { value: 'Better Opportunity', label: 'Better Opportunity' },
    { value: 'Company Restructure', label: 'Company Restructure' },
    { value: 'Performance Issues', label: 'Performance Issues' },
    { value: 'Contract Completion', label: 'Contract Completion' },
    { value: 'Other', label: 'Other' },
]

export const HARDWARE_OPTIONS = [
    { value: 'Laptop', label: 'Laptop' },
    { value: 'Desktop', label: 'Desktop' },
    { value: 'Monitor', label: 'Monitor' },
    { value: 'Keyboard', label: 'Keyboard' },
    { value: 'Mouse', label: 'Mouse' },
    { value: 'Headset', label: 'Headset' },
    { value: 'Webcam', label: 'Webcam' },
    { value: 'Printer', label: 'Printer' },
]

export const LOCATION_OPTIONS = [
    { value: 'Home', label: 'Home' },
    { value: 'PhilPlans', label: 'PhilPlans' },
    { value: 'Three Neo', label: 'Three Neo' }
]

// Work Schedule Options
export const WORK_SCHEDULE_OPTIONS = [
    { value: 'Offsite Australia', label: 'Offsite Australia', startTime: null, endTime: null },
    { value: 'Offsite New Zealand', label: 'Offsite New Zealand', startTime: null, endTime: null },
    { value: 'Offsite Others', label: 'Offsite Others', startTime: null, endTime: null },
    { value: 'FLEXI UNTIL 6AM', label: 'FLEXI UNTIL 6AM', startTime: '06:00', endTime: '15:00' },
    { value: 'FLEXI UNTIL 7AM', label: 'FLEXI UNTIL 7AM', startTime: '07:00', endTime: '16:00' },
    { value: 'FLEXI UNTIL 8AM', label: 'FLEXI UNTIL 8AM', startTime: '08:00', endTime: '17:00' },
    { value: 'FLEXI UNTIL 9AM', label: 'FLEXI UNTIL 9AM', startTime: '09:00', endTime: '18:00' },
    { value: 'FLEXI 6:00 AM - 8:00 AM', label: 'FLEXI 6:00 AM - 8:00 AM', startTime: '06:00', endTime: '15:00' },
    { value: 'FLEXI 6:00 AM - 7:00 AM', label: 'FLEXI 6:00 AM - 7:00 AM', startTime: '06:00', endTime: '15:00' },
    { value: 'FLEXI 7:00 AM - 8:00 AM', label: 'FLEXI 7:00 AM - 8:00 AM', startTime: '07:00', endTime: '16:00' },
    { value: '6:00 AM - 2:00 PM', label: '6:00 AM - 2:00 PM', startTime: '06:00', endTime: '14:00' },
    { value: '5:30 AM - 2:30 PM', label: '5:30 AM - 2:30 PM', startTime: '05:30', endTime: '14:30' },
    { value: '6:00 AM - 3:00 PM', label: '6:00 AM - 3:00 PM', startTime: '06:00', endTime: '15:00' },
    { value: '6:30 AM - 3:30 PM', label: '6:30 AM - 3:30 PM', startTime: '06:30', endTime: '15:30' },
    { value: '7:00 AM - 4:00 PM', label: '7:00 AM - 4:00 PM', startTime: '07:00', endTime: '16:00' },
    { value: '7:30 AM - 4:30 PM', label: '7:30 AM - 4:30 PM', startTime: '07:30', endTime: '16:30' },
    { value: '8:00 AM - 5:00 PM', label: '8:00 AM - 5:00 PM', startTime: '08:00', endTime: '17:00' },
    { value: '8:30 AM - 5:30 PM', label: '8:30 AM - 5:30 PM', startTime: '08:30', endTime: '17:30' },
    { value: '9:00 AM - 6:00 PM', label: '9:00 AM - 6:00 PM', startTime: '09:00', endTime: '18:00' },
    { value: '9:30 AM - 6:30 PM', label: '9:30 AM - 6:30 PM', startTime: '09:30', endTime: '18:30' },
    { value: 'FLEXI UNTIL 10 AM', label: 'FLEXI UNTIL 10 AM', startTime: '10:00', endTime: '19:00' },
    { value: 'FLEXI UNTIL 6:30 AM', label: 'FLEXI UNTIL 6:30 AM', startTime: '06:30', endTime: '15:30' },
    { value: 'FLEXI UNTIL 8:30 AM', label: 'FLEXI UNTIL 8:30 AM', startTime: '08:30', endTime: '17:30' },
    { value: 'FLEXI UNTIL 7:30 AM', label: 'FLEXI UNTIL 7:30 AM', startTime: '07:30', endTime: '16:30' },
    { value: 'FLEXI UNTIL 5:30 AM', label: 'FLEXI UNTIL 5:30 AM', startTime: '05:30', endTime: '14:30' },
    { value: '30 min early departure', label: '30 min early departure', startTime: null, endTime: null },
    { value: '15 min early departure', label: '15 min early departure', startTime: null, endTime: null },
    { value: '7:45 AM - 2:45 PM', label: '7:45 AM - 2:45 PM', startTime: '07:45', endTime: '14:45' },
    { value: '7:00 AM - 11:45 PM', label: '7:00 AM - 11:45 PM', startTime: '07:00', endTime: '23:45' },
    { value: '10:45 AM - 3:30 PM', label: '10:45 AM - 3:30 PM', startTime: '10:45', endTime: '15:30' },
    { value: '6:00 AM - 12:45 PM', label: '6:00 AM - 12:45 PM', startTime: '06:00', endTime: '12:45' },
    { value: '8:30 AM - 3:15 PM', label: '8:30 AM - 3:15 PM', startTime: '08:30', endTime: '15:15' },
    { value: '4:00 AM - 1:00 PM', label: '4:00 AM - 1:00 PM', startTime: '04:00', endTime: '13:00' },
    { value: '7:45 AM - 2:00 PM', label: '7:45 AM - 2:00 PM', startTime: '07:45', endTime: '14:00' },
    { value: '7:00 AM - 11:00 AM', label: '7:00 AM - 11:00 AM', startTime: '07:00', endTime: '11:00' },
    { value: 'FLEXI 6:00 AM - 6:30 AM', label: 'FLEXI 6:00 AM - 6:30 AM', startTime: '06:00', endTime: '06:30' },
    { value: 'FLEXI 6:30 AM - 7:00 AM', label: 'FLEXI 6:30 AM - 7:00 AM', startTime: '06:30', endTime: '07:00' },
    { value: 'FLEXI 5:30 AM - 6:30 AM', label: 'FLEXI 5:30 AM - 6:30 AM', startTime: '05:30', endTime: '06:30' },
    { value: '5:45 AM - 2:45 AM', label: '5:45 AM - 2:45 AM', startTime: '05:45', endTime: '14:45' },
    { value: 'FLEXI 6:00 AM - 7:30 AM', label: 'FLEXI 6:00 AM - 7:30 AM', startTime: '06:00', endTime: '07:30' },
    { value: '7:30 AM - 2:15 PM', label: '7:30 AM - 2:15 PM', startTime: '07:30', endTime: '14:15' },
    { value: 'FLEXI 5:30 AM - 6:00 AM', label: 'FLEXI 5:30 AM - 6:00 AM', startTime: '05:30', endTime: '06:00' },
    { value: 'FLEXI 5:30 AM - 7:00 AM', label: 'FLEXI 5:30 AM - 7:00 AM', startTime: '05:30', endTime: '07:00' },
    { value: 'FLEXI 5:00 AM - 6:00 AM', label: 'FLEXI 5:00 AM - 6:00 AM', startTime: '05:00', endTime: '06:00' },
    { value: 'FLEXI UNTIL 6:15 AM', label: 'FLEXI UNTIL 6:15 AM', startTime: null, endTime: '06:15' },
    { value: '7:00 AM - 3:00 PM', label: '7:00 AM - 3:00 PM', startTime: '07:00', endTime: '15:00' },
    { value: '12:00 PM - 9:00 PM', label: '12:00 PM - 9:00 PM', startTime: '12:00', endTime: '21:00' },
    { value: '10:00 AM - 7:00 PM', label: '10:00 AM - 7:00 PM', startTime: '10:00', endTime: '19:00' },
    { value: '5:30 AM - 9:30 AM', label: '5:30 AM - 9:30 AM', startTime: '05:30', endTime: '09:30' },
    { value: '7:45 AM - 4:45 PM', label: '7:45 AM - 4:45 PM', startTime: '07:45', endTime: '16:45' },
    { value: '6:45 AM - 3:45 PM', label: '6:45 AM - 3:45 PM', startTime: '06:45', endTime: '15:45' },
    { value: '10:30 AM - 7:30 AM', label: '10:30 AM - 7:30 AM', startTime: '10:30', endTime: '19:30' },
    // { value: 'FLEXI 6:00 AM - 8:00 AM', label: 'FLEXI 6:00 AM - 8:00 AM', startTime: '06:00', endTime: '08:00' },
    { value: '11:30 AM - 8:30 PM', label: '11:30 AM - 8:30 PM', startTime: '11:30', endTime: '20:30' },
    { value: 'FLEXI UNTIL 9:30 AM', label: 'FLEXI UNTIL 9:30 AM', startTime: null, endTime: '09:30' },
    { value: 'FLEXI 6:30 AM - 8:30 AM', label: 'FLEXI 6:30 AM - 8:30 AM', startTime: '06:30', endTime: '08:30' },
    { value: 'FLEXI UNTIL 12PM', label: 'FLEXI UNTIL 12PM', startTime: null, endTime: '12:00' },
    { value: '8:00 AM - 12:00 PM', label: '8:00 AM - 12:00 PM', startTime: '08:00', endTime: '12:00' },
    { value: 'Halfday Sched ( 10:00 AM - 2: 00 PM)', label: 'Halfday Sched ( 10:00 AM - 2: 00 PM)', startTime: '10:00', endTime: '14:00' },
    { value: 'FLEXI UNTIL 6:30 AM - 6:40 AM', label: 'FLEXI UNTIL 6:30 AM - 6:40 AM', startTime: '06:30', endTime: '06:40' },
    { value: 'FLEXI UNTIL 5:30 AM - 5:40 AM', label: 'FLEXI UNTIL 5:30 AM - 5:40 AM', startTime: '05:30', endTime: '05:40' },
    { value: '11:30 AM - 4:30 PM', label: '11:30 AM - 4:30 PM', startTime: '11:30', endTime: '16:30' },
    { value: 'Auto Shift', label: 'Auto Shift', startTime: null, endTime: null },
    { value: '6:00 AM - 1:00 PM', label: '6:00 AM - 1:00 PM', startTime: '06:00', endTime: '13:00' },
    { value: 'FLEXI 5:30 AM - 8:00 AM', label: 'FLEXI 5:30 AM - 8:00 AM', startTime: '05:30', endTime: '08:00' },
    { value: 'FLEXI 3:00 AM - 12:00 PM', label: 'FLEXI 3:00 AM - 12:00 PM', startTime: '03:00', endTime: '12:00' },
    { value: '7:00 AM - 2:00 PM', label: '7:00 AM - 2:00 PM', startTime: '07:00', endTime: '14:00' },
    { value: 'FLEXI 6:30 AM - 8:00 AM', label: 'FLEXI 6:30 AM - 8:00 AM', startTime: '06:30', endTime: '08:00' },
    { value: 'FLEXI 7:10 AM - 4:10 AM', label: 'FLEXI 7:10 AM - 4:10 AM', startTime: '07:10', endTime: '16:10' },
    { value: 'FLEXI 6:00 AM - 6:10 AM', label: 'FLEXI 6:00 AM - 6:10 AM', startTime: '06:00', endTime: '06:10' },
    { value: 'FLEXI 5:15 AM - 6:15 AM', label: 'FLEXI 5:15 AM - 6:15 AM', startTime: '05:15', endTime: '06:15' },
    { value: '11:00 AM 4:00 PM', label: '11:00 AM 4:00 PM', startTime: '11:00', endTime: '16:00' },
    { value: 'FLEXI 7:00 AM - 8:30 AM', label: 'FLEXI 7:00 AM - 8:30 AM', startTime: '07:00', endTime: '08:30' },
    { value: 'FLEXI 5:00 AM - 7:00 AM', label: 'FLEXI 5:00 AM - 7:00 AM', startTime: '05:00', endTime: '07:00' },
    { value: 'FLEXI UNTIL 5AM', label: 'FLEXI UNTIL 5AM', startTime: null, endTime: '05:00' },
    { value: '5:00 AM - 9:00 AM', label: '5:00 AM - 9:00 AM', startTime: '05:00', endTime: '09:00' },
    { value: '3:30 AM - 12:30 PM', label: '3:30 AM - 12:30 PM', startTime: '03:30', endTime: '12:30' },
    { value: 'FLEXI 5:00 AM - 6:30 AM', label: 'FLEXI 5:00 AM - 6:30 AM', startTime: '05:00', endTime: '06:30' },
    { value: '4:30 AM - 1:30 PM', label: '4:30 AM - 1:30 PM', startTime: '04:30', endTime: '13:30' },
    { value: '1:00 PM - 10:00 PM', label: '1:00 PM - 10:00 PM', startTime: '13:00', endTime: '22:00' },
    { value: 'FLEXI 5:00 AM - 8:00 AM', label: 'FLEXI 5:00 AM - 8:00 AM', startTime: '05:00', endTime: '08:00' },
    { value: '1:00 AM - 10:00 AM', label: '1:00 AM - 10:00 AM', startTime: '01:00', endTime: '10:00' },
    { value: 'FLEXI 5:00 AM - 5:30 AM', label: 'FLEXI 5:00 AM - 5:30 AM', startTime: '05:00', endTime: '05:30' },
    { value: 'FLEXI 6:00 AM - 9:00 AM', label: 'FLEXI 6:00 AM - 9:00 AM', startTime: '06:00', endTime: '09:00' },
    { value: 'TEST SCHEDULE', label: 'TEST SCHEDULE', startTime: null, endTime: null },
    { value: 'FLEXI 6:30 AM - 7:30 AM', label: 'FLEXI 6:30 AM - 7:30 AM', startTime: '06:30', endTime: '07:30' },
    { value: '6:00 AM - 5:00 PM', label: '6:00 AM - 5:00 PM', startTime: '06:00', endTime: '17:00' },
    { value: 'FLEXI UNTIL 6:45 AM', label: 'FLEXI UNTIL 6:45 AM', startTime: null, endTime: '06:45' },
    { value: 'FLEXI 5:00 AM - 5:10 AM', label: 'FLEXI 5:00 AM - 5:10 AM', startTime: '05:00', endTime: '05:10' },
]

export const DAYS_OPTIONS = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
]

export const BREAKS = [
    'Combined Break',
    'Break Check-Out (15)',
    'Break Check-Out (30)',
    'Break Check-Out (60)',
    'Break Check-Out (75)',
    'Break Check-Out (90)',
]

export const APPLICANTS = [
    {
        id: 1,
        firstName: 'Alice',
        middleInitial: 'M',
        lastName: 'Test',
        mobile: '+63 912 345 6789',
        email: 'alice.test@applicant.com',
        lastCompany: 'Mock Solutions Inc.',
        lastExpSalary: '45,000',
        comments: 'Strong technical background. Good communication skills.',
        source: 'LinkedIn',
        position: 'Software Engineer',
        account: 'GBSS',
        status: 'In-Progress',
        subStatus: 'Initial Interview: Passed',
        lastActionBy: 'Michael Test',
        lastSaveDate: '2024-06-15 10:30',
        hrDocs: '',
        scheduleDate: '2024-06-20',
        time: '14:00',
        purpose: 'Technical Interview',
        interviewer: 'Sarah Test',
        assessCode: 'TECH-2024-001',
        issuedDate: '2024-06-15',
        minutesValid: '120',
        assessType: 'Technical Assessment',
        requireTyping: 'Yes',
        typingResult: '65 WPM',
        genAssessCompleted: '2024-06-16',
        completed: 'Pending',
        meetingLink: 'https://meet.google.com/abc-defg-hij',

        documents: [
            {
                id: 1,
                filename: 'Resume.pdf',
                date: '2024-06-10',
                locationPath: '/documents/applicants/1/Resume.pdf',
                uploadedBy: 'Michael Test'
            },
            {
                id: 2,
                filename: 'Resume1.pdf',
                date: '2024-12-10',
                locationPath: '/documents/applicants/1/Resume1.pdf',
                uploadedBy: 'Michael Test'
            }
        ],

        commentHistory: [
            {
                id: 1,
                date: '2024-06-12',
                comment: 'Candidate shows strong problem-solving skills.',
                addedBy: 'Sarah Test',
                emailedTo: 'mock@applicant.com'
            }
        ]
    },

    ...Array.from({ length: 24 }).map((_, i) => {
        const id = i + 2;
        return {
            id,
            firstName: `Applicant${id}`,
            middleInitial: String.fromCharCode(65 + (i % 26)),
            lastName: i % 2 === 0 ? 'Test' : 'Admin',
            mobile: '',
            email: `applicant${id}@mock.com`,
            lastCompany: 'Mock Corp',
            lastExpSalary: '30,000',
            comments: '',
            source: 'JobStreet',
            position: 'Staff',
            account: 'GBSS',
            status: 'New',
            subStatus: '',
            lastActionBy: 'HR Test',
            lastSaveDate: '',
            hrDocs: '',
            scheduleDate: '',
            time: '',
            purpose: '',
            interviewer: '',
            assessCode: '',
            issuedDate: '',
            minutesValid: '',
            assessType: '',
            requireTyping: 'No',
            typingResult: '',
            genAssessCompleted: '',
            completed: '',
            meetingLink: '',
            documents: [],
            commentHistory: []
        };
    })
];

export const APPLICANT_SCHEDS = [
    {
        id: 1,
        applicant: 'Alice Applicant',
        resume: '',
        scheduledDate: '2024-06-20',
        scheduledTime: '14:00',
        purpose: 'Technical Interview',
        client: 'GBSS',
        position: 'Software Engineer',
        loggedBy: 'Michael Test',
        comments: 'Initial interview scheduled via Google Meet.'

    }
]

export const PURPOSE_OPTIONS = [
    'Initial Interview',
    'Final Interview',
    'Technical Interview',
    'HR Interview',
    'Assessment Test',
    'Onboarding Orientation'
]

export const HR_DOCS_APPLICANTS = [
    'Probationary Employment Contract with Annex.rpt',
    'General Assessment.rpt',
    'Conveyancing Assessment.rpt'
]

export const SUBSTATUS_OPTIONS = [
    'Initial Interview: Passed',
    'Initial Interview: Failed',
    'Final Interview: Passed',
    'Final Interview: Failed',
    'Offer Sent',
    'Offer Accepted',
    'Offer Declined',
    'Onboarding In-Progress',
    'Onboarding Completed'
]

export const POSITION_OPTIONS = [
    'Software Engineer',
    'Junior Developer',
    'Recruiter',
    'IT Support',
    'Financial Analyst',
    'Project Manager',
    'Graphic Designer',
    'QA Tester'
]

export const STATUS_OPTIONS = [
    'In-Progress',
    'Completed'
]

export const CLIENT_OPTIONS = [
    'GBSS',
    'Resimac Group Limited',
    'Azora Finance (Services)',
    'Seen Agency'
]

export const SOURCE_OPTIONS = [
    'LinkedIn',
    'Indeed',
    'JobStreet',
    'Facebook',
    'Company Website',
    'Employee Referral',
    'Job Fair',
    'Walk-in',
    'Email',
    'Other'
]

export const ATTENDANCE_TYPE_OPTIONS = [
    'Late',
    'Undertime',
    'Absent',
    'Overtime',
    'Leave',
    'Official Business'
]

export const LEAVE_TYPE_OPTIONS = [
    'Annual-Paid',
    'Illness-Paid',
    'Sick Leave',
    'Vacation Leave',
    'Maternity Leave',
    'Paternity Leave',
    'Bereavement Leave',
    'Emergency Leave',
    'Others'
]

export const LOAN_TYPE_OPTIONS = [
    'Personal Loan',
    'Emergency Loan',
    'Salary Loan',
    'Company Loan'
]

export const DEDUCTION_TYPE_OPTIONS = [
    'Annual Leave',
    'Morning Break',
    'Payroll',
    'Sick Leave'
]

export const ATTENDANCE_LIST = [
    {
        id: 1,
        person: '001',
        client: 'Acme Corporation',
        date: getCurrentDate(-1),
        punctualityType: 'Late',
        timeLength: 15,
        notYetArrived: false,
        deductedFrom: 'Morning Break',
        absentType: '',
        expectedReturn: '',
        preApproved: false,
        timeIn: '09:15',
        timeOut: '18:00',
        comments: 'Traffic delay',
        reason: 'Heavy traffic on highway',
        workSched: '9:00 AM - 6:00 PM',
        sendEmail: false,
        correction: false
    },
    {
        id: 2,
        person: '002',
        client: 'Tech Solutions Inc',
        date: getCurrentDate(),
        punctualityType: 'Absent',
        timeLength: 480,
        notYetArrived: false,
        deductedFrom: '',
        absentType: 'Annual-Paid',
        expectedReturn: getCurrentDate(1),
        preApproved: true,
        timeIn: '08:00',
        timeOut: '17:00',
        comments: 'Approved vacation leave',
        reason: 'Personal matters',
        workSched: '8:00 AM - 5:00 PM',
        sendEmail: true,
        correction: false
    },
    {
        id: 3,
        person: '003',
        client: 'Global Services Ltd',
        date: getCurrentDate(1),
        punctualityType: 'Overtime',
        timeLength: 120,
        notYetArrived: false,
        deductedFrom: '',
        absentType: '',
        expectedReturn: '',
        preApproved: true,
        timeIn: '09:00',
        timeOut: '20:00',
        comments: 'Project deadline',
        reason: 'Critical system deployment',
        workSched: '9:00 AM - 6:00 PM',
        sendEmail: false,
        correction: false
    },
    {
        id: 4,
        person: '004',
        client: 'Innovate Partners',
        date: getCurrentDate(-1),
        punctualityType: 'Undertime',
        timeLength: 30,
        notYetArrived: false,
        deductedFrom: 'Payroll',
        absentType: '',
        expectedReturn: '',
        preApproved: true,
        timeIn: '10:00',
        timeOut: '18:30',
        comments: 'Doctor appointment',
        reason: 'Medical checkup',
        workSched: '10:00 AM - 7:00 PM',
        sendEmail: false,
        correction: false
    },
    {
        id: 5,
        person: '005',
        client: 'Acme Corporation',
        date: getCurrentDate(),
        punctualityType: 'Late',
        timeLength: 25,
        notYetArrived: false,
        deductedFrom: 'Morning Break',
        absentType: '',
        expectedReturn: '',
        preApproved: false,
        timeIn: '09:25',
        timeOut: '18:00',
        comments: 'Transportation issue',
        reason: 'Bus breakdown',
        workSched: '9:00 AM - 6:00 PM',
        sendEmail: false,
        correction: false
    },
    {
        id: 6,
        person: '006',
        client: 'Tech Solutions Inc',
        date: getCurrentDate(1),
        punctualityType: 'Absent',
        timeLength: 480,
        notYetArrived: false,
        deductedFrom: '',
        absentType: 'Sick Leave',
        expectedReturn: getCurrentDate(1),
        preApproved: false,
        timeIn: '08:00',
        timeOut: '17:00',
        comments: 'Flu symptoms',
        reason: 'Medical certificate provided',
        workSched: '8:00 AM - 5:00 PM',
        sendEmail: true,
        correction: false
    },
    {
        id: 7,
        person: '007',
        client: 'Global Services Ltd',
        date: getCurrentDate(-1),
        punctualityType: 'Official Business',
        timeLength: 240,
        notYetArrived: false,
        deductedFrom: '',
        absentType: '',
        expectedReturn: '',
        preApproved: true,
        timeIn: '09:00',
        timeOut: '13:00',
        comments: 'Client meeting',
        reason: 'Quarterly business review',
        workSched: '9:00 AM - 6:00 PM',
        sendEmail: false,
        correction: false
    },
    {
        id: 8,
        person: '008',
        client: 'Innovate Partners',
        date: getCurrentDate(),
        punctualityType: 'Overtime',
        timeLength: 90,
        notYetArrived: false,
        deductedFrom: '',
        absentType: '',
        expectedReturn: '',
        preApproved: true,
        timeIn: '10:00',
        timeOut: '20:30',
        comments: 'End of month reporting',
        reason: 'Financial reports deadline',
        workSched: '10:00 AM - 7:00 PM',
        sendEmail: false,
        correction: false
    },
    {
        id: 9,
        person: '009',
        client: 'Acme Corporation',
        date: getCurrentDate(1),
        punctualityType: 'Late',
        timeLength: 10,
        notYetArrived: false,
        deductedFrom: 'Morning Break',
        absentType: '',
        expectedReturn: '',
        preApproved: false,
        timeIn: '09:10',
        timeOut: '18:00',
        comments: 'Alarm malfunction',
        reason: 'Woke up late',
        workSched: '9:00 AM - 6:00 PM',
        sendEmail: false,
        correction: false
    },
    {
        id: 10,
        person: '010',
        client: 'Tech Solutions Inc',
        date: getCurrentDate(),
        punctualityType: 'Absent',
        timeLength: 480,
        notYetArrived: true,
        deductedFrom: '',
        absentType: 'Emergency Leave',
        expectedReturn: getCurrentDate(1),
        preApproved: false,
        timeIn: '08:00',
        timeOut: '17:00',
        comments: 'Family emergency',
        reason: 'Hospital visit',
        workSched: '8:00 AM - 5:00 PM',
        sendEmail: true,
        correction: false
    }
]

export const ATTENDANCE_AMENDMENT_REQUESTS = [
    {
        id: 1,
        person: '001',
        client: 'Global Tech Solutions',
        workDate: '2025-11-20',
        schedule: '9:00 AM - 6:00 PM',
        logTime: '9:15 AM',
        amendmentOn: '2025-11-21',
        requestedTime: '9:00 AM',
        comments: 'Forgot to clock in on time, arrived at 9:00 AM',
        status: 'Pending'
    },
    {
        id: 2,
        person: '003',
        client: 'Innovative Systems LLC',
        workDate: '2025-11-22',
        schedule: '8:00 AM - 5:00 PM',
        logTime: '5:30 PM',
        amendmentOn: '2025-11-22',
        requestedTime: '5:00 PM',
        comments: 'System error, clocked out late but left at 5:00 PM',
        status: 'Pending'
    },
    {
        id: 3,
        person: '005',
        client: 'NextGen Digital',
        workDate: '2025-11-19',
        schedule: '10:00 AM - 7:00 PM',
        logTime: '',
        amendmentOn: '2025-11-20',
        requestedTime: '10:00 AM',
        comments: 'Did not clock in, system was down',
        status: 'Pending'
    },
    {
        id: 4,
        person: '007',
        client: 'CloudWorks Inc',
        workDate: '2025-11-23',
        schedule: '9:00 AM - 6:00 PM',
        logTime: '6:45 PM',
        amendmentOn: '2025-11-23',
        requestedTime: '6:00 PM',
        comments: 'Forgot to clock out, left at 6:00 PM sharp',
        status: 'Pending'
    },
    {
        id: 5,
        person: '002',
        client: 'Smart Solutions Group',
        workDate: '2025-11-21',
        schedule: '8:30 AM - 5:30 PM',
        logTime: '8:45 AM',
        amendmentOn: '2025-11-22',
        requestedTime: '8:30 AM',
        comments: 'Card reader malfunction, arrived on time',
        status: 'Pending'
    }
]

// Mock data for clients
export const MOCK_CLIENTS = [
    {
        id: 1,
        name: 'GBSS',
        abbreviatedName: 'GBSS',
        abn: '12 345 678 901',
        agreementInvoiceName: 'GBSS Pty Ltd',
        type: 'Internal',
        status: 'Current',
        noOfStaff: 45,
        lastHiredEmployee: 'John Smith',
        lastContactDate: '2025-11-20',
        pointOfReference: 'Sarah Johnson',
        emailOfPOR: 'sjohnson@gbss.com.au',
        telNo: '02 9692 9111',
        invoiceAttentionTo: 'Finance Department',
        startDate: '2020-01-15',
        accountManager: 'Admin Test',
        referedBy: 'Direct',
        hc: 450.00,
        paymentTerms: 7,
        invoiceAddress: 'Level 5, 123 Business St\nSydney NSW 2000\nAustralia',
        interactions: [
            {
                id: 1,
                date: '2025-11-20',
                createdBy: 'Sarah Test',
                comment: 'Discussed new staffing requirements for Q1 2026',
                commType: 'Meeting',
                contactWith: 'Sarah Johnson',
                futureContact: '2025-12-15'
            },
            {
                id: 2,
                date: '2025-11-15',
                createdBy: 'Admin Test',
                comment: 'Follow-up on invoice payment',
                commType: 'Email',
                contactWith: 'Finance Department',
                futureContact: '2025-11-25'
            }
        ]
    },
    {
        id: 2,
        name: 'Resimac Group Limited',
        abbreviatedName: 'RGL',
        abn: '98 765 432 109',
        agreementInvoiceName: 'Resimac Group Limited',
        type: 'External',
        status: 'Current',
        noOfStaff: 12,
        lastHiredEmployee: 'Jane Doe',
        lastContactDate: '2025-11-15',
        pointOfReference: 'Michael Brown',
        emailOfPOR: 'mbrown@resimac.com.au',
        telNo: '02 8000 8000',
        invoiceAttentionTo: 'Accounts Payable',
        startDate: '2021-06-01',
        accountManager: 'Dan Test',
        referedBy: 'LinkedIn',
        hc: 520.00,
        paymentTerms: 14,
        invoiceAddress: 'Level 12, 456 Corporate Ave\nSydney NSW 2001\nAustralia',
        interactions: [
            {
                id: 1,
                date: '2025-11-10',
                createdBy: 'Dan Test',
                comment: 'Performance review meeting scheduled',
                commType: 'Phone Call',
                contactWith: 'Michael Brown',
                futureContact: '2025-12-01'
            }
        ]
    },
    {
        id: 3,
        name: 'Azora Finance (Services)',
        abbreviatedName: 'AFS',
        abn: '11 222 333 444',
        agreementInvoiceName: 'Azora Finance Services Pty Ltd',
        type: 'External',
        status: 'Current',
        noOfStaff: 8,
        lastHiredEmployee: 'Robert Wilson',
        lastContactDate: '2025-11-10',
        pointOfReference: 'Emily Davis',
        emailOfPOR: 'edavis@azora.com.au',
        telNo: '02 9555 5555',
        invoiceAttentionTo: 'Finance Team',
        startDate: '2022-03-20',
        accountManager: 'Sarah Test',
        referedBy: 'Client Referral',
        hc: 480.00,
        paymentTerms: 30,
        invoiceAddress: 'Suite 8, 789 Finance Plaza\nMelbourne VIC 3000\nAustralia',
        interactions: []
    },
    {
        id: 4,
        name: 'Seen Agency',
        abbreviatedName: 'SA',
        abn: '55 666 777 888',
        agreementInvoiceName: 'Seen Agency Pty Ltd',
        type: 'External',
        status: 'Current',
        noOfStaff: 15,
        lastHiredEmployee: 'Lisa Anderson',
        lastContactDate: '2025-11-05',
        pointOfReference: 'David Miller',
        emailOfPOR: 'dmiller@seenagency.com.au',
        telNo: '02 9444 4444',
        invoiceAttentionTo: 'Billing Department',
        startDate: '2023-01-10',
        accountManager: 'Admin Test',
        referedBy: 'Industry Event',
        hc: 500.00,
        paymentTerms: 7,
        invoiceAddress: 'Ground Floor, 321 Marketing St\nSydney NSW 2000\nAustralia',
        interactions: []
    }
]

export const MOCK_EMAIL_SUBSCRIPTIONS = [
    {
        id: 1,
        name: 'John Test',
        email: 'john.test@example.com',
        date: '2024-06-10',
    },
    {
        id: 2,
        name: 'Sarah Mitchell',
        email: 'sarah.mitchell@example.com',
        date: '2024-07-15',
    },
    {
        id: 3,
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        date: '2024-08-22',
    },
    {
        id: 4,
        name: 'Emma Johnson',
        email: 'emma.johnson@example.com',
        date: '2024-09-05',
    },
    {
        id: 5,
        name: 'David Martinez',
        email: 'david.martinez@example.com',
        date: '2024-10-11',
    },
    {
        id: 6,
        name: 'Lisa Anderson',
        email: 'lisa.anderson@example.com',
        date: '2024-11-03',
    },
    {
        id: 7,
        name: 'Robert Taylor',
        email: 'robert.taylor@example.com',
        date: '2024-12-18',
    },
    {
        id: 8,
        name: 'Jennifer Brown',
        email: 'jennifer.brown@example.com',
        date: '2025-01-25',
    },
    {
        id: 9,
        name: 'James Wilson',
        email: 'james.wilson@example.com',
        date: '2025-02-14',
    },
    {
        id: 10,
        name: 'Amanda Davis',
        email: 'amanda.davis@example.com',
        date: '2025-03-20',
    }
]

export const MOCK_HOLIDAYS = [
    {
        id: 1,
        holidayDate: '2025-12-26',
        holidayType: 'Regular',
        description: 'Boxing day',
        country: 'Australia',
        briefInsight: 'Boxing Day, in Great Britain and some Commonwealth countries, particularly Australia, Canada, and New Zealand, holiday (December 26) on which servants, tradespeople, and the poor traditionally were presented with gifts.'
    },
    {
        id: 2,
        holidayDate: '2025-04-25',
        holidayType: 'Regular',
        description: 'Anzac Day',
        country: 'Australia',
        briefInsight: 'Anzac Day is a national day of remembrance in Australia, New Zealand and Tonga that broadly commemorates all Australians and New Zealanders who served and died in all wars, conflicts, and peacekeeping operations.'
    },
    {
        id: 3,
        holidayDate: '2025-04-21',
        holidayType: 'Regular',
        description: 'Easter Monday',
        country: 'Australia',
        briefInsight: 'Easter Monday is celebrated as a holiday in many Christian cultures. In previous times, the Easter celebration lasted for a whole week.'
    },
    {
        id: 4,
        holidayDate: '2025-01-27',
        holidayType: 'Regular',
        description: 'Australia Day',
        country: 'Australia',
        briefInsight: 'Australia Day, on 26 January, is the anniversary of the arrival of the First Fleet of 11 convict ships from Great Britain, and the raising of the Union Jack at Sydney Cove by its commander Captain Arthur Phillip, in 1788.'
    },
    {
        id: 5,
        holidayDate: '2025-01-01',
        holidayType: 'Regular',
        description: 'New Year\'s Day',
        country: 'Australia & Philippines',
        briefInsight: 'In the Gregorian calendar, New Year\'s Day is the first day of the calendar year, 1 January. Most solar calendars begin the year regularly at or near the northern winter solstice.'
    },
    {
        id: 6,
        holidayDate: '2025-12-25',
        holidayType: 'Regular',
        description: 'Christmas Day',
        country: 'Australia & Philippines',
        briefInsight: 'Christmas is an annual festival commemorating the birth of Jesus Christ, observed primarily on December 25 as a religious and cultural celebration among billions of people around the world.'
    },
    {
        id: 7,
        holidayDate: '2025-04-20',
        holidayType: 'Regular',
        description: 'Easter Sunday',
        country: 'Australia & Philippines',
        briefInsight: 'In Christianity, Easter commemorates the death and resurrection of Jesus Christ and is one of the two most important holidays in the Christian religion.'
    },
    {
        id: 8,
        holidayDate: '2025-04-18',
        holidayType: 'Regular',
        description: 'Good Friday',
        country: 'Australia & Philippines',
        briefInsight: 'In Australia, Good Friday is the start of a four-day weekend and falls during the Easter school holidays.'
    },
    {
        id: 9,
        holidayDate: '2025-01-01',
        holidayType: 'Regular',
        description: 'New Year\'s Day',
        country: 'Australia & Philippines',
        briefInsight: 'New Year\'s Day, first day of the new year, celebrated with religious, cultural, and social observances around the world.'
    },
    {
        id: 10,
        holidayDate: '2025-12-31',
        holidayType: 'Special',
        description: 'Last Day of the Year',
        country: 'Philippines',
        briefInsight: 'In the Gregorian calendar, New Year\'s Eve refers to the evening, or commonly the entire day, of the last day of the year, 31 December.'
    }
]

export const holidayTypeOptions = [
    { value: 'Regular', label: 'Regular' },
    { value: 'Special', label: 'Special' }
]

export const countryOptions = [
    { value: 'Australia', label: 'Australia' },
    { value: 'Philippines', label: 'Philippines' },
    { value: 'Australia & Philippines', label: 'Australia & Philippines' }
]

export const MOCK_LATE_NOTIFICATIONS = [
    {
        id: 1,
        date: '2025-11-27',
        employee: 'John Test',
        reason: 'Family matter',
        minutes: 240
    },
    {
        id: 2,
        date: '2025-11-27',
        employee: 'Employee002 Test',
        reason: 'Traffic',
        minutes: 60
    },
    {
        id: 3,
        date: '2025-11-27',
        employee: 'Employee003 Admin',
        reason: 'Traffic',
        minutes: 15
    },
    {
        id: 4,
        date: '2025-11-27',
        employee: 'Employee004 Test',
        reason: 'Transportation issue',
        minutes: 30
    },
    {
        id: 5,
        date: '2025-11-27',
        employee: 'Employee005 Admin',
        reason: 'Transportation issue',
        minutes: 30
    },
    {
        id: 6,
        date: '2025-11-26',
        employee: 'Employee006 Test',
        reason: 'Transportation issue',
        minutes: 20
    },
    {
        id: 7,
        date: '2025-11-26',
        employee: 'Employee007 Admin',
        reason: 'Traffic',
        minutes: 5
    },
    {
        id: 8,
        date: '2025-11-26',
        employee: 'Employee008 Test',
        reason: 'Traffic',
        minutes: 10
    },
    {
        id: 9,
        date: '2025-11-26',
        employee: 'Employee009 Admin',
        reason: 'Illness',
        minutes: 30
    },
    {
        id: 10,
        date: '2025-11-26',
        employee: 'Employee010 Test',
        reason: 'Transportation issue',
        minutes: 10
    },
    {
        id: 11,
        date: '2025-11-25',
        employee: 'Employee011 Admin',
        reason: 'Traffic',
        minutes: 30
    },
    {
        id: 12,
        date: '2025-11-25',
        employee: 'Employee012 Test',
        reason: 'Traffic',
        minutes: 15
    },
    {
        id: 13,
        date: '2025-11-25',
        employee: 'Employee013 Admin',
        reason: 'Family matter',
        minutes: 240
    },
    {
        id: 14,
        date: '2025-11-25',
        employee: 'Employee014 Test',
        reason: 'Transportation issue',
        minutes: 10
    },
    {
        id: 15,
        date: '2025-11-24',
        employee: 'Employee015 Admin',
        reason: 'Traffic',
        minutes: 20
    }
]

export const lateReasonOptions = [
    { value: 'Traffic', label: 'Traffic' },
    { value: 'Transportation issue', label: 'Transportation issue' },
    { value: 'Family matter', label: 'Family matter' },
    { value: 'Illness', label: 'Illness' },
    { value: 'Heavy Rain/Flood', label: 'Heavy Rain/Flood' },
    { value: 'WFH tech problem', label: 'WFH tech problem' },
    { value: 'Not stated', label: 'Not stated' },
    { value: 'Slept in', label: 'Slept in' }
]

export const VACANT_POSITIONS = [
    {
        id: 1,
        client: 'GBSS',
        position: 'Software Engineer',
        noOfVacancies: 3,
        requestedBy: 'John Smith',
        email: 'john.smith@gbss.com',
        recruiter: 'Admin Test',
        jobstreetURL: 'https://www.jobstreet.com.au/en/job/software-engineer-1234567',
        gbssURL: 'https://gbss.com.au/careers/software-engineer',
        facebookDatePosted: '2024-06-01',
        tpChecked: '2024-06-02',
        hc: 150.00,
        dateCreated: '2024-06-01',
        dateRequired: '2024-06-30',
        status: 'Current',
        url: 'https://gbss.com.au/careers/software-engineer',
        reason: 'Project expansion',
        comments: 'Urgent hiring needed for new project',
        documents: [
            {
                id: 1,
                fileName: 'Job_Description_SE.pdf',
                dateUploaded: '2024-06-01',
                locationPath: '/documents/vacant_positions/1/Job_Description_SE.pdf',
                remarks: 'Detailed job description for Software Engineer role',
                type: 'Job Description'
            },
            {
                id: 2,
                fileName: 'Contract_Template_SE.pdf',
                dateUploaded: '2024-06-02',
                locationPath: '/documents/vacant_positions/1/Contract_Template_SE.pdf',
                remarks: 'Employment contract template',
                type: 'Contract'
            }
        ]
    },
    {
        id: 2,
        client: 'Acme Corp',
        position: 'Product Manager',
        noOfVacancies: 1,
        requestedBy: 'Sarah Johnson',
        email: 'sarah.johnson@acmecorp.com',
        recruiter: 'Mike Chen',
        jobstreetURL: 'https://www.jobstreet.com.au/en/job/product-manager-2345678',
        gbssURL: 'https://acmecorp.com/careers/product-manager',
        facebookDatePosted: '2024-07-15',
        tpChecked: '2024-07-16',
        hc: 120.00,
        dateCreated: '2024-07-15',
        dateRequired: '2024-08-15',
        status: 'Current',
        url: 'https://acmecorp.com/careers/product-manager',
        reason: 'Replacement hire',
        comments: 'Experienced PM required for enterprise product',
        documents: [
            {
                id: 3,
                fileName: 'Job_Description_PM.pdf',
                dateUploaded: '2024-07-15',
                locationPath: '/documents/vacant_positions/2/Job_Description_PM.pdf',
                remarks: 'Product Manager role specifications',
                type: 'Job Description'
            }
        ]
    },
    {
        id: 3,
        client: 'Tech Solutions Inc',
        position: 'Data Analyst',
        noOfVacancies: 2,
        requestedBy: 'David Lee',
        email: 'david.lee@techsolutions.com',
        recruiter: 'Emily Rodriguez',
        jobstreetURL: 'https://www.jobstreet.com.au/en/job/data-analyst-3456789',
        gbssURL: 'https://techsolutions.com/careers/data-analyst',
        facebookDatePosted: '2024-08-01',
        tpChecked: '2024-08-02',
        hc: 90.00,
        dateCreated: '2024-08-01',
        dateRequired: '2024-09-01',
        status: 'In Progress',
        url: 'https://techsolutions.com/careers/data-analyst',
        reason: 'Team expansion',
        comments: 'Need analysts with SQL and Python skills',
        documents: [
            {
                id: 4,
                fileName: 'Job_Description_DA.pdf',
                dateUploaded: '2024-08-01',
                locationPath: '/documents/vacant_positions/3/Job_Description_DA.pdf',
                remarks: 'Data Analyst position requirements',
                type: 'Job Description'
            },
            {
                id: 5,
                fileName: '201_Files_Candidate_1.pdf',
                dateUploaded: '2024-08-05',
                locationPath: '/documents/vacant_positions/3/201_Files_Candidate_1.pdf',
                remarks: 'Employee 201 file for candidate review',
                type: '201 Files'
            }
        ]
    },
    {
        id: 4,
        client: 'Global Enterprises',
        position: 'Marketing Specialist',
        noOfVacancies: 1,
        requestedBy: 'Lisa Anderson',
        email: 'lisa.anderson@globalent.com',
        recruiter: 'James Wilson',
        jobstreetURL: 'https://www.jobstreet.com.au/en/job/marketing-specialist-4567890',
        gbssURL: 'https://globalent.com/careers/marketing-specialist',
        facebookDatePosted: '2024-05-10',
        tpChecked: '2024-05-11',
        hc: 85.00,
        dateCreated: '2024-05-10',
        dateRequired: '2024-06-10',
        status: 'Filled',
        url: 'https://globalent.com/careers/marketing-specialist',
        reason: 'New department launch',
        comments: 'Position has been filled successfully',
        documents: [
            {
                id: 6,
                fileName: 'Job_Description_MS.pdf',
                dateUploaded: '2024-05-10',
                locationPath: '/documents/vacant_positions/4/Job_Description_MS.pdf',
                remarks: 'Marketing Specialist role description',
                type: 'Job Description'
            },
            {
                id: 7,
                fileName: 'Contract_Signed_Marketing.pdf',
                dateUploaded: '2024-05-25',
                locationPath: '/documents/vacant_positions/4/Contract_Signed_Marketing.pdf',
                remarks: 'Signed employment contract',
                type: 'Contract'
            }
        ]
    },
    {
        id: 5,
        client: 'FinanceFlow Ltd',
        position: 'Senior Accountant',
        noOfVacancies: 1,
        requestedBy: 'Robert Taylor',
        email: 'robert.taylor@financeflow.com',
        recruiter: 'Patricia Brown',
        jobstreetURL: 'https://www.jobstreet.com.au/en/job/senior-accountant-5678901',
        gbssURL: 'https://financeflow.com/careers/senior-accountant',
        facebookDatePosted: '2024-09-01',
        tpChecked: '2024-09-02',
        hc: 110.00,
        dateCreated: '2024-09-01',
        dateRequired: '2024-10-01',
        status: 'On Hold',
        url: 'https://financeflow.com/careers/senior-accountant',
        reason: 'Budget constraints',
        comments: 'Position temporarily on hold pending budget approval',
        documents: [
            {
                id: 8,
                fileName: 'Job_Description_SA.pdf',
                dateUploaded: '2024-09-01',
                locationPath: '/documents/vacant_positions/5/Job_Description_SA.pdf',
                remarks: 'Senior Accountant detailed specifications',
                type: 'Job Description'
            }
        ]
    },
    {
        id: 6,
        client: 'Digital Innovations',
        position: 'UX/UI Designer',
        noOfVacancies: 2,
        requestedBy: 'Michelle White',
        email: 'michelle.white@diginnovations.com',
        recruiter: 'Chris Martinez',
        jobstreetURL: 'https://www.jobstreet.com.au/en/job/uxui-designer-6789012',
        gbssURL: 'https://diginnovations.com/careers/uxui-designer',
        facebookDatePosted: '2024-08-20',
        tpChecked: '2024-08-21',
        hc: 95.00,
        dateCreated: '2024-08-20',
        dateRequired: '2024-09-30',
        status: 'Current',
        url: 'https://diginnovations.com/careers/uxui-designer',
        reason: 'Product redesign initiative',
        comments: 'Looking for designers with portfolio experience',
        documents: [
            {
                id: 9,
                fileName: 'Job_Description_UX.pdf',
                dateUploaded: '2024-08-20',
                locationPath: '/documents/vacant_positions/6/Job_Description_UX.pdf',
                remarks: 'UX/UI Designer position overview',
                type: 'Job Description'
            },
            {
                id: 10,
                fileName: 'Portfolio_Requirements.pdf',
                dateUploaded: '2024-08-22',
                locationPath: '/documents/vacant_positions/6/Portfolio_Requirements.pdf',
                remarks: 'Portfolio requirements and submission guidelines',
                type: 'Other'
            }
        ]
    }
]

export const DOCUMENT_TYPE_OPTIONS = [
    { value: '201 Files', label: '201 Files' },
    { value: 'Job Description', label: 'Job Description' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Other', label: 'Other' }
]

export const VISITS_MEETINGS = [
    {
        id: 1,
        client: 'Azora Finance',
        arrivedDate: '2025-11-25',
        departDate: '2025-12-04',
        visitors: [
            { id: 1, name: 'Visitor One' }
        ],
        comments: 'Visiting for business meetings and site inspections.'
    },
    {
        id: 2,
        client: 'GBSS',
        arrivedDate: '2025-11-27',
        departDate: '2025-12-02',
        visitors: [
            { id: 1, name: 'Visitor Two' }
        ],
        comments: 'Visiting with family and associates.'
    },
    {
        id: 3,
        client: 'GBSS',
        arrivedDate: '2025-11-28',
        departDate: '2025-12-01',
        visitors: [
            { id: 1, name: 'Visitor Three' }
        ],
        comments: 'Travelling with wife and family'
    },
    {
        id: 4,
        client: 'Tech Solutions Inc',
        arrivedDate: '2025-12-01',
        departDate: '2025-12-10',
        visitors: [
            { id: 1, name: 'Visitor Four' },
            { id: 2, name: 'Visitor Five' }
        ],
        comments: 'Project kickoff meeting and site visit'
    },
    {
        id: 5,
        client: 'Global Enterprises',
        arrivedDate: '2025-12-05',
        departDate: '2025-12-08',
        visitors: [
            { id: 1, name: 'Visitor Six' },
            { id: 2, name: 'Visitor Seven' },
            { id: 3, name: 'Visitor Eight' }
        ],
        comments: 'Quarterly business review'
    }
]


export const MOCK_DOCUMENT_LIST = [
    {
        id: 1,
        group: 'General Documents',
        locationPath: '/documents/general/Test.pdf',
        date: '2024-12-01',
        remarks: 'yeah yeah yeah'
    },
    {
        id: 2,
        group: 'IT Documents',
        locationPath: '/documents/it/IT_Policy.pdf',
        date: '2024-11-15',
        remarks: 'IT department policy document'
    }
]

export const DOCUMENT_GROUP_OPTIONS = [
    'General Documents',
    'IT Documents'
]

export const MOCK_CONFERENCE_BOOKINGS = [
    {
        id: 1,
        bookingDate: getCurrentDate(-1),
        start: '08:00',
        end: '10:30',
        requestedBy: '001', // John Test
        location: 'Three/NEO > Training Room',
        createdBy: 'Employee002 Test',
        neededDevices: ['Connection', 'Projector'],
        emailTo: 'john.test@gbss.com.au'
    },
    {
        id: 2,
        bookingDate: getCurrentDate(-1),
        start: '10:00',
        end: '11:00',
        requestedBy: '002', // Employee002 Test
        location: 'Three/NEO > Board Room',
        createdBy: 'Employee004 Test',
        neededDevices: ['Laptop', 'Monitor'],
        emailTo: 'employee002@mock.com'
    },
    {
        id: 3,
        bookingDate: getCurrentDate(-1),
        start: '11:00',
        end: '11:30',
        requestedBy: '004', // Employee004 Test
        location: 'Three/NEO > Meeting Room',
        createdBy: 'John Test',
        neededDevices: ['Webcam', 'Speakers'],
        emailTo: 'employee004@mock.com'
    },
    {
        id: 4,
        bookingDate: getCurrentDate(),
        start: '13:00',
        end: '13:30',
        requestedBy: '006', // Employee006 Test
        location: 'Three/NEO > Meeting Room',
        createdBy: 'Employee002 Test',
        neededDevices: ['PC', 'Monitor'],
        emailTo: 'employee006@mock.com'
    },
    {
        id: 5,
        bookingDate: getCurrentDate(),
        start: '13:00',
        end: '14:00',
        requestedBy: '008', // Employee008 Test
        location: 'Three/NEO > Board Room',
        createdBy: 'John Test',
        neededDevices: ['Projector', 'Laptop'],
        emailTo: 'employee008@mock.com'
    },
    {
        id: 6,
        bookingDate: getCurrentDate(),
        start: '13:00',
        end: '14:00',
        requestedBy: '010', // Employee010 Test
        location: 'PhilPlans > Meeting Room',
        createdBy: 'Employee004 Test',
        neededDevices: ['Connection', 'Webcam'],
        emailTo: 'employee010@mock.com'
    },
    {
        id: 7,
        bookingDate: getCurrentDate(),
        start: '13:00',
        end: '14:00',
        requestedBy: '012', // Employee012 Test
        location: 'Three/NEO > Training Room',
        createdBy: 'Employee002 Test',
        neededDevices: ['Projector', 'Speakers'],
        emailTo: 'employee012@mock.com'
    },
    // Additional bookings for other dates
    {
        id: 8,
        bookingDate: getCurrentDate(1),
        start: '09:00',
        end: '10:00',
        requestedBy: '001', // John Test
        location: 'Three/NEO > Board Room',
        createdBy: 'Employee002 Test',
        neededDevices: ['Projector', 'Laptop'],
        emailTo: 'john.test@gbss.com.au'
    },
    {
        id: 9,
        bookingDate: getCurrentDate(1),
        start: '14:00',
        end: '15:30',
        requestedBy: '004', // Employee004 Test
        location: 'PhilPlans > Meeting Room',
        createdBy: 'John Test',
        neededDevices: ['Webcam', 'Speakers'],
        emailTo: 'employee004@mock.com'
    },
    {
        id: 10,
        bookingDate: getCurrentDate(1),
        start: '10:00',
        end: '11:30',
        requestedBy: '006', // Employee006 Test
        location: 'Three/NEO > Meeting Room',
        createdBy: 'Employee004 Test',
        neededDevices: ['Monitor', 'PC'],
        emailTo: 'employee006@mock.com'
    },
    {
        id: 11,
        bookingDate: getCurrentDate(-1),
        start: '08:00',
        end: '09:00',
        requestedBy: '008', // Employee008 Test
        location: 'Three/NEO > Training Room',
        createdBy: 'John Test',
        neededDevices: ['Projector', 'Connection'],
        emailTo: 'employee008@mock.com'
    },
    {
        id: 12,
        bookingDate: getCurrentDate(),
        start: '13:00',
        end: '14:00',
        requestedBy: '010', // Employee010 Test
        location: 'Three/NEO > Board Room',
        createdBy: 'Employee002 Test',
        neededDevices: ['Laptop', 'Monitor'],
        emailTo: 'employee010@mock.com'
    },
    {
        id: 13,
        bookingDate: getCurrentDate(1),
        start: '11:00',
        end: '12:00',
        requestedBy: '001', // John Test
        location: 'PhilPlans > Meeting Room',
        createdBy: 'Employee004 Test',
        neededDevices: ['Webcam', 'Connection'],
        emailTo: 'john.test@gbss.com.au'
    },
    {
        id: 14,
        bookingDate: getCurrentDate(-1),
        start: '09:00',
        end: '10:30',
        requestedBy: '002', // Employee002 Test
        location: 'Three/NEO > Training Room',
        createdBy: 'John Test',
        neededDevices: ['Projector', 'Speakers'],
        emailTo: 'employee002@mock.com'
    },
    {
        id: 15,
        bookingDate: getCurrentDate(),
        start: '14:00',
        end: '15:00',
        requestedBy: '012', // Employee012 Test
        location: 'Three/NEO > Meeting Room',
        createdBy: 'Employee002 Test',
        neededDevices: ['Monitor', 'Mouse'],
        emailTo: 'employee012@mock.com'
    },
]

export const CONFERENCE_LOCATION_OPTIONS = [
    { value: 'Three/NEO > Training Room', label: 'Three/NEO > Training Room' },
    { value: 'Three/NEO > Board Room', label: 'Three/NEO > Board Room' },
    { value: 'Three/NEO > Meeting Room', label: 'Three/NEO > Meeting Room' },
    { value: 'PhilPlans > Meeting Room', label: 'PhilPlans > Meeting Room' },
]

export const CONFERENCE_DEVICE_OPTIONS = [
    { value: 'Connection', label: 'Connection' },
    { value: 'IP Phone', label: 'IP Phone' },
    { value: 'Laptop', label: 'Laptop' },
    { value: 'Large Monitor', label: 'Large Monitor' },
    { value: 'Monitor', label: 'Monitor' },
    { value: 'Mouse', label: 'Mouse' },
    { value: 'PC', label: 'PC' },
    { value: 'Projector', label: 'Projector' },
    { value: 'Speakers', label: 'Speakers' },
    { value: 'Webcam', label: 'Webcam' },
]

export const MOCK_CLIENT_BULLETINS = [
    {
        id: 1,
        dateCreated: '2025-12-01',
        dateSent: '2025-12-02',
        status: 'Sent',
        createdBy: '001', // John Test
        sentBy: '002', // Employee002 Test
        subject: 'December 2025 Monthly Update',
        recipient: { type: 'all-work', selectedAccounts: [] },
        attachment: 'December_Update.pdf',
        message: '<p>Dear Team,</p><p><br></p><p>We are excited to share our <strong>December 2025 Monthly Update</strong>. This month has been filled with achievements and milestones:</p><ul><li>Completed 15 major projects</li><li>Onboarded 25 new clients</li><li>Achieved 98% customer satisfaction rate</li></ul><p><br></p><p>Thank you for your continued dedication and hard work!</p><p><br></p><p>Best regards,<br>Management Team</p>'
    },
    {
        id: 2,
        dateCreated: '2025-11-25',
        dateSent: '2025-11-26',
        status: 'Sent',
        createdBy: '002', // Employee002 Test
        sentBy: '004', // Employee004 Test
        subject: 'Service Maintenance Notice',
        recipient: { type: 'all-bpo', selectedAccounts: [] },
        attachment: 'Maintenance_Notice.pdf',
        message: '<p>Dear Valued Clients,</p><p><br></p><p>Please be informed that we will be conducting <strong>scheduled maintenance</strong> on our systems:</p><p><br></p><p><strong>Date:</strong> December 15, 2025<br><strong>Time:</strong> 2:00 AM - 6:00 AM EST<br><strong>Expected Downtime:</strong> 4 hours</p><p><br></p><p>During this period, services may be temporarily unavailable. We apologize for any inconvenience.</p><p><br></p><p>Thank you for your understanding.</p>'
    },
    {
        id: 3,
        dateCreated: '2025-11-20',
        dateSent: null,
        status: 'Draft',
        createdBy: '001', // John Test
        sentBy: null,
        subject: 'Year-End Holiday Announcement',
        recipient: { type: 'all-work-personal', selectedAccounts: [] },
        attachment: 'Holiday_Announcement.docx',
        message: '<p>Hello Everyone,</p><p><br></p><p>As we approach the end of the year, we would like to announce our <strong>holiday schedule</strong>:</p><p><br></p><ul><li>December 24-26: Christmas Break</li><li>December 31 - January 1: New Year Holiday</li><li>Regular operations resume: January 2, 2026</li></ul><p><br></p><p>We wish you all a wonderful holiday season! 🎄</p>'
    },
    {
        id: 4,
        dateCreated: '2025-11-15',
        dateSent: '2025-11-16',
        status: 'Sent',
        createdBy: '006', // Employee006 Test
        sentBy: '001', // John Test
        subject: 'Q4 Performance Report',
        recipient: { type: 'all-bss', selectedAccounts: [] },
        attachment: 'Q4_Report.xlsx',
        message: '<p>Dear Stakeholders,</p><p><br></p><p>We are pleased to present our <strong>Q4 2025 Performance Report</strong>. Key highlights include:</p><p><br></p><ol><li>Revenue increased by 25% compared to Q3</li><li>Customer base grew by 18%</li><li>Successfully launched 3 new product lines</li><li>Employee satisfaction score: 4.7/5.0</li></ol><p><br></p><p>Please see the attached detailed report for more information.</p><p><br></p><p>Regards,<br>Finance Team</p>'
    },
    {
        id: 5,
        dateCreated: '2025-11-10',
        dateSent: '2025-11-11',
        status: 'Sent',
        createdBy: '004', // Employee004 Test
        sentBy: '002', // Employee002 Test
        subject: 'New Feature Release',
        recipient: { type: 'all-personal', selectedAccounts: [] },
        attachment: 'Features_v2.5.pdf',
        message: '<p>Hello Team,</p><p><br></p><p>We are thrilled to announce the release of <strong>Version 2.5</strong> featuring:</p><ul><li>Enhanced dashboard analytics</li><li>Improved mobile responsiveness</li><li>New collaboration tools</li><li>Performance optimizations</li></ul><p><br></p><p>Please review the attached document for detailed information.</p>'
    }
]

export const MOCK_STAFF_BULLETINS = [
    {
        id: 1,
        dateCreated: '2025-12-08',
        dateSent: '2025-12-08',
        status: 'Sent',
        createdBy: '001',
        sentBy: '001',
        subject: 'Team Building Event - December 2025',
        recipient: { type: 'all-work', selectedAccounts: [], includePersonalEmails: false },
        attachment: 'Team_Building_Details.pdf',
        message: '<p>Dear Team,</p><p><br></p><p>We are excited to announce our upcoming <strong>Team Building Event</strong>!</p><p><br></p><p><strong>Date:</strong> December 20, 2025<br><strong>Time:</strong> 9:00 AM - 5:00 PM<br><strong>Location:</strong> Mountain Resort</p><p><br></p><p>Please RSVP by December 15. Looking forward to seeing everyone there!</p><p><br></p><p>Best regards,<br>HR Department</p>'
    },
    {
        id: 2,
        dateCreated: '2025-12-05',
        dateSent: '2025-12-06',
        status: 'Sent',
        createdBy: '002',
        sentBy: '001',
        subject: 'New Company Policy Updates',
        recipient: { type: 'all-work-personal', selectedAccounts: [], includePersonalEmails: false },
        attachment: 'Policy_Updates_2025.pdf',
        message: '<p>Hello Everyone,</p><p><br></p><p>Please be informed of the following <strong>policy updates</strong> effective January 1, 2026:</p><ul><li>Updated remote work policy</li><li>Revised leave application procedures</li><li>New health and safety guidelines</li><li>Enhanced benefits package</li></ul><p><br></p><p>Please review the attached document carefully. If you have any questions, contact HR.</p>'
    },
    {
        id: 3,
        dateCreated: '2025-12-03',
        dateSent: null,
        status: 'Draft',
        createdBy: '004',
        sentBy: null,
        subject: 'Q4 Performance Reviews',
        recipient: { type: 'custom-teams', selectedAccounts: ['001', '002'], includePersonalEmails: true },
        attachment: 'Q4_Review_Schedule.xlsx',
        message: '<p>Dear Team Leaders,</p><p><br></p><p>This is a reminder about the upcoming <strong>Q4 Performance Reviews</strong>:</p><p><br></p><p><strong>Review Period:</strong> December 10-20, 2025<br><strong>Submission Deadline:</strong> December 22, 2025</p><p><br></p><p>Please ensure all reviews are completed on time. The attached schedule contains assigned review slots.</p>'
    },
    {
        id: 4,
        dateCreated: '2025-11-28',
        dateSent: '2025-11-29',
        status: 'Sent',
        createdBy: '001',
        sentBy: '002',
        subject: 'IT System Upgrade Notification',
        recipient: { type: 'all-bpo', selectedAccounts: [], includePersonalEmails: false },
        attachment: 'System_Upgrade_Guide.pdf',
        message: '<p>Dear Staff,</p><p><br></p><p>Our IT department will be performing a <strong>major system upgrade</strong>:</p><p><br></p><p><strong>Date:</strong> December 12, 2025<br><strong>Time:</strong> 10:00 PM - 2:00 AM<br><strong>Affected Systems:</strong> Email, CRM, Intranet</p><p><br></p><p>Please save all work and log out by 9:30 PM. Systems will be fully operational by 6:00 AM on December 13.</p><p><br></p><p>Thank you for your cooperation.</p>'
    },
    {
        id: 5,
        dateCreated: '2025-11-25',
        dateSent: '2025-11-26',
        status: 'Sent',
        createdBy: '006',
        sentBy: '004',
        subject: 'Training Session: New Software Tools',
        recipient: { type: 'all-former-gbss-personal', selectedAccounts: [], includePersonalEmails: false },
        attachment: 'Training_Materials.zip',
        message: '<p>Hello Team,</p><p><br></p><p>We are organizing a <strong>training session</strong> for our new software tools:</p><p><br></p><ul><li>Session 1: December 14 at 2:00 PM (IT Department)</li><li>Session 2: December 15 at 10:00 AM (Operations)</li><li>Session 3: December 16 at 3:00 PM (Customer Service)</li></ul><p><br></p><p>Attendance is mandatory. Training materials are attached.</p><p><br></p><p>See you there!</p>'
    }
]

export const BULLETIN_STATUS_OPTIONS = [
    { value: 'Draft', label: 'Draft' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Sent', label: 'Sent' },
]

export const BULLETIN_RECIPIENT_OPTIONS = [
    { value: 'All Clients', label: 'All Clients' },
    { value: 'Premium Clients', label: 'Premium Clients' },
    { value: 'Corporate Clients', label: 'Corporate Clients' },
    { value: 'VIP Clients', label: 'VIP Clients' },
    { value: 'Account Managers', label: 'Account Managers' },
    { value: 'Regular Clients', label: 'Regular Clients' },
]

export const QUICK_REFERENCE_INFO = [
    { id: 1, name: 'Office Location', phoneNum: '', description: '123 Main Street, Building A, Floor 5', location: 'Head Office' },
    { id: 2, name: 'HR Contact - John Test', phoneNum: '+1-555-5000', description: 'hr@company.com | Benefits & Payroll', location: 'HR Department' },
    { id: 3, name: 'IT Support - Sarah Test', phoneNum: '+1-555-5100', description: 'support@company.com | Technical Issues', location: 'IT Department' },
    { id: 4, name: 'Emergency Hotline', phoneNum: '+1-800-EMERGENCY', description: 'Available 24/7 for emergencies', location: 'Global' },
    { id: 5, name: 'Main Reception', phoneNum: '+1-555-0123', description: 'General inquiries and directions', location: 'Head Office' },
    { id: 6, name: 'Finance - Michael Test', phoneNum: '+1-555-5200', description: 'finance@company.com | Invoice & Billing', location: 'Finance Department' },
    { id: 7, name: 'Operations - Jessica Test', phoneNum: '+1-555-5300', description: 'operations@company.com | Daily Operations', location: 'Operations' },
    { id: 8, name: 'Sales Manager - David Test', phoneNum: '+1-555-5400', description: 'david.test@company.com | Sales Support', location: 'Sales Department' },
    { id: 9, name: 'Marketing - Emily Test', phoneNum: '+1-555-5500', description: 'marketing@company.com | Campaigns & PR', location: 'Marketing Department' },
    { id: 10, name: 'Quality Assurance - Robert Test', phoneNum: '+1-555-5600', description: 'qa@company.com | Quality Standards', location: 'QA Department' },
    { id: 11, name: 'Building Security', phoneNum: '+1-555-5700', description: 'security@company.com | Access & Safety', location: 'Head Office' },
    { id: 12, name: 'Facilities - Patricia Test', phoneNum: '+1-555-5800', description: 'facilities@company.com | Maintenance & Repairs', location: 'Facilities' },
    { id: 13, name: 'Training & Development - Christopher Test', phoneNum: '+1-555-5900', description: 'training@company.com | Employee Development', location: 'HR Department' },
    { id: 14, name: 'Legal - Margaret Test', phoneNum: '+1-555-6000', description: 'legal@company.com | Legal Matters', location: 'Legal Department' },
    { id: 15, name: 'Procurement - James Test', phoneNum: '+1-555-6100', description: 'procurement@company.com | Vendor & Supplies', location: 'Procurement' },
    { id: 16, name: 'Internal Communications - Lisa Test', phoneNum: '+1-555-6200', description: 'comms@company.com | Announcements & Updates', location: 'Communications' },
    { id: 17, name: 'Cafeteria & Catering', phoneNum: '+1-555-6300', description: 'cafeteria@company.com | Food Services', location: 'Head Office' },
]

export const QUICK_REFERENCE_CONTACTS = [
    {
        id: 1,
        firstname: 'Alice',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'alice.test@gbss.com.au',
        directLine: '+1-555-1001',
        mobile: '+1-555-0001',
        account: { id: 7, name: 'GBSS' }
    },
    {
        id: 2,
        firstname: 'Brandon',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'brandon.test@gbss.com.au',
        directLine: '+1-555-1002',
        mobile: '+1-555-0002',
        account: { id: 7, name: 'GBSS' }
    },
    {
        id: 3,
        firstname: 'Catherine',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'catherine.test@gbss.com.au',
        directLine: '+1-555-1003',
        mobile: '+1-555-0003',
        account: { id: 7, name: 'GBSS' }
    },
    {
        id: 4,
        firstname: 'Daniel',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'daniel.test@gbss.com.au',
        directLine: '+1-555-1004',
        mobile: '+1-555-0004',
        account: { id: 7, name: 'GBSS' }
    },
    {
        id: 5,
        firstname: 'Elizabeth',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'elizabeth.test@gbss.com.au',
        directLine: '+1-555-1005',
        mobile: '+1-555-0005',
        account: { id: 7, name: 'GBSS' }
    },
    {
        id: 6,
        firstname: 'Frank',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'frank.test@gbss.com.au',
        directLine: '+1-555-1006',
        mobile: '+1-555-0006',
        account: { id: 7, name: 'GBSS' }
    },
    {
        id: 7,
        firstname: 'Grace',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'grace.test@gbss.com.au',
        directLine: '+1-555-1007',
        mobile: '+1-555-0007',
        account: { id: 7, name: 'GBSS' }
    },
    {
        id: 8,
        firstname: 'Henry',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'henry.test@gbss.com.au',
        directLine: '+1-555-1008',
        mobile: '+1-555-0008',
        account: { id: 7, name: 'GBSS' }
    },
    {
        id: 9,
        firstname: 'Isabella',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'isabella.test@gbss.com.au',
        directLine: '+1-555-1009',
        mobile: '+1-555-0009',
        account: { id: 7, name: 'GBSS' }
    },
    {
        id: 10,
        firstname: 'Jonathan',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'jonathan.test@gbss.com.au',
        directLine: '+1-555-1010',
        mobile: '+1-555-0010',
        account: { id: 7, name: 'GBSS' }
    },
    {
        id: 11,
        firstname: 'Karen',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'karen.test@gbss.com.au',
        directLine: '+1-555-1011',
        mobile: '+1-555-0011',
        account: { id: 7, name: 'GBSS' }
    },
    {
        id: 12,
        firstname: 'Leonard',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'leonard.test@gbss.com.au',
        directLine: '+1-555-1012',
        mobile: '+1-555-0012',
        account: { id: 7, name: 'GBSS' }
    },
    {
        id: 13,
        firstname: 'Michelle',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'michelle.test@gbss.com.au',
        directLine: '+1-555-1013',
        mobile: '+1-555-0013',
        account: { id: 7, name: 'GBSS' }
    },
    {
        id: 14,
        firstname: 'Nathan',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'nathan.test@gbss.com.au',
        directLine: '+1-555-1014',
        mobile: '+1-555-0014',
        account: { id: 7, name: 'GBSS' }
    },
    {
        id: 15,
        firstname: 'Olivia',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'olivia.test@gbss.com.au',
        directLine: '+1-555-1015',
        mobile: '+1-555-0015',
        account: { id: 7, name: 'GBSS' }
    },
    {
        id: 16,
        firstname: 'Paul',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'paul.test@gbss.com.au',
        directLine: '+1-555-1016',
        mobile: '+1-555-0016',
        account: { id: 7, name: 'GBSS' }
    },
    {
        id: 17,
        firstname: 'Quinn',
        lastname: 'Test',
        company: { id: 7, name: 'GBSS' },
        position: { id: 260, name: 'Manager, Manila Office' },
        email: 'quinn.test@gbss.com.au',
        directLine: '+1-555-1017',
        mobile: '+1-555-0017',
        account: { id: 7, name: 'GBSS' }
    }
]

export const PERMISSIONS = [
    { id: 1, Label: "View Tasks Table List", ButtonId: "Tasks", Group: null, Description: "Access to the Tasks list page" },
    { id: 2, Label: "View Task Details", ButtonId: "Tasks-View-Details", Group: "Tasks", Description: "Access to view the full details of a Task record" },
    { id: 3, Label: "Create Task", ButtonId: "Tasks-New", Group: "Tasks", Description: "Access to create new Task records" },
    { id: 4, Label: "Delete Task", ButtonId: "Tasks-Delete", Group: "Tasks", Description: "Access to delete existing Task records" },
    { id: 5, Label: "Save Task", ButtonId: "Tasks-Save", Group: "Tasks", Description: "Access to save changes to a Task record" },
    { id: 6, Label: "View Task Document", ButtonId: "Tasks-View-Document", Group: "Tasks", Description: "Access to view documents attached to a Task" },
    { id: 7, Label: "Delete Task Document", ButtonId: "Tasks-Delete-Document", Group: "Tasks", Description: "Access to delete documents attached to a Task" },
    { id: 8, Label: "View Employees Table List", ButtonId: "Employees", Group: null, Description: "Access to the Employees list page" },
    { id: 9, Label: "View Employee Details", ButtonId: "Employee-Details-Tab", Group: "Employees", Description: "Access to view an employee's personal and employment details" },
    { id: 10, Label: "View Employee Address", ButtonId: "Employee-Address-Tab", Group: "Employees", Description: "Access to view an employee's address records" },
    { id: 11, Label: "View Employee Work Schedule", ButtonId: "Employee-Work-Schedule-Tab", Group: "Employees", Description: "Access to view an employee's assigned work schedules" },
    { id: 12, Label: "View Employee Attendance", ButtonId: "Employee-Attendance-Tab", Group: "Employees", Description: "Access to view an employee's attendance records" },
    { id: 13, Label: "View Employee Leave Credits", ButtonId: "Employee-Leave-Credits-Tab", Group: "Employees", Description: "Access to view an employee's available and used leave credits" },
    { id: 14, Label: "View Employee Leaves", ButtonId: "Employee-Leaves-Tab", Group: "Employees", Description: "Access to view an employee's filed leave records" },
    { id: 15, Label: "View Employee Salary", ButtonId: "Employee-Salary-Tab", Group: "Employees", Description: "Access to view an employee's salary information" },
    { id: 16, Label: "View Employee 13th Month", ButtonId: "Employee-13th-Month-Tab", Group: "Employees", Description: "Access to view an employee's 13th month pay records" },
    { id: 17, Label: "View Employee Loans", ButtonId: "Employee-Loans-Tab", Group: "Employees", Description: "Access to view an employee's loan records" },
    { id: 18, Label: "View Employee Documents", ButtonId: "Employee-Documents-Tab", Group: "Employees", Description: "Access to view documents attached to an employee record" },
    { id: 19, Label: "View Employee HR Info", ButtonId: "Employee-HR-Tab", Group: "Employees", Description: "Access to view an employee's HR-related information" },
    { id: 20, Label: "View Employee IT Info", ButtonId: "Employee-IT-Tab", Group: "Employees", Description: "Access to view an employee's IT-related information and equipment" },
    { id: 21, Label: "View Employee Referrals", ButtonId: "Employee-Referrals-Tab", Group: "Employees", Description: "Access to view an employee's referral records" },
    { id: 22, Label: "View Employee HMO", ButtonId: "Employee-HMO-Tab", Group: "Employees", Description: "Access to view an employee's HMO enrollment details" },
    { id: 23, Label: "View Employee Overtime", ButtonId: "Employee-Overtime-Tab", Group: "Employees", Description: "Access to view an employee's overtime records" },
    { id: 24, Label: "View Employee Departure", ButtonId: "Employee-Departure-Tab", Group: "Employees", Description: "Access to view an employee's offboarding and separation details" },
    { id: 25, Label: "View Employee Probation Summary", ButtonId: "Employee-Probation-Summary-Tab", Group: "Employees", Description: "Access to view an employee's probationary period evaluations" },
    { id: 26, Label: "View Employee Clinic Records", ButtonId: "Employee-Clinic-Tab", Group: "Employees", Description: "Access to view an employee's clinic visit and medical records" },
    { id: 27, Label: "Undo Employee Hire", ButtonId: "Employee-Details-Undo-Hire", Group: "Employee-Details-Tab", Description: "Access to reverse a hiring action on the Employee Details tab" },
    { id: 28, Label: "Save Employee Details", ButtonId: "Employee-Details-Save", Group: "Employee-Details-Tab", Description: "Access to save changes to the Employee Details tab" },
    { id: 29, Label: "Add Employee Address", ButtonId: "Employee-Address-New", Group: "Employee-Address-Tab", Description: "Access to add new address records for an employee" },
    { id: 30, Label: "Save Employee Address", ButtonId: "Employee-Address-Save", Group: "Employee-Address-Tab", Description: "Access to save changes to an employee address record" },
    { id: 31, Label: "Delete Employee Address", ButtonId: "Employee-Address-Delete", Group: "Employee-Address-Tab", Description: "Access to delete existing employee address records" },
    { id: 32, Label: "Add Employee Work Schedule", ButtonId: "Employee-Work-Schedule-New", Group: "Employee-Work-Schedule-Tab", Description: "Access to assign new work schedules to an employee" },
    { id: 33, Label: "Save Employee Work Schedule", ButtonId: "Employee-Work-Schedule-Save", Group: "Employee-Work-Schedule-Tab", Description: "Access to save changes to an employee work schedule record" },
    { id: 34, Label: "Delete Employee Work Schedule", ButtonId: "Employee-Work-Schedule-Delete", Group: "Employee-Work-Schedule-Tab", Description: "Access to delete existing employee work schedule records" },
    { id: 35, Label: "Export Attendance to Excel", ButtonId: "Employee-Attendance-Excel", Group: "Employee-Attendance-Tab", Description: "Access to export an employee's attendance data to Excel" },
    { id: 36, Label: "Add Leave Credit", ButtonId: "Employee-Leave-Credits-New", Group: "Employee-Leave-Credits-Tab", Description: "Access to add new leave credit records for an employee" },
    { id: 37, Label: "Save Leave Credit", ButtonId: "Employee-Leave-Credits-Save", Group: "Employee-Leave-Credits-Tab", Description: "Access to save changes to an employee leave credit record" },
    { id: 38, Label: "File Employee Leave", ButtonId: "Employee-Leaves-New", Group: "Employee-Leaves-Tab", Description: "Access to file new leave records for an employee" },
    { id: 39, Label: "Save Employee Leave", ButtonId: "Employee-Leaves-Save", Group: "Employee-Leaves-Tab", Description: "Access to save changes to an employee leave record" },
    { id: 40, Label: "Delete Employee Leave", ButtonId: "Employee-Leaves-Delete", Group: "Employee-Leaves-Tab", Description: "Access to delete existing employee leave records" },
    { id: 41, Label: "Add Salary Record", ButtonId: "Employee-Salary-New", Group: "Employee-Salary-Tab", Description: "Access to add new salary records for an employee" },
    { id: 42, Label: "Save Salary Record", ButtonId: "Employee-Salary-Save", Group: "Employee-Salary-Tab", Description: "Access to save changes to an employee salary record" },
    { id: 43, Label: "Add 13th Month Record", ButtonId: "Employee-13th-Month-New", Group: "Employee-13th-Month-Tab", Description: "Access to add new 13th month account debit records for an employee" },
    { id: 44, Label: "Save 13th Month Record", ButtonId: "Employee-13th-Month-Save", Group: "Employee-13th-Month-Tab", Description: "Access to save changes to an employee's 13th month account record" },
    { id: 45, Label: "Delete 13th Month Record", ButtonId: "Employee-13th-Month-Delete", Group: "Employee-13th-Month-Tab", Description: "Access to delete existing employee 13th month account records" },
    { id: 46, Label: "Add Employee Loan", ButtonId: "Employee-Loans-New", Group: "Employee-Loans-Tab", Description: "Access to add new loan records for an employee" },
    { id: 47, Label: "Save Employee Loan", ButtonId: "Employee-Loans-Save", Group: "Employee-Loans-Tab", Description: "Access to save changes to an employee loan record" },
    { id: 48, Label: "Delete Employee Loan", ButtonId: "Employee-Loans-Delete", Group: "Employee-Loans-Tab", Description: "Access to delete existing employee loan records" },
    { id: 49, Label: "Attach Employee Document", ButtonId: "Employee-Documents-New", Group: "Employee-Documents-Tab", Description: "Access to attach new documents to an employee record" },
    { id: 50, Label: "Save Employee Document", ButtonId: "Employee-Documents-Save", Group: "Employee-Documents-Tab", Description: "Access to save changes to an employee document record" },
    { id: 51, Label: "Delete Employee Document", ButtonId: "Employee-Documents-Delete", Group: "Employee-Documents-Tab", Description: "Access to delete existing employee document records" },
    { id: 52, Label: "View Employee Document", ButtonId: "Employee-Documents-View", Group: "Employee-Documents-Tab", Description: "Access to view documents attached to an employee record" },
    { id: 53, Label: "Save Employee HR Info", ButtonId: "Employee-HR-Save", Group: "Employee-HR-Tab", Description: "Access to save changes to the Employee HR tab" },
    { id: 54, Label: "Save Employee IT Info", ButtonId: "Employee-IT-Save", Group: "Employee-IT-Tab", Description: "Access to save changes to the Employee IT tab" },
    { id: 55, Label: "Add Employee Referral", ButtonId: "Employee-Referrals-New", Group: "Employee-Referrals-Tab", Description: "Access to add new referral records for an employee" },
    { id: 56, Label: "Save Employee Referral", ButtonId: "Employee-Referrals-Save", Group: "Employee-Referrals-Tab", Description: "Access to save changes to an employee referral record" },
    { id: 57, Label: "Delete Employee Referral", ButtonId: "Employee-Referrals-Delete", Group: "Employee-Referrals-Tab", Description: "Access to delete existing employee referral records" },
    { id: 58, Label: "Save Employee HMO", ButtonId: "Employee-HMO-Save", Group: "Employee-HMO-Tab", Description: "Access to save changes to the Employee HMO tab" },
    { id: 59, Label: "Add Overtime Record", ButtonId: "Employee-Overtime-New", Group: "Employee-Overtime-Tab", Description: "Access to add new overtime records for an employee" },
    { id: 60, Label: "Save Overtime Record", ButtonId: "Employee-Overtime-Save", Group: "Employee-Overtime-Tab", Description: "Access to save changes to an employee overtime record" },
    { id: 61, Label: "Delete Overtime Record", ButtonId: "Employee-Overtime-Delete", Group: "Employee-Overtime-Tab", Description: "Access to delete existing employee overtime records" },
    { id: 62, Label: "Save Employee Departure", ButtonId: "Employee-Departure-Save", Group: "Employee-Departure-Tab", Description: "Access to save changes to the Employee Departure tab" },
    { id: 63, Label: "Save Probation Summary", ButtonId: "Employee-Probation-Summary-Save", Group: "Employee-Probation-Summary-Tab", Description: "Access to save changes to the Employee Probation Summary tab" },
    { id: 64, Label: "Add Clinic Visit", ButtonId: "Employee-Clinic-New", Group: "Employee-Clinic-Tab", Description: "Access to add new clinic visit records for an employee" },
    { id: 65, Label: "Save Clinic Record", ButtonId: "Employee-Clinic-Save", Group: "Employee-Clinic-Tab", Description: "Access to save changes to an employee clinic record" },
    { id: 66, Label: "Delete Clinic Record", ButtonId: "Employee-Clinic-Delete", Group: "Employee-Clinic-Tab", Description: "Access to delete existing employee clinic records" },
    { id: 67, Label: "View Applicants Table List", ButtonId: "Applicants", Group: null, Description: "Access to the Applicants list page" },
    { id: 68, Label: "View Applicant Details", ButtonId: "Applicant-View-Details", Group: "Applicants", Description: "Access to view the full details of an applicant record" },
    { id: 69, Label: "Create Applicant", ButtonId: "Applicants-New", Group: "Applicants", Description: "Access to create new applicant records" },
    { id: 70, Label: "Save Applicant", ButtonId: "Applicants-Save", Group: "Applicants", Description: "Access to save changes to an applicant record" },
    { id: 71, Label: "Convert Applicant to Employee", ButtonId: "Applicants-Employ-Applicant", Group: "Applicants", Description: "Access to convert an applicant into an active employee record" },
    { id: 72, Label: "View Applicant Document", ButtonId: "Applicants-View-Document", Group: "Applicants", Description: "Access to view documents attached to an applicant record" },
    { id: 73, Label: "Delete Applicant Document", ButtonId: "Applicants-Delete-Document", Group: "Applicants", Description: "Access to delete documents attached to an applicant record" },
    { id: 74, Label: "Add Applicant Comment", ButtonId: "Applicants-New-Comment", Group: "Applicants", Description: "Access to add new comments to an applicant record" },
    { id: 75, Label: "Save Applicant Comment", ButtonId: "Applicants-Save-Comment", Group: "Applicants", Description: "Access to save comments added to an applicant record" },
    { id: 76, Label: "Delete Applicant Comment", ButtonId: "Applicants-Delete-Comment", Group: "Applicants", Description: "Access to delete existing comments from an applicant record" },
    { id: 77, Label: "View Applicant Schedules Table List", ButtonId: "Applicant-Scheds", Group: null, Description: "Access to the Applicant Schedules list page" },
    { id: 78, Label: "Add Schedule Comment", ButtonId: "Applicant-Scheds-New-Comment", Group: "Applicant-Scheds", Description: "Access to add new comments to an applicant schedule record" },
    { id: 79, Label: "Save Schedule Comment", ButtonId: "Applicant-Scheds-Save-Comment", Group: "Applicant-Scheds", Description: "Access to save comments added to an applicant schedule record" },
    { id: 80, Label: "Delete Schedule Comment", ButtonId: "Applicant-Scheds-Delete-Comment", Group: "Applicant-Scheds", Description: "Access to delete existing comments from an applicant schedule record" },
    { id: 81, Label: "View Attendance Table List", ButtonId: "Attendance", Group: null, Description: "Access to the Attendance list page" },
    { id: 82, Label: "Create Attendance Record", ButtonId: "Attendance-New", Group: "Attendance", Description: "Access to create new attendance records" },
    { id: 83, Label: "Delete Attendance Record", ButtonId: "Attendance-Delete", Group: "Attendance", Description: "Access to delete existing attendance records" },
    { id: 84, Label: "Save Attendance Record", ButtonId: "Attendance-Save", Group: "Attendance", Description: "Access to save changes to an attendance record" },
    { id: 85, Label: "View Amendment Requests", ButtonId: "Amendment-Requests", Group: "Attendance", Description: "Access to the Amendment Requests section under Attendance" },
    { id: 86, Label: "Approve/Disapprove Amendment Request", ButtonId: "Amendment-Requests-Save", Group: "Attendance", Description: "Access to approve or disapprove pending amendment requests" },
    { id: 87, Label: "View Clients Table List", ButtonId: "Clients", Group: null, Description: "Access to the Clients list page" },
    { id: 88, Label: "View Client Details", ButtonId: "Client-View-Details", Group: "Clients", Description: "Access to view the full details of a client record" },
    { id: 89, Label: "Create Client", ButtonId: "Clients-New", Group: "Clients", Description: "Access to create new client records" },
    { id: 90, Label: "Save Client", ButtonId: "Clients-Save", Group: "Clients", Description: "Access to save changes to a client record" },
    { id: 91, Label: "Save Client Email Recipient", ButtonId: "Clients-Email-Recipients-Save", Group: "Clients", Description: "Access to save changes to a client email recipient record" },
    { id: 92, Label: "Delete Client Email Recipient", ButtonId: "Clients-Email-Recipients-Delete", Group: "Clients", Description: "Access to delete existing email recipients from a client record" },
    { id: 93, Label: "Log Client Interaction", ButtonId: "Clients-Interaction-New", Group: "Clients", Description: "Access to log new interactions or activities for a client" },
    { id: 94, Label: "View Email Subscriptions Table List", ButtonId: "Email-Subscriptions", Group: null, Description: "Access to the Email Subscriptions list page" },
    { id: 95, Label: "Create Email Subscription", ButtonId: "Email-Subscriptions-New", Group: "Email-Subscriptions", Description: "Access to create new email subscription records" },
    { id: 96, Label: "Delete Email Subscription", ButtonId: "Email-Subscriptions-Delete", Group: "Email-Subscriptions", Description: "Access to delete existing email subscription records" },
    { id: 97, Label: "Save Email Subscription", ButtonId: "Email-Subscriptions-Save", Group: "Email-Subscriptions", Description: "Access to save changes to an email subscription record" },
    { id: 98, Label: "View Holidays Table List", ButtonId: "Holidays", Group: null, Description: "Access to the Holidays list page" },
    { id: 99, Label: "Create Holiday", ButtonId: "Holidays-New", Group: "Holidays", Description: "Access to create new holiday records" },
    { id: 100, Label: "Save Holiday", ButtonId: "Holidays-Save", Group: "Holidays", Description: "Access to save changes to a holiday record" },
    { id: 101, Label: "View Late Notifications Table List", ButtonId: "Late-Notifications", Group: null, Description: "Access to the Late Notifications list page" },
    { id: 102, Label: "Create Late Notification", ButtonId: "Late-Notifications-New", Group: "Late-Notifications", Description: "Access to create new late notification records" },
    { id: 103, Label: "Delete Late Notification", ButtonId: "Late-Notifications-Delete", Group: "Late-Notifications", Description: "Access to delete existing late notification records" },
    { id: 104, Label: "Save Late Notification", ButtonId: "Late-Notifications-Save", Group: "Late-Notifications", Description: "Access to save changes to a late notification record" },
    { id: 105, Label: "View Vacant Positions Table List", ButtonId: "Vacant-Positions", Group: null, Description: "Access to the Vacant Positions list page" },
    { id: 106, Label: "Create Vacant Position", ButtonId: "Vacant-Positions-New", Group: "Vacant-Positions", Description: "Access to create new vacant position records" },
    { id: 107, Label: "Save Vacant Position", ButtonId: "Vacant-Positions-Save", Group: "Vacant-Positions", Description: "Access to save changes to a vacant position record" },
    { id: 108, Label: "View Visits & Meetings Table List", ButtonId: "Visits-Meetings", Group: null, Description: "Access to the Visits & Meetings list page" },
    { id: 109, Label: "Create Visit & Meeting", ButtonId: "Visits-Meetings-New", Group: "Visits-Meetings", Description: "Access to create new visit or meeting records" },
    { id: 110, Label: "Delete Visit & Meeting", ButtonId: "Visits-Meetings-Delete", Group: "Visits-Meetings", Description: "Access to delete existing visit or meeting records" },
    { id: 111, Label: "Save Visit & Meeting", ButtonId: "Visits-Meetings-Save", Group: "Visits-Meetings", Description: "Access to save changes to a visit or meeting record" },
    { id: 112, Label: "View Documents Table List", ButtonId: "Documents", Group: null, Description: "Access to the Documents list page" },
    { id: 113, Label: "Upload Document", ButtonId: "Documents-New", Group: "Documents", Description: "Access to upload and attach new documents" },
    { id: 114, Label: "Delete Document", ButtonId: "Documents-Delete", Group: "Documents", Description: "Access to delete existing document records" },
    { id: 115, Label: "Save Document", ButtonId: "Documents-Save", Group: "Documents", Description: "Access to save changes to a document record" },
    { id: 116, Label: "View Document", ButtonId: "Documents-View", Group: "Documents", Description: "Access to view existing documents" },
    { id: 117, Label: "View Bookings Table List", ButtonId: "Booking", Group: null, Description: "Access to the Conference Bookings list page" },
    { id: 118, Label: "Create Booking", ButtonId: "Booking-New", Group: "Booking", Description: "Access to create new conference room bookings" },
    { id: 119, Label: "Save Booking", ButtonId: "Booking-Save", Group: "Booking", Description: "Access to save changes to a conference room booking" },
    { id: 120, Label: "Delete Conference Booking", ButtonId: "Booking-Delete", Group: "Booking", Description: "Access to delete existing conference room bookings" },
    { id: 121, Label: "View Biometric Records Table List", ButtonId: "Records", Group: "Records", Description: "Access to the Biometric Records page" },
    { id: 122, Label: "View HR System Documents", ButtonId: "HR", Group: null, Description: "Access to HR system documents" },
    { id: 123, Label: "View Information Table List", ButtonId: "Information", Group: null, Description: "Access to the Information list page" },
    { id: 124, Label: "Create Information Record", ButtonId: "Information-New", Group: "Information", Description: "Access to create new information records" },
    { id: 125, Label: "Save Information Record", ButtonId: "Information-Save", Group: "Information", Description: "Access to save changes to an information record" },
    { id: 126, Label: "Delete Information Record", ButtonId: "Information-Delete", Group: "Information", Description: "Access to delete existing information records" },
    { id: 127, Label: "View Contacts Table List", ButtonId: "Contacts", Group: null, Description: "Access to the Contacts list page" },
    { id: 128, Label: "View Contact Details", ButtonId: "Contact-View-Details", Group: "Contacts", Description: "Access to view the full details of a contact record" },
    { id: 129, Label: "Create Contact", ButtonId: "Contacts-New", Group: "Contacts", Description: "Access to create new contact records" },
    { id: 130, Label: "Save Contact", ButtonId: "Contacts-Save", Group: "Contacts", Description: "Access to save changes to a contact record" },
    { id: 131, Label: "Delete Contact", ButtonId: "Contacts-Delete", Group: "Contacts", Description: "Access to delete existing contact records" },
    { id: 132, Label: "View Finance & Accounting Reports", ButtonId: "Finance-And-Accounting", Group: null, Description: "Access to Finance & Accounting reports" },
    { id: 133, Label: "View HR & Recruitment Reports", ButtonId: "Human-Resource-And-Recruitment", Group: null, Description: "Access to HR & Recruitment reports" },
    { id: 134, Label: "View Staff Bulletin Table List", ButtonId: "Staff-Bulletin", Group: null, Description: "Access to the Staff Bulletins list page" },
    { id: 135, Label: "Create Staff Bulletin", ButtonId: "Staff-Bulletin-New", Group: null, Description: "Access to create new staff bulletins" },
    { id: 136, Label: "Save Staff Bulletin", ButtonId: "Staff-Bulletin-Save", Group: "Staff-Bulletin", Description: "Access to save changes to a staff bulletin" },
    { id: 137, Label: "View Client Bulletin Table List", ButtonId: "Client-Bulletin", Group: null, Description: "Access to the Client Bulletins list page" },
    { id: 138, Label: "Create Client Bulletin", ButtonId: "Client-Bulletin-New", Group: null, Description: "Access to create new client bulletins" },
    { id: 139, Label: "Save Client Bulletin", ButtonId: "Client-Bulletin-Save", Group: "Client-Bulletin", Description: "Access to save changes to a client bulletin" },
    { id: 140, Label: "View Users Table List", ButtonId: "Users", Group: null, Description: "Access to the Users list page" },
    { id: 141, Label: "View User Details", ButtonId: "User-View-Details", Group: "Users", Description: "Access to view the full details of a user account" },
    { id: 142, Label: "Save User", ButtonId: "Users-Save", Group: "Users", Description: "Access to save changes to a user account" },
    { id: 143, Label: "Activate/Deactivate User", ButtonId: "Users-Activate", Group: "Users", Description: "Access to activate or deactivate a user account" },
    { id: 144, Label: "Send Verification Link", ButtonId: "Users-Send-Verification-Link", Group: "Users", Description: "Access to send an email verification link to a user account" },
    { id: 145, Label: "View Roles Table List", ButtonId: "Roles", Group: null, Description: "Access to the Roles list page" },
    { id: 146, Label: "Create Role", ButtonId: "Roles-New", Group: "Roles", Description: "Access to create new roles" },
    { id: 147, Label: "Save Role", ButtonId: "Roles-Save", Group: "Roles", Description: "Access to save changes to a role" },
    { id: 148, Label: "Delete Role", ButtonId: "Roles-Delete", Group: "Roles", Description: "Access to delete existing roles" },
    { id: 149, Label: "View Permissions Table List", ButtonId: "Permissions", Group: null, Description: "Access to the Permissions list page" },
    { id: 150, Label: "Create Permission", ButtonId: "Permissions-New", Group: "Permissions", Description: "Access to create new permissions" },
    { id: 151, Label: "Save Permission", ButtonId: "Permissions-Save", Group: "Permissions", Description: "Access to save changes to a permission" },
    { id: 152, Label: "Delete Permission", ButtonId: "Permissions-Delete", Group: "Permissions", Description: "Access to delete existing permissions" },
    { id: 153, Label: "View User Permissions Table List", ButtonId: "User-Permissions", Group: null, Description: "Access to the User Permissions list page" },
    { id: 154, Label: "Assign User Permission", ButtonId: "User-Permissions-New", Group: "User-Permissions", Description: "Access to assign new permissions to a user" },
    { id: 155, Label: "Save User Permission", ButtonId: "User-Permissions-Save", Group: "User-Permissions", Description: "Access to save changes to a user permission assignment" },
    { id: 156, Label: "Remove User Permission", ButtonId: "User-Permissions-Delete", Group: "User-Permissions", Description: "Access to remove existing user permission assignments" },
    { id: 157, Label: "View Web Users Table List", ButtonId: "Web-Users", Group: null, Description: "Access to the Web Users list page" },
    { id: 158, Label: "Create Web User", ButtonId: "Web-Users-New", Group: "Web-Users", Description: "Access to create new web portal user accounts" },
    { id: 159, Label: "Save Web User", ButtonId: "Web-Users-Save", Group: "Web-Users", Description: "Access to save changes to a web portal user account" },
    { id: 160, Label: "Delete Web User", ButtonId: "Web-Users-Delete", Group: "Web-Users", Description: "Access to delete existing web portal user accounts" },
    { id: 161, Label: "View GBSSP IDs Table List", ButtonId: "GBSSP-ID", Group: null, Description: "Access to the GBSSP IDs list page" },
    { id: 162, Label: "Create GBSSP ID", ButtonId: "GBSSP-ID-New", Group: "GBSSP-ID", Description: "Access to create new GBSSP ID records" },
    { id: 163, Label: "Save GBSSP ID", ButtonId: "GBSSP-ID-Save", Group: "GBSSP-ID", Description: "Access to save changes to a GBSSP ID record" },
    { id: 164, Label: "Delete GBSSP ID", ButtonId: "GBSSP-ID-Delete", Group: "GBSSP-ID", Description: "Access to delete existing GBSSP ID records" },
    { id: 165, Label: "View Recipients Table List", ButtonId: "Recipients", Group: null, Description: "Access to the Recipients list page" },
    { id: 166, Label: "Add Recipient", ButtonId: "Recipients-New", Group: "Recipients", Description: "Access to add new recipient records" },
    { id: 167, Label: "Save Recipient", ButtonId: "Recipients-Save", Group: "Recipients", Description: "Access to save changes to a recipient record" },
    { id: 168, Label: "Delete Recipient", ButtonId: "Recipients-Delete", Group: "Recipients", Description: "Access to delete existing recipient records" },
    { id: 169, Label: "View Logs Table List", ButtonId: "Logs", Group: null, Description: "Access to the Logs page" },
    { id: 170, Label: "View Uploaded Payrolls", ButtonId: "Upload-Payroll", Group: null, Description: "Access to the Upload Payroll page" },
    { id: 171, Label: "Upload Payroll File", ButtonId: "Upload-Payroll-Upload-Document", Group: "Upload-Payroll", Description: "Access to upload payroll document files for processing" },
    { id: 172, Label: "View Civil Statuses Table List", ButtonId: "Civil-Status", Group: null, Description: "Access to the Civil Statuses list page" },
    { id: 173, Label: "Create Civil Status", ButtonId: "Civil-Status-New", Group: "Civil-Status", Description: "Access to create new civil status records" },
    { id: 174, Label: "Save Civil Status", ButtonId: "Civil-Status-Save", Group: "Civil-Status", Description: "Access to save changes to a civil status record" },
    { id: 175, Label: "Delete Civil Status", ButtonId: "Civil-Status-Delete", Group: "Civil-Status", Description: "Access to delete existing civil status records" },
    { id: 176, Label: "View Countries Table List", ButtonId: "Countries", Group: null, Description: "Access to the Countries list page" },
    { id: 177, Label: "Create Country", ButtonId: "Countries-New", Group: "Countries", Description: "Access to create new country records" },
    { id: 178, Label: "Save Country", ButtonId: "Countries-Save", Group: "Countries", Description: "Access to save changes to a country record" },
    { id: 179, Label: "Delete Country", ButtonId: "Countries-Delete", Group: "Countries", Description: "Access to delete existing country records" },
    { id: 180, Label: "View Deduction Types Table List", ButtonId: "Deduction-Types", Group: null, Description: "Access to the Deduction Types list page" },
    { id: 181, Label: "Create Deduction Type", ButtonId: "Deduction-Types-New", Group: "Deduction-Types", Description: "Access to create new deduction type records" },
    { id: 182, Label: "Save Deduction Type", ButtonId: "Deduction-Types-Save", Group: "Deduction-Types", Description: "Access to save changes to a deduction type record" },
    { id: 183, Label: "Delete Deduction Type", ButtonId: "Deduction-Types-Delete", Group: "Deduction-Types", Description: "Access to delete existing deduction type records" },
    { id: 184, Label: "View Document Types Table List", ButtonId: "Document-Types", Group: null, Description: "Access to the Document Types list page" },
    { id: 185, Label: "Create Document Type", ButtonId: "Document-Types-New", Group: "Document-Types", Description: "Access to create new document type records" },
    { id: 186, Label: "Save Document Type", ButtonId: "Document-Types-Save", Group: "Document-Types", Description: "Access to save changes to a document type record" },
    { id: 187, Label: "Delete Document Type", ButtonId: "Document-Types-Delete", Group: "Document-Types", Description: "Access to delete existing document type records" },
    { id: 188, Label: "View Holiday Types Table List", ButtonId: "Holiday-Types", Group: null, Description: "Access to the Holiday Types list page" },
    { id: 189, Label: "Create Holiday Type", ButtonId: "Holiday-Types-New", Group: "Holiday-Types", Description: "Access to create new holiday type records" },
    { id: 190, Label: "Save Holiday Type", ButtonId: "Holiday-Types-Save", Group: "Holiday-Types", Description: "Access to save changes to a holiday type record" },
    { id: 191, Label: "Delete Holiday Type", ButtonId: "Holiday-Types-Delete", Group: "Holiday-Types", Description: "Access to delete existing holiday type records" },
    { id: 192, Label: "View Late Reasons Table List", ButtonId: "Late-Reasons", Group: null, Description: "Access to the Late Reasons list page" },
    { id: 193, Label: "Create Late Reason", ButtonId: "Late-Reasons-New", Group: "Late-Reasons", Description: "Access to create new late reason records" },
    { id: 194, Label: "Save Late Reason", ButtonId: "Late-Reasons-Save", Group: "Late-Reasons", Description: "Access to save changes to a late reason record" },
    { id: 195, Label: "Delete Late Reason", ButtonId: "Late-Reasons-Delete", Group: "Late-Reasons", Description: "Access to delete existing late reason records" },
    { id: 196, Label: "View Leave Types Table List", ButtonId: "Leave-Types", Group: null, Description: "Access to the Leave Types list page" },
    { id: 197, Label: "Create Leave Type", ButtonId: "Leave-Types-New", Group: "Leave-Types", Description: "Access to create new leave type records" },
    { id: 198, Label: "Save Leave Type", ButtonId: "Leave-Types-Save", Group: "Leave-Types", Description: "Access to save changes to a leave type record" },
    { id: 199, Label: "Delete Leave Type", ButtonId: "Leave-Types-Delete", Group: "Leave-Types", Description: "Access to delete existing leave type records" },
    { id: 200, Label: "View Positions Table List", ButtonId: "Positions", Group: null, Description: "Access to the Positions list page" },
    { id: 201, Label: "Create Position", ButtonId: "Positions-New", Group: "Positions", Description: "Access to create new position records" },
    { id: 202, Label: "Save Position", ButtonId: "Positions-Save", Group: "Positions", Description: "Access to save changes to a position record" },
    { id: 203, Label: "Delete Position", ButtonId: "Positions-Delete", Group: "Positions", Description: "Access to delete existing position records" },
    { id: 204, Label: "View Punctuality Types Table List", ButtonId: "Punctuality-Types", Group: null, Description: "Access to the Punctuality Types list page" },
    { id: 205, Label: "Create Punctuality Type", ButtonId: "Punctuality-Types-New", Group: "Punctuality-Types", Description: "Access to create new punctuality type records" },
    { id: 206, Label: "Save Punctuality Type", ButtonId: "Punctuality-Types-Save", Group: "Punctuality-Types", Description: "Access to save changes to a punctuality type record" },
    { id: 207, Label: "Delete Punctuality Type", ButtonId: "Punctuality-Types-Delete", Group: "Punctuality-Types", Description: "Access to delete existing punctuality type records" },
    { id: 208, Label: "View Statuses Table List", ButtonId: "Statuses", Group: null, Description: "Access to the Statuses list page" },
    { id: 209, Label: "Create Status", ButtonId: "Statuses-New", Group: "Statuses", Description: "Access to create new status records" },
    { id: 210, Label: "Save Status", ButtonId: "Statuses-Save", Group: "Statuses", Description: "Access to save changes to a status record" },
    { id: 211, Label: "Delete Status", ButtonId: "Statuses-Delete", Group: "Statuses", Description: "Access to delete existing status records" },
    { id: 212, Label: "View Work Schedule Types Table List", ButtonId: "Workschedule-Types", Group: null, Description: "Access to the Work Schedule Types list page" },
    { id: 213, Label: "Create Work Schedule Type", ButtonId: "Workschedule-Types-New", Group: "Workschedule-Types", Description: "Access to create new work schedule type records" },
    { id: 214, Label: "Save Work Schedule Type", ButtonId: "Workschedule-Types-Save", Group: "Workschedule-Types", Description: "Access to save changes to a work schedule type record" },
    { id: 215, Label: "Delete Work Schedule Type", ButtonId: "Workschedule-Types-Delete", Group: "Workschedule-Types", Description: "Access to delete existing work schedule type records" },
    { id: 216, Label: "View Requests Table List", ButtonId: "Request", Group: null, Description: "Access to the Requests list page" },
    { id: 217, Label: "View Request Details", ButtonId: "Request-View-Details", Group: "Request", Description: "Access to view the full details of a request record" },
    { id: 218, Label: "Create Request", ButtonId: "Request-New", Group: "Request", Description: "Access to create new request records" },
    { id: 219, Label: "Save Request", ButtonId: "Request-Save", Group: "Request", Description: "Access to save changes to a request record" },
    { id: 220, Label: "Delete Request", ButtonId: "Request-Delete", Group: "Request", Description: "Access to delete existing request records" },
    { id: 221, Label: "View Request Document", ButtonId: "Request-View-Document", Group: "Request", Description: "Access to view documents attached to a request record" },
    { id: 222, Label: "Delete Request Document", ButtonId: "Request-Delete-Document", Group: "Request", Description: "Access to delete documents attached to a request record" },
    { id: 223, Label: "View Processes & Procedures", ButtonId: "Process-And-Procedure", Group: null, Description: "Access to the Processes & Procedures page" }
]

export const USER_PERMISSIONS = [
]

export const WEB_USERS = [
    {
        id: 1,
        username: 'jlalap',
        fullName: 'Jerwin Lalap',
        role: { id: 1, name: 'Administrator' },
        email: 'jlalap@gbss.com.au',
        registrationDate: '2024-01-15',
        client: { id: 7, name: 'GBSS' },
        person: { id: '84FC7A4D-91A4-41BF-8A10-BB8EA6963905', name: 'Jerwin Lalap' },
        mapClient: { id: 7, name: 'GBSS' },
        loginDate: '2024-12-01',
    }
]

export const EMAIL_LOGS = [
    {
        id: '1',
        recipient: 'john.doe@example.com',
        cc: '',
        subject: 'Additional Credit Added for Employee',
        body: '<div style="font-family:Verdana;font-size:10pt;">Two (2) Annual-Paid Leave Credits was added to John Doe.<br /><br />Current Balance: 15 days</div>',
        date: getCurrentDate(),
        time: '08:26:41'
    },
    {
        id: '2',
        recipient: 'jane.smith@example.com; michael.jones@example.com; sarah.brown@example.com',
        cc: 'hr@example.com; manager@example.com',
        subject: 'Attendance Report - Monthly Summary',
        body: '<div style="font-family:Verdana;font-size:10pt;"><strong>Monthly Attendance Report</strong><br /><br />Total Days: 22<br />Present: 20<br />Absent: 2<br /><br />Please review and approve.</div>',
        date: getCurrentDate(),
        time: '09:15:23'
    },
    {
        id: '3',
        recipient: 'client@company.com',
        cc: 'support@gbss.com.au',
        subject: 'Client Bulletin - System Maintenance',
        body: '<div style="font-family:Verdana;font-size:10pt;"><h3>Scheduled Maintenance Notice</h3><br />Dear Valued Client,<br /><br />We will be performing system maintenance on:<br /><strong>Date:</strong> January 10, 2026<br /><strong>Time:</strong> 10:00 PM - 2:00 AM AEST<br /><br />Services may be temporarily unavailable during this period.<br /><br />Thank you for your understanding.</div>',
        date: getCurrentDate(-1),
        time: '14:30:15'
    },
    {
        id: '4',
        recipient: 'applicant@example.com',
        cc: '',
        subject: 'Interview Invitation - Software Developer Position',
        body: '<div style="font-family:Verdana;font-size:10pt;">Dear Applicant,<br /><br />We are pleased to invite you for an interview for the Software Developer position.<br /><br /><strong>Details:</strong><br />Date: January 8, 2026<br />Time: 2:00 PM<br />Location: GBSS Office, Level 5<br /><br />Please confirm your attendance.<br /><br />Best regards,<br />HR Team</div>',
        date: getCurrentDate(-1),
        time: '11:45:00'
    },
    {
        id: '5',
        recipient: 'manager@company.com',
        cc: 'admin@gbss.com.au',
        subject: 'New Vacancy Posted - Urgent',
        body: '<div style="font-family:Verdana;font-size:10pt;"><strong>New Position Available</strong><br /><br />Position: Senior Accountant<br />Account: ABC Corporation<br />Number of Vacancies: 2<br />Requested By: Sarah Johnson<br /><br />Job posting has been published on JobStreet and company website.<br /><br />Recruiter: Michael Chen</div>',
        date: getCurrentDate(-2),
        time: '16:20:30'
    },
    {
        id: '6',
        recipient: 'employee@example.com',
        cc: '',
        subject: 'Probationary Update - Performance Review',
        body: '<div style="font-family:Verdana;font-size:10pt;">Dear Employee,<br /><br />This is to inform you about your probationary period review.<br /><br /><strong>Review Summary:</strong><br />Performance: Excellent<br />Attendance: 100%<br />Team Collaboration: Outstanding<br /><br />Your probation period will end on January 15, 2026.<br /><br />Congratulations on your progress!</div>',
        date: getCurrentDate(-2),
        time: '10:00:00'
    },
    {
        id: '7',
        recipient: 'staff@gbss.com.au',
        cc: '',
        subject: 'Sick Leave Notification',
        body: '<div style="font-family:Verdana;font-size:10pt;">Employee Name: Robert Williams<br />Date: January 2, 2026<br />Reason: Medical Consultation<br /><br />Supporting documents have been uploaded to the system.<br /><br />Leave Credits Remaining: 8 days</div>',
        date: getCurrentDate(-3),
        time: '07:30:45'
    },
    {
        id: '8',
        recipient: 'client@business.com',
        cc: 'accounts@gbss.com.au',
        subject: 'Acceptance of Employment Contract',
        body: '<div style="font-family:Verdana;font-size:10pt;"><strong>Contract Acceptance Notification</strong><br /><br />Employee: Lisa Anderson<br />Position: Customer Service Representative<br />Start Date: January 15, 2026<br /><br />The employment contract has been signed and accepted.<br /><br />All onboarding documents are complete.</div>',
        date: getCurrentDate(-3),
        time: '13:15:20'
    },
    {
        id: '9',
        recipient: 'team@company.com',
        cc: 'management@gbss.com.au',
        subject: 'Quarterly Report - Q4 2025 Performance Analysis',
        body: '<div style="font-family:Verdana;font-size:10pt;"><h2 style="color:#2c3e50;">Quarterly Performance Report - Q4 2025</h2><br /><br /><strong>Executive Summary</strong><br /><br />This comprehensive report provides a detailed analysis of the company\'s performance during the fourth quarter of 2025. The following sections outline key achievements, challenges, and strategic initiatives that have shaped our operational landscape.<br /><br /><hr /><br /><h3 style="color:#34495e;">1. Financial Performance</h3><br /><br />Our financial metrics for Q4 2025 demonstrate significant growth across multiple dimensions:<br /><br /><ul><li><strong>Revenue Growth:</strong> 23.5% increase compared to Q4 2024</li><li><strong>Operating Margin:</strong> Improved to 18.7% from 15.2%</li><li><strong>Net Profit:</strong> $4.2M, exceeding projections by 12%</li><li><strong>Client Retention Rate:</strong> 94.3%, highest in company history</li><li><strong>New Client Acquisitions:</strong> 47 new accounts secured</li></ul><br /><br />The strong financial performance can be attributed to our strategic focus on operational efficiency, enhanced service delivery, and targeted market expansion initiatives. Our investment in technology infrastructure has yielded significant returns, enabling us to scale operations while maintaining quality standards.<br /><br /><h3 style="color:#34495e;">2. Operational Achievements</h3><br /><br /><strong>2.1 Service Excellence</strong><br /><br />Our commitment to service excellence has resulted in measurable improvements across all key performance indicators:<br /><br /><ul><li>Average response time reduced to 2.3 hours (from 4.1 hours in Q3)</li><li>Customer satisfaction score: 4.8/5.0 (up from 4.5/5.0)</li><li>Issue resolution rate: 96.7% within first contact</li><li>Service uptime: 99.97% across all systems</li></ul><br /><br /><strong>2.2 Team Development</strong><br /><br />We have invested significantly in our people, with the following outcomes:<br /><br /><ul><li>15 employees completed advanced certification programs</li><li>Employee satisfaction index increased to 87% (from 79%)</li><li>Voluntary turnover rate decreased to 4.2% annually</li><li>22 internal promotions, reflecting our commitment to career development</li><li>Implementation of mentorship program with 45 active participants</li></ul><br /><br /><strong>2.3 Technology Infrastructure</strong><br /><br />Major technology upgrades completed this quarter include:<br /><br /><ul><li>Migration to cloud-based infrastructure (completed 98%)</li><li>Implementation of AI-powered customer service tools</li><li>Enhanced cybersecurity measures with zero security incidents</li><li>New project management system deployed across 12 departments</li><li>Mobile application launch with 2,847 active users</li></ul><br /><br /><h3 style="color:#34495e;">3. Market Expansion</h3><br /><br />Our strategic expansion into new markets has exceeded initial projections:<br /><br /><strong>Geographic Expansion:</strong><br /><ul><li>Opened 3 new regional offices (Brisbane, Adelaide, Perth)</li><li>Established partnerships with 8 international vendors</li><li>Expanded service coverage to 14 additional cities</li><li>Secured government contracts worth $2.8M annually</li></ul><br /><br /><strong>Service Line Development:</strong><br /><ul><li>Launched 4 new service packages tailored to SME clients</li><li>Introduced premium support tier (87 clients enrolled)</li><li>Developed industry-specific solutions for healthcare and finance sectors</li><li>Beta testing of predictive analytics platform with 15 pilot clients</li></ul><br /><br /><h3 style="color:#34495e;">4. Challenges and Mitigation Strategies</h3><br /><br />While the quarter showed strong performance, we encountered several challenges:<br /><br /><strong>4.1 Talent Acquisition</strong><br /><br />The competitive job market has made recruiting specialized talent more challenging. Mitigation strategies include:<br /><ul><li>Enhanced employee referral program with improved incentives</li><li>Partnership with 5 universities for graduate recruitment</li><li>Competitive salary adjustments (average 8.5% increase)</li><li>Flexible work arrangements and enhanced benefits package</li></ul><br /><br /><strong>4.2 Supply Chain Disruptions</strong><br /><br />Global supply chain issues affected hardware procurement timelines. Our response:<br /><ul><li>Diversified supplier base (added 7 new vendors)</li><li>Increased inventory buffer stocks by 40%</li><li>Implemented predictive ordering system</li><li>Negotiated long-term contracts with key suppliers</li></ul><br /><br /><h3 style="color:#34495e;">5. Strategic Initiatives for Q1 2026</h3><br /><br />Looking ahead to Q1 2026, our strategic priorities include:<br /><br /><strong>5.1 Digital Transformation Acceleration</strong><br /><ul><li>Complete cloud migration (remaining 2%)</li><li>Launch AI-powered analytics dashboard for clients</li><li>Implement blockchain-based security protocols</li><li>Deploy automated workflow management system</li></ul><br /><br /><strong>5.2 Client Engagement Enhancement</strong><br /><ul><li>Quarterly business review program for top 50 clients</li><li>Launch client portal with self-service capabilities</li><li>Implement NPS tracking with monthly reporting</li><li>Establish client advisory board (target: 12 members)</li></ul><br /><br /><strong>5.3 Operational Optimization</strong><br /><ul><li>Process automation initiative targeting 30% efficiency gain</li><li>Integration of project management and billing systems</li><li>Implementation of predictive maintenance for infrastructure</li><li>Lean Six Sigma training for 50 team leaders</li></ul><br /><br /><strong>5.4 Sustainability Commitment</strong><br /><ul><li>Achieve carbon neutrality for all offices by March 2026</li><li>Reduce paper consumption by 75% through digitization</li><li>Partner with environmental organizations for offset programs</li><li>Implement green procurement policies</li></ul><br /><br /><h3 style="color:#34495e;">6. Financial Projections Q1 2026</h3><br /><br />Based on current trends and strategic initiatives, we project:<br /><br /><ul><li><strong>Revenue Target:</strong> $5.8M (18% growth vs Q1 2025)</li><li><strong>Operating Margin Target:</strong> 19.5%</li><li><strong>New Client Target:</strong> 35 accounts</li><li><strong>Team Expansion:</strong> 28 new hires planned</li><li><strong>Investment in R&D:</strong> $850K allocated</li></ul><br /><br /><hr /><br /><br /><h3 style="color:#34495e;">7. Departmental Highlights</h3><br /><br /><strong>Human Resources</strong><br /><ul><li>Launched comprehensive wellness program</li><li>Implemented quarterly performance review system</li><li>Established leadership development track</li><li>Enhanced parental leave policies</li></ul><br /><br /><strong>Information Technology</strong><br /><ul><li>Zero critical system outages this quarter</li><li>Deployed security patches within 24 hours of release</li><li>Completed disaster recovery testing (100% success rate)</li><li>Upgraded network infrastructure (50% speed improvement)</li></ul><br /><br /><strong>Sales & Marketing</strong><br /><ul><li>Generated 342 qualified leads</li><li>Conversion rate improved to 28%</li><li>Launched rebranding campaign</li><li>Social media following increased by 156%</li></ul><br /><br /><strong>Client Services</strong><br /><ul><li>Handled 4,892 support tickets</li><li>Maintained 4.9/5.0 satisfaction rating</li><li>Reduced escalations by 34%</li><li>Implemented 24/7 support coverage</li></ul><br /><br /><h3 style="color:#34495e;">8. Compliance and Governance</h3><br /><br />We maintain strict adherence to regulatory requirements:<br /><br /><ul><li>Successfully completed annual ISO 27001 audit</li><li>Achieved SOC 2 Type II certification</li><li>Zero compliance violations recorded</li><li>Implemented enhanced data privacy controls (GDPR compliant)</li><li>Conducted quarterly board reviews</li></ul><br /><br /><h3 style="color:#34495e;">9. Risk Management</h3><br /><br />Key risks identified and mitigation strategies:<br /><br /><ul><li><strong>Cybersecurity Threats:</strong> Enhanced monitoring, employee training, incident response plan</li><li><strong>Economic Uncertainty:</strong> Diversified client portfolio, flexible cost structure</li><li><strong>Technology Disruption:</strong> Continuous innovation investment, strategic partnerships</li><li><strong>Regulatory Changes:</strong> Proactive compliance team, legal advisory retention</li></ul><br /><br /><hr /><br /><br /><h3 style="color:#2c3e50;">Conclusion</h3><br /><br />Q4 2025 has been a transformative period for our organization. The strong financial performance, coupled with operational excellence and strategic market expansion, positions us well for continued growth in 2026. Our focus on innovation, employee development, and client satisfaction remains unwavering.<br /><br />We express our gratitude to all team members whose dedication and hard work have contributed to these outstanding results. As we move into Q1 2026, we remain committed to our mission of delivering exceptional value to our clients while fostering a positive and inclusive workplace culture.<br /><br /><br /><strong>Prepared by:</strong> Financial Analysis Team<br /><strong>Approved by:</strong> Executive Committee<br /><strong>Distribution:</strong> All Department Heads, Board Members<br /><strong>Classification:</strong> Confidential - Internal Use Only<br /><br /><em>For questions or clarifications, please contact the Finance Department at finance@company.com</em><br /><br /></div>',
        date: getCurrentDate(-4),
        time: '15:45:00'
    }
]

const JERWIN_LALAP_USER = {
    userId: 'a7d560c0-a3bc-43fc-8225-d898c489971a',
    email: 'jerwin.lalap@gbss.com.au',
    firstName: 'Jerwin',
    lastName: 'Lalap',
    isActive: true,
    isVerified: true,
    verificationSent: true,
    createdDate: '2025-12-08T05:51:05.3945312',
    lastLoginDate: '2025-12-17T06:29:19.495791',
    modifiedDate: null,
    role: {
        id: '2ee47f5c-d405-42df-be40-fcd934d28680',
        description: 'Guest',
        definition: '',
        isDefault: true
    },
    empDetails: null,
    legacyId: 112
}

export const DAILY_LOGS = [
    {
        id: 'TL-00152',
        date: getCurrentDate(),
        time: '09:30',
        assignedTo: 'testuser1',
        team: 'IT',
        targetDate: '',
        requestedBy: JERWIN_LALAP_USER,
        taskIssue: 'Test System Access',
        hasAttachment: true,
        status: 'Open',
        closedBy: '',
        loggedBy: 'via TEST',
        details: 'Test request for system access to development environment.',
        attachment: '\\\\test\\path\\test_document_001.pdf',
        priority: 'Low',
        specifyName: 'Jerwin Lalap',
        assignedTeam: 'IT',
        comments: '',
        ticket: 'TL-00152'
    },
    {
        id: 'TL-00151',
        date: getCurrentDate(),
        time: '08:15',
        assignedTo: '',
        team: 'IT',
        targetDate: '',
        requestedBy: JERWIN_LALAP_USER,
        taskIssue: 'Test Network Issue',
        hasAttachment: true,
        status: 'Open',
        closedBy: '',
        loggedBy: 'via TEST',
        details: 'Test network connectivity issue for testing purposes.',
        attachment: '\\\\test\\path\\test_network_log.pdf',
        priority: 'High',
        specifyName: 'Jerwin Lalap',
        assignedTeam: 'IT',
        comments: '',
        ticket: 'TL-00151'
    },
    {
        id: 'TL-00150',
        date: getCurrentDate(-1),
        time: '10:45',
        assignedTo: 'testuser2',
        team: 'IT',
        targetDate: '',
        requestedBy: JERWIN_LALAP_USER,
        taskIssue: 'Test Leave Request',
        hasAttachment: true,
        status: 'Open',
        closedBy: '',
        loggedBy: 'testuser',
        details: 'Test annual leave request for demonstration.',
        attachment: '\\\\test\\path\\test_leave_form.pdf',
        priority: 'Medium',
        specifyName: 'Jerwin Lalap',
        assignedTeam: 'IT',
        comments: '',
        ticket: 'TL-00150'
    },
    {
        id: 'TL-00149',
        date: getCurrentDate(-1),
        time: '14:30',
        assignedTo: 'testuser3',
        team: 'IT',
        targetDate: getCurrentDate(5),
        requestedBy: JERWIN_LALAP_USER,
        taskIssue: 'Test Software Update',
        hasAttachment: true,
        status: 'In-Progress',
        closedBy: '',
        loggedBy: 'via TEST',
        details: 'Test software upgrade for mockup system testing.',
        attachment: '\\\\test\\path\\test_upgrade_plan.docx',
        priority: 'High',
        specifyName: 'Jerwin Lalap',
        assignedTeam: 'IT',
        comments: 'Test in progress, testing phase',
        ticket: 'TL-00149'
    },
    {
        id: 'TL-00148',
        date: getCurrentDate(-2),
        time: '11:20',
        assignedTo: 'testuser1',
        team: 'IT',
        targetDate: '',
        requestedBy: JERWIN_LALAP_USER,
        taskIssue: 'Test Data Review',
        hasAttachment: true,
        status: 'Open',
        closedBy: '',
        loggedBy: 'via TEST',
        details: 'Test data review request for sample testing purposes only.',
        attachment: '\\\\test\\path\\test_screenshot.png',
        priority: 'Low',
        specifyName: 'Jerwin Lalap',
        assignedTeam: 'IT',
        comments: '',
        ticket: 'TL-00148'
    },
    {
        id: 'TL-00147',
        date: getCurrentDate(-2),
        time: '15:15',
        assignedTo: 'testuser2',
        team: 'IT',
        targetDate: '',
        requestedBy: JERWIN_LALAP_USER,
        taskIssue: 'Test Document Access',
        hasAttachment: true,
        status: 'Open',
        closedBy: '',
        loggedBy: 'testuser',
        details: 'Test request for document folder access.',
        attachment: '\\\\test\\path\\test_access_request.pdf',
        priority: 'Medium',
        specifyName: 'Jerwin Lalap',
        assignedTeam: 'IT',
        comments: '',
        ticket: 'TL-00147'
    },
    {
        id: 'TL-00146',
        date: getCurrentDate(-3),
        time: '09:45',
        assignedTo: 'testuser1',
        team: 'IT',
        targetDate: '',
        requestedBy: JERWIN_LALAP_USER,
        taskIssue: 'Test Email Setup',
        hasAttachment: false,
        status: 'Open',
        closedBy: '',
        loggedBy: 'via TEST',
        details: 'Test email signature configuration for testing team.',
        attachment: '',
        priority: 'Low',
        specifyName: 'Jerwin Lalap',
        assignedTeam: 'IT',
        comments: '',
        ticket: 'TL-00146'
    },
    {
        id: 'TL-00145',
        date: getCurrentDate(-3),
        time: '13:30',
        assignedTo: 'testuser3',
        team: 'IT',
        targetDate: '',
        requestedBy: JERWIN_LALAP_USER,
        taskIssue: 'Test Auto Email',
        hasAttachment: true,
        status: 'Open',
        closedBy: '',
        loggedBy: 'testuser',
        details: 'Test automated email notification setup for testing.',
        attachment: '\\\\test\\path\\test_email_template.html',
        priority: 'Medium',
        specifyName: 'Jerwin Lalap',
        assignedTeam: 'IT',
        comments: '',
        ticket: 'TL-00145'
    },
    {
        id: 'TL-00144',
        date: getCurrentDate(-4),
        time: '10:00',
        assignedTo: 'testuser2',
        team: 'IT',
        targetDate: getCurrentDate(3),
        requestedBy: JERWIN_LALAP_USER,
        taskIssue: 'Test Shift Schedule',
        hasAttachment: true,
        status: 'In-Progress',
        closedBy: '',
        loggedBy: 'testuser',
        details: 'Test automatic shift scheduling implementation for demo.',
        attachment: '\\\\test\\path\\test_shift_requirements.xlsx',
        priority: 'High',
        specifyName: 'Jerwin Lalap',
        assignedTeam: 'IT',
        comments: 'Test development ongoing',
        ticket: 'TL-00144'
    },
    {
        id: 'TL-00143',
        date: getCurrentDate(-5),
        time: '14:45',
        assignedTo: 'testuser1',
        team: 'IT',
        targetDate: '',
        requestedBy: JERWIN_LALAP_USER,
        taskIssue: 'Test Database',
        hasAttachment: true,
        status: 'Open',
        closedBy: '',
        loggedBy: 'via TEST',
        details: 'Test database backup and recovery for testing purposes.',
        attachment: '\\\\test\\path\\test_backup_report.pdf',
        priority: 'High',
        specifyName: 'Jerwin Lalap',
        assignedTeam: 'IT',
        comments: '',
        ticket: 'TL-00143'
    },
    {
        id: 'TL-00142',
        date: getCurrentDate(-6),
        time: '11:30 AM',
        assignedTo: 'testuser3',
        team: 'IT',
        targetDate: getCurrentDate(10),
        requestedBy: JERWIN_LALAP_USER,
        taskIssue: 'Test Equipment',
        hasAttachment: true,
        status: 'Open',
        closedBy: '',
        loggedBy: 'testuser',
        details: 'Test equipment replacement for testing team.',
        attachment: '\\\\test\\path\\test_purchase_order.pdf',
        priority: 'Low',
        specifyName: 'Jerwin Lalap',
        assignedTeam: 'IT',
        comments: '',
        ticket: 'TL-00142'
    },
    {
        id: 'TL-00141',
        date: getCurrentDate(-7),
        time: '4:00 PM',
        assignedTo: 'testuser2',
        team: 'IT',
        targetDate: '',
        requestedBy: JERWIN_LALAP_USER,
        taskIssue: 'Test Cost Update',
        hasAttachment: true,
        status: 'Open',
        closedBy: '',
        loggedBy: 'testuser',
        details: 'Test hosting cost update for client account demo.',
        attachment: '\\\\test\\path\\test_cost_update.xlsx',
        priority: 'Medium',
        specifyName: 'Jerwin Lalap',
        assignedTeam: 'IT',
        comments: '',
        ticket: 'TL-00141'
    }
]

export const DAILY_LOG_DOCUMENTS = [
    {
        id: '1',
        filename: 'test_screenshot.png',
        date: getCurrentDate(-2),
        remarks: 'Test screenshot for mockup',
        attachedBy: 'Test User E',
        logId: 'TL-00148'
    },
    {
        id: '2',
        filename: 'test_network_log.pdf',
        date: getCurrentDate(),
        remarks: 'Test network diagnostics report',
        attachedBy: 'Test User B',
        logId: 'TL-00151'
    },
    {
        id: '3',
        filename: 'test_leave_form.pdf',
        date: getCurrentDate(-1),
        remarks: 'Test leave application form',
        attachedBy: 'Test User C',
        logId: 'TL-00150'
    }
]

export const USER_REQUESTS = [
    {
        id: 'UR-001',
        dateAdded: getCurrentDate(-5),
        taskName: 'Update user permissions for new hire',
        description: 'Add full access to CRM and email system for new team member',
        priority: 'High',
        status: 'In-Progress',
        targetDate: getCurrentDate(2),
        comments: 'Waiting for IT approval',
        requestedBy: JERWIN_LALAP_USER,
    },
    {
        id: 'UR-002',
        dateAdded: getCurrentDate(-3),
        taskName: 'Create new email account',
        description: 'Set up email account for contractor',
        priority: 'Medium',
        status: 'Open',
        targetDate: getCurrentDate(5),
        comments: 'Standard setup required',
        requestedBy: JERWIN_LALAP_USER,
    },
    {
        id: 'UR-003',
        dateAdded: getCurrentDate(-7),
        taskName: 'Reset password for admin account',
        description: 'User locked out after multiple failed login attempts',
        priority: 'Urgent',
        status: 'Closed',
        targetDate: getCurrentDate(-6),
        comments: 'Resolved and user notified',
        requestedBy: JERWIN_LALAP_USER,
    },
    {
        id: 'UR-004',
        dateAdded: getCurrentDate(-2),
        taskName: 'Install software on workstation',
        description: 'Install Adobe Creative Suite on design team workstation',
        priority: 'Low',
        status: 'For Review',
        targetDate: getCurrentDate(7),
        comments: 'License key requested from procurement',
        requestedBy: JERWIN_LALAP_USER,
    },
    {
        id: 'UR-005',
        dateAdded: getCurrentDate(-10),
        taskName: 'Network access configuration',
        description: 'Configure VPN access for remote employee',
        priority: 'High',
        status: 'In-Progress',
        targetDate: getCurrentDate(1),
        comments: 'Pending security clearance',
        requestedBy: JERWIN_LALAP_USER,
    },
]

export const USER_REQUEST_DOCUMENTS = [
    {
        id: '1',
        filename: 'permission_request_form.pdf',
        date: getCurrentDate(),
        remarks: 'Approved by manager',
        attachedBy: 'Test User A',
        requestId: 'UR-001'
    },
    {
        id: '2',
        filename: 'vpn_setup_guide.pdf',
        date: getCurrentDate(-1),
        remarks: 'Configuration documentation',
        attachedBy: 'Test User B',
        requestId: 'UR-005'
    },
]

export const HR_FOLDERS = [
    {
        id: '1',
        name: 'Recruitment',
        children: [
            { id: '1-1', name: 'Application Forms', parentId: '1' },
            { id: '1-2', name: 'Interview Materials', parentId: '1' },
            { id: '1-3', name: 'Job Postings', parentId: '1' },
        ]
    },
    { id: '2', name: 'Pre-employment' },
    {
        id: '3',
        name: 'Employment',
        children: [
            { id: '3-1', name: 'Contracts', parentId: '3' },
            { id: '3-2', name: 'Performance Reviews', parentId: '3' },
            { id: '3-3', name: 'Salary Documents', parentId: '3' },
        ]
    },
    { id: '4', name: 'Certificates' },
    { id: '5', name: 'Warnings' },
    { id: '6', name: 'Termination' },
    { id: '7', name: 'Post-employment' },
    {
        id: '8',
        name: 'Government Forms',
        children: [
            { id: '8-1', name: 'BIR Forms', parentId: '8' },
            { id: '8-2', name: 'SSS Forms', parentId: '8' },
            { id: '8-3', name: 'PhilHealth Forms', parentId: '8' },
            { id: '8-4', name: 'Pag-IBIG Forms', parentId: '8' },
        ]
    },
    { id: '9', name: 'Job Description' },
    { id: '10', name: 'System Generated Exports' },
    { id: '11', name: 'VISA Requirements' },
]

export const HR_FILES = [
    // Recruitment - Application Forms
    { id: 'F1', folderId: '1-1', name: 'Application Form Template.doc', size: '45 KB', dateModified: getCurrentDate(-30), type: 'Document' },
    { id: 'F2', folderId: '1-1', name: 'Application Form v2.doc', size: '48 KB', dateModified: getCurrentDate(-28), type: 'Document' },

    // Recruitment - Interview Materials
    { id: 'F3', folderId: '1-2', name: 'Interview Evaluation Form.xlsx', size: '28 KB', dateModified: getCurrentDate(-25), type: 'Spreadsheet' },
    { id: 'F4', folderId: '1-2', name: 'Technical Assessment Questions.doc', size: '52 KB', dateModified: getCurrentDate(-24), type: 'Document' },

    // Recruitment - Job Postings
    { id: 'F5', folderId: '1-3', name: 'Job Posting Template.doc', size: '32 KB', dateModified: getCurrentDate(-20), type: 'Document' },

    // Pre-employment
    { id: 'F6', folderId: '2', name: 'Pre-employment Checklist.xlsx', size: '38 KB', dateModified: getCurrentDate(-15), type: 'Spreadsheet' },
    { id: 'F7', folderId: '2', name: 'Background Check Form.doc', size: '41 KB', dateModified: getCurrentDate(-10), type: 'Document' },
    { id: 'F8', folderId: '2', name: 'Medical Clearance Requirements.pdf', size: '156 KB', dateModified: getCurrentDate(-8), type: 'PDF' },

    // Employment - Contracts
    { id: 'F9', folderId: '3-1', name: 'Probationary Contract.doc', size: '55 KB', dateModified: getCurrentDate(-5), type: 'Document' },
    { id: 'F10', folderId: '3-1', name: 'Regular Contract.doc', size: '58 KB', dateModified: getCurrentDate(-4), type: 'Document' },
    { id: 'F11', folderId: '3-1', name: 'Addendum to Employment Contract.doc', size: '52 KB', dateModified: getCurrentDate(-3), type: 'Document' },
    { id: 'F12', folderId: '3-1', name: 'Loan Market Contract - Annex 4.doc', size: '78 KB', dateModified: getCurrentDate(-2), type: 'Document' },

    // Employment - Performance Reviews
    { id: 'F13', folderId: '3-2', name: 'Performance Evaluation.doc', size: '62 KB', dateModified: getCurrentDate(-6), type: 'Document' },
    { id: 'F14', folderId: '3-2', name: 'Performance Evaluation - Grace Patasil.doc', size: '68 KB', dateModified: getCurrentDate(-5), type: 'Document' },
    { id: 'F15', folderId: '3-2', name: '~$rformance Evaluation.doc', size: '12 KB', dateModified: getCurrentDate(-1), type: 'Document' },

    // Employment - Salary Documents
    { id: 'F16', folderId: '3-3', name: 'Salary Adjustment.doc', size: '48 KB', dateModified: getCurrentDate(-3), type: 'Document' },
    { id: 'F17', folderId: '3-3', name: 'Personal Information Sheet March 2022.xlsx', size: '142 KB', dateModified: getCurrentDate(-2), type: 'Spreadsheet' },
    { id: 'F18', folderId: '3-3', name: '~$obationary Contract.doc', size: '12 KB', dateModified: getCurrentDate(), type: 'Document' },

    // Certificates
    { id: 'F19', folderId: '4', name: 'Certificate of Employment Template.doc', size: '38 KB', dateModified: getCurrentDate(-12), type: 'Document' },
    { id: 'F20', folderId: '4', name: 'Certificate of Employment and Income.doc', size: '42 KB', dateModified: getCurrentDate(-11), type: 'Document' },
    { id: 'F21', folderId: '4', name: 'COE for Visa Application.doc', size: '40 KB', dateModified: getCurrentDate(-9), type: 'Document' },

    // Warnings
    { id: 'F22', folderId: '5', name: 'Warning Letter Template.doc', size: '35 KB', dateModified: getCurrentDate(-18), type: 'Document' },
    { id: 'F23', folderId: '5', name: 'Notice to Explain Template.doc', size: '37 KB', dateModified: getCurrentDate(-16), type: 'Document' },
    { id: 'F24', folderId: '5', name: 'Disciplinary Action Form.xlsx', size: '30 KB', dateModified: getCurrentDate(-14), type: 'Spreadsheet' },

    // Termination
    { id: 'F25', folderId: '6', name: 'Termination Letter Template.doc', size: '40 KB', dateModified: getCurrentDate(-22), type: 'Document' },
    { id: 'F26', folderId: '6', name: 'Clearance Form.doc', size: '45 KB', dateModified: getCurrentDate(-20), type: 'Document' },
    { id: 'F27', folderId: '6', name: 'Exit Interview Form.xlsx', size: '35 KB', dateModified: getCurrentDate(-18), type: 'Spreadsheet' },

    // Post-employment
    { id: 'F28', folderId: '7', name: 'Final Pay Computation.xlsx', size: '50 KB', dateModified: getCurrentDate(-15), type: 'Spreadsheet' },
    { id: 'F29', folderId: '7', name: 'Certificate of Separation.doc', size: '38 KB', dateModified: getCurrentDate(-13), type: 'Document' },

    // Government Forms - BIR
    { id: 'F30', folderId: '8-1', name: 'BIR Form 2316.xlsx', size: '65 KB', dateModified: getCurrentDate(-10), type: 'Spreadsheet' },
    { id: 'F31', folderId: '8-1', name: 'BIR Form 1604-C.xlsx', size: '58 KB', dateModified: getCurrentDate(-9), type: 'Spreadsheet' },

    // Government Forms - SSS
    { id: 'F32', folderId: '8-2', name: 'SSS Registration Form.pdf', size: '180 KB', dateModified: getCurrentDate(-8), type: 'PDF' },
    { id: 'F33', folderId: '8-2', name: 'SSS Loan Application.pdf', size: '165 KB', dateModified: getCurrentDate(-7), type: 'PDF' },

    // Government Forms - PhilHealth
    { id: 'F34', folderId: '8-3', name: 'PhilHealth Form.pdf', size: '165 KB', dateModified: getCurrentDate(-6), type: 'PDF' },

    // Government Forms - Pag-IBIG
    { id: 'F35', folderId: '8-4', name: 'Pag-IBIG Form.pdf', size: '145 KB', dateModified: getCurrentDate(-4), type: 'PDF' },

    // Job Description
    { id: 'F36', folderId: '9', name: 'Software Developer JD.doc', size: '48 KB', dateModified: getCurrentDate(-25), type: 'Document' },
    { id: 'F37', folderId: '9', name: 'HR Manager JD.doc', size: '50 KB', dateModified: getCurrentDate(-23), type: 'Document' },
    { id: 'F38', folderId: '9', name: 'Accountant JD.doc', size: '46 KB', dateModified: getCurrentDate(-21), type: 'Document' },

    // System Generated Exports
    { id: 'F39', folderId: '10', name: 'Employee Roster January 2026.xlsx', size: '250 KB', dateModified: getCurrentDate(-2), type: 'Spreadsheet' },
    { id: 'F40', folderId: '10', name: 'Attendance Report December 2025.xlsx', size: '320 KB', dateModified: getCurrentDate(-5), type: 'Spreadsheet' },
    { id: 'F41', folderId: '10', name: 'Payroll Summary 2025.xlsx', size: '420 KB', dateModified: getCurrentDate(-7), type: 'Spreadsheet' },

    // VISA Requirements
    { id: 'F42', folderId: '11', name: 'Visa Application Checklist.doc', size: '42 KB', dateModified: getCurrentDate(-12), type: 'Document' },
    { id: 'F43', folderId: '11', name: 'Employment Verification Letter.doc', size: '38 KB', dateModified: getCurrentDate(-10), type: 'Document' },
    { id: 'F44', folderId: '11', name: 'Company Profile for Visa.pdf', size: '280 KB', dateModified: getCurrentDate(-8), type: 'PDF' },
]

export const EMAIL_RECIPIENTS = [
    {
        id: 1,
        account: {
            accountId: 0,
            name: 'All Accounts'
        },
        email: 'hr@gbss.com.au'
    }
]

export const BIOMETRICS_RECORDS = [
    {
        id: 1,
        workDate: getCurrentDate(-1),
        employee: EMPLOYEES[0],
        dateTime: `${getCurrentDate(-1)}T06:08:51`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 1249, name: 'New Acct' },
        location: 'PhilPlans'
    },
    {
        id: 2,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[1],
        dateTime: `${getCurrentDate()}T10:38:43`,
        logType: 'Lunch-In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 1248, name: 'Own Client' },
        location: 'PhilPlans'
    },
    {
        id: 3,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[2],
        dateTime: `${getCurrentDate()}T05:50:52`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 249, name: '3rd Accts' },
        location: 'HOME'
    },
    {
        id: 4,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[3],
        dateTime: `${getCurrentDate()}T06:58:27`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 245, name: 'McNamara Consulting firm' },
        location: 'Three NEO'
    },
    {
        id: 5,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[4],
        dateTime: `${getCurrentDate()}T05:45:48`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 243, name: 'Maxiron' },
        location: 'Three NEO'
    },
    {
        id: 6,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[5],
        dateTime: `${getCurrentDate()}T08:50:09`,
        logType: 'Lunch-In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 242, name: 'Amanah' },
        location: 'Three NEO'
    },
    {
        id: 7,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[6],
        dateTime: `${getCurrentDate()}T09:31:47`,
        logType: 'Lunch-Out',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 241, name: 'Penny Finance' },
        location: 'Three NEO'
    },
    {
        id: 8,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[7],
        dateTime: `${getCurrentDate()}T06:01:14`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 240, name: 'Borro Finance' },
        location: 'Three NEO'
    },
    {
        id: 9,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[8],
        dateTime: `${getCurrentDate()}T06:00:03`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 239, name: 'Seen Agency' },
        location: 'Three NEO'
    },
    {
        id: 10,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[9],
        dateTime: `${getCurrentDate()}T05:39:53`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 238, name: 'InXpress' },
        location: 'PhilPlans'
    },
    {
        id: 11,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[10],
        dateTime: `${getCurrentDate()}T05:40:45`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 236, name: 'Didasko Online' },
        location: 'HOME'
    },
    {
        id: 12,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[11],
        dateTime: `${getCurrentDate()}T05:12:34`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 235, name: 'RTO Works' },
        location: 'HOME'
    },
    {
        id: 13,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[12],
        dateTime: `${getCurrentDate()}T06:16:29`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 234, name: 'Zait Engineering' },
        location: 'PhilPlans'
    },
    {
        id: 14,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[13],
        dateTime: `${getCurrentDate()}T05:32:47`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 233, name: 'Capitalise Money' },
        location: 'HOME'
    },
    {
        id: 15,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[14],
        dateTime: `${getCurrentDate()}T06:06:20`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 231, name: 'ICL Lawyers' },
        location: 'Three NEO'
    },
    {
        id: 16,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[15],
        dateTime: `${getCurrentDate()}T06:14:23`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 230, name: 'Crew Financial' },
        location: 'Three NEO'
    },
    {
        id: 17,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[16],
        dateTime: `${getCurrentDate()}T05:58:31`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 1249, name: 'New Acct' },
        location: 'HOME'
    },
    {
        id: 18,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[17],
        dateTime: `${getCurrentDate()}T05:45:48`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 1248, name: 'Own Client' },
        location: 'HOME'
    },
    {
        id: 19,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[18],
        dateTime: `${getCurrentDate()}T06:24:41`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 249, name: '3rd Accts' },
        location: 'Three NEO'
    },
    {
        id: 20,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[19],
        dateTime: `${getCurrentDate()}T04:49:16`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 245, name: 'McNamara Consulting firm' },
        location: 'Three NEO'
    },
    {
        id: 21,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[20],
        dateTime: `${getCurrentDate()}T06:16:05`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 243, name: 'Maxiron' },
        location: 'PhilPlans'
    },
    {
        id: 22,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[21],
        dateTime: `${getCurrentDate()}T06:06:20`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 242, name: 'Amanah' },
        location: 'Three NEO'
    },
    {
        id: 23,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[22],
        dateTime: `${getCurrentDate()}T07:33:13`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 241, name: 'Penny Finance' },
        location: 'PhilPlans'
    },
    {
        id: 24,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[23],
        dateTime: `${getCurrentDate()}T05:04:07`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 240, name: 'Borro Finance' },
        location: 'Three NEO'
    },
    {
        id: 25,
        workDate: getCurrentDate(),
        employee: EMPLOYEES[24],
        dateTime: `${getCurrentDate()}T05:50:09`,
        logType: 'In',
        logMethod: 'GEARS',
        minutes: null,
        account: { accountId: 239, name: 'Seen Agency' },
        location: 'HOME'
    }
]

export const LOG_TYPE_OPTIONS = [
    'In',
    'Out',
    'Lunch-Out',
    'Lunch-In',
    'Break-Out',
    'Break-In'
]