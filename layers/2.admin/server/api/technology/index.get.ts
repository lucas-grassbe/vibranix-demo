import { getTechnologies } from '../../service/technologyService'

export default defineEventHandler(async () => {
  return await getTechnologies()
})
