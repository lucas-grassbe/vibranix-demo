import {
  fetchEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../service/educationService'

export const useEducation = () => {
  const education = ref<EducationDto[]>([])
  const loading = ref(true)
  const headers = useAuthHeaders()
  const toast = useToast()

  const getEducation = async () => {
    loading.value = true
    education.value = await fetchEducation()
    loading.value = false
  }

  const submitCreate = async (body: CreateEducationDto) => {
    const created = await createEducation(body, headers.value)
    education.value = [...education.value, created]
    toast.add({ title: 'Formação adicionada.', color: 'success' })
  }

  const submitUpdate = async (id: number, body: UpdateEducationDto) => {
    const updated = await updateEducation(id, body, headers.value)
    education.value = education.value.map(e => e.id === id ? updated : e)
    toast.add({ title: 'Formação atualizada.', color: 'success' })
  }

  const submitDelete = async (id: number) => {
    await deleteEducation(id, headers.value)
    education.value = education.value.filter(e => e.id !== id)
    toast.add({ title: 'Formação removida.', color: 'success' })
  }

  return { education, loading, getEducation, submitCreate, submitUpdate, submitDelete }
}
