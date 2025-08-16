<script setup lang="ts">
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {onMounted, ref} from "vue";
import {supabase} from "@/lib/supabaseClient.ts";
import router from "@/router";
import {useRoute} from "vue-router";

const route = useRoute();
const password = ref('');
const repeatPassword = ref('');
const errorBool = ref<boolean>(false);
const errorText = ref<string>('Error occurred while changing password');

async function changePassword() {
  if (password.value !== repeatPassword.value) {
    errorText.value = "Passwords do not match";
    errorBool.value = true;
    return;
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: password.value
  });

  if (updateError) {
    console.error("Error updating password:", updateError);
    errorText.value = 'Error updating password. Is it different from the old one?';
    errorBool.value = true;
    return;
  }

  await router.push("/login");
}

onMounted(async () => {
  // URL-Hash auslesen
  const hash = window.location.hash; // z.B. "#access_token=XYZ&expires_at=..."
  const params = new URLSearchParams(hash.slice(1)); // slice(1) entfernt das "#"
  const token = params.get("access_token");

  if (!token) {
    errorText.value = "Invalid or expired link";
    return;
  }

  // Supabase-Session setzen
  await supabase.auth.setSession({
    access_token: token,
    refresh_token: params.get("refresh_token") || ""
  });
});
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
              Welcome back
            </CardTitle>
            <CardDescription>
              Reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p v-if="errorBool" class="flex mb-2 justify-center text-sm text-red-500">{{ errorText }}</p>
            <form >
              <div class="grid gap-6">
                <div class="grid gap-6">
                  <div class="grid gap-2">
                    <div class="flex items-center">
                      <Label html-for="password">New Password</Label>
                    </div>
                    <Input id="password" type="password" v-model="password" required />
                  </div>
                  <div class="grid gap-2">
                    <div class="flex items-center">
                      <Label html-for="repeatPassword">Repeat Password</Label>
                    </div>
                    <Input id="repeatPassword" type="password" v-model="repeatPassword" required />
                  </div>
                  <Button type="submit" class="w-full" @click.prevent="changePassword">
                    Done
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
