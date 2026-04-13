<script setup lang="ts">
const { t } = useI18n()

const socialLinks = computed(() => [
  { name: 'GitHub', url: t('bio.github') },
  { name: 'LinkedIn', url: t('bio.linkedin') },
])
</script>

<template>
  <div>
    <UPageHero :title="t('bio.name')" :subtitle="t('bio.title')" :description="t('bio.about')" />
    <div class="flex justify-center gap-2">
      <UButton
        v-for="link in socialLinks"
        :key="link.name"
        :label="link.name"
        :to="link.url"
        target="_blank"
        variant="ghost"
        size="sm"
      />
    </div>
  </div>
</template>
