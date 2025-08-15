<script setup lang="ts">
import {SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar'
import TheSidebar from "@/components/TheSidebar.vue";
import {useRoute} from "vue-router";
import {supabase} from "@/lib/supabaseClient.ts";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/store/userstore.ts";
import {Separator} from "@/components/ui/separator";
import {useColorMode} from "@vueuse/core";

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
    <main class="flex flex-col h-screen w-full">
      <div class="h-4 ml-4 mt-4 mb-3 flex items-center" v-if="!route.meta.publicPage">
        <SidebarTrigger />
        <Separator class="ml-1 mr-3" orientation="vertical"/>
        <h1 class="font-medium">Dashboard</h1>
      </div>
      <Separator />
      <router-view class="flex-1 flex flex-col overflow-auto"/>
      <slot />
    </main>
  </SidebarProvider>
</template>
