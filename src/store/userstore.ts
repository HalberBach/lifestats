import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {User} from "@supabase/supabase-js";

export const useUserStore = defineStore('userStore', () => {
    const user = ref<User>(null);
    const isLoggedIn = computed(() => user.value !== null);

    return {user, isLoggedIn};
});