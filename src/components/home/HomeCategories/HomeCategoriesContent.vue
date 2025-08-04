<script setup lang="ts">
import {useStore} from "@/store/store.ts";
import {minutesToHours} from "../../../utils/utils.ts";
import {computed} from "vue";
import type {CategoryEntry} from "@/types";

const store = useStore();

const entriesForDate = computed(() => {
  const formattedEntries: CategoryEntry[] = [...store.categoryEntriesForDate];
  for (const c of store.categories) {
    if (!formattedEntries.some(category => category.name === c.name)) {
      formattedEntries.push({
        id: 0,
        categoryId: c.id,
        name: c.name,
        color: c.color,
        time: 0
      });
    }
  }
  formattedEntries.sort((a, b) => a.name.localeCompare(b.name));
  return formattedEntries;
});
</script>

<template>
  <div class="mt-8 flex-col w-full">
    <div class="flex items-center justify-between mb-5" v-for="category in entriesForDate" :key="category.id || category.categoryId">
      <div class="flex items-center">
        <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: category.color }"></div>
        <p class="ml-4">{{ category.name }}</p>
      </div>
      <p class="font-bold">{{ minutesToHours(category.time) }}h</p>
    </div>
  </div>
</template>