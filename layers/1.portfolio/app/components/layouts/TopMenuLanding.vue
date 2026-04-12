<script setup lang="ts">
import { personalInfo } from '../../data/personalInfo'

const route = useRoute()

const items = computed(() => [
  {
    label: 'Home',
    to: '/',
    active: route.path === '/',
  },
  {
    label: 'Carreira',
    to: '/carrer',
    active: route.path.startsWith('/carrer'),
  },
  {
    label: 'Formação',
    to: '/education',
    active: route.path.startsWith('/education'),
  },
])
</script>

<template>
  <UHeader>
    <template #title>{{ personalInfo.name }}</template>
    <UNavigationMenu :items="items" />
    <template #right>
      <UButton label="Login" size="sm" to="/login" />
      <UButton label="Cadastro" size="sm" variant="ghost" to="/register" />
      <UColorModeButton />
    </template>
  </UHeader>
</template>
