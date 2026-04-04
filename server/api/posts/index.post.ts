import { createPost } from '../../service/postService'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  const body = await readBody<{ content: string }>(event)

  if (!body.content?.trim()) {
    throw createError({ statusCode: 400, message: 'Content cannot be empty' })
  }

  return await createPost({ content: body.content, authorId: user.sub })
})
