<script setup lang="ts">
import HomeChartsHeader from "@/components/home/HomeCharts/HomeChartsHeader.vue";
import HomeChartsDonut from "@/components/home/HomeCharts/HomeChartsDonut.vue";
</script>

<template>
  <div class="main-container">
    <HomeChartsHeader />
    <div class="donutchart-container mt-12">
      <HomeChartsDonut />
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