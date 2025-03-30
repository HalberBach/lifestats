<script setup lang="ts">
import {Progress} from "@/components/ui/progress";

const value = defineModel<number>()
defineProps<{
  title: string
}>()
</script>

<template>
  <div>
    <div class="title_container font-bold">
      <p>{{ title }}</p>
    </div>
    <div class="mt-2">
      <Progress v-model="value"/>
    </div>
  </div>
</template>

<style scoped>
.title_container {
  font-size: 18px;
}
</style>