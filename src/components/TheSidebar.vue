<script setup lang="ts">
import {Home, ChartArea, Database, LogOut } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {supabase} from "@/lib/supabaseClient.ts";
import router from "@/router";
import SettingsView from "@/views/SettingsView.vue";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
    deactivated: false,
  },
  {
    title: "Data",
    url: "/home",
    icon: Database,
    deactivated: true,
  },
  {
    title: "Analytics",
    url: "/home",
    icon: ChartArea,
    deactivated: true,
  },
];

async function logout() {
  let { error } = await supabase.auth.signOut()
  if (error) {
    console.error("Logout error", error)
  } else {
    router.push("/login")
    console.log("Logout success")
  }
}
</script>

<template>
  <Sidebar collapsible="icon" class="!border-none" style="background-color: var(--sidebar-secondary)">

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Lifestats</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title" >
              <SidebarMenuButton asChild>
                <a v-if="!item.deactivated" :href="item.url">
                  <component :is="item.icon" />
                  <span>{{item.title}}</span>
                </a>
                <a v-else style="pointer-events: none; cursor: default;">
                  <component :is="item.icon" class="text-gray-400" />
                  <span class="text-gray-400">Soon</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SettingsView />
            </SidebarMenuItem>
            <SidebarMenuItem class="mt-4">
              <SidebarMenuButton asChild @click="logout">
                <a>
                  <component :is="LogOut" />
                  <span>Log Out</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>