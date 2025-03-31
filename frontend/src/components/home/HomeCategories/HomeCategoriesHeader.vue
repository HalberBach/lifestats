<script setup lang="ts">
import {
  type CalendarDate,
  DateFormatter,
} from '@internationalized/date'
import { ref } from 'vue'
import HomeCategoriesHeaderDialog from "@/components/home/HomeCategories/HomeCategoriesDialog.vue";
import {useStore} from "@/store/store.ts";
import TheDatepicker from "@/components/TheDatepicker.vue";

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const store = useStore();
const selectedDate = ref<CalendarDate>(store.currentDate);

function test() {
  console.log('test');
}
</script>

<template>
  <div class="flex items-center justify-between w-full">
    <TheDatepicker v-model="selectedDate" @input="store.changeSelectedDate"/>
    <HomeCategoriesHeaderDialog />
  </div>
</template>