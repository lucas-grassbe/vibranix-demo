export const registerUser = async (data: CreateUserDto): Promise<void> => {
  await $fetch('/api/auth/register', { method: 'POST', body: data })
}
