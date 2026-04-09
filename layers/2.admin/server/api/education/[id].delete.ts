import { deleteEducation } from '../../service/educationService'

export default defineEventHandler(async (event) => {
const id = Number(getRouterParam(event, 'id'))
  
  if (!id) {
    throw createError({ statusCode: 400, message: 'Invalid ID' })
  }

  await deleteEducation(id)

  setResponseStatus(event, 204)

  return
})
