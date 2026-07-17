import EditableListTabModal from '@/components/EditableListTabModal'
import PageTemplate from '@/components/PageTemplate'
import React, { useMemo } from 'react'
import UserForm from './components/UserForm'
import useSWR from 'swr'
import { createUser, getAllUsers, updateUser } from '@/services/user-service'
import { getRoles } from '@/services/lookups-service'
import { useFetchOptions } from '@/hooks/use-fetch-options'
import { toast } from 'react-toastify'

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
    const { options: roleOptions } = useFetchOptions(getRoles)

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
        const id = data?.id

        const params = {
            username: data.username,
            roleId: data.roleId,
            password: data.password || null,
            pin: data.pin || null,
            personId: id ? undefined : data.personId // Only include personId when creating a new user
        }

        await (id ? updateUser(id, params) : createUser(params))
        toast.success(`User ${id ? 'updated' : 'created'} successfully`)
        mutate()
    }

    function handleRowClick(row) {
        return {
            id: row.userId,
            username: row.username,
            roleId: row.role?.id,
            personId: row.personId,
        }
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
                    isLoading={isValidating}
                    singularName="User"
                    onSave={handleSave}
                    searchableFields={['name', 'username']}
                    tableProps={{
                        pageSize: 50,
                    }}
                    modalSize="xl"
                    canAdd={true}
                    canSave={true}
                    canDelete={false}
                    formProps={{
                        roleOptions,
                    }}
                    onRowClick={handleRowClick}
                />
            </div>
        </PageTemplate>
    )
}
