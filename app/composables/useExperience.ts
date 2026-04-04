import {
  fetchExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../service/experienceService'
import { fetchTechnologies, createTechnology } from '../service/technologyService'

export const useExperience = () => {
  const experience = ref<ExperienceDto[]>([])
  const technologies = ref<TechnologyDto[]>([])
  const loading = ref(true)
  const headers = useAuthHeaders()
  const toast = useToast()

  const getExperience = async () => {
    loading.value = true
    experience.value = await fetchExperience()
    loading.value = false
  }

  const getTechnologies = async () => {
    technologies.value = await fetchTechnologies(headers.value)
  }

  const submitCreate = async (body: CreateExperienceDto) => {
    const created = await createExperience(body, headers.value)
    experience.value = [created, ...experience.value]
    toast.add({ title: 'Experiência adicionada.', color: 'success' })
  }

  const submitUpdate = async (id: number, body: UpdateExperienceDto) => {
    const updated = await updateExperience(id, body, headers.value)
    experience.value = experience.value.map(e => e.id === id ? updated : e)
    toast.add({ title: 'Experiência atualizada.', color: 'success' })
  }

  const submitDelete = async (id: number) => {
    await deleteExperience(id, headers.value)
    experience.value = experience.value.filter(e => e.id !== id)
    toast.add({ title: 'Experiência removida.', color: 'success' })
  }

  const submitCreateTechnology = async (name: string) => {
    const tech = await createTechnology({ name }, headers.value)
    technologies.value = [...technologies.value, tech]
    toast.add({ title: `Tecnologia "${name}" adicionada.`, color: 'success' })
    return tech
  }

  return {
    experience, technologies, loading,
    getExperience, getTechnologies,
    submitCreate, submitUpdate, submitDelete, submitCreateTechnology,
  }
}
