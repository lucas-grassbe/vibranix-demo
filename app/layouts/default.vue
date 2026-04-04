<script setup lang="ts">
useHead({
  title: 'Dev Lucas Grass Beraldo'
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <layouts-top-menu-landing />
    <main class="flex-1">
      <slot />
    </main>
    <layouts-footer />
  </div>
</template>