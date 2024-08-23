// @ts-ignore
import { createStore } from 'vuex'
import { customers } from './modules/customers';
import { leads } from './modules/leads';
import { interactions } from './modules/interactions';

export default createStore({
    modules: {
        customers,
        leads,
        interactions
    },
});