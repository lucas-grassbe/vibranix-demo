import { fetchExperience } from '../service/experienceService'

export const useExperience = () => {
  const store = useExperienceStore()

  const fetchExperiences = async () => {
    if (!store.loading && store.experience.length) return
    store.loading = true
    store.experience = await fetchExperience()
    store.loading = false
  }

  const refreshExperience = async () => {
    store.experience = []
    await fetchExperiences()
  }

  return {
    experience: computed(() => store.experience),
    loading: computed(() => store.loading),
    fetchExperiences,
    refreshExperience,
  }
}
