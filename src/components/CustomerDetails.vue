<script setup lang="ts">
import { defineProps } from "vue";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
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
  </div>
</template>
