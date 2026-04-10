<script setup lang="ts">

const { status } = useAuth()

useHead({
  title: 'Feed - Demo'
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <layouts-top-menu-app v-if="status === 'authenticated'" />
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
