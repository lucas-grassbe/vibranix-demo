import { getEducations } from '../../service/educationService'

export default defineEventHandler(async () => {
  return await getEducations()
})