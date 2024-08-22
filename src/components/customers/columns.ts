import type { Customer } from '@/store/modules/customers'
import { Trash, Pencil, ArrowUpDown, Eye } from 'lucide-vue-next'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, row.getValue('name'))
        },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => {
            return h('a', {
                href: `mailto:${row.getValue('email')}`,
                class: 'text-left font-medium lowercase hover:text-primary hover:underline',
            }, row.getValue('email'))
        },
    },
    {
        accessorKey: 'phoneNumber',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Phone', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, row.getValue('phoneNumber'))
        },
    },
    {
        accessorKey: 'companyName',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Company', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => {
            const companyName = row.getValue('companyName')
            return h('div', { class: 'text-left font-medium' }, companyName ? companyName.toString() : '-')
        },
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Created At', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, new Date(row.getValue('createdAt')).toDateString())
        },
    },
    {
        accessorKey: 'updatedAt',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Updated At', h(ArrowUpDown, { class: 'ml-2 h-4 w-4 ' })])
        },
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, new Date(row.getValue('updatedAt')).toDateString())
        },
    },
    {
        accessorKey: 'leads',
        header: () => h('div', { class: 'text-right font-medium' }, 'Is Lead?'),
        cell: ({ row }) => {
            const leads = row.getValue('leads') as any
            return h('div', { class: 'text-right font-medium' }, leads.length > 0 ? h(Badge, { variant: 'secondary', class: "bg-primary text-white" }, 'Yes') : h(Badge, { variant: 'destructive' }, 'No'))
        }
    },
    {
        accessorKey: 'actions',
        header: () => h('div', { class: 'text-right font-medium' }, 'Actions'),
        cell: ({ row }) => {
            return h('div', { class: 'text-right font-medium flex float-right space-x-3 items-center' }, [
                h(Eye, {
                    class: 'cursor-pointer h-4 w-4 text-primary',
                    onClick: () => {
                        console.log('View', row.original)
                    },
                }),
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