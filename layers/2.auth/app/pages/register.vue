<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField } from '@nuxt/ui'
definePageMeta({ layout: 'auth' })

const { register } = useAppAuth()
const { t } = useI18n()
const localePath = useLocalePath()

const { resetEducation } = useEducation()
const { resetExperience } = useExperience()

onBeforeMount(() => {
  resetEducation()
  resetExperience()
})

const fields = computed<AuthFormField[]>(() => [
  {
    name: 'name',
    type: 'text',
    label: t('auth.name'),
    placeholder: t('auth.namePlaceholder'),
    required: true,
  },
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
    placeholder: t('auth.passwordMinPlaceholder'),
    required: true,
  },
])

const schema = computed(() =>
  z.object({
    name: z.string().min(2, t('auth.validation.nameMin')),
    email: z.email(t('auth.validation.emailInvalid')),
    password: z.string().min(6, t('auth.validation.passwordMin')),
  })
)
</script>

<template>
  <div class="relative min-h-screen flex flex-col items-center justify-center gap-4 p-4">
    <UButton
      icon="i-lucide-arrow-left"
      variant="ghost"
      class="absolute top-4 left-4"
      :to="localePath('/')"
    >
      {{ t('auth.back') }}
    </UButton>
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        :title="t('auth.registerTitle')"
        :description="t('auth.registerDesc')"
        icon="i-lucide-user-plus"
        :fields="fields"
        @submit="register($event.data)"
      >
        <template #footer>
          <p class="text-sm text-center text-muted">
            {{ t('auth.hasAccount') }}
            <NuxtLink :to="localePath('/login')" class="text-primary font-medium">{{
              t('auth.signIn')
            }}</NuxtLink>
          </p>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
