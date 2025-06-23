<script setup lang="ts">
import {useStore} from "@/store/store.ts";
import {minutesToHours} from "../../../utils/utils.ts";
const store = useStore();
</script>

<template>
  <div class="mt-8 flex-col w-full">
    <div class="flex items-center justify-between mb-5" v-for="category in store.categoryEntriesForDate" :key="category.id">
      <div class="flex items-center">
        <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: category.color }"></div>
        <p class="ml-4">{{ category.name }}</p>
      </div>
      <p class="font-bold">{{ minutesToHours(category.time) }}h</p>
    </div>
  </div>
</template>