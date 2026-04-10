import {
  fetchExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../service/experienceService'
import { fetchTechnologies, createTechnology } from '../service/technologyService'

export const useExperienceAdmin = () => {
  const experience = ref<ExperienceDto[]>([])
  const technologies = ref<TechnologyDto[]>([])
  const loading = ref(true)
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
    technologies.value.map(t => ({ label: t.name, value: t.id }))
  )

  const getExperience = async () => {
    loading.value = true
    experience.value = await fetchExperience()
    loading.value = false
  }

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
      technologyIds: item?.technologies.map(t => t.id) ?? [],
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
      experience.value = experience.value.map(e => e.id === editingId.value ? updated : e)
      toast.add({ title: 'Experiência atualizada.', color: 'success' })
    } else {
      const created = await createExperience(body, headers.value)
      experience.value = [created, ...experience.value]
      toast.add({ title: 'Experiência adicionada.', color: 'success' })
    }
    showForm.value = false
  }

  const submitDelete = async () => {
    if (!deleteId.value) return
    await deleteExperience(deleteId.value, headers.value)
    experience.value = experience.value.filter(e => e.id !== deleteId.value)
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
    experience, technologies, techOptions, loading, form, showForm, editingId, deleteId,
    getExperience, getTechnologies, openForm, handleSubmit, submitDelete, submitCreateTechnology,
  }
}
