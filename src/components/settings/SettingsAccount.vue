<script setup lang="ts">
import SettingsSectionHeader from "@/components/settings/SettingsSectionHeader.vue";
import {Button} from "@/components/ui/button";
</script>

<template>
  <SettingsSectionHeader title="Account" />
  <div class="flex items-center justify-between pt-2">
    <Button variant="destructive">Delete Account</Button>
  </div>
</template>