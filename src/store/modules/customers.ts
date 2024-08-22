import axios from 'axios';

export interface Customer {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    companyName?: string;
    createdAt: Date;
    updatedAt: Date;
    leads?: string[];
}

interface CustomersState {
    customers: Customer[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const customers = {
    namespaced: true,
    state: {
        customers: [],
    },
    getters: {
        allCustomers: (state: CustomersState) => state.customers,
        getCustomerById: (state: CustomersState) => (id: number) => state.customers.find(c => c.id === id),
    },
    mutations: {
        setCustomers(state: CustomersState, customers: Customer[]) {
            state.customers = customers;
        },
        addCustomer(state: CustomersState, customer: Customer) {
            state.customers.push(customer);
        },
        updateCustomer(state: CustomersState, updatedCustomer: Customer) {
            const index = state.customers.findIndex(c => c.id === updatedCustomer.id);
            if (index !== -1) {
                state.customers.splice(index, 1, updatedCustomer);
            }
        },
        deleteCustomer(state: CustomersState, customerId: number) {
            state.customers = state.customers.filter(c => c.id !== customerId);
        },
    },
    actions: {
        async fetchCustomers({ commit }: { commit: Function }) {
            const response = await axios.get(`${API_BASE_URL}/customers`);
            commit('setCustomers', response.data);
        },
        async createCustomer({ commit }: { commit: Function }, customer: Customer) {
            const response = await axios.post(`${API_BASE_URL}/customers`, customer);
            commit('addCustomer', response.data);
        },
        async updateCustomer({ commit }: { commit: Function }, customer: Customer) {
            const response = await axios.patch(`${API_BASE_URL}/customers/${customer.id}`, customer);
            commit('updateCustomer', response.data);
        },
        async deleteCustomer({ commit }: { commit: Function }, customerId: number) {
            await axios.delete(`${API_BASE_URL}/customers/${customerId}`);
            commit('deleteCustomer', customerId);
        },
    },
};
