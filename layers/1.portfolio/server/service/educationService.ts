export const getEducations = async () => {
  return prisma.education.findMany({
    where: { deletedAt: null },
    select: { id: true, degree: true, institution: true, startDate: true, endDate: true },
  })
}
