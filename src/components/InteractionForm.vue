<script setup lang="ts">
import { toast } from "vue-sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// @ts-ignore
import { useStore } from "vuex";
import { useForm } from "vee-validate";
import { Loader2 } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
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
import { ref, watch, computed, onMounted } from "vue";
import type { Interaction } from "@/types/Interaction";
import type { Lead } from "@/types/Lead";

const props = defineProps<{ interaction?: Interaction }>();

// form schema
const schema = z.object({
  type: z.string().nonempty("Type is required"),
  description: z.string().optional(),
  date: z.string().nonempty("Date is required"),
  leadId: z.number().min(1, "Lead is required"),
});

const { handleSubmit, values, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    type: "",
    description: "",
    date: "",
    leadId: 0,
  },
});

const store = useStore();
const isLoading = ref(false);
const emit = defineEmits(["formSubmitted"]); // emit event to parent component

const leads = computed(() => store.getters["leads/allLeads"]);

// Fetch leads when the component is mounted
onMounted(() => {
  store.dispatch("leads/fetchLeads");
});

watch(
  () => props.interaction,
  (newInteraction) => {
    if (newInteraction) {
      setValues({
        ...newInteraction,
        date: newInteraction.date.toISOString().split("T")[0], // format date for input
        leadId: newInteraction.lead?.id || 0,
      });
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    if (props.interaction) {
      // update interaction
      await store.dispatch("interactions/updateInteraction", {
        id: props.interaction.id,
        ...values,
      });
      toast.success("Interaction updated successfully");
    } else {
      // create interaction
      await store.dispatch("interactions/createInteraction", values);
      toast.success("Interaction created successfully");
    }
    resetForm();
    emit("formSubmitted");
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message.join(", "));
    } else {
      toast.error("Failed to save interaction. Please try again");
    }
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="type">
      <FormItem>
        <FormLabel>Type <span class="text-red-500">*</span></FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Eg. Call, Email"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Eg. Follow-up call"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="date">
      <FormItem>
        <FormLabel>Date <span class="text-red-500">*</span></FormLabel>
        <FormControl>
          <Input type="date" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="leadId">
      <FormItem>
        <FormLabel>Lead <span class="text-red-500">*</span></FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger>
              <SelectValue>
                {{
                  leads.find((lead: Lead) => lead.id === values.leadId)?.name ||
                  leads.find((lead: Lead) => lead.id === values.leadId)
                    ?.customer?.name ||
                  "Select a lead"
                }}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="lead in leads"
                  :key="lead.id"
                  :value="lead.id"
                >
                  <SelectLabel>{{
                    lead.name || lead.customer?.name || "No name"
                  }}</SelectLabel>
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
      <span v-else>{{
        props.interaction ? "Update Interaction" : "Create Interaction"
      }}</span>
    </Button>
  </form>
</template>
