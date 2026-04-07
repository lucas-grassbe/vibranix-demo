import { fetchExperience } from '../service/experienceService'

export const useExperience = () => {
  const experience = ref<ExperienceDto[]>([])
  const loading = ref(true)

  const getExperience = async () => {
    loading.value = true
    experience.value = await fetchExperience()
    loading.value = false
  }

  return {
    experience,
    loading,
    getExperience,
  }
}
