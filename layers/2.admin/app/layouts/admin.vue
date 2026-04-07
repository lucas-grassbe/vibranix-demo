<script setup lang="ts">
useHead({ title: 'Admin - Demo' })
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <layouts-top-menu-admin />
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
