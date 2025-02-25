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
import { Plus } from 'lucide-vue-next'
</script>

<template>
  <div class="homechartsheader-container">
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
    <Button>
      <Plus class="w-4 h-4 mr-2" /> Add
    </Button>
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