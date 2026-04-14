import { fetchExperience } from '../service/experienceService'

export const useExperience = () => {
  const store = useExperienceStore()
  const loading = ref(false)
  const { experiences } = storeToRefs(store)

  const fetchExperiences = async () => {
    if (!loading.value && experiences.value.length) return
    loading.value = true
    const experienceData = await fetchExperience()
    await store.setExperiences(experienceData)
    loading.value = false
  }

  const refreshExperience = async () => {
    await store.setExperiences([])
    await fetchExperiences()
  }

  const resetExperience = () => {
    store.clearExperience()
  }

  return {
    experiences,
    loading,
    fetchExperiences,
    refreshExperience,
    resetExperience,
  }
}
