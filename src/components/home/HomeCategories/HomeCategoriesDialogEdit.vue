<script setup lang="ts">
import {useStore} from "@/store/store.ts";
import {Input} from "@/components/ui/input";
import {computed, onMounted, ref} from "vue";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import TheDatepicker from "@/components/TheDatepicker.vue";
import {CalendarDate} from "@internationalized/date";
import type {CategoryEntry} from "@/types";
import {minutesToHours} from "@/utils/utils.ts";

interface FormattedCategory {
  id: number,
  categoryId?: number, // Optional for new categories
  name: string,
  color: string,
  formattedTime: number
}
const emit = defineEmits(['toMuchTime','opened', 'moveToAddCategory'])
const store = useStore();
const categoriesFormatted = ref<FormattedCategory[]>([]);
const selectedDate = ref<CalendarDate>(store.currentDate);
const timeSum = computed(() => {
  const temp = calcTimeSum();
  if (temp <= 24.0) {
    return temp;
  } else {
    return 24.0;
  }
})

function verifyInput() {
  const sum = calcTimeSum();
  if (sum > 24) {
    emit('toMuchTime', true);
  } else {
    emit('toMuchTime', false);
  }
}
function calcTimeSum() {
  return categoriesFormatted.value.reduce((acc, category) => acc + parseFloat(category.formattedTime), 0);
}
function addTime(category: FormattedCategory, minutes: number) {
  const additionalTime = minutesToHours(minutes);
  const newTime = parseFloat((category.formattedTime + additionalTime).toFixed(2));

  // Maximale Grenze auf 24h setzen
  if (timeSum.value + additionalTime > 24) {
    category.formattedTime = parseFloat((24 - (timeSum.value - category.formattedTime)).toFixed(2));
  } else {
    category.formattedTime = newTime;
  }
}
async function getCategoriesForDate() {
  await store.getCategoryEntriesForDate(selectedDate.value).then(values => {
    const formattedCategories = values.map(category => ({
      id: category.id,
      name: category.name,
      color: category.color,
      formattedTime: minutesToHours(category.time)
    })) as FormattedCategory[];
    // Fill the category list with mssing empty categories
    fillCategoryList(formattedCategories);
  });
}
async function saveChanges() {
  await store.saveCategoriesEntriesForDate(selectedDate.value, categoriesFormatted.value
    .filter(category => category.formattedTime > 0 || category.id !== 0 )
    .map(category => ({
      id: category.id,
      categoryId: category.categoryId,
      name: category.name,
      color: category.color,
      time: category.formattedTime * 60
  })) as CategoryEntry[]);
}
// Fill the category list with the missing empty categories (categories without time entries)
// so that the user can add time to them
function fillCategoryList(formattedCategories: FormattedCategory[]) {
  for (const c of store.categories) {
    if (!formattedCategories.some(category => category.name === c.name)) {
      formattedCategories.push({
        id: 0,
        categoryId: c.id,
        name: c.name,
        color: c.color,
        formattedTime: 0
      });
    }
  }
  categoriesFormatted.value = formattedCategories.sort((a, b) => a.name.localeCompare(b.name));
}

function moveToAddCategory() {
  emit('moveToAddCategory');
}

defineExpose({
  saveChanges
})

onMounted(() => {
  emit('opened', true);
  const formattedCategories = store.categoryEntriesForDate.map(category => ({
    id: category.id,
    name: category.name,
    color: category.color,
    formattedTime: minutesToHours(category.time)
  })) as FormattedCategory[];
  // Fill the category list with mssing empty categories
  fillCategoryList(formattedCategories)
});
</script>

<template>
  <div class="w-[180px]">
    <TheDatepicker v-model="selectedDate" @input="getCategoriesForDate"/>
  </div>
  <ScrollArea class="h-[396px] mt-3">
    <div v-for="category in categoriesFormatted" :key="category.categoryId"
         class="flex items-center gap-4 pt-3">
      <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: category.color }"></div>
      <p class="w-1/3">
        {{ category.name }}
      </p>
      <div class="flex items-center">
        <div>
          <Input class="w-16" @input="verifyInput" v-model="category.formattedTime" @blur="category.formattedTime = parseFloat(category.formattedTime) || 0"/>
        </div>
        <div class="flex items-center ml-6 gap-2 ">
          <Button variant="secondary" @click="addTime(category, 15)">+15min</Button>
          <Button variant="secondary" @click="addTime(category,30)">+30min</Button>
        </div>
      </div>
    </div>
    <div class="text-center mt-5 font-bold">
      <Button variant="outline" @click="moveToAddCategory">Add Category</Button>
    </div>
  </ScrollArea>
</template>