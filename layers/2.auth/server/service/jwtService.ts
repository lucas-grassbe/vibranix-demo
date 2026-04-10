import { SignJWT, jwtVerify } from 'jose'

export interface JwtPayload {
  sub: number
  name: string
  email: string
  role: string
}

const getSecret = () => {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET is not set')
  return new TextEncoder().encode(secret)
}

export const signAccessToken = async (payload: JwtPayload): Promise<string> => {
  return new SignJWT({ name: payload.name, email: payload.email, role: payload.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(payload.sub))
    .setIssuedAt()
    .setExpirationTime('30m')
    .sign(getSecret())
}

export const verifyAccessToken = async (token: string): Promise<JwtPayload> => {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return {
      sub: Number(payload.sub),
      name: payload['name'] as string,
      email: payload['email'] as string,
      role: payload['role'] as string,
    }
  } catch {
    throw createError({ statusCode: 401, message: 'Invalid or expired token' })
  }
}
