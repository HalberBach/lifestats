<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {supabase} from "../lib/supabaseClient.ts";
import {useRouter} from "vue-router";
import {ref} from "vue";

const router = useRouter()
const email = ref<string>('')
const password = ref<string>('')

const emailError = ref<string>('')
const showEmailError = ref<boolean>(false)
const passwordError = ref<string>('')
const showPasswordError = ref<boolean>(false)

function validateEmail() {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.value);
}
function validatePassword() {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password.value);
}
function validateInput() {
  if (!validateEmail()) {
    showEmailError.value = true
    emailError.value = 'Invalid email address'
  } else {
    showEmailError.value = false
  }
  if (!validatePassword()) {
    showPasswordError.value = true
    passwordError.value = 'Must be at least 6 characters long'
  } else {
    showPasswordError.value = false
  }
}

// Handle registration with email and password
async function registerWithEmailAndPassword() {
  validateInput()
  if (!showEmailError.value && !showPasswordError.value) {
    let { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    })

  }
}
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl text-center">
        Register
      </CardTitle>
      <CardDescription>
        Create an account or simply login with google
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
              id="email"
              type="email"
              v-model="email"
              placeholder="m@example.com"
              required
          />
          <p v-if="showEmailError" class="error text-red-500 font-light mb-2">{{ emailError }}</p>
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
          </div>
          <Input id="password" type="password" v-model="password" required/>
          <p v-if="showPasswordError" class="text-red-500 font-light mb-4 w-full max-w-xs">{{ passwordError }}</p>
        </div>
        <Button type="submit" class="w-full" @click="registerWithEmailAndPassword">
          Register
        </Button>
        <div class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span class="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
        </div>
        <Button variant="outline" class="w-full">
          Login with Google
        </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <a href="#" @click="router.push('/login')" class="underline">
          Log in
        </a>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>
.error {
  word-break: break-word;
}
</style>