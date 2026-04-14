import { createPost } from '../../service/postService'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  const parts = await readMultipartFormData(event)

  const content = parts?.find((p) => p.name === 'content')?.data.toString()
  const filePart = parts?.find((p) => p.name === 'file')

  if (!content?.trim()) {
    throw createError({ statusCode: 400, message: 'Content cannot be empty' })
  }

  const file =
    filePart?.data && filePart.type ? { data: filePart.data, type: filePart.type } : undefined

  return await createPost({ content, authorId: user.sub, file })
})
