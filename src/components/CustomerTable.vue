<script setup lang="ts">
import { computed, ref } from 'vue';
// @ts-ignore
import { useStore } from 'vuex';
import DataTable from '@/components/ui/table/DataTable.vue'
import { Input } from '@/components/ui/input';
import { createColumns } from '@/components/customers/columns';
import type { Customer } from '@/store/modules/customers';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, } from '@/components/ui/sheet'
import CustomerForm from '@/components/CustomerForm.vue';

const props = defineProps<{ limit?: number }>();

const store = useStore();
const customers = computed(() => store.getters['customers/allCustomers']);
const searchQuery = ref('');
const isSheetOpen = ref(false);
const selectedCustomer = ref<Customer | null>(null);

// view customer details
const viewCustomer = (id: number) => {
};

// edit customer details
const editCustomer = (customer: Customer) => {
    selectedCustomer.value = customer;
    isSheetOpen.value = true;
};

// delete customer
const deleteCustomer = (id: number) => {
    if (confirm('Are you sure you want to delete this customer?')) {
        store.dispatch('customers/deleteCustomer', id);
    }
};

// fetch customers from the store
const getCustomers = () => {
    store.dispatch('customers/fetchCustomers');
};

// Filter customers based on search query and limit to the specified number of latest customers
const filteredCustomers = computed(() => {
    const query = searchQuery.value.toLowerCase();
    const filtered = customers.value.filter((customer: Customer) => {
        return (
            customer.name.toLowerCase().includes(query) ||
            customer.phoneNumber.toLowerCase().includes(query) ||
            customer.email.toLowerCase().includes(query) ||
            customer.companyName && customer.companyName.toLowerCase().includes(query)
        );
    });
    return props.limit ? filtered.slice(0, props.limit) : filtered;
});

// Create columns for the DataTable component with edit and delete actions
const columns = createColumns({ viewCustomer, deleteCustomer, editCustomer });

const handleFormSubmitted = () => {
    isSheetOpen.value = false;
    getCustomers();
    selectedCustomer.value = null;
};

getCustomers()
</script>

<template>
    <div class="h-full flex-1 flex-col space-y-8 md:flex">
        <Input v-model="searchQuery" type="text" placeholder="Search customers..." class="lg:w-1/3" />
        <DataTable :columns="columns" :data="filteredCustomers" />
        <Sheet v-model:open="isSheetOpen">
            <SheetContent>
                <SheetHeader class="text-left">
                    <SheetTitle>
                        {{ selectedCustomer ? 'Edit Customer' : 'Create a new customer' }}
                    </SheetTitle>
                    <SheetDescription>
                        <p class="mb-5">
                            Fill in the form below to {{ selectedCustomer ? 'edit' : 'create' }} a customer.
                        </p>
                        <CustomerForm :customer="selectedCustomer" @formSubmitted="handleFormSubmitted"
                            v-if="selectedCustomer" />
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    </div>
</template>