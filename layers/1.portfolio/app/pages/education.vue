<script setup lang="ts">
const { t, locale } = useI18n()
const { education, loading, fetchEducations } = useEducation()
await fetchEducations()
</script>

<template>
  <div>
    <ui-title-page :title="t('pages.education')" />

    <template v-if="loading">
      <UPageCard v-for="i in 3" :key="i" class="mb-4">
        <USkeleton class="h-5 w-2/3 mb-2" />
        <USkeleton class="h-4 w-1/3" />
      </UPageCard>
    </template>

    <template v-else>
      <UPageCard
        v-for="item in education"
        :key="item.id"
        :title="`${item.degree} · ${item.institution}`"
        :description="`${new Date(item.startDate).toLocaleDateString(locale.value)} - ${item.endDate ? new Date(item.endDate).toLocaleDateString(locale.value) : t('common.current')}`"
        class="mb-4"
      />
    </template>
  </div>
</template>
