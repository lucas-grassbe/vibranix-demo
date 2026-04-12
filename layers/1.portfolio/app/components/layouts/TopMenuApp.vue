<script setup lang="ts">
const { logout } = useAppAuth()
</script>

<template>
  <UHeader>
    <template #title>Demo</template>
    <template #right>
      <UButton icon="i-lucide-user" variant="ghost" label="Sair" @click="logout" />
    </template>
  </UHeader>
</template>
