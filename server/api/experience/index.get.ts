import { getExperiences } from '../../service/experienceService'

export default defineEventHandler(async () => {
  return await getExperiences()
})
