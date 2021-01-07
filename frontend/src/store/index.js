import { createStore } from 'vuex';

import createPersistedState from 'vuex-persistedstate';

import { rides } from './modules/rides';
import { auth } from './modules/auth';

const ridesState = createPersistedState({
    paths: ['rideRequests'],
});

const authState = createPersistedState();

export default createStore({
    state: {
        isLoading: false,
        error: null,
    },
    getters: {
        isLoading: (state) => state.isLoading,
        getError: (state) => state.error,
        
    },
    plugins: [ridesState, authState],
    mutations: {},
    actions: {},
    modules: { rides, auth },
});


