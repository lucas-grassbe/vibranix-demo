<script setup lang="ts">
import type { NavigationMenuItem } from '#ui/components/NavigationMenu.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: t('nav.home'),
    to: localePath('/'),
    active: route.path === '/' || route.path === '/en',
  },
  {
    label: t('nav.career'),
    to: localePath('/carrer'),
    active: route.path.includes('/carrer'),
  },
  {
    label: t('nav.education'),
    to: localePath('/education'),
    active: route.path.includes('/education'),
  },
])
</script>

<template>
  <UHeader>
    <template #title>{{ t('bio.name') }}</template>
    <UNavigationMenu :items="items" />
    <template #right>
      <UButton :label="t('auth.login')" size="sm" :to="localePath('/login')" />
      <UButton
        :label="t('auth.register')"
        size="sm"
        variant="ghost"
        :to="localePath('/register')"
      />
      <layouts-locale-switcher />
      <UColorModeButton />
    </template>
    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
