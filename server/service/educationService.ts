export const createEducation = async (createEducationDto: CreateEducationDto) => {
  return await prisma.education.create({ data: createEducationDto })
}

export const getEducations = async () => {
  return await prisma.education.findMany({ where: { deletedAt: null } })
}

export const updateEducation = async (id: number, updateEducationDto: UpdateEducationDto) => {
  const education = await prisma.education.findFirst({ where: { id, deletedAt: null } })

  if (!education) {
    throw createError({ statusCode: 404, message: 'Education not found' })
  }

  const educationStart = !updateEducationDto.startDate ? education.startDate : new Date(updateEducationDto.startDate)
  const educationEnd = !updateEducationDto.endDate ? education.endDate : new Date(updateEducationDto.endDate)

  if (educationEnd != null && educationStart > educationEnd) {
    throw createError({ statusCode: 400, message: 'Start date cannot be after end date' })
  }

  return await prisma.education.update({ where: { id }, data: updateEducationDto })
}

export const deleteEducation = async (id: number) => {
  const education = await prisma.education.findFirst({ where: { id, deletedAt: null } })

  if (!education) {
    throw createError({ statusCode: 404, message: 'Education not found' })
  }

  return await prisma.education.update({ where: { id }, data: { deletedAt: new Date() } })
}