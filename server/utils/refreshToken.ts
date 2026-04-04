import { randomBytes, createHash } from 'node:crypto'

export const generateRefreshToken = (): string => {
  return randomBytes(32).toString('hex')
}

const hashRefreshToken = (token: string): string => {
  return createHash('sha256').update(token).digest('hex')
}

export const createRefreshToken = async (userId: number, tokenRaw: string) => {

  const userRefreshTokens = await prisma.refreshToken.findMany({ where: { userId, revokedAt: null } })

  await prisma.refreshToken.updateMany({
    where: { id: { in: userRefreshTokens.map(t => t.id) } },
    data: { revokedAt: new Date() },
  })

  const tokenHash = hashRefreshToken(tokenRaw)
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  await prisma.refreshToken.create({ data: { userId, tokenHash, expiresAt } })
}

export const verifyRefreshToken = async (tokenRaw: string): Promise<number> => {
  const tokenHash = hashRefreshToken(tokenRaw)

  const refreshToken = await prisma.refreshToken.findUnique({ where: { tokenHash } })

  if (!refreshToken) {
    throw createError({ statusCode: 401, message: 'Invalid refresh token' })
  }

  if (refreshToken.revokedAt) {
    throw createError({ statusCode: 401, message: 'Refresh token has been revoked' })
  }

  if (refreshToken.expiresAt < new Date()) {
    await prisma.refreshToken.update({ where: { id: refreshToken.id }, data: { revokedAt: new Date() } })
    throw createError({ statusCode: 401, message: 'Refresh token has expired' })
  }

  return refreshToken.userId
}

export const revokeRefreshToken = async (tokenRaw: string): Promise<void> => {
  const tokenHash = hashRefreshToken(tokenRaw)
  await prisma.refreshToken.updateMany({
    where: { tokenHash, revokedAt: null },
    data: { revokedAt: new Date() },
  })
}
