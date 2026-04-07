export const createEducation = async (body: CreateEducationDto, headers: AuthHeaders): Promise<EducationDto> => {
  return $fetch('/api/education', { method: 'POST', body, headers })
}

export const updateEducation = async (id: number, body: UpdateEducationDto, headers: AuthHeaders): Promise<EducationDto> => {
  return $fetch(`/api/education/${id}`, { method: 'PATCH', body, headers })
}

export const deleteEducation = async (id: number, headers: AuthHeaders): Promise<void> => {
  return $fetch(`/api/education/${id}`, { method: 'DELETE', headers })
}