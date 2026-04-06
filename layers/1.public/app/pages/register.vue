<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: 'guest' })
import * as z from 'zod'
import type { AuthFormField } from '@nuxt/ui'

const { register } = useAppAuth()

const fields: AuthFormField[] = [{
  name: 'name',
  type: 'text',
  label: 'Nome',
  placeholder: 'Digite seu nome',
  required: true
}, {
  name: 'email',
  type: 'email',
  label: 'E-mail',
  placeholder: 'Digite seu e-mail',
  required: true
}, {
  name: 'password',
  label: 'Senha',
  type: 'password',
  placeholder: 'Mínimo 6 caracteres',
  required: true
}]

const schema = z.object({
  name: z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres')
})

</script>

<template>
  <div class="relative min-h-screen flex flex-col items-center justify-center gap-4 p-4">
    <UButton icon="i-lucide-arrow-left" variant="ghost" class="absolute top-4 left-4" to="/">
      Voltar
    </UButton>
    <UPageCard class="w-full max-w-md">
      <UAuthForm :schema="schema" title="Cadastro" description="Crie sua conta para começar"
        icon="i-lucide-user-plus" :fields="fields" @submit="register($event.data)">
        <template #footer>
          <p class="text-sm text-center text-muted">
            Já tem conta?
            <NuxtLink to="/login" class="text-primary font-medium">Entrar</NuxtLink>
          </p>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
