import { registerUser } from '../service/authService'

export const useAppAuth = () => {
  const { signIn, signOut, status } = useAuth()
  const toast = useToast()

  const login = async (loginDto: LoginDto) => {
    try {
      await signIn(loginDto, { callbackUrl: '/' })
    } catch {
      toast.add({ title: 'Credenciais inválidas.', color: 'error' })
    }
  }

  const register = async (createUserDto: CreateUserDto) => {
    try {
      await registerUser(createUserDto)
    } catch {
      toast.add({ title: 'Erro ao criar conta.', color: 'error' })
      return
    }

    toast.add({ title: 'Conta criada com sucesso!', color: 'success' })
    await navigateTo('/login')
  }

  const logout = async () => {
    try {
      await signOut({ callbackUrl: '/login' })
      toast.add({ title: 'Deslogado com sucesso.', color: 'success' })
    } catch {
      toast.add({ title: 'Erro ao sair da conta.', color: 'error' })
      return
    }
  }

  return { login, register, logout, status }
}
