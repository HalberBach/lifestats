<script setup lang="ts">
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
    <div class="flex w-full max-w-sm flex-col gap-6">
      <a href="#" class="flex items-center gap-2 self-center font-medium">
        <div class="flex h-6 w-6 items-center justify-center ">
          <img src="../assets/Icon.png" alt="Logo" />
        </div>
        Lifestats
      </a>
      <Card>
        <CardHeader>
          <CardTitle class="text-2xl text-center">
            Email Confirmation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-center text-gray-300">
            <p class="mb-4">A confirmation link has been sent to your email address. Please check your inbox and click the link to verify your account.</p>
            <p class="mb-4">If you don't see the email, please check your spam or junk folder.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>