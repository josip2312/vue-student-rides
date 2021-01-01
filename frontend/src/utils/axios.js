import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import store from '@/store';

//import { LOGOUT_USER } from '@/store/constants/action_types';

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;

axios.interceptors.request.use(function(config) {
    store.state.loading = true;

    const token = store.getters.getJWT;
    config.headers.Authorization = token ? `Bearer ${token}` : '';

    return config;
});

axios.interceptors.response.use(
    function(response) {
        store.state.loading = false;

        /*  if (response.data.message) {
            store.commit('SUCCESS', response.data.message);
            setTimeout(() => {
                store.commit('CLEAR_SUCCESS');
            }, 3000);
        } */

        return response;
    },
    function(error) {
        store.state.loading = false;

        /* if (error.response) {
            if (
                error.response.data.message === 'jwt expired' ||
                error.response.data.message === 'Not authenticated'
            ) {
                store.dispatch(LOGOUT_USER);
            }

            if (error.response.data.message) {
                store.commit('ERROR', error.response.data.message);
                setTimeout(() => {
                    store.commit('CLEAR_ERROR');
                }, 3000);
            }
        } */

        return Promise.reject(error);
    },
);
