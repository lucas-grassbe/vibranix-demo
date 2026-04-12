import { hashPassword } from './hashService'

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  })

  if (!user) {
    throw createError({ statusCode: 400, message: 'User not found' })
  }

  return user
}

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  })

  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  return user
}

export const createUser = async (createUserDto: CreateUserDto) => {
  const userExists = await prisma.user.findFirst({
    where: { email: createUserDto.email.toLowerCase() },
  })

  if (userExists) {
    throw createError({ statusCode: 400, message: 'Email already in use' })
  }

  if (!isPasswordValid(createUserDto.password)) {
    throw createError({ statusCode: 400, message: 'Password must be at least 6 characters' })
  }

  const hashedPassword = await hashPassword(createUserDto.password)

  return prisma.user.create({
    data: {
      name: createUserDto.name,
      email: createUserDto.email.toLowerCase(),
      passwordHash: hashedPassword,
    },
  })
}
