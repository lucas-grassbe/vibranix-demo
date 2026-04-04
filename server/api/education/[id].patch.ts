import { updateEducation } from '../../service/educationService'

export default defineEventHandler(async (event) => {
const id = Number(getRouterParam(event, 'id'))

  if (!id) {
    throw createError({ statusCode: 400, message: 'Invalid ID' })
  }

  const body = await readBody<UpdateEducationDto>(event)

  return await updateEducation(id, body)
})
