import { deleteExperience } from '../../service/experienceService'

export default defineEventHandler(async (event) => {
const id = Number(getRouterParam(event, 'id'))

  if (!id) {
    throw createError({ statusCode: 400, message: 'Invalid ID' })
  }

  await deleteExperience(id)

  setResponseStatus(event, 204)

  return
})
