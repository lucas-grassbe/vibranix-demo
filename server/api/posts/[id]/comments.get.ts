export default defineEventHandler(async (event) => {
  const postId = Number(getRouterParam(event, 'id'))

  if (!postId) {
    throw createError({ statusCode: 400, message: 'Invalid ID' })
  }

  const comments = await getCommentsByPostId(postId)

  return comments
})