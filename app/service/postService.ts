export const fetchPosts = async (headers: AuthHeaders): Promise<PostDto[]> => {
  return $fetch('/api/posts', { headers })
}

export const fetchPostById = async (id: number, headers: AuthHeaders): Promise<PostDto> => {
  return $fetch(`/api/posts/${id}`, { headers })
}

export const submitPost = async (content: string, headers: AuthHeaders): Promise<PostDto> => {
  return $fetch('/api/posts', { method: 'POST', body: { content }, headers })
}

export const submitComment = async (postId: number, content: string, headers: AuthHeaders): Promise<CommentDto> => {
  return $fetch(`/api/posts/${postId}/comments`, { method: 'POST', body: { content }, headers })
}

export const removePost = async (postId: number, headers: AuthHeaders): Promise<void> => {
  return $fetch(`/api/posts/${postId}`, { method: 'DELETE', headers })
}

export const removeComment = async (postId: number, commentId: number, headers: AuthHeaders): Promise<void> => {
  return $fetch(`/api/posts/${postId}/comments/${commentId}`, { method: 'DELETE', headers })
}
