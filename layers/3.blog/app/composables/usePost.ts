import {
  fetchPosts,
  fetchPostById,
  submitPost,
  submitComment,
  removePost,
  removeComment,
} from '../service/postService'

export const usePost = () => {
  const posts = ref<PostDto[]>([])
  const post = ref<PostDto | null>(null)
  const comments = ref<CommentDto[]>([])
  const content = ref('')
  const loading = ref(true)
  const loadingModal = ref(true)
  const headers = useAuthHeaders()
  const toast = useToast()

  const getPosts = async () => {
    loading.value = true
    posts.value = await fetchPosts(headers.value)
    loading.value = false
  }

  const getPostById = async (id: number) => {
    loadingModal.value = true
    post.value = await fetchPostById(id, headers.value)
    comments.value = post.value?.comments ?? []
    loadingModal.value = false
    loading.value = false
  }

  const createPost = async () => {
    const newPost = await submitPost(content.value.trim(), headers.value)
    posts.value = [newPost, ...posts.value]
    content.value = ''
    toast.add({ title: 'Post criado com sucesso.', color: 'success' })
  }

  const createComment = async (postId: number, commentContent: string) => {
    loading.value = true
    const newComment = await submitComment(postId, commentContent, headers.value)
    comments.value = [...comments.value, newComment]
    content.value = ''
    loading.value = false
    toast.add({ title: 'Comentário adicionado com sucesso.', color: 'success' })
  }

  const deletePost = async (postId: number) => {
    await removePost(postId, headers.value)
    posts.value = posts.value.filter((p) => p.id !== postId)
    toast.add({ title: 'Post deletado com sucesso.', color: 'success' })
  }

  const deleteComment = async (postId: number, commentId: number) => {
    await removeComment(postId, commentId, headers.value)
    comments.value = comments.value.filter((c) => c.id !== commentId)
    toast.add({ title: 'Comentário deletado com sucesso.', color: 'success' })
  }

  return {
    posts,
    post,
    comments,
    content,
    loading,
    loadingModal,
    getPosts,
    getPostById,
    createPost,
    createComment,
    deletePost,
    deleteComment,
  }
}
