import type { Experience } from '../../app/generated/prisma/client'
import type { TechnologyDto } from './technology'

export type ExperienceDto = Experience & {
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