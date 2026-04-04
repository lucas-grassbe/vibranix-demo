import { createEducation } from '../../service/educationService'

export default defineEventHandler(async (event) => {
const body = await readBody<CreateEducationDto>(event)
  return await createEducation(body)
})