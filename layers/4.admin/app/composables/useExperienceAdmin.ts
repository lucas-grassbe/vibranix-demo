import { createExperience, updateExperience, deleteExperience } from '../service/experienceService'
import { fetchTechnologies, createTechnology } from '../service/technologyService'

export const useExperienceAdmin = () => {
  const store = useExperienceStore()
  const technologies = ref<TechnologyDto[]>([])
  const showForm = ref(false)
  const editingId = ref<number | null>(null)
  const deleteId = ref<number | null>(null)
  const headers = useAuthHeaders()
  const toast = useToast()

  const form = reactive({
    title: '',
    company: '',
    description: '',
    startDate: '',
    endDate: '',
    technologyIds: [] as number[],
  })

  const techOptions = computed(() =>
    technologies.value.map((t) => ({ label: t.name, value: t.id })),
  )

  const { fetchExperiences } = useExperience()
  const getExperience = fetchExperiences

  const getTechnologies = async () => {
    technologies.value = await fetchTechnologies(headers.value)
  }

  const openForm = (item?: ExperienceDto) => {
    editingId.value = item?.id ?? null
    Object.assign(form, {
      title: item?.title ?? '',
      company: item?.company ?? '',
      description: item?.description ?? '',
      startDate: item?.startDate ? new Date(item.startDate).toISOString().slice(0, 10) : '',
      endDate: item?.endDate ? new Date(item.endDate).toISOString().slice(0, 10) : '',
      technologyIds: item?.technologies.map((t) => t.id) ?? [],
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
      const updated = await updateExperience(editingId.value, body, headers.value)
      store.updateExperience(updated)
      toast.add({ title: 'Experiência atualizada.', color: 'success' })
    } else {
      const created = await createExperience(body, headers.value)
      store.addExperience(created)
      toast.add({ title: 'Experiência adicionada.', color: 'success' })
    }
    showForm.value = false
  }

  const submitDelete = async () => {
    if (!deleteId.value) return
    await deleteExperience(deleteId.value, headers.value)
    store.removeExperience(deleteId.value)
    deleteId.value = null
    toast.add({ title: 'Experiência removida.', color: 'success' })
  }

  const submitCreateTechnology = async (name: string) => {
    const tech = await createTechnology({ name }, headers.value)
    technologies.value = [...technologies.value, tech]
    form.technologyIds = [...form.technologyIds, tech.id]
    toast.add({ title: `Tecnologia "${name}" adicionada.`, color: 'success' })
  }

  return {
    experience: computed(() => store.experience),
    loading: computed(() => store.loading && !store.experience.length),
    technologies,
    techOptions,
    form,
    showForm,
    editingId,
    deleteId,
    getExperience,
    getTechnologies,
    openForm,
    handleSubmit,
    submitDelete,
    submitCreateTechnology,
  }
}
