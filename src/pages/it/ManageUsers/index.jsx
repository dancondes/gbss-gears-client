import EditableListTabModal from '@/components/EditableListTabModal'
import PageTemplate from '@/components/PageTemplate'
import React, { useMemo, useState } from 'react'
import UserForm from './components/UserForm'
import useSWR from 'swr'
import { createUser, getAllUsers, getUserById, updateUser } from '@/services/user-service'
import { impersonateUser } from '@/services/auth-service'
import { getRoles, useFetchEmployeeOptions } from '@/services/lookups-service'
import { useFetchOptions } from '@/hooks/use-fetch-options'
import { toast } from 'sonner'
import { useAuthStore } from '@/store'
import { useRefreshToken } from '@/hooks/use-refresh-token'
import { useSWRConfig } from 'swr'
import useTabNavigation from '@/hooks/use-tab-navigation'

export default function ManageUsers() {
    const user = useAuthStore((state) => state.user)
    const canImpersonate = useAuthStore((state) => state.canImpersonate())
    const beginImpersonation = useAuthStore((state) => state.beginImpersonation)
    const { refresh } = useRefreshToken()
    const { mutate: mutateAll } = useSWRConfig()
    const { navigate } = useTabNavigation()
    const [impersonatingUserId, setImpersonatingUserId] = useState(null)

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
                hasEvac: user?.hasEvac || false,
            }))
        } catch {
            return []
        }
    }

    const { data, isValidating, mutate } = useSWR('manage-users', fetchUsers)
    const { options: roleOptions } = useFetchOptions(getRoles)
    const { options: employeeOptions } = useFetchEmployeeOptions({
        valueKey: 'pId'
    })

    async function handleSave(data) {
        const id = data?.id

        const params = {
            username: data.username,
            roleId: data.roleId,
            password: data.password?.trim() || '',
            pin: data.pin?.trim() || '',
            hasEvac: data.hasEvac || false,
            personId: id ? undefined : data.personId // Only include personId when creating a new user
        }

        await (id ? updateUser(id, params) : createUser(params))
        if (user?.employeeInfo?.personId === data.personId) {
            await refresh()
        }
        toast.success(`User ${id ? 'updated' : 'created'} successfully`)
        mutate()
    }

    async function handleImpersonate(row) {
        const userId = row?.userId
        if (!userId || impersonatingUserId) return
        setImpersonatingUserId(row.userId)

        try {
            const result = await impersonateUser(row.userId)

            if (!result?.data?.token) {
                throw new Error('Failed to log in as the selected user.')
            }

            const fetchedUser = (await getUserById(userId))?.data?.[0]

            // clear the SWR cache for all keys to ensure fresh data is fetched after impersonation
            await mutateAll(function () { return true }, undefined, { revalidate: false })

            beginImpersonation(result.data.token, fetchedUser)
            toast.success(`Logged in as ${row.name}`)
            navigate('/clock-in-out', {
                id: 'Clock-In-Out',
                label: 'Clock In/Out',
            })
        } catch {
            toast.error('Failed to log in as the selected user.')
        } finally {
            setImpersonatingUserId(null)
        }
    }

    function renderImpersonateAction({ row }) {
        function handleClick(event) {
            event.stopPropagation()
            handleImpersonate(row.original)
        }

        const isLoading = impersonatingUserId === row.original.userId

        return (
            <div className="text-center">
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={Boolean(impersonatingUserId)}
                    className="btn-white btn-small whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    title={`Impersonate ${row.original.name}`}
                >
                    {isLoading ? 'Starting...' : 'Impersonate'}
                </button>
            </div>
        )
    }

    function handleRowClick(row) {
        return {
            id: row.userId,
            username: row.username,
            roleId: row.role?.id,
            personId: row.personId,
            hasEvac: row.hasEvac || false,
        }
    }

const columns = useMemo(() => {
    const baseColumns = [
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
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ getValue }) => getValue()?.description,
        }
    ]

    if (!canImpersonate) return baseColumns

    return [
        ...baseColumns,
        {
            id: 'impersonate',
            header: () => <div className="text-right">Impersonate</div>,
            cell: renderImpersonateAction,
            size: 140,
            enableSorting: false,
        },
    ]
}, [impersonatingUserId, canImpersonate])

    return (
        <PageTemplate
            title="Manage Users"
            subtitle="Create and manage user accounts"
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
                        columnFilters: {
                            role: {
                                label: 'Role',
                                options: roleOptions,
                                filterAccessor: (val) => val.id,
                            }
                        }
                    }}
                    modalSize="xl"
                    canAdd={true}
                    canSave={true}
                    canDelete={false}
                    formProps={{
                        roleOptions,
                        employeeOptions
                    }}
                    onRowClick={handleRowClick}
                />
            </div>
        </PageTemplate>
    )
}
