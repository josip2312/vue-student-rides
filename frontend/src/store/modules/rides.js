import axios from 'axios';

import {
    SET_RIDES,
    SET_USER_RIDES,
    SET_SINGLE_RIDE,
    SET_RIDE_PASSENGERS,
    SET_RIDE_REQUESTS,
    CLEAR_RIDE_REQUESTS,
} from '../mutationTypes';

export const rides = {
    state: {
        rides: [],
        userRides: [],
        singleRide: {},
        creatingRide: {},
        rideRequests: [],
    },
    getters: {
        getNumOfRideRequests: (state) => state.rideRequests.length,
    },

    mutations: {
        [SET_RIDES]: (state, data) => (state.rides = data),
        [SET_USER_RIDES]: (state, data) => (state.userRides = data),
        [SET_SINGLE_RIDE]: (state, data) => (state.singleRide = data),
        [SET_RIDE_REQUESTS]: (state, data) => {
            if (data.message === 'No requests') {
                state.rideRequests = [];
                return;
            }

            state.rideRequests = [...data];
            console.log(state.rideRequests);
        },
        [CLEAR_RIDE_REQUESTS]: (state) => (state.rideRequests = []),
        [SET_RIDE_PASSENGERS]: (state, data) =>
            (state.singleRide.passengers = data),
    },
    actions: {
        async fetchAllRides({ commit, rootGetters }) {
            try {
                const id = rootGetters.getUserId;
                const { data } = await axios.get(`/api/rides/${id || 0}`);
                commit(SET_RIDES, data);
            } catch (error) {
                console.error(error);
            }
        },
        async fetchUserRides({ commit }) {
            try {
                const { data } = await axios.get('/api/rides/user/all');
                commit(SET_USER_RIDES, data);
            } catch (error) {
                console.error(error);
            }
        },
        async fetchSingleRide({ commit }, id) {
            try {
                const { data } = await axios.get(`/api/rides/ride/${id}`);
                commit(SET_SINGLE_RIDE, data);
            } catch (error) {
                console.error(error);
            }
        },
        async fetchRideRequests({ commit }, id) {
            try {
                const { data } = await axios.get(`/api/rides/requests/${id}`);
                commit(SET_RIDE_REQUESTS, data);
            } catch (error) {
                commit(CLEAR_RIDE_REQUESTS);
                console.error(error);
            }
        },
        async fetchRidePassengers({ commit }, id) {
            try {
                const { data } = await axios.get(
                    `/api/rides/ride/passengers/${id}`,
                );
                console.log(data);
                commit(SET_RIDE_PASSENGERS, data);
            } catch (error) {
                commit(CLEAR_RIDE_REQUESTS);
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
                await axios.delete(`/api/rides/${id}`);
            } catch (error) {
                console.error(error);
            }
        },
        async requestRide(_, requestData) {
            try {
                await axios.post(`/api/rides/request`, requestData);
            } catch (error) {
                console.error(error);
            }
        },
        async acceptRideRequest(_, id) {
            try {
                await axios.patch(`/api/rides/requests/${id}`);
            } catch (error) {
                console.error(error);
            }
        },
        async declineRideRequest(_, id) {
            try {
                await axios.delete(`/api/rides/requests/${id}`);
            } catch (error) {
                console.error(error);
            }
        },
    },
    modules: {},
};
