export const fetchEducation = async (): Promise<EducationDto[]> => {
  return $fetch('/api/education')
}
