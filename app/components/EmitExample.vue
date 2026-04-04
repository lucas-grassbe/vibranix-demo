<script setup lang="ts">
const inputValue = ref("")

const emit = defineEmits<{
  updateTitle: [title: string]
}>()
</script>

<template>
  <UCard>
    <h3 class="font-semibold">Emit normal</h3>
    <div class="flex gap-2">
      <UInput v-model="inputValue" />
      <UButton label="Mudar título" @click="emit('updateTitle', inputValue)" />
    </div>
  </UCard>
</template>
