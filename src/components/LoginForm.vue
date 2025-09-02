<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {useRouter} from "vue-router";
import {supabase} from "@/lib/supabaseClient.ts";
import {ref} from "vue";
import {useUserStore} from "@/store/userstore.ts";

const router = useRouter()
const userStore = useUserStore()
const email = ref<string>()
const emailError = ref<boolean>(false)
const emailErrorText = ref<string>("Please enter a valid email address")
const password = ref<string>()
const passwordError = ref<boolean>(false)
const passwordErrorText = ref<string>("Password invalid")

async function login() {
  emailError.value = false
  passwordError.value = false

  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) {
      if (error.status === 400) {
        emailError.value = true
        emailErrorText.value = "Invalid email or password. Check if you confirmed your email."
      } else {
        console.error("Unexpected error during login:", error)
        passwordError.value = true
        passwordErrorText.value = "Login failed. Please try again later."
      }
      return
    }

    console.log("login success")
    userStore.user = data.user
    await router.push('/home')
  } catch (err) {
    console.error("Error during login process:", err)
    passwordError.value = true
    passwordErrorText.value = "An error occurred. Please try again later."
  }
}

async function forgotPasswort() {
  emailError.value = false
  if (email.value) {
    await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    .then(() => {
      console.log("Password reset email sent")
      router.push('/forgot-password')
    })
    .catch((error) => {
      console.error("Error sending password reset email:", error)
      emailError.value = true
      emailErrorText.value = "Error sending password reset email. Please try again later."
    })
  } else {
    emailError.value = true
    emailErrorText.value = "Please enter your email address"
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl">
          Welcome back
        </CardTitle>
        <CardDescription>
          Login with your Apple or Google account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="login">
          <div class="grid gap-6">
            <div class="flex flex-col gap-4">
              <Button variant="outline" class="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Login with Google
              </Button>
            </div>
            <div class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span class="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <div class="grid gap-6">
              <div class="grid gap-2">
                <Label html-for="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  v-model="email"
                  placeholder="m@example.com"
                  required
                />
                <p v-if="emailError" class="flex justify-center text-red-500">{{ emailErrorText }}</p>
              </div>
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label html-for="password">Password</Label>
                  <a
                    href="#"
                    class="ml-auto text-sm underline-offset-4 hover:underline"
                    @click.prevent="forgotPasswort"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" v-model="password" required />
                <p v-if="passwordError" class="flex justify-center text-red-500">{{ passwordErrorText }}</p>
              </div>
              <Button type="submit" class="w-full" >
                Login
              </Button>
            </div>
            <div class="text-center text-sm">
              Don't have an account?
              <a href="#" @click="router.push('/register')" class="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
    <div class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
      By clicking continue, you agree to our <a href="#">Terms of Service</a>
      and <a href="#">Privacy Policy</a>.
    </div>
  </div>
</template>
