import '@/assets/styles/reset.scss';
import '@/assets/styles/default.scss';
import '@/assets/styles/vendors.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

// Plugins
import SwiperPlugin from '@/plugins/swiper';

import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(SwiperPlugin);

app.mount('#app');
