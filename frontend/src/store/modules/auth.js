import axios from 'axios';

import { SET_USER_DATA } from '../mutationTypes';

export const auth = {
    state: {
        userData: {},
    },
    getters: {
        getJWT: (state) => state.userData.token,
        getUserId: (state) => state.userData.id,
        isLoggedIn: (state) => Boolean(state.userData.token),
    },
    mutations: {
        [SET_USER_DATA]: (state, userData) => {
            state.userData = userData;
        },
    },
    actions: {
        async loginUser({ commit }, userData) {
            try {
                const { getJWT } = this.getters;
                if (!getJWT) {
                    const { data } = await axios.post(
                        '/api/auth/login',
                        userData,
                    );
                    commit(SET_USER_DATA, data);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async registerUser({ commit }, userData) {
            try {
                const { getJWT } = this.getters;

                if (!getJWT) {
                    const { data } = await axios.post(
                        '/api/auth/register',
                        userData,
                    );
                    console.log(data);
                    commit(SET_USER_DATA, data);
                }
            } catch (error) {
                console.error(error);
            }
        },
        logout() {
            sessionStorage.clear();
            localStorage.removeItem('vuex');
            location.reload();
        },
    },
    modules: {},
};
