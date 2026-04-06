<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const {
  education, loading, form, showForm, editingId, deleteId,
  getEducation, openForm, handleSubmit, submitDelete,
} = useEducation()

onMounted(() => {
  getEducation()
})
</script>

<template>
  <div class="max-w-3xl mx-auto py-8 px-4">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Formação</h1>
      <UButton icon="i-lucide-plus" label="Adicionar" @click="openForm()" />
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
              {{ item.endDate ? new Date(item.endDate).getFullYear() : 'Atual' }}
            </p>
          </div>
          <div class="flex gap-2">
            <UButton icon="i-lucide-pencil" variant="ghost" size="xs" @click="openForm(item)" />
            <UButton icon="i-lucide-trash-2" variant="ghost" color="error" size="xs" @click="deleteId = item.id" />
          </div>
        </div>
      </UCard>
      <p v-if="!education.length" class="text-center text-muted py-12">Nenhuma formação cadastrada.</p>
    </div>
  </div>

  <UModal v-model:open="showForm" :title="editingId ? 'Editar formação' : 'Nova formação'">
    <template #body>
      <div class="flex flex-col gap-4">
        <UFormField label="Grau / Curso">
          <UInput v-model="form.degree" placeholder="Ex: Bacharelado em Ciência da Computação" class="w-full" />
        </UFormField>
        <UFormField label="Instituição">
          <UInput v-model="form.institution" placeholder="Ex: USP" class="w-full" />
        </UFormField>
        <UFormField label="Início">
          <UInput v-model="form.startDate" type="date" class="w-full" />
        </UFormField>
        <UFormField label="Fim (opcional)">
          <UInput v-model="form.endDate" type="date" class="w-full" />
        </UFormField>
        <div class="flex justify-end gap-2 pt-2">
          <UButton variant="ghost" label="Cancelar" @click="showForm = false" />
          <UButton label="Salvar" :disabled="!form.degree || !form.institution || !form.startDate" @click="handleSubmit" />
        </div>
      </div>
    </template>
  </UModal>

  <ConfirmationModal
    :open="!!deleteId"
    title="Remover formação"
    description="Tem certeza que deseja remover esta formação?"
    @confirm="submitDelete"
    @cancel="deleteId = null"
  />
</template>
