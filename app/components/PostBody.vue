<script setup lang="ts">
defineProps<{
  post: PostDto
}>()
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
  </div>
</template>
