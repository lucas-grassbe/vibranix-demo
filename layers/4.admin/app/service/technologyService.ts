export const fetchTechnologies = async (headers: AuthHeaders): Promise<TechnologyDto[]> => {
  return $fetch('/api/technology', { headers })
}

export const createTechnology = async (body: CreateTechnologyDto, headers: AuthHeaders): Promise<TechnologyDto> => {
  return $fetch('/api/technology', { method: 'POST', body, headers })
}
