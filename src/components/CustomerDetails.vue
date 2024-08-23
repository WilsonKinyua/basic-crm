<script setup lang="ts">
import { defineProps, h } from 'vue';
import type { Customer } from '@/store/modules/customers';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import { Badge } from './ui/badge';

const props = defineProps<{ customer: Customer | null }>();
</script>

<template>
    <div class="grid lg:grid-cols-1 gap-5">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Customer Details
        </h2>
        <Card>
            <CardContent class="p-5">
                <div class="space-y-4">
                    <table class="min-w-full divide-y divide-gray-200">
                        <tbody class=" divide-y divide-gray-200">
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">Name:
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">{{
                                    customer?.name }}
                                </td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">Email:
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm  lowercase">{{
                                    customer?.email }}
                                </td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">Phone:
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">{{
                                    customer?.phoneNumber }}
                                </td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    Company:</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">{{
                                    customer?.companyName }}
                                </td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    Created At:</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    {{ customer && new Date(customer.createdAt).toDateString()
                                    }}
                                </td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    Updated At:</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    {{ customer && new Date(customer.updatedAt).toDateString()
                                    }}
                                </td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    Is a Lead:</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <Badge v-if="customer?.leads && customer?.leads?.length > 0">Yes</Badge>
                                    <Badge v-else variant="destructive">No</Badge>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Conversations / Interactions
        </h2>
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Type
                            </TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="lead in customer?.leads" :key="lead.id">
                            <TableCell>
                                {{ lead.name ?? customer?.name }}
                            </TableCell>
                            <TableCell>
                                {{ lead.email ?? customer?.email }}
                            </TableCell>
                            <TableCell>
                                {{ lead.phoneNumber ?? customer?.phoneNumber }}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
</template>
