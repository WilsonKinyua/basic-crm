<script setup lang="ts">
import { computed, ref } from "vue";
// @ts-ignore
import { useStore } from "vuex";
import DataTable from "@/components/ui/table/DataTable.vue";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import LeadForm from "@/components/LeadForm.vue";
import Button from "@/components/ui/button/Button.vue";
import { ArrowLeft } from "lucide-vue-next";
import type { Lead } from "@/types/Lead";
import { createColumns } from "./leads/columns";

const props = defineProps<{ limit?: number }>();

const store = useStore();
const leads = computed(() => store.getters["leads/allLeads"]);
const searchQuery = ref("");
const isSheetOpen = ref(false);
const selectedLead = ref<Lead | null>(null);
const isViewingLeadDetails = ref(false);

// view lead details
const viewLead = (id: number) => {
  selectedLead.value = leads.value.find((lead: Lead) => lead.id === id);
  isViewingLeadDetails.value = true;
};

// edit lead details
const editLead = (lead: Lead) => {
  selectedLead.value = lead;
  isSheetOpen.value = true;
};

// delete lead
const deleteLead = (id: number) => {
  if (confirm("Are you sure you want to delete this lead?")) {
    store.dispatch("leads/deleteLead", id);
  }
};

// fetch leads from the store
const getLeads = () => {
  store.dispatch("leads/fetchLeads");
};

// Filter leads based on search query and limit to the specified number of latest leads
const filteredLeads = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const filtered = leads.value.filter((lead: Lead) => {
    return (
      (lead.name && lead.name.toLowerCase().includes(query)) ||
      (lead.phoneNumber && lead.phoneNumber.toLowerCase().includes(query)) ||
      (lead.email && lead.email.toLowerCase().includes(query)) ||
      (lead.companyName && lead.companyName.toLowerCase().includes(query)) ||
      (lead.customer && lead.customer.name.toLowerCase().includes(query))
    );
  });
  return props.limit ? filtered.slice(0, props.limit) : filtered;
});

// Create columns for the DataTable component with edit and delete actions
const columns = createColumns({ viewLead, deleteLead, editLead });

const handleFormSubmitted = () => {
  isSheetOpen.value = false;
  getLeads();
  selectedLead.value = null;
};

getLeads();
</script>

<template>
  <div class="h-full flex-1 flex-col space-y-8 md:flex">
    <div class="space-y-8">
      <Input
        v-model="searchQuery"
        type="text"
        placeholder="Search leads..."
        class="lg:w-1/3"
      />
      <DataTable :columns="columns" :data="filteredLeads" />
      <Sheet v-model:open="isSheetOpen">
        <SheetContent>
          <SheetHeader class="text-left">
            <SheetTitle>
              {{ selectedLead ? "Edit Lead" : "Create a new lead" }}
            </SheetTitle>
            <SheetDescription>
              <p class="mb-5">
                Fill in the form below to
                {{ selectedLead ? "edit" : "create" }} a lead.
              </p>
              <LeadForm
                :lead="selectedLead"
                @formSubmitted="handleFormSubmitted"
                v-if="selectedLead"
              />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  </div>
</template>
