import { updateExperience } from '../../service/experienceService'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (!id) {
    throw createError({ statusCode: 400, message: 'Invalid ID' })
  }

  const body = await readBody<UpdateExperienceDto>(event)

  return await updateExperience(id, body)
})
