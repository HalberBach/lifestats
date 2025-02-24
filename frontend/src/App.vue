<script setup lang="ts">
import {useColorMode} from "@vueuse/core";
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import TheSidebar from "@/components/TheSidebar.vue";

const mode = useColorMode()
</script>

<template>
  <SidebarProvider >
    <TheSidebar />
    <main>
      <router-view />
      <slot />
    </main>
  </SidebarProvider>
</template>

<style scoped>
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
