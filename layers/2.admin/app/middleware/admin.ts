export default defineNuxtRouteMiddleware(() => {
  const { data: session, status } = useAuth()

  if (status.value !== 'authenticated') {
    return navigateTo('/login')
  }

  if (session.value?.role !== 'ADMIN') {
    return navigateTo('/feed')
  }
})
