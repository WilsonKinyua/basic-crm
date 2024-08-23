<script setup lang="ts">
// @ts-ignore
import { useStore } from "vuex";
import { useForm } from "vee-validate";
import { Loader2 } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ref, computed, onMounted } from "vue";
import type { Customer } from "@/types/Customer";
import { toast } from "vue-sonner";

const schema = z.object({
  name: z.string().min(3, "Name is required").max(255, "Name is too long"),
  email: z.string().email("Invalid email").optional(),
  phoneNumber: z.string().optional(),
  companyName: z.string().optional(),
  customerId: z.number().min(1, "Customer is required"),
});

const { handleSubmit, values, resetForm } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    customerId: 0,
  },
});

const store = useStore();
const isLoading = ref(false);
const emit = defineEmits(["formSubmitted"]); // emit event to parent component

const customers = computed(() => store.getters["customers/allCustomers"]);

onMounted(() => {
  store.dispatch("customers/fetchCustomers");
});

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    await store.dispatch("leads/createLead", values);
    resetForm();
    emit("formSubmitted");
  } catch (error: any) {
    toast.error(error);
    console.error("Failed to save lead:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Eg. John Doe"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="Eg. johndoe@mail.com"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="phoneNumber">
      <FormItem>
        <FormLabel>Phone Number</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Eg. +1 234 567 890"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="companyName">
      <FormItem>
        <FormLabel>Company Name</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Eg. Acme Inc."
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="customerId">
      <FormItem>
        <FormLabel>Customer <span class="text-red-500">*</span></FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger>
              <SelectValue>
                {{
                  customers.find((customer: Customer) => customer.id === values.customerId)?.name ||
                  "Select a customer"
                }}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="customer in customers"
                  :key="customer.id"
                  :value="customer.id"
                >
                  <SelectLabel>{{ customer.name }}</SelectLabel>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" :disabled="isLoading" class="w-full">
      <div v-if="isLoading" class="flex items-center justify-center">
        Please wait
        <Loader2 class="w-4 h-4 mr-2 animate-spin ml-2" />
      </div>
      <span v-else>Create Lead</span>
    </Button>
  </form>
</template>