import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store/index';

const loggedOutGuard = (to, from, next) => {
    if (store.getters.isLoggedIn) {
        next();
    } else {
        next({ name: 'Login' });
    }
};
const loggedInGuard = (to, from, next) => {
    if (!store.getters.isLoggedIn) {
        next();
    } else {
        next({ name: 'Home' });
    }
};
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        beforeEnter: loggedInGuard,
        component: () =>
            import(/* webpackChunkName: "login" */ '../views/auth/Login.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        beforeEnter: loggedInGuard,
        component: () =>
            import(
                /* webpackChunkName: "register" */ '../views/auth/Register.vue'
            ),
    },
    {
        path: '/rides',
        name: 'Rides',
        beforeEnter: loggedOutGuard,
        component: () =>
            import(/* webpackChunkName: "rides" */ '../views/Rides.vue'),
    },
    {
        path: '/ride/:id',
        name: 'RideDetails',
        beforeEnter: loggedOutGuard,
        component: () =>
            import(
                /* webpackChunkName: "ride-details" */ '../views/RideDetails.vue'
            ),
    },
    {
        path: '/rides/create/start',
        name: 'Start',
        beforeEnter: loggedOutGuard,
        component: () =>
            import(/* webpackChunkName: "start" */ '../views/create/Start.vue'),
    },
    {
        path: '/rides/create/destination',
        name: 'Destination',
        beforeEnter: loggedOutGuard,
        component: () =>
            import(
                /* webpackChunkName: "destination" */ '../views/create/Destination.vue'
            ),
    },
    {
        path: '/rides/create/start-time',
        name: 'StartTime',
        beforeEnter: loggedOutGuard,
        component: () =>
            import(
                /* webpackChunkName: "start-time" */ '../views/create/StartTime.vue'
            ),
    },
    {
        path: '/rides/create/start-date',
        name: 'StartDate',
        beforeEnter: loggedOutGuard,
        component: () =>
            import(
                /* webpackChunkName: "start-date" */ '../views/create/StartDate.vue'
            ),
    },
    {
        path: '/rides/create/seats-price',
        name: 'SeatsPrice',
        beforeEnter: loggedOutGuard,
        component: () =>
            import(
                /* webpackChunkName: "seats-price" */ '../views/create/SeatsPrice.vue'
            ),
    },
    {
        path: '/profile',
        name: 'Profile',
        beforeEnter: loggedOutGuard,

        component: () =>
            import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    },
];

const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
