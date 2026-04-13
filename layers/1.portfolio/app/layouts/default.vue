<script setup lang="ts">
const { t } = useI18n()
useHead({ title: () => `${t('bio.title')} · Lucas Grass Beraldo` })
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <layouts-top-menu-landing />
    <main class="flex-1">
      <slot />
    </main>
    <layouts-footer />
  </div>
</template>
