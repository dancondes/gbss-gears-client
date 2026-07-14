import Alert from '@/components/Alert'
import EditableListTabModal from '@/components/EditableListTabModal'
import PageTemplate from '@/components/PageTemplate'
import Table from '@/components/Table'
import React, { useMemo } from 'react'
import UserForm from './components/UserForm'
import useSWR from 'swr'
import { getAllUsers } from '@/services/user-service'

export default function ManageUsers() {

    async function fetchUsers() {
        try {
            const users = await getAllUsers()
            const data = users?.data || []

            return data.map(user => ({
                ...user.employeeInfo,
                userId: user.userId,
                username: user.username,
                name: `${user?.employeeInfo.firstname} ${user?.employeeInfo.lastname}`,
                role: user.role,
            }))
        } catch {
            return []
        }
    }

    const { data, isValidating, mutate } = useSWR('manage-users', fetchUsers)

    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'username',
            header: 'Username',
        },
        {
            accessorKey: 'account',
            header: 'Account',
            cell: ({ getValue }) => getValue()?.name,
        }
    ], [])

    async function handleSave(data) {
        console.log('handleSave', data)
    }

    return (
        <PageTemplate
            title="Manage Users"
            mutate={mutate}
        >
            <div className="p-1 sm:p-3">
                <EditableListTabModal
                    data={data}
                    columns={columns}
                    FormComponent={UserForm}
                    // defaultItem={{
                    //     name: '',
                    //     email: '',
                    // }}
                    isLoading={isValidating}
                    singularName="User"
                    onSave={handleSave}
                    // isLoading={isValidating}
                    searchableFields={['name', 'username']}
                    tableProps={{
                        pageSize: 50,
                        // globalFilterColumns: ['name', 'email'],
                        // defaultSorting: [{ id: 'name' }],
                    }}
                    modalSize="lg"
                    canAdd={true}
                    canSave={true}
                    canDelete={false}
                />
            </div>
        </PageTemplate>
    )
}
