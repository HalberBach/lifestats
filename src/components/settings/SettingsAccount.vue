<script setup lang="ts">
import SettingsSectionHeader from "@/components/settings/SettingsSectionHeader.vue";
import {Button} from "@/components/ui/button";
import {ref} from "vue";
import {supabase} from "@/lib/supabaseClient.ts";
import router from "@/router";

const showDeleteAccountMenu = ref<boolean>(false);

async function deleteUser() {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
  const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!SUPABASE_URL || !ANON_KEY) {
    console.error("Missing Supabase URL or Anon Key in environment variables.");
    return;
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.error('Not signed in');
    return;
  }

  const response = await fetch(
      `${SUPABASE_URL}/functions/v1/delete-user`,
      {
        method: 'POST',
        headers: {
          // Pass the user’s JWT – the function will decode it
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        // No body needed for the JWT‑extract version
      }
  );

  const result = await response.json();
  if (!response.ok) {
    console.error('Delete failed:', result.error);
  } else {
    console.log('Delete succeeded:', result.message);
    await router.push('/')
  }
}
</script>

<template>
  <SettingsSectionHeader title="Account" />
  <div class="flex items-center justify-between pt-2">
    <Button v-if="!showDeleteAccountMenu" variant="destructive" @click="showDeleteAccountMenu = true">Delete Account</Button>
    <div v-if="showDeleteAccountMenu" class="flex w-full justify-between space-x-2">
      <span class="ml-2">Delete permanently?</span>
      <div class="flex gap-2">
        <Button variant="destructive" size="sm" @click="deleteUser">Yes, delete Account</Button>
        <Button variant="outline" size="sm" @click="showDeleteAccountMenu = false">Cancel</Button>
      </div>
    </div>
  </div>
</template>