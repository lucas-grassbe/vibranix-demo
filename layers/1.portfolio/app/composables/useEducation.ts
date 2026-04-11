import { fetchEducation } from '../service/educationService'

export const useEducation = () => {
  const store = useEducationStore()

  const fetchEducations = async () => {
    if (!store.loading && store.education.length) return
    store.loading = true
    store.education = await fetchEducation()
    store.loading = false
  }

  const refreshEducation = async () => {
    store.education = []
    await fetchEducations()
  }

  return {
    education: computed(() => store.education),
    loading: computed(() => store.loading),
    fetchEducations,
    refreshEducation,
  }
}
