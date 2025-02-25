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
import { Button } from "@/components/ui/button";
</script>

<template>
  <div class="main-containerr">
    <Select>
      <SelectTrigger class="w-[200px]">
        <SelectValue placeholder="Select a fruit" />
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
    <Button>Click me</Button>
  </div>
</template>

<style scoped>
.main-containerr {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

}
</style>