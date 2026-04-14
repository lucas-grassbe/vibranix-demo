<script setup lang="ts">
defineProps<{
  post: PostDto
}>()

const imageLoaded = ref(false)
</script>

<template>
  <div>
    <div class="flex items-center gap-3 mb-3">
      <UAvatar :alt="post.author.name" size="sm" />
      <div>
        <p class="font-semibold text-sm">{{ post.author.name }}</p>
        <p class="text-xs text-muted">{{ new Date(post.createdAt).toLocaleDateString('pt-BR') }}</p>
      </div>
    </div>
    <p class="text-sm">{{ post.content }}</p>
    <div v-if="post.imageUrl" class="flex items-center justify-center gap-3 mb-3 mt-3">
      <USkeleton v-if="!imageLoaded" class="w-full h-48 rounded-md" />
      <NuxtImg
        provider="cloudflare"
        :src="`/${post.imageUrl}`"
        width="500"
        :class="['gap-3', imageLoaded ? 'block' : 'hidden']"
        @load="imageLoaded = true"
      />
    </div>
  </div>
</template>
