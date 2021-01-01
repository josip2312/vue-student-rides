import { onMounted } from 'vue';
import axios from 'axios';

import router from '@/router/index';

import store from '@/store/index';
import { SET_USER_DATA } from '@/store/mutationTypes';

export default function googleAuthenticate() {
    onMounted(() => {
        const { gapi } = window;
        if (gapi) {
            gapi.signin2.render('g-signin2', {
                scope: 'profile email',
                width: 240,
                height: 50,
                longtitle: true,

                onsuccess: onSuccess,
                onfailure: onFailure,
            });
        }
    });

    const onSuccess = async (user) => {
        if (!store.getters.isLoggedIn) {
            const idToken = user.getAuthResponse().id_token;
            const { data } = await axios.post('/api/auth/google', { idToken });
            store.commit(SET_USER_DATA, data);
            router.push({ name: 'Rides' });
        }
    };
    const onFailure = () => {
        console.log('failure');
    };

    return {
        onSuccess,
        onFailure,
    };
}
