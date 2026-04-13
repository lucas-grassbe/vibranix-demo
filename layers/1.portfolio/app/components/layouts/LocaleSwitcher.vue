<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="flex gap-1">
    <UButton
      v-for="loc in locales"
      :key="loc.code"
      :label="loc.code.toUpperCase()"
      :variant="locale === loc.code ? 'solid' : 'ghost'"
      size="xs"
      :to="switchLocalePath(loc.code)"
    />
  </div>
</template>
