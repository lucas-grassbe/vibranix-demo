export const useExperienceStore = defineStore('experiences', () => {
  const experiences = ref<ExperienceDto[]>([])

  const setExperiences = async (data: ExperienceDto[]) => {
    experiences.value = data
  }

  const addExperience = (newExperience: ExperienceDto) => {
    experiences.value = [newExperience, ...experiences.value]
  }

  const updateExperience = (updatedExperience: ExperienceDto) => {
    experiences.value = experiences.value.map((e) =>
      e.id === updatedExperience.id ? updatedExperience : e,
    )
  }

  const removeExperience = (id: number) => {
    experiences.value = experiences.value.filter((e) => e.id !== id)
  }

  const clearExperience = () => {
    experiences.value = []
  }

  return {
    experiences,
    setExperiences,
    addExperience,
    updateExperience,
    removeExperience,
    clearExperience,
  }
})
