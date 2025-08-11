<script setup lang="ts">
import { computed } from "vue";
import ProgressBar from "@/components/ProgressBar.vue";

const now = new Date();
const startOfYear = new Date(now.getFullYear(), 0, 1);
const endOfYear = new Date(now.getFullYear(), 11, 31);
const totalYearMs = endOfYear.getTime() - startOfYear.getTime();
const elapsedYearMs = now.getTime() - startOfYear.getTime();
const yearProgress = computed(() => (elapsedYearMs / totalYearMs) * 100);

const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
const daysLeftInMonth = computed(() => endOfMonth.getDate() - now.getDate());
const monthProgress = computed(() => ((100 / endOfMonth.getDate()) * now.getDate()));
</script>

<template>
  <div>
    <ProgressBar
        :title="`${yearProgress.toFixed(0)}% of the year is over!`"
        v-model="yearProgress"/>
    <ProgressBar
        :title="`${daysLeftInMonth} days left this month!`"
        v-model="monthProgress"
        class="mt-6"/>
 </div>
</template>