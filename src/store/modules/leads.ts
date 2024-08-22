import axios from 'axios';

export interface Lead {
    id: number;
    name?: string;
    email?: string;
    phoneNumber?: string;
    companyName?: string;
    createdAt: Date;
    updatedAt: Date;
}

interface LeadsState {
    leads: Lead[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const leads = {
    namespaced: true,
    state: {
        leads: [],
    },
    mutations: {
        setLeads(state: LeadsState, leads: Lead[]) {
            state.leads = leads;
        },
        addLead(state: LeadsState, lead: Lead) {
            state.leads.push(lead);
        },
        updateLead(state: LeadsState, updatedLead: Lead) {
            const index = state.leads.findIndex(l => l.id === updatedLead.id);
            if (index !== -1) {
                state.leads.splice(index, 1, updatedLead);
            }
        },
        deleteLead(state: LeadsState, leadId: number) {
            state.leads = state.leads.filter(l => l.id !== leadId);
        },
    },
    actions: {
        async fetchLeads({ commit }: { commit: Function }) {
            const response = await axios.get(`${API_BASE_URL}/leads`);
            commit('setLeads', response.data);
        },
        async createLead({ commit }: { commit: Function }, lead: Lead) {
            const response = await axios.post(`${API_BASE_URL}/leads`, lead);
            commit('addLead', response.data);
        },
        async updateLead({ commit }: { commit: Function }, lead: Lead) {
            const response = await axios.patch(`${API_BASE_URL}/leads/${lead.id}`, lead);
            commit('updateLead', response.data);
        },
        async deleteLead({ commit }: { commit: Function }, leadId: number) {
            await axios.delete(`${API_BASE_URL}/leads/${leadId}`);
            commit('deleteLead', leadId);
        },
    },
    getters: {
        allLeads: (state: LeadsState) => state.leads,
        getLeadById: (state: LeadsState) => (id: number) => state.leads.find(l => l.id === id),
    },
};