const PASSWORD_MINIMUM_LENGTH = 6

export const isPasswordValid = (password: string): boolean => {
  return password.length >= PASSWORD_MINIMUM_LENGTH
}
