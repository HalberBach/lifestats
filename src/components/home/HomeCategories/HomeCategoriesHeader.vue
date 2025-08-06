<script setup lang="ts">
import HomeCategoriesHeaderDialog from "@/components/home/HomeCategories/HomeCategoriesDialog.vue";
import {useStore} from "@/store/store.ts";
import TheDatepicker from "@/components/TheDatepicker.vue";

const store = useStore();

async function changeSelectedDate() {
  await store.changeSelectedDate();
}
</script>

<template>
  <div class="flex items-center justify-between w-full">
    <TheDatepicker v-model="store.currentDate" @input="changeSelectedDate"/>
    <HomeCategoriesHeaderDialog />
  </div>
</template>