import { deletePost } from '../../service/postService'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  const postId = Number(getRouterParam(event, 'id'))

  if (!postId) {
    throw createError({ statusCode: 400, message: 'Invalid ID' })
  }

  await deletePost(postId, user.sub)

  setResponseStatus(event, 204)

  return
})
