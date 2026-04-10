import { createUser } from '../../service/userService';
import { hashPassword } from '../../service/hashService';

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name: string; email: string; password: string }>(event);
  const hashedPassword = await hashPassword(body.password);

  await createUser({
    name: body.name,
    email: body.email,
    password: hashedPassword
  });

  setResponseStatus(event, 201);
  return;
});
