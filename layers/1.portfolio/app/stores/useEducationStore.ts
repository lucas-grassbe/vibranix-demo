export const useEducationStore = defineStore('education', () => {
  const education = ref<EducationDto[]>([])
  const loading = ref(false)

  const addEducation = (newEducation: EducationDto) => {
    education.value = [...education.value, newEducation]
  }

  const updateEducation = (updatedEducation: EducationDto) => {
    education.value = education.value.map(e => e.id === updatedEducation.id ? updatedEducation : e)
  }

  const removeEducation = (id: number) => {
    education.value = education.value.filter(e => e.id !== id)
  }

  return { education, loading, addEducation, updateEducation, removeEducation }
})
