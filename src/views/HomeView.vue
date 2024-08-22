<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import CustomerTable from "@/components/CustomerTable.vue";
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Tabs from "@/components/ui/tabs/Tabs.vue";
import TabsList from "@/components/ui/tabs/TabsList.vue";
import TabsTrigger from "@/components/ui/tabs/TabsTrigger.vue";
import TabsContent from "@/components/ui/tabs/TabsContent.vue";

const store = useStore();
const totalCustomers = computed(() => store.getters['customers/allCustomers'].length);
</script>
<template>
  <main class="container mx-auto py-10">
    <div class="space-y-2">
      <h2 class="text-2xl font-bold">
        Customer Relationship Manager (CRM)
      </h2>
      <p class="text-sm text-muted-foreground leading-6 font-normal">
        Basic CRM helps businesses manage interactions with current and potential customers.
      </p>
    </div>
    <Tabs default-value="overview" class="space-y-4 mt-10">
      <TabsList>
        <TabsTrigger value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger value="customers">
          Customers
        </TabsTrigger>
        <TabsTrigger value="interactions">
          Interactions
        </TabsTrigger>
        <TabsTrigger value="leads">
          Leads
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card class="bg-primary text-white">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                Customers
              </CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="h-4 w-4 text-white">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">
                {{ totalCustomers }}
              </div>
            </CardContent>
          </Card>
          <Card class="bg-black text-white">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                Leads
              </CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="h-4 w-4 text-white">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">
                +573
              </div>
            </CardContent>
          </Card>
          <Card class="bg-yellow-500 text-white">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                Interactions
              </CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="h-4 w-4 text-white">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">
                +573
              </div>
            </CardContent>
          </Card>
        </div>
        <h2 class="text-2xl font-bold tracking-tight">
          Latest Customers
        </h2>
        <CustomerTable :limit="5" />
      </TabsContent>
      <TabsContent value="customers">
        <h2 class="text-2xl font-bold tracking-tight">
          Customers
        </h2>
        <CustomerTable />
      </TabsContent>
    </Tabs>
  </main>
</template>