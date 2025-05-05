<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <div class="flex justify-between items-center pb-4 border- border-b">
    <div>
      <h1>LOGO</h1>
    </div>
    <div>
      <Button class="mr-3" variant="ghost" @click="router.push('/login')">Log In</Button>
      <Button variant="default" @click="router.push('/register')">Try for free</Button>
    </div>
  </div>
</template>

<style scoped>

</style>