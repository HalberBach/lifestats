<script setup lang="ts">

import HomeCharts from "@/components/home/HomeCharts.vue";
</script>

<template>
  <div class="main-container">
    <div class="header mx-4">
      <span class="text-4xl font-bold">Home</span>
      <span class="text-4xl">Lifestats</span>
    </div>
    <div class="body grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 mx-4 mb-4 mt-1">
      <div class="column rounded-lg border" >kdjfdjf</div>
      <div class="column rounded-lg border p-2">
        <HomeCharts />
      </div>
      <div class="column rounded-lg border">kdjfdjf</div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 4%;
}

.body {
  height: 96%;
}
</style>