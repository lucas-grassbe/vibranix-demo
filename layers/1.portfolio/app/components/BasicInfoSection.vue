<script setup lang="ts">
import { personalInfo, socialLinks } from '../data/personalInfo'

const { t } = useI18n()
</script>

<template>
  <div>
    <UPageHero
      :title="personalInfo.name"
      :subtitle="t('bio.title')"
      :description="t('bio.about')"
    />
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
