<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {useRouter} from "vue-router";
import preview from '@/assets/preview.png';
import preview_mobile from '@/assets/preview_mobile.png';

const router = useRouter()
</script>

<template>
  <div class="flex-col ml-8 mr-8 sm:ml-12 sm:mr-12">
    <h1 class="font-bold text-5xl sm:text-6xl mb-5 sm:mt-10 mt-7 text-center">Track <span class="hidden sm:inline">how you spent</span> your Time</h1>
    <div class="justify-items-center mb-8">
      <p class="font-medium text-xl text-gray-300 w-3/5 text-center sm:mb-1 mb-4 w-full">A simple Time Tracker for your daily tasks.</p>
      <p class="hidden sm:block font-medium text-xl text-gray-300 w-3/5 text-center mb-6">You you can easily document and analyse how you spend your time,
        to help you achieve your goals.</p>
      <Button class="flex hidden sm:block bg-background bg-indigo-600" variant="secondary" @click="router.push('/register')">Register for Free</Button>
    </div>
    <div class="w-full flex justify-center mb-10">
      <!-- Desktop -->
      <AspectRatio ratio="16/9" class="w-full sm:max-w-md md:max-w-3xl lg:max-w-4xl xl:max-w-6xl">
        <img
            :src="preview"
            alt="Preview"
            class="hidden sm:block border rounded-lg mx-auto shadow-lg shadow-gray-400"
        />
      </AspectRatio>

      <!-- Mobile -->
      <img
          :src="preview_mobile"
          alt="Preview Mobile"
          class="block sm:hidden border rounded-lg mx-auto object-contain shadow-lg shadow-gray-400"
      />
    </div>
  </div>
</template>
