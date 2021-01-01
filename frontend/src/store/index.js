import { createStore } from 'vuex';

import createPersistedState from 'vuex-persistedstate';

import { rides } from './modules/rides';
import { auth } from './modules/auth';

const ridesState = createPersistedState();

const authState = createPersistedState();

export default createStore({
    state: {},
    plugins: [ridesState, authState],
    mutations: {},
    actions: {},
    modules: { rides, auth },
});
