import { Trash, Pencil, ArrowUpDown, Eye } from 'lucide-vue-next'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Lead } from '@/types/Lead'

export function createColumns({ viewLead, deleteLead, editLead }: { viewLead: (id: number) => void, deleteLead: (id: number) => void, editLead: (lead: Lead) => void }): ColumnDef<Lead>[] {
    return [
        {
            accessorKey: 'name',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, row.getValue('name') || row.original.customer?.name || 'Unnamed Lead')
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
            accessorKey: 'customer',
            header: () => h('div', { class: 'text-right font-medium' }, 'Customer'),
            cell: ({ row }) => {
                const customer = row.getValue('customer') as any
                return h('div', { class: 'text-right font-medium' }, customer ? h(Badge, { variant: 'secondary', class: "bg-primary text-white" }, customer.name) : h(Badge, { variant: 'destructive' }, 'No Customer'))
            }
        },
        {
            accessorKey: 'actions',
            header: () => h('div', { class: 'text-right font-medium' }, 'Actions'),
            cell: ({ row }) => {
                return h('div', { class: 'text-right font-medium flex float-right space-x-3 items-center' }, [
                    h(Pencil, {
                        class: 'cursor-pointer h-4 w-4 text-blue-500',
                        onClick: () => {
                            editLead(row.original);
                        },
                    }),
                    h(Trash, {
                        class: 'cursor-pointer ml-2 h-4 w-4 text-red-500',
                        onClick: () => {
                            deleteLead(row.original.id);
                        },
                    }),
                ])
            },
        },
    ]
}