export default defineEventHandler(async (event) => {
  const authHeader = getRequestHeader(event, 'Authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, message: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.slice(7);
  const payload = await verifyAccessToken(token);

  return { id: payload.sub, name: payload.name, email: payload.email, role: payload.role };
});
