export type UserDto = {
  id: number
  name: string
  email: string
  role: string
}

export type CreateUserDto = {
  name: string
  email: string
  password: string
}

export type LoginDto = {
  email: string
  password: string
}

export type LoginResponseDto = {
  token: string
  refreshToken: string
}
