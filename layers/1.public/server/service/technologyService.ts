export const getTechnologies = async () => {
  return await prisma.technology.findMany({
    where: { deletedAt: null },
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  })
}