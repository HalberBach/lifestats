<script setup lang="ts">
import {
  Dialog, DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import SettingsGeneral from "@/components/settings/SettingsGeneral.vue"
import SettingsAccount from "@/components/settings/SettingsAccount.vue"
import { Settings} from "lucide-vue-next";
import {SidebarMenuButton} from "@/components/ui/sidebar";
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <SidebarMenuButton asChild >
        <a>
          <component :is="Settings" />
          <span>Settings</span>
        </a>
      </SidebarMenuButton>
    </DialogTrigger>
    <DialogContent >
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
      </DialogHeader>
      <div>
        <SettingsGeneral />
      </div>
      <div>
        <SettingsAccount />
      </div>
      <DialogFooter >
        <DialogClose>
          <Button >
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>