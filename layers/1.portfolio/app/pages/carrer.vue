<script setup lang="ts">
const { t, locale } = useI18n()
const { experiences, loading, fetchExperiences } = useExperience()

loading.value = true

onMounted(() => {
  fetchExperiences()
})
</script>

<template>
  <div>
    <ui-title-page :title="t('pages.career')" />

    <div v-if="loading" class="flex flex-col gap-6">
      <div v-for="i in 3" :key="i" class="flex gap-4">
        <USkeleton class="size-8 rounded-full shrink-0" />
        <div class="flex-1">
          <USkeleton class="h-4 w-1/4 mb-2" />
          <USkeleton class="h-5 w-2/3 mb-2" />
          <USkeleton class="h-4 w-full mb-1" />
          <USkeleton class="h-4 w-3/4 mb-3" />
          <div class="flex gap-1">
            <USkeleton class="h-5 w-16 rounded-full" />
            <USkeleton class="h-5 w-20 rounded-full" />
            <USkeleton class="h-5 w-14 rounded-full" />
          </div>
        </div>
      </div>
    </div>

    <UTimeline
      v-else
      :items="
        experiences.map((exp) => ({
          title: `${exp.title} · ${exp.company}`,
          description: exp.description,
          date: `${new Date(exp.startDate).toLocaleDateString(locale, { month: 'short', year: 'numeric' })} - ${exp.endDate ? new Date(exp.endDate).toLocaleDateString(locale, { month: 'short', year: 'numeric' }) : t('common.current')}`,
          icon: 'i-lucide-code',
          technologies: exp.technologies,
        }))
      "
      color="neutral"
    >
      <template #description="{ item }">
        {{ item.description }}
        <div class="flex flex-wrap gap-1 mt-3">
          <UBadge
            v-for="tech in item.technologies"
            :key="tech.id"
            :label="tech.name"
            variant="subtle"
            color="primary"
          />
        </div>
      </template>
    </UTimeline>
  </div>
</template>
