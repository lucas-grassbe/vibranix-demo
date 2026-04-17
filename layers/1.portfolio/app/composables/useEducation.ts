import { fetchEducation } from '../service/educationService'
import { useEducationStore } from '#layers/1.portfolio/app/stores/education'

export const useEducation = () => {
  const loading = ref(false)
  const store = useEducationStore()
  const { educations } = storeToRefs(store)

  const fetchEducations = async () => {
    if (!loading.value && educations.value.length) return
    loading.value = true
    const educationData = await fetchEducation()
    await store.setEducations(educationData)
    loading.value = false
  }

  const refreshEducation = async () => {
    await store.setEducations([])
    await fetchEducations()
  }

  const resetEducation = () => {
    store.clearEducation()
  }

  return {
    educations,
    loading,
    fetchEducations,
    refreshEducation,
    resetEducation,
  }
}
