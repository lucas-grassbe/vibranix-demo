import { getPostById } from '../../service/postService'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (!id) {
    throw createError({ statusCode: 400, message: 'Invalid ID' })
  }

  return await getPostById(id)
})
