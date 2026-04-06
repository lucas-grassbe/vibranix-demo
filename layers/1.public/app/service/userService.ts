export const createUser = async (data: LoginDto): Promise<User> => {
  return await $fetch('/api/users', { method: 'POST', body: data })
}