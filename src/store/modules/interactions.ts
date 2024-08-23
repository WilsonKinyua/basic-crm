import axios from "axios";
import type { Interaction } from "@/types/Interaction";

interface InteractionsState {
    interactions: Interaction[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const interactions = {
    namespaced: true,
    state: {
        interactions: [],
    },
    getters: {
        allInteractions: (state: InteractionsState) => state.interactions,
        getInteractionById: (state: InteractionsState) => (id: number) =>
            state.interactions.find((i) => i.id === id),
    },
    mutations: {
        setInteractions(state: InteractionsState, interactions: Interaction[]) {
            state.interactions = interactions;
        },
        addInteraction(state: InteractionsState, interaction: Interaction) {
            state.interactions.push(interaction);
        },
        updateInteraction(state: InteractionsState, updatedInteraction: Interaction) {
            const index = state.interactions.findIndex(
                (i) => i.id === updatedInteraction.id
            );
            if (index !== -1) {
                state.interactions.splice(index, 1, updatedInteraction);
            }
        },
        deleteInteraction(state: InteractionsState, interactionId: number) {
            state.interactions = state.interactions.filter((i) => i.id !== interactionId);
        },
    },
    actions: {
        async fetchInteractions({ commit }: { commit: Function }) {
            const response = await axios.get(`${API_BASE_URL}/interactions`);
            commit("setInteractions", response.data);
        },
        async createInteraction({ commit }: { commit: Function }, interaction: Interaction) {
            const response = await axios.post(`${API_BASE_URL}/interactions`, interaction);
            commit("addInteraction", response.data);
        },
        async updateInteraction({ commit }: { commit: Function }, interaction: Interaction) {
            const response = await axios.patch(
                `${API_BASE_URL}/interactions/${interaction.id}`,
                interaction
            );
            commit("updateInteraction", response.data);
        },
        async deleteInteraction({ commit }: { commit: Function }, interactionId: number) {
            await axios.delete(`${API_BASE_URL}/interactions/${interactionId}`);
            commit("deleteInteraction", interactionId);
        },
    },
};