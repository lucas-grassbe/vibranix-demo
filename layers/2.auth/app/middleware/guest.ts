export default defineNuxtRouteMiddleware(() => {
  const { data: session, status } = useAuth()

  if (status.value !== 'authenticated') return

  if (session.value?.role === 'ADMIN') {
    return navigateTo('/admin/')
  }

  return navigateTo('/feed')
})
