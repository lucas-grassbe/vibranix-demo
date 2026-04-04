<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <UCard>
    <h3 class="font-semibold">defineModel</h3>
    <div class="flex gap-2">
      <UInput v-model="model" />
      <UButton label="Mudar título" @click="model = model" />
    </div>
  </UCard>
</template>
