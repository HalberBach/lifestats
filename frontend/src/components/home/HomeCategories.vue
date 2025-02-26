<script setup lang="ts">
import HomeCategoriesHeader from "@/components/home/HomeCategoriesHeader.vue";
import HomeCategoriesContent from "@/components/home/HomeCategoriesContent.vue";
</script>

<template>
  <div class="categories-container ">
    <HomeCategoriesHeader />
    <HomeCategoriesContent />
  </div>
</template>

<style scoped>
.categories-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>