export const createTechnology = async (createTechnologyDto: CreateTechnologyDto) => {
  await checkIfTechnologyNameIsUnique(createTechnologyDto.name)

  return await prisma.technology.create({
    data: createTechnologyDto,
    select: { id: true, name: true },
  })
}

export const getTechnologies = async () => {
  return await prisma.technology.findMany({
    where: { deletedAt: null },
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  })
}

export const updateTechnology = async (id: number, updateTechnologyDto: UpdateTechnologyDto) => {
  const technology = await prisma.technology.findFirst({ where: { id, deletedAt: null } })

  if (!technology) {
    throw createError({ statusCode: 404, message: 'Technology not found' })
  }

  await checkIfTechnologyNameIsUnique(updateTechnologyDto.name)

  return await prisma.technology.update({
    where: { id },
    data: updateTechnologyDto,
    select: { id: true, name: true },
  })
}

export const checkIfTechnologyNameIsUnique = async (name: string) => {
  const existing = await prisma.technology.findFirst({ where: { name, deletedAt: null } })
  if (existing) {
    throw createError({ statusCode: 400, message: 'A technology with this name already exists' })
  }
}

export const checkIfTechnologyIdsExistAndActive = async (technologyIds: number[]) => {
  const existing = await prisma.technology.findMany({
    where: { id: { in: technologyIds }, deletedAt: null },
  })
  if (existing.length !== technologyIds.length) {
    throw createError({
      statusCode: 400,
      message: 'One or more technologies are invalid or inactive',
    })
  }
}
