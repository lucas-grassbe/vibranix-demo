<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField } from '@nuxt/ui'
definePageMeta({ layout: 'auth' })

const { login } = useAppAuth()
const { t } = useI18n()
const localePath = useLocalePath()

const fields = computed<AuthFormField[]>(() => [
  {
    name: 'email',
    type: 'email',
    label: t('auth.email'),
    placeholder: t('auth.emailPlaceholder'),
    required: true,
  },
  {
    name: 'password',
    label: t('auth.password'),
    type: 'password',
    placeholder: t('auth.passwordPlaceholder'),
    required: true,
  },
])

const schema = computed(() =>
  z.object({
    email: z.email(t('auth.validation.emailInvalid')),
    password: z.string().min(1, t('auth.validation.passwordRequired')),
  }),
)
</script>

<template>
  <div class="relative min-h-screen flex flex-col items-center justify-center">
    <UButton
      icon="i-lucide-arrow-left"
      variant="ghost"
      class="absolute top-4 left-2"
      :to="localePath('/')"
    >
      {{ t('auth.back') }}
    </UButton>
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        :title="t('auth.loginTitle')"
        :description="t('auth.loginDesc')"
        icon="i-lucide-user"
        :fields="fields"
        @submit="login($event.data)"
      >
        <template #footer>
          <p class="text-sm text-center text-muted">
            {{ t('auth.noAccount') }}
            <NuxtLink :to="localePath('/register')" class="text-primary font-medium">{{
              t('auth.signUp')
            }}</NuxtLink>
          </p>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
