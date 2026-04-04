import type { User } from '../../app/generated/prisma/client'

export type { User as UserDto }

export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
}

export type LoginDto = {
  email: string;
  password: string;
}

export type LoginResponseDto = {
  token: string;
  refreshToken: string;
}
