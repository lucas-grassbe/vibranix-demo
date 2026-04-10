import { verifyRefreshToken } from '../../service/refreshTokenService';
import { signAccessToken } from '../../service/jwtService';
import { getUserById } from '../../service/userService'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ refreshToken: string }>(event);

  if (!body.refreshToken) {
    throw createError({ statusCode: 400, message: 'Refresh token is required' });
  }

  const userId = await verifyRefreshToken(body.refreshToken);

  const user = await getUserById(userId);

  const newAccessToken = await signAccessToken({ sub: user.id, name: user.name, email: user.email, role: user.role });

  return { token: newAccessToken };
});
