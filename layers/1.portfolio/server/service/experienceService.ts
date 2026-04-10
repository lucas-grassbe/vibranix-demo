export const getExperiences = async () => {
  return prisma.experience.findMany({
    where: { deletedAt: null },
    orderBy: { startDate: 'desc' },
    select: {
      id: true,
      title: true,
      company: true,
      description: true,
      startDate: true,
      endDate: true,
      technologies: {
        where: { deletedAt: null },
        select: { id: true, name: true },
      },
    },
  })
}
