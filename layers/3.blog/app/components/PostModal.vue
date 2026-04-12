<script setup lang="ts">
const props = defineProps<{ postId: number | null }>()
const emit = defineEmits<{ close: [] }>()

const {
  post,
  comments,
  loadingModal,
  content,
  loading,
  getPostById,
  createComment,
  deleteComment,
} = usePost()
const { data: session } = useAuth()
const commentToDeleteId = ref<number | null>(null)

watch(
  () => props.postId,
  (id) => {
    if (id) {
      getPostById(id)
    }
  },
)

const confirmDeleteComment = () => {
  deleteComment(props.postId!, commentToDeleteId!)
  commentToDeleteId.value = null
}
</script>

<template>
  <UModal :open="!!props.postId" title="Post" description=" " @update:open="emit('close')">
    <template #body>
      <div v-if="loadingModal" class="flex flex-col">
        <div class="flex items-center gap-3 mb-4">
          <USkeleton class="size-8 rounded-full shrink-0" />
          <div class="flex flex-col gap-1">
            <USkeleton class="h-3 w-28" />
            <USkeleton class="h-3 w-16" />
          </div>
        </div>
        <USkeleton class="h-4 w-full mb-1" />
        <USkeleton class="h-4 w-3/4 mb-6" />
        <USeparator class="mb-4" />
        <USkeleton class="h-4 w-32 mb-3" />
        <div v-for="i in 2" :key="i" class="flex flex-col gap-1 mb-3">
          <div class="flex items-center gap-2">
            <USkeleton class="size-6 rounded-full shrink-0" />
            <USkeleton class="h-3 w-24" />
            <USkeleton class="h-3 w-16" />
          </div>
          <USkeleton class="h-3 w-3/4 ml-8" />
        </div>
      </div>

      <template v-else-if="post">
        <PostBody :post="post" class="mb-6" />

        <USeparator class="mb-4" />

        <h3 class="font-semibold mb-3">Comentários ({{ comments.length }})</h3>

        <p v-if="!comments.length" class="text-sm text-muted mb-4">Nenhum comentário ainda.</p>

        <div class="flex flex-col gap-3 mb-6">
          <div v-for="comment in comments" :key="comment.id" class="text-sm">
            <div class="flex items-center gap-2 mb-1">
              <UAvatar :alt="comment.author.name" size="xs" />
              <span class="font-medium">{{ comment.author.name }}</span>
              <span class="text-muted text-xs">{{
                new Date(comment.createdAt).toLocaleDateString('pt-BR')
              }}</span>
              <UButton
                v-if="session?.id === comment.author.id"
                icon="i-lucide-trash-2"
                variant="ghost"
                color="error"
                size="xs"
                class="ml-auto"
                @click="commentToDeleteId = comment.id"
              />
            </div>
            <p class="pl-7">{{ comment.content }}</p>
          </div>
        </div>

        <div class="flex gap-2">
          <UTextarea
            v-model="content"
            placeholder="Escreva um comentário..."
            :rows="2"
            class="flex-1"
            autoresize
          />
          <UButton
            icon="i-lucide-send"
            :loading="loading"
            :disabled="!content.trim()"
            @click="props.postId && createComment(props.postId, content)"
          />
        </div>
      </template>
    </template>
  </UModal>
  <ConfirmationModal
    :open="!!commentToDeleteId"
    title="Deletar comentário"
    description="Tem certeza que deseja deletar este comentário?"
    @confirm="confirmDeleteComment"
    @cancel="commentToDeleteId = null"
  />
</template>
