export const fetchExperience = async (): Promise<ExperienceDto[]> => {
  return $fetch('/api/experience')
}