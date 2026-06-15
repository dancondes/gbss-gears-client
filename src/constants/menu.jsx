export const MENU_ITEMS = [
    {
        name: 'Home',
        submenu: [
            {
                name: "System",
                submenu: [
                    {
                        id: 'Reload',
                        name: "Reload",
                        action: 'reload',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        )
                    }
                ]
            },
            // {
            //     name: "Dashboard",
            //     submenu: [
            //         {
            //             name: "Dashboard",
            //             path: '/home/dashboard',
            //             icon: (
            //                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //                     <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            //                 </svg>
            //             )
            //         }
            //     ]
            // },
            {
                name: "Conference",
                submenu: [
                    {
                        id: 'Booking',
                        name: "Booking",
                        path: '/home/conference/booking',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        )
                    }
                ]
            },
            {
                name: "Biometrics",
                submenu: [
                    {
                        id: 'Records',
                        name: "Records",
                        path: '/home/biometrics/records',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        )
                    }
                ]
            },
            {
                name: "HR System",
                submenu: [
                    {
                        id: 'HR',
                        name: "HR",
                        path: '/home/hr-system/hr',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        )
                    }
                ]
            },
            {
                name: "Quick Reference",
                submenu: [
                    // {
                    //     id: 'Information',
                    //     name: "Information",
                    //     path: '/home/quick-reference/information',
                    //     icon: (
                    //         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    //         </svg>
                    //     )
                    // },
                    {
                        id: 'Contacts',
                        name: "Contacts",
                        path: '/home/quick-reference/contacts',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        )
                    }
                ]
            },
            // {
            //     name: "Payroll",
            //     submenu: [
            //         {
            //             name: "Payroll",
            //             path: '/home/payroll',
            //             icon: (
            //                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            //                 </svg>
            //             )
            //         }
            //     ]
            // },
        ]
    },
    {
        name: 'Reports',
        submenu: [
            {
                name: 'Reports',
                submenu: [
                    // {
                    //     name: 'Select',
                    //     path: '/reports/admin/select',
                    //     icon: (
                    //         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    //         </svg>
                    //     )
                    // },
                    // {
                    //     name: 'Excel',
                    //     path: '/reports/admin/excel',
                    //     icon: (
                    //         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    //         </svg>
                    //     )
                    // },
                    {
                        id: 'Finance-And-Accounting',
                        name: 'Finance and Accounting',
                        path: '/reports/admin/finance-and-accounting',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h5l2 2h11v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2z" />
                            </svg>
                        )
                    },
                    {
                        id: 'Human-Resource-And-Recruitment',
                        name: 'Human Resource and Recruitment',
                        path: '/reports/admin/human-resource-and-recruitment',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h5l2 2h11v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2z" />
                            </svg>
                        )
                    },
                    // {
                    //     name: 'Build',
                    //     path: '/reports/admin/build',
                    //     icon: (
                    //         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    //         </svg>
                    //     )
                    // }
                ]
            },
        ]
    },
    // {
    //     name: 'Voucher',
    //     submenu: [
    //         {
    //             name: 'Voucher',
    //             submenu: [
    //                 {
    //                     name: 'New',
    //                     path: '/voucher/new',
    //                     icon: (
    //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    //                         </svg>
    //                     )
    //                 },
    //                 {
    //                     name: 'View',
    //                     path: '/voucher/view',
    //                     icon: (
    //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    //                         </svg>
    //                     )
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     name: 'Invoicing',
    //     submenu: [
    //         {
    //             name: 'Invoicing',
    //             submenu: [
    //                 {
    //                     name: 'Create New',
    //                     path: '/invoicing/create-new',
    //                     icon: (
    //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    //                         </svg>
    //                     )
    //                 },
    //                 {
    //                     name: 'View Invoices',
    //                     path: '/invoicing/view-invoices',
    //                     icon: (
    //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    //                         </svg>
    //                     )
    //                 },
    //                 {
    //                     name: 'Unpaid Invoices',
    //                     path: '/invoicing/unpaid-invoices',
    //                     icon: (
    //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    //                         </svg>
    //                     )
    //                 },
    //                 {
    //                     name: 'Client History',
    //                     path: '/invoicing/client-history',
    //                     icon: (
    //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    //                         </svg>
    //                     )
    //                 },
    //                 {
    //                     name: 'Outgoings',
    //                     path: '/invoicing/outgoings',
    //                     icon: (
    //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    //                         </svg>
    //                     )
    //                 },
    //                 {
    //                     name: '13th Month',
    //                     path: '/invoicing/13th-month',
    //                     icon: (
    //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    //                         </svg>
    //                     )
    //                 },
    //                 {
    //                     name: 'For Invoicing',
    //                     path: '/invoicing/for-invoicing',
    //                     icon: (
    //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    //                         </svg>
    //                     )
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     name: 'Fund Request',
    //     submenu: [
    //         {
    //             name: 'Fund Request',
    //             submenu: [
    //                 {
    //                     name: 'New',
    //                     path: '/fund-request/new',
    //                     icon: (
    //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    //                         </svg>
    //                     )
    //                 },
    //                 {
    //                     name: 'View',
    //                     path: '/fund-request/view',
    //                     icon: (
    //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    //                         </svg>
    //                     )
    //                 }
    //             ]
    //         }
    //     ]
    // },
    {
        name: 'Staff Bulletin',
        submenu: [
            {
                name: 'Staff Bulletin',
                submenu: [
                    {
                        id: 'Staff-Bulletin-New',
                        name: 'New',
                        action: 'openStaffBulletinModal',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        )
                    },
                    {
                        id: 'Staff-Bulletin',
                        name: 'View',
                        path: '/staff-bulletin/view',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        )
                    }
                ]
            }
        ]
    },
    {
        name: 'Client Bulletin',
        submenu: [
            {
                name: 'Client Bulletin',
                submenu: [
                    {
                        id: 'Client-Bulletin-New',
                        name: 'New',
                        action: 'openClientBulletinModal',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        )
                    },
                    {
                        id: 'Client-Bulletin',
                        name: 'View',
                        path: '/client-bulletin/view',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        )
                    }
                ]
            }
        ]
    },
    // {
    //     name: 'Marketing Bulletin',
    //     submenu: [
    //         {
    //             name: 'Marketing Bulletin',
    //             submenu: [
    //                 {
    //                     name: 'New',
    //                     path: '/marketing-bulletin/new',
    //                     icon: (
    //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    //                         </svg>
    //                     )
    //                 },
    //                 {
    //                     name: 'View',
    //                     path: '/marketing-bulletin/view',
    //                     icon: (
    //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    //                         </svg>
    //                     )
    //                 },
    //                 {
    //                     name: 'Emails',
    //                     path: '/marketing-bulletin/emails',
    //                     icon: (
    //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    //                         </svg>
    //                     )
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     name: 'SMS Feature',
    //     submenu: [
    //         {
    //             name: 'SMS',
    //             submenu: [
    //                 {
    //                     name: 'SMS Logs',
    //                     path: '/sms-feature/sms/logs',
    //                     icon: (
    //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    //                         </svg>
    //                     )
    //                 }
    //             ]
    //         },
    //     ]
    // },
    {
        name: 'Tools',
        submenu: [
            {
                name: 'Admin',
                submenu: [
                    {
                        id: 'Users',
                        name: 'Users',
                        path: '/tools/admin/users',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        )
                    },
                    {
                        id: 'Roles',
                        name: 'Roles',
                        path: '/tools/admin/roles',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        )
                    },
                    {
                        id: 'Permissions',
                        name: 'Permissions',
                        path: '/tools/admin/permissions',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        )
                    },
                    // {
                    //     id: 'User-Permissions',
                    //     name: 'User Permissions',
                    //     path: '/tools/admin/user-permissions',
                    //     icon: (
                    //         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    //         </svg>
                    //     )
                    // },
                    {
                        id: 'Web-Users',
                        name: 'Web Users',
                        path: '/tools/admin/web-users',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        )
                    },
                    {
                        id: 'GBSSP-ID',
                        name: 'GBSSP ID',
                        path: '/tools/admin/gbssp-id',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                        )
                    },
                ]
            },
            // {
            //     name: 'Emails',
            //     submenu: [
            //         {
            //             id: 'Recipients',
            //             name: 'Recipients',
            //             path: '/tools/emails/recipients',
            //             icon: (
            //                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            //                 </svg>
            //             )
            //         },
            //         {
            //             id: 'Logs',
            //             name: 'Logs',
            //             path: '/tools/emails/logs',
            //             icon: (
            //                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            //                 </svg>
            //             )
            //         },
            //     ]
            // },
            {
                name: 'Accounting',
                submenu: [
                    {
                        id: 'Upload-Payroll',
                        name: 'Upload Payroll',
                        path: '/tools/accounting/upload-payroll',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        )
                    },
                ]
            },
            // {
            //     name: 'Others',
            //     submenu: [
            //         {
            //             name: 'Monthly Raffle',
            //             path: '/tools/others/monthly-raffle',
            //             icon: (
            //                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            //                 </svg>
            //             )
            //         },
            //         {
            //             name: 'GEARS Announcements',
            //             path: '/tools/others/gears-announcements',
            //             icon: (
            //                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            //                 </svg>
            //             )
            //         },
            //     ]
            // },
            // {
            //     name: 'Template',
            //     submenu: [
            //         {
            //             name: 'Template Editor',
            //             path: '/tools/template/editor',
            //             icon: (
            //                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            //                 </svg>
            //             )
            //         },
            //     ]
            // },
        ]
    },
    {
        name: 'Settings',
        submenu: [
            {
                name: 'Maintenance',
                submenu: [
                    {
                        id: 'Civil-Status',
                        name: 'Civil Status',
                        path: '/settings/maintenance/civil-status',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        )
                    },
                    {
                        id: 'Countries',
                        name: 'Countries',
                        path: '/settings/maintenance/countries',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )
                    },
                    {
                        id: 'Deduction-Types',
                        name: 'Deduction Types',
                        path: '/settings/maintenance/deduction-types',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        )
                    },
                    {
                        id: 'Document-Types',
                        name: 'Document Types',
                        path: '/settings/maintenance/document-types',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        )
                    },
                    {
                        id: 'Holiday-Types',
                        name: 'Holiday Types',
                        path: '/settings/maintenance/holiday-types',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        )
                    },
                    // {
                    //     name: 'Infringement Types',
                    //     path: '/settings/maintenance/infringement-types',
                    //     icon: (
                    //         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    //         </svg>
                    //     )
                    // },
                    // {
                    //     name: 'Inventory Locations',
                    //     path: '/settings/maintenance/inventory-locations',
                    //     icon: (
                    //         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    //         </svg>
                    //     )
                    // },
                    // {
                    //     name: 'Inventory Type',
                    //     path: '/settings/maintenance/inventory-type',
                    //     icon: (
                    //         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    //         </svg>
                    //     )
                    // },
                    {
                        id: 'Late-Reasons',
                        name: 'Late Reasons',
                        path: '/settings/maintenance/late-reasons',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )
                    },
                    {
                        id: 'Leave-Types',
                        name: 'Leave Types',
                        path: '/settings/maintenance/leave-types',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        )
                    },
                    {
                        id: 'Positions',
                        name: 'Positions',
                        path: '/settings/maintenance/positions',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        )
                    },
                    {
                        id: 'Punctuality-Types',
                        name: 'Punctuality Types',
                        path: '/settings/maintenance/punctuality-types',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )
                    },
                    // {
                    //     name: 'Purpose of Sched',
                    //     path: '/settings/maintenance/purpose-of-sched',
                    //     icon: (
                    //         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    //         </svg>
                    //     )
                    // },
                    {
                        id: 'Statuses',
                        name: 'Statuses',
                        path: '/settings/maintenance/statuses',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )
                    },
                    // {
                    //     name: 'Transaction Types',
                    //     path: '/settings/maintenance/transaction-types',
                    //     icon: (
                    //         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    //         </svg>
                    //     )
                    // },
                    // {
                    //     name: 'Transaction Subtypes',
                    //     path: '/settings/maintenance/transaction-subtypes',
                    //     icon: (
                    //         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    //         </svg>
                    //     )
                    // },
                    {
                        id: 'Workschedule-Types',
                        name: 'Workschedule Types',
                        path: '/settings/maintenance/workschedule-types',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )
                    }
                ]
            },
            {
                name: 'Application',
                submenu: [
                    {
                        id: 'Settings',
                        name: 'Settings',
                        path: '/app-settings',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        )
                    }
                ]
            },
        ]
    },
    {
        name: 'Tasks',
        submenu: [
            // {
            //     name: 'User Request',
            //     submenu: [
            //         {
            //             id: 'Request',
            //             name: 'Request',
            //             path: '/tasks/user-request',
            //             icon: (
            //                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            //                 </svg>
            //             )
            //         }
            //     ]
            // },
            {
                name: 'Daily Logs',
                submenu: [
                    {
                        id: 'Tasks',
                        name: 'Daily Logs',
                        path: '/records/tasks',
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        )
                    }
                ]
            }
        ]
    },
    {
        name: 'SharePoint Sites',

        submenu: [
            {
                name: "Process and Procedure",
                submenu: [
                    {
                        id: 'Process-And-Procedure',
                        name: "Process and Procedure",
                        // action: 'processAndProcedure',
                        path: 'https://galileebusiness.sharepoint.com/sites/ProcessandProcedurePortal/default.aspx?PageView=Shared&InitialTabId=Ribbon.WebPartPage&VisibilityContext=WSSWebPartPage',
                        inNewTab: true,
                        icon: (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )
                    }
                ]
            },
        ]
    },
];

// Sidebar menu items (Records section)
export const SIDEBAR_MENU_ITEMS = [
    {
        title: 'Records',
        items: [
            {
                id: 'Tasks',
                name: 'Tasks',
                path: '/records/tasks',
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
            },
            {
                id: 'Employees',
                name: 'Employees',
                path: '/records/employees',
                icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
            },
            {
                id: 'Applicants',
                name: 'Applicants',
                path: '/records/applicants',
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
            },
            {
                id: 'Applicant-Scheds',
                name: 'Applicant Scheds',
                path: '/records/applicant-scheds',
                icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
            },
            {
                id: 'Attendance',
                name: 'Attendance',
                path: '/records/attendance',
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
            },
            {
                id: 'Clients',
                name: 'Clients',
                path: '/records/clients',
                icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
            },
            {
                id: 'Email-Subscriptions',
                name: 'Email Subscriptions',
                path: '/records/email-subscriptions',
                icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
            },
            {
                id: 'Holidays',
                name: 'Holidays',
                path: '/records/holidays',
                icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
            },
            {
                id: 'Late-Notifications',
                name: 'Late Notifications',
                path: '/records/late-notifications',
                icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
            },
            {
                id: 'Vacant-Positions',
                name: 'Vacant Positions',
                path: '/records/vacant-positions',
                icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
            },
            {
                id: 'Visits-Meetings',
                name: 'Visits / Meetings',
                path: '/records/visits-meetings',
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
            },
            {
                id: 'Documents',
                name: 'Documents',
                path: '/records/documents',
                icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
            },
        ],
    },
];


export const EMPLOYEE_TABS = [
    {
        id: 'Employee-Details-Tab',
        name: 'Details'
    },
    {
        id: 'Employee-Address-Tab',
        name: 'Address'
    },
    {
        id: 'Employee-Work-Schedule-Tab',
        name: 'Work Schedule'
    },
    {
        id: 'Employee-Attendance-Tab',
        name: 'Attendance'
    },
    {
        id: 'Employee-Leave-Credits-Tab',
        name: 'Leave Credits'
    },
    {
        id: 'Employee-Leaves-Tab',
        name: 'Leaves'
    },
    // { name: 'Leave Payout' }, // Meeting with Sir Dan March 5, 2026: this tab is not needed
    {
        id: 'Employee-Salary-Tab',
        name: 'Salary'
    },
    {
        id: 'Employee-13th-Month-Tab',
        name: '13th Month'
    },
    {
        id: 'Employee-Loans-Tab',
        name: 'Loans'
    },
    {
        id: 'Employee-Documents-Tab',
        name: 'Documents'
    },
    {
        id: 'Employee-HR-Tab',
        name: 'HR'
    },
    {
        id: 'Employee-IT-Tab',
        name: 'IT'
    },
    {
        id: 'Employee-Referrals-Tab',
        name: 'Referrals'
    },
    {
        id: 'Employee-HMO-Tab',
        name: 'HMO'
    },
    {
        id: 'Employee-Overtime-Tab',
        name: 'Overtime'
    },
    {
        id: 'Employee-Departure-Tab',
        name: 'Departure'
    },
    {
        id: 'Employee-Probation-Summary-Tab',
        name: 'Probation Summary'
    },
    {
        id: 'Employee-Clinic-Tab',
        name: 'Clinic'
    },
]

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