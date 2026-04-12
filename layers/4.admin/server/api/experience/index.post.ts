import { createExperience } from '../../service/experienceService'

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateExperienceDto>(event)

  setResponseStatus(event, 201)

  return await createExperience(body)
})
