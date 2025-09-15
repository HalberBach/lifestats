import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import DataView from "@/views/DataView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import StartView from "@/views/StartView.vue";
import {useUserStore} from "@/store/userstore.ts";
import {supabase} from "@/lib/supabaseClient.ts";
import ForgotPasswordView from "@/views/ForgotPasswordView.vue";
import ResetPasswordView from "@/views/ResetPasswordView.vue";
import EmailConfirmationView from "@/views/EmailConfirmationView.vue";

let authInitialized = false;

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
    },
    {
        path: '/forgot-password',
        name: "ForgotPassword",
        component: ForgotPasswordView,
        meta: {
            publicPage: true
        }
    },
    {
        path: '/reset-password',
        name: "ResetPassword",
        component: ResetPasswordView,
        meta: {
            publicPage: true
        }
    },
    {
        path: '/email-verify',
        name: "EmailConfirmation",
        component: EmailConfirmationView,
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
    const userStore = useUserStore();

    if (!authInitialized) {
        const { data: { session } } = await supabase.auth.getSession();
        userStore.user = session?.user ?? null;
        authInitialized = true;
    }

    if (!userStore.user && !to.meta.publicPage) {
        return '/login'
    }
})

export default router;
