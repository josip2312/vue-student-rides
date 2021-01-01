import axios from 'axios';

import { SET_RIDES, SET_USER_RIDES, SET_SINGLE_RIDE } from '../mutationTypes';

export const rides = {
    state: {
        rides: [],
        userRides: [],
        singleRide: {},
        creatingRide: {},
    },

    mutations: {
        [SET_RIDES]: (state, data) => (state.rides = data),
        [SET_USER_RIDES]: (state, data) => (state.userRides = data),
        [SET_SINGLE_RIDE]: (state, data) => (state.singleRide = data),
    },
    actions: {
        async fetchAllRides({ commit }) {
            try {
                const { data } = await axios.get('/api/rides');
                console.log(data);
                commit(SET_RIDES, data);
            } catch (error) {
                console.error(error);
            }
        },
        async fetchUserRides({ commit }) {
            try {
                const { data } = await axios.get('/api/rides/user');
                commit(SET_USER_RIDES, data);
            } catch (error) {
                console.error(error);
            }
        },
        async fetchSingleRide({ commit }, id) {
            try {
                const { data } = await axios.get(`/api/rides/${id}`);
                commit(SET_SINGLE_RIDE, data);
            } catch (error) {
                console.error(error);
            }
        },
        async createRide() {
            const rideToCreate = this.state.rides.creatingRide;
            try {
                await axios.post(`/api/rides/create`, rideToCreate);
            } catch (error) {
                console.error(error);
            }
        },
        async deleteRide(_, id) {
            try {
                const { data } = await axios.delete(`/api/rides/${id}`);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        },
    },
    modules: {},
};
