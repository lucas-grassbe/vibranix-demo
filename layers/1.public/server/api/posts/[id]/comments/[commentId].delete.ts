import { deleteComment } from '../../../../service/commentService'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  const commentId = Number(getRouterParam(event, 'commentId'))

  if (!commentId) {
    throw createError({ statusCode: 400, message: 'Invalid ID' })
  }

  await deleteComment(commentId, user.sub)

  setResponseStatus(event, 204)

  return
})
