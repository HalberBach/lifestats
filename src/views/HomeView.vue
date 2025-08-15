<script setup lang="ts">
import HomeCharts from "@/components/home/HomeCharts/HomeCharts.vue";
import HomeCategories from "@/components/home/HomeCategories/HomeCategories.vue";
import HomeNews from "@/components/home/HomeNews/HomeNews.vue";
import {onMounted} from "vue";

import {useStore} from "@/store/store.ts";

const store = useStore();
onMounted(async () => {
  // Initialize the data (load from database)
  await store.init()
});
</script>

<template>
  <div class="grid md:grid-cols-[2fr_1fr] grid-cols-1 gap-4 h-screen p-4">
    <!-- Linke Spalte -->
    <div
        class="grid md:grid-cols-2 md:grid-rows-[25%_auto] grid-cols-1 auto-rows-min gap-4 h-full order-1"
    >
      <div class="bg-card border rounded-xl p-4">
        <HomeNews />
      </div>

      <div class="bg-card border rounded-xl p-4 hidden md:block">
        <span class="flex h-full justify-center items-center text-2xl font-bold text-muted-foreground">
          Coming Soon
        </span>
      </div>

      <div class="bg-card border rounded-xl p-4 md:col-span-2 ">
        <HomeCharts />
      </div>
    </div>

    <!-- Rechte Spalte -->
    <div class="bg-card border rounded-xl p-4 order-2">
      <HomeCategories />
    </div>
  </div>
</template>

