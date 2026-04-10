export const fetchExperience = async (): Promise<ExperienceDto[]> => {
  return $fetch('/api/experience')
}

export const createExperience = async (body: CreateExperienceDto, headers: AuthHeaders): Promise<ExperienceDto> => {
  return $fetch('/api/experience', { method: 'POST', body, headers })
}

export const updateExperience = async (id: number, body: UpdateExperienceDto, headers: AuthHeaders): Promise<ExperienceDto> => {
  return $fetch(`/api/experience/${id}`, { method: 'PATCH', body, headers })
}

export const deleteExperience = async (id: number, headers: AuthHeaders): Promise<void> => {
  return $fetch(`/api/experience/${id}`, { method: 'DELETE', headers })
}