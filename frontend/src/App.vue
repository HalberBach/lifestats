<script setup lang="ts">
import {useColorMode} from "@vueuse/core";
import { SidebarProvider } from '@/components/ui/sidebar'
import TheSidebar from "@/components/TheSidebar.vue";
import {useRoute} from "vue-router";
import {Button} from "@/components/ui/button";

const color = useColorMode();
const route = useRoute();

async function fetchTest() {
  try {
    const response = await fetch('http://localhost:3000/api/test');  // API-Aufruf
    if (!response.ok) {
      throw new Error('Fehler beim Laden der Daten');
    }
    console.log(response);  // Ausgabe der Daten in der Konsole
  } catch (error) {
    console.error('Fehler:', error);  // Fehlerbehandlung
  }
}
</script>

<template>
  <SidebarProvider :default-open="false">
    <TheSidebar v-if="!route.meta.publicPage"/>
    <button @click="fetchTest">Fetch Test</button>
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
