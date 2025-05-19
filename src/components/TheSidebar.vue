<script setup lang="ts">
import {Home, ChartArea, Database, Settings, LogOut } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem, SidebarTrigger,
} from "@/components/ui/sidebar"
import {supabase} from "@/lib/supabaseClient.ts";
import router from "@/router";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Data",
    url: "/data",
    icon: Database,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: ChartArea,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
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
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarTrigger />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title" >
              <SidebarMenuButton asChild>
                <a :href="item.url">
                  <component :is="item.icon" />
                  <span>{{item.title}}</span>
                </a>
              </SidebarMenuButton>
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