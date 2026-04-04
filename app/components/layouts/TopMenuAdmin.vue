<script setup lang="ts">
const { logout } = useAppAuth()
const route = useRoute()

const items = computed(() => [
  {
    label: 'Formação',
    to: '/admin/education',
    active: route.path.startsWith('/admin/education'),
  },
  {
    label: 'Carreira',
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
      <UButton icon="i-lucide-log-out" variant="ghost" label="Sair" @click="logout" />
    </template>
  </UHeader>
</template>
