<script setup lang="ts">
import { defineProps } from "vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import { Badge } from "./ui/badge";
import type { Customer } from "@/types/Customer";

defineProps<{ customer: Customer | null }>();
</script>

<template>
  <div class="grid lg:grid-cols-1 gap-5">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
      Customer Details
    </h2>
    <Card>
      <CardContent class="p-5">
        <div class="space-y-4">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell class="font-medium">Name:</TableCell>
                <TableCell>{{ customer?.name }}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Email:</TableCell>
                <TableCell class="lowercase">{{ customer?.email }}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Phone:</TableCell>
                <TableCell>{{ customer?.phoneNumber }}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Company:</TableCell>
                <TableCell>{{ customer?.companyName }}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Created At:</TableCell>
                <TableCell>{{
                  customer && new Date(customer.createdAt).toDateString()
                }}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Updated At:</TableCell>
                <TableCell>{{
                  customer && new Date(customer.updatedAt).toDateString()
                }}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Is a Lead:</TableCell>
                <TableCell>
                  <Badge v-if="customer?.leads && customer?.leads?.length > 0"
                    >Yes</Badge
                  >
                  <Badge v-else variant="destructive">No</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="lead in customer?.leads" :key="lead.id">
              <TableCell>{{ lead.name ?? customer?.name }}</TableCell>
              <TableCell>{{ lead.email ?? customer?.email }}</TableCell>
              <TableCell>{{
                lead.phoneNumber ?? customer?.phoneNumber
              }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
