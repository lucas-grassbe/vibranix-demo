export const useExperienceStore = defineStore('experience', () => {
  const experience = ref<ExperienceDto[]>([])
  const loading = ref(false)

  const addExperience = (newExperience: ExperienceDto) => {
    experience.value = [newExperience, ...experience.value]
  }

  const updateExperience = (updatedExperience: ExperienceDto) => {
    experience.value = experience.value.map((e) =>
      e.id === updatedExperience.id ? updatedExperience : e,
    )
  }

  const removeExperience = (id: number) => {
    experience.value = experience.value.filter((e) => e.id !== id)
  }

  return { experience, loading, addExperience, updateExperience, removeExperience }
})
