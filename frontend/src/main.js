import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';

import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import './utils/axios';

import router from './router';
import store from './store';

createApp(App)
    .use(Toast, { position: POSITION.BOTTOM_CENTER })
    .use(store)
    .use(router)
    .mount('#app');
