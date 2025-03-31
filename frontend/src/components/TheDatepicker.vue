<script setup lang="ts">
import {cn} from "@/lib/utils.ts";
import {CalendarDate, DateFormatter, getLocalTimeZone} from "@internationalized/date";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Calendar as CalendarIcon} from 'lucide-vue-next'
import {watch} from "vue";

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})
const value = defineModel<CalendarDate>()
const emit = defineEmits(['input'])
watch(value, () => {
  emit('input', value)
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
          variant="outline"
          :class="cn(
          'w-full mr-2 justify-start text-left font-normal',
          !value && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus/>
    </PopoverContent>
  </Popover>
</template>

<style scoped>

</style>