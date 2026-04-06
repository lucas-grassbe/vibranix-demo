const publicPaths = [
  '/api/education',
  '/api/experience',
]

const adminPaths = [
  '/api/education',
  '/api/experience',
  '/api/technology',
]

export default defineEventHandler(async (event) => {
  if (
    !event.path.startsWith('/api/') ||
    event.path.startsWith('/api/auth/') ||
    (event.method === 'GET' && publicPaths.some(p => event.path.startsWith(p)))
  ) return

  const authHeader = getRequestHeader(event, 'Authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  event.context.user = await verifyAccessToken(authHeader.slice(7))

  if (event.method !== 'GET' && adminPaths.some(p => event.path.startsWith(p))) {
    if (event.context.user.role !== 'ADMIN') {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }
  }
})
