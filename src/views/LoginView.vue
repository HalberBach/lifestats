<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";
import router from "@/router";
import {onMounted} from "vue";
import {supabase} from "@/lib/supabaseClient.ts";
import Icon from '@/assets/Icon.png';

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    // User ist eingeloggt → direkt weiterleiten
    router.push('/home');
  }
});
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
    <div class="flex w-full max-w-sm flex-col gap-6">
      <a href="#" class="flex items-center gap-2 self-center font-medium">
        <div class="flex h-6 w-6 items-center justify-center ">
          <img :src="Icon" alt="Logo" />
        </div>
        Lifestats
      </a>
      <LoginForm />
    </div>
  </div>
</template>