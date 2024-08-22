<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import DataTable from '@/components/ui/table/DataTable.vue'
import { columns } from '@/components/customers/columns';
import type { Customer } from '@/store/modules/customers';

const store = useStore();
const customers = computed(() => store.getters['customers/allCustomers']);

const editCustomer = (customer: Customer) => {
};

const deleteCustomer = (id: number) => {
    store.dispatch('customers/deleteCustomer', id);
};

const getCustomers = () => {
    store.dispatch('customers/fetchCustomers');
};

getCustomers()
</script>

<template>
    <div class="h-full flex-1 flex-col space-y-8 md:flex">
        <h2 class="text-2xl font-bold tracking-tight">
            Latest Customers
        </h2>
        <DataTable :columns="columns" :data="customers" />
    </div>
</template>