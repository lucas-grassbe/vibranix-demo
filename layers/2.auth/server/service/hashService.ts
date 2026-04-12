import * as bcrypt from 'bcrypt'

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, parseInt(process.env.AUTH_ROUNDS!) || 10)
}

export const verifyPassword = async (password: string, hash: string): Promise<void> => {
  const valid = await bcrypt.compare(password, hash)
  if (!valid) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }
}
