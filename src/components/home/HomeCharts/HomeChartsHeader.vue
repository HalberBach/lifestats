<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
const selectValue = defineModel<string>()
</script>

<template>
  <div class="homechartsheader-container">
    <p class="text-3xl font-bold">
      Summary
    </p>
    <Select v-model="selectValue">
      <SelectTrigger class="w-[160px]">
        <SelectValue :placeholder="selectValue"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select</SelectLabel>
          <SelectItem value="today">
            Selected Day
          </SelectItem>
          <SelectItem value="30 Days">
            Last 30 Days
          </SelectItem>
          <SelectItem value="total">
            Total
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>

<style scoped>
.homechartsheader-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
</style>