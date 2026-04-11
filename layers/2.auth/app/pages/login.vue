<script setup lang="ts">
definePageMeta({ layout: 'auth' })
import * as z from 'zod'
import type { AuthFormField } from '@nuxt/ui'

const { login } = useAppAuth()

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'E-mail',
  placeholder: 'Digite seu e-mail',
  required: true
}, {
  name: 'password',
  label: 'Senha',
  type: 'password',
  placeholder: 'Digite sua senha',
  required: true
}]

const schema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória')
})

</script>

<template>
  <div class="relative min-h-screen flex flex-col items-center justify-center">
    <UButton icon="i-lucide-arrow-left" variant="ghost" class="absolute top-4 left-2" to="/">
      Voltar
    </UButton>
    <UPageCard class="w-full max-w-md">
      <UAuthForm :schema="schema" title="Login" description="Entre com suas credenciais para entrar em sua conta"
        icon="i-lucide-user" :fields="fields" @submit="login($event.data)">
        <template #footer>
          <p class="text-sm text-center text-muted">
            Não tem conta?
            <NuxtLink to="/register" class="text-primary font-medium">Cadastre-se</NuxtLink>
          </p>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
