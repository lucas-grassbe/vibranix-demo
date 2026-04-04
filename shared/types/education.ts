import type { Education } from '../../app/generated/prisma/client'

export type EducationDto = Education

export type CreateEducationDto = {
  degree: string
  institution: string
  startDate: string
  endDate?: string
}

export type UpdateEducationDto = Partial<CreateEducationDto>
