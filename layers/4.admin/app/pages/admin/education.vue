<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { t } = useI18n()
const {
  education,
  loading,
  form,
  showForm,
  editingId,
  deleteId,
  getEducation,
  openForm,
  handleSubmit,
  submitDelete,
} = useEducationAdmin()

onMounted(() => {
  getEducation()
})
</script>

<template>
  <div class="max-w-3xl mx-auto py-8 px-4">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">{{ t('admin.education') }}</h1>
      <UButton icon="i-lucide-plus" :label="t('admin.add')" @click="openForm()" />
    </div>

    <div v-if="loading" class="flex flex-col gap-4">
      <UCard v-for="i in 3" :key="i">
        <USkeleton class="h-4 w-48 mb-2" />
        <USkeleton class="h-3 w-32" />
      </UCard>
    </div>

    <div v-else class="flex flex-col gap-4">
      <UCard v-for="item in education" :key="item.id" class="flex flex-col gap-1">
        <div class="flex items-start justify-between">
          <div>
            <p class="font-semibold">{{ item.degree }}</p>
            <p class="text-sm text-muted">{{ item.institution }}</p>
            <p class="text-xs text-muted mt-1">
              {{ new Date(item.startDate).getFullYear() }} —
              {{ item.endDate ? new Date(item.endDate).getFullYear() : t('common.current') }}
            </p>
          </div>
          <div class="flex gap-2">
            <UButton icon="i-lucide-pencil" variant="ghost" size="xs" @click="openForm(item)" />
            <UButton
              icon="i-lucide-trash-2"
              variant="ghost"
              color="error"
              size="xs"
              @click="deleteId = item.id"
            />
          </div>
        </div>
      </UCard>
      <p v-if="!education.length" class="text-center text-muted py-12">
        {{ t('admin.noEducation') }}
      </p>
    </div>

    <UModal
      v-model:open="showForm"
      :title="editingId ? t('admin.editEducation') : t('admin.newEducation')"
      :description="t('admin.fillFields')"
    >
      <template #body>
        <div class="flex flex-col gap-4">
          <UFormField :label="t('admin.degree')">
            <UInput
              v-model="form.degree"
              placeholder="Ex: Bacharelado em Ciência da Computação"
              class="w-full"
            />
          </UFormField>
          <UFormField :label="t('admin.institution')">
            <UInput v-model="form.institution" placeholder="Ex: USP" class="w-full" />
          </UFormField>
          <UFormField :label="t('admin.startDate')">
            <UInput v-model="form.startDate" type="date" class="w-full" />
          </UFormField>
          <UFormField :label="t('admin.endDate')">
            <UInput v-model="form.endDate" type="date" class="w-full" />
          </UFormField>
          <div class="flex justify-end gap-2 pt-2">
            <UButton variant="ghost" :label="t('confirm.cancel')" @click="showForm = false" />
            <UButton
              :label="t('admin.save')"
              :disabled="!form.degree || !form.institution || !form.startDate"
              @click="handleSubmit"
            />
          </div>
        </div>
      </template>
    </UModal>

    <ConfirmationModal
      :open="!!deleteId"
      :title="t('admin.removeEducation')"
      :description="t('admin.removeEducationDesc')"
      @confirm="submitDelete"
      @cancel="deleteId = null"
    />
  </div>
</template>
