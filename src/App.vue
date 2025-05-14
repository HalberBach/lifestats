<script setup lang="ts">
import {useColorMode} from "@vueuse/core";
import { SidebarProvider } from '@/components/ui/sidebar'
import TheSidebar from "@/components/TheSidebar.vue";
import {useRoute} from "vue-router";
import {supabase} from "@/lib/supabaseClient.ts";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/store/userstore.ts";

const color = useColorMode();
const route = useRoute();
const userStore = useUserStore();
const loading = ref(false);

onMounted(() => {
  supabase.auth.onAuthStateChange((_, session) => {
    loading.value = true
    if (session) {
      userStore.user = session.user
    } else {
      userStore.user = null
    }
    loading.value = false
  })
})
</script>

<template>
  <SidebarProvider :default-open="false">
    <TheSidebar v-if="!route.meta.publicPage"/>
    <main>
      <router-view />
      <slot />
    </main>
  </SidebarProvider>
</template>

<style scoped>
main {
  width: 100%;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
