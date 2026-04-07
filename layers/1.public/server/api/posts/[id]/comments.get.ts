import { getCommentsByPostId } from '../../../service/commentService'

export default defineEventHandler(async (event) => {
  const postId = Number(getRouterParam(event, 'id'))

  if (!postId) {
    throw createError({ statusCode: 400, message: 'Invalid ID' })
  }

  return await getCommentsByPostId(postId)
})
