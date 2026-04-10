<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
  description: string
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <UModal :open="open" :title="title" :description="description" @update:open="emit('cancel')">
    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton variant="ghost" label="Cancelar" @click="emit('cancel')" />
        <UButton color="error" label="Confirmar" @click="emit('confirm')" />
      </div>
    </template>
  </UModal>
</template>
