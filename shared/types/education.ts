export type EducationDto = {
  id: number
  degree: string
  institution: string
  startDate: Date
  endDate: Date | null
}

export type CreateEducationDto = {
  degree: string
  institution: string
  startDate: string
  endDate?: string
}

export type UpdateEducationDto = Partial<CreateEducationDto>
