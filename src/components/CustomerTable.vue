<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import DataTable from '@/components/ui/table/DataTable.vue'
import { Input } from '@/components/ui/input';
import { columns } from '@/components/customers/columns';
import type { Customer } from '@/store/modules/customers';

const store = useStore();
const customers = computed(() => store.getters['customers/allCustomers']);
const searchQuery = ref('');

const editCustomer = (customer: Customer) => {
};

const deleteCustomer = (id: number) => {
    store.dispatch('customers/deleteCustomer', id);
};

const getCustomers = () => {
    store.dispatch('customers/fetchCustomers');
};

// Filter customers based on search query
const filteredCustomers = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return customers.value.filter((customer: Customer) => {
        return (
            customer.name.toLowerCase().includes(query) ||
            customer.phoneNumber.toLowerCase().includes(query) ||
            customer.email.toLowerCase().includes(query) ||
            customer.companyName && customer.companyName.toLowerCase().includes(query)
        );
    });
});

getCustomers()
</script>

<template>
    <div class="h-full flex-1 flex-col space-y-8 md:flex">
        <h2 class="text-2xl font-bold tracking-tight">
            Latest Customers
        </h2>
        <Input v-model="searchQuery" type="text" placeholder="Search customers..." class="lg:w-1/3" />
        <DataTable :columns="columns" :data="filteredCustomers" />
    </div>
</template>