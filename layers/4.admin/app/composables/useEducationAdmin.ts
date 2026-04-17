import { createEducation, updateEducation, deleteEducation } from '../service/educationService'
import { useEducationStore } from '#layers/1.portfolio/app/stores/education'

export const useEducationAdmin = () => {
  const store = useEducationStore()
  const headers = useAuthHeaders()
  const toast = useToast()

  const showForm = ref(false)
  const editingId = ref<number | null>(null)
  const deleteId = ref<number | null>(null)

  const form = reactive<CreateEducationDto>({
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
  })

  const { fetchEducations, loading } = useEducation()
  const getEducation = fetchEducations

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
      store.updateEducation(updated)
      toast.add({ title: 'Formação atualizada.', color: 'success' })
    } else {
      const created = await createEducation(body, headers.value)
      store.addEducation(created)
      toast.add({ title: 'Formação adicionada.', color: 'success' })
    }
    showForm.value = false
  }

  const submitDelete = async () => {
    if (!deleteId.value) return
    await deleteEducation(deleteId.value, headers.value)
    store.removeEducation(deleteId.value)
    deleteId.value = null
    toast.add({ title: 'Formação removida.', color: 'success' })
  }

  return {
    education: computed(() => store.educations),
    loading,
    form,
    showForm,
    editingId,
    deleteId,
    getEducation,
    openForm,
    handleSubmit,
    submitDelete,
  }
}
