<script setup lang="ts">
// @ts-ignore
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
import { ref } from 'vue';

// form schema
const schema = z.object({
    name: z.string().nonempty('Name is required'),
    email: z.string().email('Invalid email').nonempty('Email is required'),
    phoneNumber: z.string().nonempty('Phone number is required'),
    companyName: z.string().optional()
})

const { handleSubmit, values, resetForm } = useForm({
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

const onSubmit = handleSubmit(async (values) => {
    isLoading.value = true;
    try {
        // create customer
        await store.dispatch('customers/createCustomer', values)
        // show success message
        toast.success('Customer created successfully')
        // reset form
        resetForm()
        // emit event to parent component
        emit('formSubmitted')
    } catch (error: any) {
        // check if error response exists and has a message
        if (error.response && error.response.data && error.response.data.message) {
            // show error message from response
            toast.error(error.response.data.message.join(', '));
        } else {
            // show generic error message
            toast.error('Failed to create customer. Please try again');
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
            <span v-else>Create Customer</span>
        </Button>
    </form>
</template>