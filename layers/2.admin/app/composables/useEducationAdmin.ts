import {
  fetchEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '~/service/educationService'

export const useEducationAdmin = () => {
  const education = ref<EducationDto[]>([])
  const loading = ref(true)
  const showForm = ref(false)
  const editingId = ref<number | null>(null)
  const deleteId = ref<number | null>(null)
  const headers = useAuthHeaders()
  const toast = useToast()

  const form = reactive<CreateEducationDto>({
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
  })

  const getEducation = async () => {
    loading.value = true
    education.value = await fetchEducation()
    loading.value = false
  }

  const openForm = (item?: EducationDto) => {
    editingId.value = item?.id ?? null
    Object.assign(form, {
      degree: item?.degree ?? '',
      institution: item?.institution ?? '',
      startDate: item?.startDate ? new Date(item.startDate).toISOString().slice(0, 10) : '',
      endDate: item?.endDate ? new Date(item.endDate).toISOString().slice(0, 10) : '',
    })
    showForm.value = true
  }

  const handleSubmit = async () => {
    const body = {
      ...form,
      startDate: new Date(form.startDate).toISOString(),
      endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined,
    }
    if (editingId.value) {
      const updated = await updateEducation(editingId.value, body, headers.value)
      education.value = education.value.map(e => e.id === editingId.value ? updated : e)
      toast.add({ title: 'Formação atualizada.', color: 'success' })
    } else {
      const created = await createEducation(body, headers.value)
      education.value = [...education.value, created]
      toast.add({ title: 'Formação adicionada.', color: 'success' })
    }
    showForm.value = false
  }

  const submitDelete = async () => {
    if (!deleteId.value) return
    await deleteEducation(deleteId.value, headers.value)
    education.value = education.value.filter(e => e.id !== deleteId.value)
    deleteId.value = null
    toast.add({ title: 'Formação removida.', color: 'success' })
  }

  return {
    education, loading, form, showForm, editingId, deleteId,
    getEducation, openForm, handleSubmit, submitDelete,
  }
}
