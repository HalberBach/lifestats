<script setup lang="ts">
import HomeChartsHeader from "@/components/home/HomeCharts/HomeChartsHeader.vue";
import HomeChartsDonut from "@/components/home/HomeCharts/HomeChartsDonut.vue";
import {useStore} from "@/store/store.ts";
import { ref, watch} from "vue";
import type {CategoryEntry} from "@/types";
import {minutesToHours} from "@/utils/utils.ts";

interface DonutData {
  name: string
  total: number
}

const store = useStore();
const data = ref<CategoryEntry[]>(store.categoriesForDate);
const donutData = ref<DonutData[]>([
  { name: 'Nothing', total: 24 }
])
const colors = ref<string[]>(['#264653'])
const selectedFilter = ref<string>('today');
const hasError = ref<boolean>(false);

function refreshDonutData(newEntries: CategoryEntry[]) {
  if (newEntries.length === 0) {
    donutData.value = { name: 'Nothing', total: 24 };
    colors.value = ['#264653'];
  } else {
    donutData.value = newEntries.map((entry) => ({
      name: entry.name,
      total: minutesToHours(entry.time)
    }))
    colors.value = newEntries.map((entry) => entry.color);
  }
  console.log('Refreshed Donut Data')
}
async function refreshData() {
  if (selectedFilter.value === 'today') {
    refreshDonutData(store.categoriesForDate);
    console.log('today')
  } else if (selectedFilter.value === '30 Days') {
    refreshDonutData(await store.getLast30Days())
    console.log('30 days')
  } else if (selectedFilter.value === 'total') {
    refreshDonutData(await store.getTotal());
    console.log('total')
  } else {
    hasError.value = true;
  }
}

/*watch(() => store.categoriesForDate, () => {
  refreshData();
})
watch(() => store.last30Days, () => {
  refreshData();
})
watch(() => store.totalTime, () => {
  refreshData();
})
watch(() => selectedFilter.value, () => {
  refreshData();
})

refreshDonutData(store.categoriesForDate);*/
</script>

<template>
  <div class="main-container">
    <HomeChartsHeader v-model="selectedFilter"/>
    <div class="donutchart-container mt-20">
<!--      <HomeChartsDonut :entries="donutData" :colors="colors"/>-->
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