import { Trash2, ArrowUpDown } from 'lucide-vue-next';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Interaction } from '@/types/Interaction';

export function createColumns({ deleteInteraction }: {deleteInteraction: (id: number) => void}): ColumnDef<Interaction>[] {
    return [
        {
            accessorKey: 'type',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Type', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]);
            },
            cell: ({ row }) => {
                return h(Badge, { class: 'text-left font-medium dark:text-white' }, row.getValue('type'));
            },
            size: 150,
        },
        {
            accessorKey: 'description',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Description', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]);
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, row.getValue('description'));
            },
            size: 300,
        },
        {
            accessorKey: 'date',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Date', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]);
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, new Date(row.getValue('date')).toLocaleDateString());
            },
            size: 150,
        },
        {
            accessorKey: 'updatedAt',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Updated At', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]);
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, new Date(row.getValue('updatedAt')).toLocaleDateString());
            },
            size: 150,
        },
        {
            accessorKey: 'actions',
            header: () => h('div', { class: 'text-right font-medium' }, 'Actions'),
            cell: ({ row }) => {
                return h('div', { class: 'text-right font-medium flex float-right space-x-3 items-center' }, [
                    h(Trash2, {
                        class: 'cursor-pointer ml-2 h-4 w-4 text-red-500',
                        onClick: () => {
                            deleteInteraction(row.original.id);
                        },
                    }),
                ]);
            },
            size: 100,
        },
    ];
}