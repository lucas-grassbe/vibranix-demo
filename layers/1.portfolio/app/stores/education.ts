export const useEducationStore = defineStore('educations', () => {
  const educations = ref<EducationDto[]>([])

  const setEducations = async (data: EducationDto[]) => {
    educations.value = data
  }

  const addEducation = (newEducation: EducationDto) => {
    educations.value = [...educations.value, newEducation]
  }

  const updateEducation = (updatedEducation: EducationDto) => {
    educations.value = educations.value.map((e) =>
      e.id === updatedEducation.id ? updatedEducation : e
    )
  }

  const removeEducation = (id: number) => {
    educations.value = educations.value.filter((e) => e.id !== id)
  }

  const clearEducation = () => {
    educations.value = []
  }

  return {
    educations,
    setEducations,
    addEducation,
    updateEducation,
    removeEducation,
    clearEducation,
  }
})
