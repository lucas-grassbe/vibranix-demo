import { checkIfTechnologyIdsExistAndActive } from './technologyService'

export const getExperiences = async () => {
  return await prisma.experience.findMany({
    where: { deletedAt: null },
    orderBy: { startDate: 'desc' },
    include: { 
      technologies: {
        where: { deletedAt: null },
        select: { id: true, name: true },
      },
    },
  })
}

export const createExperience = async (createExperienceDto: CreateExperienceDto) => {
  const { technologyIds, ...data } = createExperienceDto

  if (technologyIds) {
    await checkIfTechnologyIdsExistAndActive(technologyIds)
  }

  return await prisma.experience.create({
    data: {
      ...data,
      technologies: technologyIds?.length
        ? { connect: technologyIds.map((id) => ({ id })) }
        : undefined,
    },
    include: { 
      technologies: {
        where: { deletedAt: null },
        select: { id: true, name: true },
      },
    },
  })
}

export const updateExperience = async (id: number, updateExperienceDto: UpdateExperienceDto) => {
  const experience = await prisma.experience.findFirst({ where: { id, deletedAt: null } })

  if (!experience) {
    throw createError({ statusCode: 404, message: 'Experience not found' })
  }

  const { technologyIds, ...data } = updateExperienceDto

  const experienceStart = !data.startDate ? experience.startDate : new Date(data.startDate)
  const experienceEnd = !data.endDate ? experience.endDate : new Date(data.endDate)

  if (experienceEnd != null && experienceStart > experienceEnd) {
    throw createError({ statusCode: 400, message: 'Start date cannot be after end date' })
  }

  if (technologyIds) {
    await checkIfTechnologyIdsExistAndActive(technologyIds)
  }

  return await prisma.experience.update({
    where: { id },
    data: {
      ...data,
      technologies:
        technologyIds
          ? { set: technologyIds.map((techId) => ({ id: techId })) }
          : undefined,
    },
    include: {
      technologies: {
        where: { deletedAt: null },
        select: { id: true, name: true },
      },
    },
  })
}

export const deleteExperience = async (id: number) => {
  const experience = await prisma.experience.findFirst({ where: { id, deletedAt: null } })

  if (!experience) {
    throw createError({ statusCode: 404, message: 'Experience not found' })
  }

  return await prisma.experience.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      technologies: { set: [] },
    },
    include: { 
      technologies: {
        where: { deletedAt: null },
        select: { id: true, name: true },
      },
    },
  })
}
