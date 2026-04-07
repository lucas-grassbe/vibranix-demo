import { revokeRefreshToken } from '../../service/refreshTokenService';

export default defineEventHandler(async (event) => {
  const body = await readBody<{ refreshToken?: string }>(event);

  if (body.refreshToken) {
    await revokeRefreshToken(body.refreshToken);
  }

  return { success: true };
});
