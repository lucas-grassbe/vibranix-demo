<script setup lang="ts">
defineProps<{
  post: PostDto
}>()

const emit = defineEmits<{ select: [id: number], delete: [id: number] }>()

const { data: session } = useAuth()
</script>

<template>
  <UCard class="hover:ring-2 hover:ring-primary transition cursor-pointer my-5" @click="emit('select', post.id)">
    <div class="flex justify-between items-start">
      <PostBody :post="post" class="flex-1" />
      <UButton
        v-if="session?.id === post.author.id"
        icon="i-lucide-trash-2"
        variant="ghost"
        color="error"
        size="xs"
        @click.stop="emit('delete', post.id)"
      />
    </div>
  </UCard>
</template>
