export const useAuthHeaders = () => {
  const token = useCookie('demo-auth.token')
  return computed(() =>
    token.value ? { Authorization: `Bearer ${token.value}` } : {}
  )
}
