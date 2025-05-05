<script setup lang="ts">

import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Button} from "@/components/ui/button";
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <div class="flex-col ml-12 mr-12">
    <div class="justify-items-center mb-8 mt-10">
      <h1 class="font-bold text-6xl mb-8">Track how you spent your Time</h1>
      <p class="font-medium text-xl text-gray-300 w-3/5 text-center mb-6">With Lifestats you can easily document and analyse how you spend your time,
        to help you achieve your goals.</p>
      <Button variant="default" @click="router.push('/register')">Register Now</Button>
    </div>
    <div>
      <AspectRatio ratio="16/9">
        <img
            src="../../assets/preview.png"
            alt="Preview"
            class="border rounded-lg shadow-lg shadow-gray-600" />
      </AspectRatio>
    </div>
  </div>
</template>

<style scoped>

</style>