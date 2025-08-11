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
  <div class="flex flex-col flex-1 h-full">
    <div class="body flex-1 max-md:space-y-4 md:grid md:grid-cols-[1fr_2fr_1fr] gap-5 mx-5 mb-5 mt-5">
      <div class="bg-card column rounded-xl border p-4 ">
        <HomeNews />
      </div>
      <div class="bg-card column rounded-xl border p-4">
        <HomeCharts />
      </div>
      <div class="bg-card column rounded-xl border p-4">
        <HomeCategories />
      </div>
    </div>
  </div>
</template>