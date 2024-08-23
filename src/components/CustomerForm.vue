<script setup lang="ts">
import { toast } from 'vue-sonner'
// @ts-ignore
import { useStore } from 'vuex';
import { useForm } from 'vee-validate'
import { Loader2 } from "lucide-vue-next"
import { Input } from '@/components/ui/input';
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { ref, watch } from 'vue';
import type { Customer } from '@/store/modules/customers';

const props = defineProps<{ customer?: Customer }>();

// form schema
const schema = z.object({
    name: z.string().nonempty('Name is required'),
    email: z.string().email('Invalid email').nonempty('Email is required'),
    phoneNumber: z.string().nonempty('Phone number is required'),
    companyName: z.string().optional()
})

const { handleSubmit, values, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues: {
        name: '',
        email: '',
        phoneNumber: '',
        companyName: ''
    }
})

const store = useStore();
const isLoading = ref(false);
const emit = defineEmits(['formSubmitted']); // emit event to parent component

watch(() => props.customer, (newCustomer) => {
    if (newCustomer) {
        setValues(newCustomer);
    } else {
        resetForm();
    }
}, { immediate: true });

const onSubmit = handleSubmit(async (values) => {
    isLoading.value = true;
    try {
        if (props.customer) {
            // update customer
            await store.dispatch('customers/updateCustomer', { id: props.customer.id, ...values });
            toast.success('Customer updated successfully');
        } else {
            // create customer
            await store.dispatch('customers/createCustomer', values);
            toast.success('Customer created successfully');
        }
        resetForm();
        emit('formSubmitted');
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message.join(', '));
        } else {
            toast.error('Failed to save customer. Please try again');
        }
    } finally {
        isLoading.value = false;
    }
})

</script>
<template>
    <form @submit="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="name">
            <FormItem>
                <FormLabel>Name <span class="text-red-500">*</span></FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Eg.John Doe" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
            <FormItem>
                <FormLabel>Email <span class="text-red-500">*</span></FormLabel>
                <FormControl>
                    <Input type="email" placeholder="Eg.johndoe@mail.com" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="phoneNumber">
            <FormItem>
                <FormLabel>Phone Number <span class="text-red-500">*</span></FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Eg. +1 234 567 890" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="companyName">
            <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Eg. Acme Inc." v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <Button type="submit" :disabled="isLoading" class="w-full">
            <div v-if="isLoading" class="flex items-center justify-center">
                Please wait
                <Loader2 class="w-4 h-4 mr-2 animate-spin ml-2" />
            </div>
            <span v-else>{{ props.customer ? 'Update Customer' : 'Create Customer' }}</span>
        </Button>
    </form>
</template>