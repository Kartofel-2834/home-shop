import { createRouter, createWebHistory } from 'vue-router';

// Pages
import IndexPage from '../pages/index.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: '/',
            name: 'home',
            component: IndexPage,
        },
    ],
});

export default router;
