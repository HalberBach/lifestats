<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<template>
  <span class="font-bold text-l">{{ title }}</span>
</template>