import { getUserByEmail } from '../../service/userService';
import { verifyPassword } from '../../service/hashService';
import { createRefreshToken } from '../../service/refreshTokenService';
import { signAccessToken } from '../../service/jwtService';
import { generateRefreshToken } from '../../service/refreshTokenService';

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string; password: string }>(event);

  const user = await getUserByEmail(body.email);

  await verifyPassword(body.password, user.passwordHash);

  const accessToken = await signAccessToken({ sub: user.id, name: user.name, email: user.email, role: user.role });
  const rawRefreshToken = generateRefreshToken();

  await createRefreshToken(user.id, rawRefreshToken);

  return { token: accessToken, refreshToken: rawRefreshToken };
});
