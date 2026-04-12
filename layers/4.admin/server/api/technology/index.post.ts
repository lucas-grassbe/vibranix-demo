import { createTechnology } from '../../service/technologyService'

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateTechnologyDto>(event)

  if (!body.name?.trim()) {
    throw createError({ statusCode: 400, message: 'Name cannot be empty' })
  }

  setResponseStatus(event, 201)

  return await createTechnology(body)
})
