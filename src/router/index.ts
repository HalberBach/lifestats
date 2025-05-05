import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import DataView from "@/views/DataView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import StartView from "@/views/StartView.vue";
import {useStore} from "@/store/store.ts";

const routes = [
    {
        path: '/',
        name: 'Start',
        component: StartView,
        meta: {
            publicPage: true
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: HomeView,
        meta: {
            publicPage: false
        }
    },
    {
        path: '/data',
        name: 'Data',
        component: DataView,
        meta: {
            publicPage: false
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: {
            publicPage: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView,
        meta: {
            publicPage: true
        }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach(async (to) => {
    const store = useStore();
    if (!store.isLoggedIn && !to.meta.publicPage) {
        return '/login'
    }
})

export default router;
