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
      Total Time
    </p>
    <Select v-model="selectValue">
      <SelectTrigger class="w-[200px]">
        <SelectValue :placeholder="selectValue"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select</SelectLabel>
          <SelectItem value="today">
            Today
          </SelectItem>
          <SelectItem value="30 Days">
            30 Days
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