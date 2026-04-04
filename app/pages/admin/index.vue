<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
</script>

<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center gap-4 text-center px-4">
    <UIcon name="i-lucide-shield-check" class="size-16 text-primary" />
    <h1 class="text-3xl font-bold">Área Administrativa</h1>
    <p class="text-muted max-w-sm">Use o menu acima para gerenciar o conteúdo da landing page.</p>
  </div>
</template>
