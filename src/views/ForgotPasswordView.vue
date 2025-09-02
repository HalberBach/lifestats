<script setup lang="ts">

import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
    <div class="flex w-full max-w-sm flex-col gap-6">
      <a href="#" class="flex items-center gap-2 self-center font-medium">
        <div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <p>Logo</p>
        </div>
        Lifestats
      </a>
      <div class="flex flex-col gap-6">
        <Card>
          <CardHeader class="text-center">
            <CardTitle class="text-xl">
              Resetting Password
            </CardTitle>
            <CardDescription>
              An Email to reset your password has been sent to your email address.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  </div>
</template>