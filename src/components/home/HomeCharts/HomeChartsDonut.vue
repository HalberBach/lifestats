<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut'
import CustomDonutTooltip from "@/components/charts/CustomDonutTooltip.vue";
import type {CategoryEntry} from "@/types";

const valueFormatter = (hours: number) => `${hours}h`
const props = defineProps<{
  entries: CategoryEntry[],
  colors: string[]
}>()
</script>

<template>
  <DonutChart
      class="w-full h-3/4"
      index="name"
      :category="'total'"
      :data="entries"
      :colors="colors"
      :custom-tooltip="CustomDonutTooltip"
      :value-formatter="valueFormatter"
  />
</template>