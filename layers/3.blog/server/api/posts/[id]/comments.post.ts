import { createComment } from '../../../service/commentService'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  const postId = Number(getRouterParam(event, 'id'))
  const body = await readBody<{ content: string }>(event)

  if (!postId) {
    throw createError({ statusCode: 400, message: 'Invalid ID' })
  }

  if (!body.content?.trim()) {
    throw createError({ statusCode: 400, message: 'Content cannot be empty' })
  }

  const comment = await createComment({ content: body.content, authorId: user.sub, postId })

  setResponseStatus(event, 201)

  return comment
})
