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
import InteractionForm from "@/components/InteractionForm.vue";
import type { Interaction } from "@/types/Interaction";
import { createColumns } from "./interactions/columns";

const props = defineProps<{ limit?: number }>();

const store = useStore();
const interactions = computed(
  () => store.getters["interactions/allInteractions"]
);
const searchQuery = ref("");
const isSheetOpen = ref(false);
const selectedInteraction = ref<Interaction | null>(null);

// edit interaction details
const editInteraction = (interaction: Interaction) => {
  selectedInteraction.value = interaction;
  isSheetOpen.value = true;
};

// delete interaction
const deleteInteraction = (id: number) => {
  if (confirm("Are you sure you want to delete this interaction?")) {
    store.dispatch("interactions/deleteInteraction", id);
  }
};

// fetch interactions from the store
const getInteractions = () => {
  store.dispatch("interactions/fetchInteractions");
};

// Filter interactions based on search query and limit to the specified number of latest interactions
const filteredInteractions = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const filtered = interactions.value.filter((interaction: Interaction) => {
    return (
      interaction.type.toLowerCase().includes(query) ||
      interaction.description?.toLowerCase().includes(query)
    );
  });
  return props.limit ? filtered.slice(0, props.limit) : filtered;
});

// Create columns for the DataTable component with edit and delete actions
const columns = createColumns({ deleteInteraction });

const handleFormSubmitted = () => {
  isSheetOpen.value = false;
  getInteractions();
  selectedInteraction.value = null;
};

getInteractions();
</script>

<template>
  <div class="h-full flex-1 flex-col space-y-8 md:flex">
    <div class="space-y-8">
      <Input
        v-model="searchQuery"
        type="text"
        placeholder="Search interactions..."
        class="lg:w-1/3"
      />
      <DataTable :columns="columns" :data="filteredInteractions" />
      <Sheet v-model:open="isSheetOpen">
        <SheetContent>
          <SheetHeader class="text-left">
            <SheetTitle>
              {{
                selectedInteraction
                  ? "Edit Interaction"
                  : "Create a new interaction"
              }}
            </SheetTitle>
            <SheetDescription>
              <p class="mb-5">
                Fill in the form below to
                {{ selectedInteraction ? "edit" : "create" }} an interaction.
              </p>
              <InteractionForm
                :interaction="selectedInteraction"
                @formSubmitted="handleFormSubmitted"
                v-if="selectedInteraction"
              />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  </div>
</template>
