import { verifyRefreshToken } from '../../service/refreshTokenService';
import { signAccessToken } from '../../service/jwtService';

export default defineEventHandler(async (event) => {
  const body = await readBody<{ refreshToken: string }>(event);

  if (!body.refreshToken) {
    throw createError({ statusCode: 400, message: 'Refresh token is required' });
  }

  const userId = await verifyRefreshToken(body.refreshToken);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw createError({ statusCode: 401, message: 'User not found' });
  }

  const newAccessToken = await signAccessToken({ sub: user.id, name: user.name, email: user.email, role: user.role });

  return { token: newAccessToken };
});
