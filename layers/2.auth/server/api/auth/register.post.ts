import { createUser } from '../../service/userService'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name: string; email: string; password: string }>(event)

  await createUser({ name: body.name, email: body.email, password: body.password })

  setResponseStatus(event, 201)
  return { message: 'User created successfully.' }
})
