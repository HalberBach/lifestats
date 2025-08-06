<script setup lang="ts">
import HomeChartsHeader from "@/components/home/HomeCharts/HomeChartsHeader.vue";
import HomeChartsDonut from "@/components/home/HomeCharts/HomeChartsDonut.vue";
import {useStore} from "@/store/store.ts";
import { ref, watch} from "vue";
import type {CategoryEntry, DonutData} from "@/types";
import {minutesToHours} from "@/utils/utils.ts";

const store = useStore();
const donutData = ref<DonutData[]>([
  { name: 'Nothing', total: 24 }
])
const colors = ref<string[]>(['#264653'])
const selectedFilter = ref<string>('today');
const hasError = ref<boolean>(false);

function refreshDonutData(newEntries: CategoryEntry[]) {
  if (!newEntries || newEntries.length === 0) {
    donutData.value = [{ name: 'Nothing', total: 24 }];
    colors.value = ['#264653'];
  } else {
    donutData.value = newEntries.map((entry) => ({
      name: entry.name,
      total: minutesToHours(entry.time)
    }))
    colors.value = newEntries.map((entry) => entry.color);
  }
}

function refreshData() {
  if (selectedFilter.value === 'today') {
    refreshDonutData(store.categoryEntriesForDate);
  } else if (selectedFilter.value === '30 Days') {
    if (store.categoryEntriesLast30Days.length === 0) {
      donutData.value = [{ name: 'Nothing', total: 24 }];
      colors.value = ['#264653'];
    } else {
      donutData.value = store.categoryEntriesLast30Days
      colors.value = store.categoryEntriesLast30Days.map((entry) => entry.color);
    }

  } else if (selectedFilter.value === 'total') {
    if (store.categoryEntriesTotalTime.length === 0) {
      donutData.value = [{ name: 'Nothing', total: 24 }];
      colors.value = ['#264653'];
    } else {
      donutData.value = store.categoryEntriesTotalTime
      colors.value = store.categoryEntriesTotalTime.map((entry) => entry.color);
    }
  } else {
    hasError.value = true;
  }
}

watch(() => store.categoryEntriesForDate, () => {
  refreshData();
})
watch(() => store.categoryEntriesLast30Days, () => {
  refreshData();
})
watch(() => store.categoryEntriesTotalTime, () => {
  refreshData();
})
watch(() => selectedFilter.value, () => {
  refreshData();
})
</script>

<template>
  <div class="main-container">
    <HomeChartsHeader v-model="selectedFilter"/>
    <div class="donutchart-container mt-20">
      <HomeChartsDonut :entries="donutData" :colors="colors"/>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.donutchart-container {
  display: flex;
  justify-content: center;
  width: 100%;
  flex-grow: 1;
}
</style>