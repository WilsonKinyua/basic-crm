<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useStore } from 'vuex';
import { useForm } from 'vee-validate'
import { Input } from '@/components/ui/input';
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

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

const onSubmit = handleSubmit((values) => {
    // create customer
    store.dispatch('customers/createCustomer', values)
    // show success message
    toast.success('Customer created successfully')
    // reset form
    resetForm()
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
        <Button type="submit" class="w-full">
            Create Customer
        </Button>
    </form>
</template>