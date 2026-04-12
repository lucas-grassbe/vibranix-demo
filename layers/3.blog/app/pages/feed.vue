<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: 'sidebase-auth' })

const { posts, content, loading, getPosts, createPost, deletePost } = usePost()
const selectedPostId = ref<number | null>(null)
const postToDeleteId = ref<number | 0>(0)

onMounted(() => {
  getPosts()
})

const confirmDeletePost = () => {
  deletePost(postToDeleteId.value)
  postToDeleteId.value = 0
}
</script>

<template>
  <div class="max-w-2xl mx-auto py-8 px-4 flex flex-col gap-4">
    <h1 class="text-2xl font-bold">Feed</h1>
    <UCard>
      <div class="flex gap-2">
        <UTextarea
          v-model="content"
          placeholder="No que você está pensando?"
          :rows="3"
          class="flex-1"
          autoresize
        />
        <UButton
          icon="i-lucide-send"
          :loading="loading"
          :disabled="!content.trim()"
          @click="createPost()"
        />
      </div>
    </UCard>
    <div v-if="loading">
      <UCard v-for="i in 4" :key="i" class="my-4">
        <div class="flex items-center gap-3 mb-3">
          <USkeleton class="size-8 rounded-full" />
          <div class="flex flex-col gap-1">
            <USkeleton class="h-3 w-28" />
            <USkeleton class="h-3 w-16" />
          </div>
        </div>
        <USkeleton class="h-4 w-full mb-1" />
        <USkeleton class="h-4 w-3/4" />
      </UCard>
    </div>
    <div v-else>
      <template v-if="posts.length > 0">
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @select="selectedPostId = post.id"
          @delete="postToDeleteId = $event"
        />
      </template>
      <p v-else class="text-center text-muted py-12">Nenhum post ainda.</p>
    </div>

    <PostModal :post-id="selectedPostId" @close="selectedPostId = null" />
    <ConfirmationModal
      :open="!!postToDeleteId"
      title="Deletar post"
      description="Tem certeza que deseja deletar este post?"
      @confirm="confirmDeletePost"
      @cancel="postToDeleteId = 0"
    />
  </div>
</template>
