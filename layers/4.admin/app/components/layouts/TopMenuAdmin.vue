<script setup lang="ts">
const { logout } = useAppAuth()
const { t } = useI18n()
const route = useRoute()

const items = computed(() => [
  {
    label: t('admin.education'),
    to: '/admin/education',
    active: route.path.startsWith('/admin/education'),
  },
  {
    label: t('admin.career'),
    to: '/admin/carrer',
    active: route.path.startsWith('/admin/carrer'),
  },
])
</script>

<template>
  <UHeader>
    <template #title>Admin</template>
    <UNavigationMenu :items="items" />
    <template #right>
      <UButton icon="i-lucide-log-out" variant="ghost" :label="t('auth.logout')" @click="logout" />
    </template>
  </UHeader>
</template>
