import { fetchEducation } from '../service/educationService'

export const useEducation = () => {
  const education = ref<EducationDto[]>([])
  const loading = ref(true)

  const getEducation = async () => {
    loading.value = true
    education.value = await fetchEducation()
    loading.value = false
  }

  return {
    education,
    loading,
    getEducation,
  }
}