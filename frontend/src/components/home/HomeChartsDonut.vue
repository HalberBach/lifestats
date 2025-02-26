<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut'
import CustomDonutTooltip from "@/components/charts/CustomDonutTooltip.vue";

const data = [
  { name: 'Jan', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Feb', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Mar', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Apr', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'May', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jun', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
]

const valueFormatter = (hours: number) => `${hours}h`
</script>

<template>
  <DonutChart
      class="w-3/4 h-1/2"
      index="name"
      :category="'total'"
      :data="data"
      :colors="['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51', '#D4A5A5']"
      :custom-tooltip="CustomDonutTooltip"
      :value-formatter="valueFormatter"
  />
</template>