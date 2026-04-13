<script setup lang="ts">
const { logout } = useAppAuth()
const { t } = useI18n()
</script>

<template>
  <UHeader>
    <template #title>Demo</template>
    <template #right>
      <UButton icon="i-lucide-user" variant="ghost" :label="t('auth.logout')" @click="logout" />
    </template>
  </UHeader>
</template>
