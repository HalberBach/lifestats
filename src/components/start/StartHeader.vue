<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <div class="flex justify-between items-center pb-4 border- border-b">
    <div class="flex items-center gap-4">
      <div class=" h-6 w-6 items-center justify-center ">
        <img src="@/assets/icon4.png" alt="Logo" />
      </div>
      <h1 class="font-bold text-2xl">Lifestats</h1>
    </div>
    <div>
      <Button class="mr-3" variant="ghost" @click="router.push('/login')">Log In</Button>
      <Button variant="default" @click="router.push('/register')">Try for free</Button>
    </div>
  </div>
</template>