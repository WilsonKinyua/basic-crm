// @ts-ignore
import { createStore } from 'vuex'
import { customers } from './modules/customers';
import { leads } from './modules/leads';

export default createStore({
    modules: {
        customers,
        leads
    },
});