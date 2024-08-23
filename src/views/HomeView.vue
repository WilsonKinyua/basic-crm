<script setup lang="ts">
import { computed, ref } from "vue";
// @ts-ignore
import { useStore } from "vuex";
import { Plus } from "lucide-vue-next";
import CustomerTable from "@/components/CustomerTable.vue";
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Tabs from "@/components/ui/tabs/Tabs.vue";
import TabsList from "@/components/ui/tabs/TabsList.vue";
import TabsTrigger from "@/components/ui/tabs/TabsTrigger.vue";
import TabsContent from "@/components/ui/tabs/TabsContent.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import Button from "@/components/ui/button/Button.vue";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CustomerForm from "@/components/CustomerForm.vue";
import type { Customer } from "@/types/Customer";
import InteractionTable from "@/components/InteractionTable.vue";
import InteractionForm from "@/components/InteractionForm.vue";
import LeadTable from "@/components/LeadTable.vue";
import LeadForm from "@/components/LeadForm.vue";

const store = useStore();
const totalCustomers = computed(() => store.getters["customers/allCustomers"]);
const isSheetOpen = ref(false); // Reactive state for Sheet visibility
const isInteractionSheetOpen = ref(false); // Reactive state for Interaction Sheet visibility
const isLeadSheetOpen = ref(false); // Reactive state for Lead Sheet visibility

const closeSheet = () => {
  isSheetOpen.value = false;
};

const closeInteractionSheet = () => {
  isInteractionSheetOpen.value = false;
};

const closeLeadSheet = () => {
  isLeadSheetOpen.value = false;
};

// Handle form submitted event, close the sheet and fetch customers to update the table
const handleFormSubmitted = () => {
  closeSheet();
  store.dispatch("customers/fetchCustomers");
};

// Handle interaction form submitted event, close the sheet and fetch interactions to update the table
const handleInteractionFormSubmitted = () => {
  closeInteractionSheet();
  store.dispatch("interactions/fetchInteractions");
};

// Handle lead form submitted event, close the sheet and fetch leads to update the table
const handleLeadFormSubmitted = () => {
  closeLeadSheet();
  store.dispatch("leads/fetchLeads");
};
</script>

<template>
  <main class="container mx-auto py-10">
    <div class="float-right">
      <ThemeToggle />
    </div>
    <div class="space-y-2">
      <h2 class="text-2xl font-bold">Customer Relationship Manager (CRM)</h2>
      <p class="text-sm text-muted-foreground leading-6 font-normal">
        Basic CRM helps businesses manage interactions with current and
        potential customers.
      </p>
    </div>
    <Tabs default-value="overview" class="space-y-4 mt-10">
      <TabsList>
        <TabsTrigger value="overview"> Overview </TabsTrigger>
        <TabsTrigger value="customers"> Customers </TabsTrigger>
        <TabsTrigger value="leads"> Leads </TabsTrigger>
        <TabsTrigger value="interactions"> Interactions </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card class="bg-primary text-white">
            <CardHeader
              class="flex flex-row items-center justify-between space-y-0 pb-2"
            >
              <CardTitle class="text-sm font-medium"> Customers </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                class="h-4 w-4 text-white"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">
                {{ totalCustomers.length }}
              </div>
            </CardContent>
          </Card>
          <Card class="bg-black text-white">
            <CardHeader
              class="flex flex-row items-center justify-between space-y-0 pb-2"
            >
              <CardTitle class="text-sm font-medium"> Leads </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                class="h-4 w-4 text-white"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">
                {{
                  totalCustomers.filter(
                    (customer: Customer) =>
                      customer.leads && customer.leads.length > 0
                  ).length
                }}
              </div>
            </CardContent>
          </Card>
          <Card class="bg-yellow-500 text-white">
            <CardHeader
              class="flex flex-row items-center justify-between space-y-0 pb-2"
            >
              <CardTitle class="text-sm font-medium"> Interactions </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                class="h-4 w-4 text-white"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">+573</div>
            </CardContent>
          </Card>
        </div>
        <div class="flex justify-between items-center">
          <h2 class="lg:text-2xl font-bold tracking-tight">Latest Customers</h2>
          <Sheet v-model:open="isSheetOpen">
            <SheetTrigger>
              <Button @click="isSheetOpen = false">
                <Plus /> Add Customer
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader class="text-left">
                <SheetTitle> Create a new customer </SheetTitle>
                <SheetDescription>
                  <p class="mb-5">
                    Fill in the form below to create a new customer.
                  </p>
                  <CustomerForm @formSubmitted="handleFormSubmitted" />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <CustomerTable :limit="5" />
      </TabsContent>
      <TabsContent value="customers">
        <div class="flex justify-between items-center py-4">
          <h2 class="lg:text-2xl font-bold tracking-tight">Customers</h2>
          <Sheet v-model:open="isSheetOpen">
            <SheetTrigger>
              <Button @click="isSheetOpen = false">
                <Plus /> Add Customer
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader class="text-left">
                <SheetTitle> Create a new customer </SheetTitle>
                <SheetDescription>
                  <p class="mb-5">
                    Fill in the form below to create a new customer.
                  </p>
                  <CustomerForm @formSubmitted="handleFormSubmitted" />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <CustomerTable />
      </TabsContent>
      <TabsContent value="interactions">
        <div class="flex justify-between items-center py-4">
          <h2 class="lg:text-2xl font-bold tracking-tight">Interactions</h2>
          <Sheet v-model:open="isInteractionSheetOpen">
            <SheetTrigger>
              <Button @click="isInteractionSheetOpen = false">
                <Plus /> Add Interaction
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader class="text-left">
                <SheetTitle> Create a new interaction </SheetTitle>
                <SheetDescription>
                  <p class="mb-5">
                    Fill in the form below to create a new interaction.
                  </p>
                  <InteractionForm
                    @formSubmitted="handleInteractionFormSubmitted"
                  />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <InteractionTable />
      </TabsContent>
      <TabsContent value="leads">
        <div class="flex justify-between items-center py-4">
          <h2 class="lg:text-2xl font-bold tracking-tight">Leads</h2>
          <Sheet v-model:open="isLeadSheetOpen">
            <SheetTrigger>
              <Button @click="isLeadSheetOpen = false">
                <Plus /> Add Lead
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader class="text-left">
                <SheetTitle> Create a new lead </SheetTitle>
                <SheetDescription>
                  <p class="mb-5">
                    Fill in the form below to create a new lead.
                  </p>
                  <LeadForm @formSubmitted="handleLeadFormSubmitted" />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <LeadTable />
      </TabsContent>
    </Tabs>
  </main>
</template>
