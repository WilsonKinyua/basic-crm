import type { Customer } from '@/store/modules/customers'
import { Trash } from 'lucide-vue-next'
import { Pencil } from 'lucide-vue-next'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: 'name',
        header: () => h('div', { class: 'text-left font-medium' }, 'Name'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, row.getValue('name'))
        },
    },
    {
        accessorKey: 'email',
        header: () => h('div', { class: 'text-left font-medium' }, 'Email'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium lowercase' }, row.getValue('email'))
        },
    },
    {
        accessorKey: 'phoneNumber',
        header: () => h('div', { class: 'text-left font-medium' }, 'Phone'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, row.getValue('phoneNumber'))
        },
    },
    {
        accessorKey: 'companyName',
        header: () => h('div', { class: 'text-right font-medium' }, 'Company'),
        cell: ({ row }) => {
            const companyName = row.getValue('companyName')
            return h('div', { class: 'text-right font-medium' }, companyName ? companyName.toString() : '-')
        },
    },
    {
        accessorKey: 'createdAt',
        header: () => h('div', { class: 'text-left font-medium' }, 'Created At'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, new Date(row.getValue('createdAt')).toDateString())
        },
    },
    {
        accessorKey: 'updatedAt',
        header: () => h('div', { class: 'text-left font-medium' }, 'Updated At'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, new Date(row.getValue('updatedAt')).toDateString())
        },
    },
    {
        accessorKey: 'actions',
        header: () => h('div', { class: 'text-right font-medium' }, 'Actions'),
        cell: ({ row }) => {
            return h('div', { class: 'text-right font-medium flex float-right' }, [
                h(Pencil, {
                    class: 'cursor-pointer h-4 w-4 text-blue-500',
                    onClick: () => {
                        console.log('Edit', row.original)
                    },
                }),
                h(Trash, {
                    class: 'cursor-pointer ml-2 h-4 w-4 text-red-500',
                    onClick: () => {
                        console.log('Delete', row.original)
                    },
                }),
            ])
        },
    },
]