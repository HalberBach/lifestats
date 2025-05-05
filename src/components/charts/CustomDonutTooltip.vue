<script setup lang="ts">
defineProps<{
  title?: string
  data: {
    name: string
    color: string
    value: any
  }[]
}>()
</script>

<template>
  <div class="custom-tooltip">
    <h3 v-if="title" class="tooltip-title">{{ title }}</h3>
    <div v-for="item in data" :key="item.name" class="tooltip-item">
      <span :style="{ backgroundColor: item.color }" class="tooltip-color"></span>
      <span class="tooltip-name">{{ item.name }}:</span>
      <span class="tooltip-value">{{ item.value }}</span>
    </div>
  </div>
</template>

<style scoped>
.custom-tooltip {
  background: white;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-size: 14px;
}

.tooltip-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.tooltip-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tooltip-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.tooltip-name {
  font-weight: bold;
}

.tooltip-value {
  color: gray;
}
</style>
