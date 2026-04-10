<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const {
  experience, techOptions, loading, form, showForm, editingId, deleteId,
  getExperience, getTechnologies, openForm, handleSubmit, submitDelete, submitCreateTechnology,
} = useExperienceAdmin()

onMounted(async () => {
  await getExperience()
  await getTechnologies()
})
</script>

<template>
  <div class="max-w-3xl mx-auto py-8 px-4">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Carreira</h1>
      <UButton icon="i-lucide-plus" label="Adicionar" @click="openForm()" />
    </div>

    <div v-if="loading" class="flex flex-col gap-4">
      <UCard v-for="i in 3" :key="i">
        <USkeleton class="h-4 w-48 mb-2" />
        <USkeleton class="h-3 w-32 mb-2" />
        <USkeleton class="h-3 w-full" />
      </UCard>
    </div>

    <div v-else class="flex flex-col gap-4">
      <UCard v-for="item in experience" :key="item.id">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <p class="font-semibold">{{ item.title }}</p>
            <p class="text-sm text-muted">{{ item.company }}</p>
            <p class="text-xs text-muted mt-1">
              {{ new Date(item.startDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) }} —
              {{ item.endDate ? new Date(item.endDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Atual' }}
            </p>
            <p class="text-sm mt-2">{{ item.description }}</p>
            <div class="flex flex-wrap gap-1 mt-2">
              <UBadge v-for="tech in item.technologies" :key="tech.id" variant="subtle" size="xs">
                {{ tech.name }}
              </UBadge>
            </div>
          </div>
          <div class="flex gap-2 ml-4">
            <UButton icon="i-lucide-pencil" variant="ghost" size="xs" @click="openForm(item)" />
            <UButton icon="i-lucide-trash-2" variant="ghost" color="error" size="xs" @click="deleteId = item.id" />
          </div>
        </div>
      </UCard>
      <p v-if="!experience.length" class="text-center text-muted py-12">Nenhuma experiência cadastrada.</p>
    </div>
  </div>

  <UModal v-model:open="showForm" :title="editingId ? 'Editar experiência' : 'Nova experiência'" description="Preencha os campos abaixo." :ui="{ content: 'max-w-xl' }">
    <template #body>
      <div class="flex flex-col gap-4">
        <UFormField label="Cargo">
          <UInput v-model="form.title" placeholder="Ex: Desenvolvedor de Software" class="w-full" />
        </UFormField>
        <UFormField label="Empresa">
          <UInput v-model="form.company" placeholder="Ex: Google" class="w-full" />
        </UFormField>
        <UFormField label="Descrição">
          <UTextarea v-model="form.description" placeholder="Descreva suas atividades..." :rows="3" class="w-full" autoresize />
        </UFormField>
        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Início">
            <UInput v-model="form.startDate" type="date" class="w-full" />
          </UFormField>
          <UFormField label="Fim (opcional)">
            <UInput v-model="form.endDate" type="date" class="w-full" />
          </UFormField>
        </div>
        <UFormField label="Tecnologias">
          <USelectMenu
            v-model="form.technologyIds"
            :items="techOptions"
            value-key="value"
            label-key="label"
            multiple
            create-item
            placeholder="Selecione tecnologias"
            class="w-full"
            @create="submitCreateTechnology"
          />
        </UFormField>
        <div class="flex justify-end gap-2 pt-2">
          <UButton variant="ghost" label="Cancelar" @click="showForm = false" />
          <UButton label="Salvar" :disabled="!form.title || !form.company || !form.startDate" @click="handleSubmit" />
        </div>
      </div>
    </template>
  </UModal>

  <ConfirmationModal
    :open="!!deleteId"
    title="Remover experiência"
    description="Tem certeza que deseja remover esta experiência?"
    @confirm="submitDelete"
    @cancel="deleteId = null"
  />
</template>
