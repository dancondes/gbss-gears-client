import Alert from '@/components/Alert'
import EditableListTabModal from '@/components/EditableListTabModal'
import PageTemplate from '@/components/PageTemplate'
import Table from '@/components/Table'
import React, { useMemo } from 'react'
import UserForm from './components/UserForm'

export default function ManageUsers() {

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
        }
    ], [])

    const data = [
        {
            name: 'John Doe',
            username: 'johndoe',
            account: 'GBSS'
        },
        {
            name: 'Jane Smith',
            username: 'janesmith',
            account: 'GBSS'
        },
        {
            name: 'Bob Johnson',
            username: 'bobjohnson',
            account: 'GBSS'
        }
    ]

    async function handleSave(data) {
        console.log('handleSave', data)
    }

    return (
        <PageTemplate
            title="Manage Users"
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
                    singularName="User"
                    onSave={handleSave}
                    // isLoading={isValidating}
                    searchableFields={['name', 'username']}
                    // tableProps={{
                    //     pageSize: 50,
                    //     globalFilterColumns: ['name', 'email'],
                    //     defaultSorting: [{ id: 'name' }],
                    // }}
                    modalSize="lg"
                    canAdd={true}
                    canSave={true}
                    canDelete={false}
                />
            </div>
        </PageTemplate>
    )
}
