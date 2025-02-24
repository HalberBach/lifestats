import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/HomeView.vue';
import DataView from "@/views/DataView.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/data',
        name: 'Data',
        component: DataView
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
