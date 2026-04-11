export default defineNuxtRouteMiddleware((to) => {
  const { data: session, status } = useAuth()

  if (status.value !== 'authenticated') return

  if (session.value?.role === 'ADMIN') {
    if (to.path.startsWith('/admin')) return
    return navigateTo('/admin/')
  }

  if (to.path.startsWith('/feed')) return
  return navigateTo('/feed')
})
