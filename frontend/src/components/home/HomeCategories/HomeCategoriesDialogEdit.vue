<script setup lang="ts">
import {useStore} from "@/store/store.ts";
import {Input} from "@/components/ui/input";
import {computed, ref} from "vue";
import {Button} from "@/components/ui/button";

interface FormattedCategory {
  id: number,
  name: string,
  color: string,
  formattedTime: number
}
const emit = defineEmits(['toMuchTime'])
const store = useStore();
const categoriesFormatted = ref(
    store.categoriesForDate.map(category => ({
      id: category.id,
      name: category.name,
      color: category.color,
      formattedTime: minutesToHours(category.time)
    }))
);
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

  console.log('addedTime + ', category.formattedTime);
}
function minutesToHours(minutes: number) {
  return parseFloat((minutes / 60).toFixed(2));
}
function saveChanges() {
  store.categoriesForDate = categoriesFormatted.value.map(category => ({
    id: category.id,
    name: category.name,
    color: category.color,
    time: category.formattedTime * 60
  }));
  store.saveCategoriesForDate();
  console.log('saveChanges');
}

defineExpose({
  saveChanges
})
</script>

<template>
  <div v-for="category in categoriesFormatted" :key="category.id"
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
</template>

<style scoped>

</style>