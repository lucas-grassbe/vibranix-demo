import type { TechnologyDto } from './technology'

export type ExperienceDto = {
  id: number
  title: string
  company: string
  description: string
  startDate: Date
  endDate: Date | null
  technologies: TechnologyDto[]
}

export type CreateExperienceDto = {
  title: string
  company: string
  description: string
  startDate: string
  endDate?: string
  technologyIds?: number[]
}

export type UpdateExperienceDto = Partial<CreateExperienceDto>