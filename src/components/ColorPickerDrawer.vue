<script setup lang="ts">
import {Separator} from "@/components/ui/separator";
import {useStore} from "@/store/store.ts";

const emit = defineEmits(['colorSelected']);
const store = useStore();
</script>

<template>
  <div class="grid grid-cols-7 gap-2 w-full md:w-1/2 mb-2 pt-3 md:pt-1">
    <div
        v-for="color in store.colorPickerColors"
        :key="color"
        class="w-6 h-6 rounded-sm cursor-pointer"
        :style="{ backgroundColor: color }"
        @click="$emit('colorSelected', color)"
    ></div>
  </div>
  <Separator />
</template>