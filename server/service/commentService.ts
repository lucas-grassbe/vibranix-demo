export const createComment = async (data: { content: string; authorId: number; postId: number }) => {
  return await prisma.comment.create({
    data,
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: { select: { id: true, name: true } },
    },
  })
}

export const deleteComment = async (id: number, userId: number) => {
  const comment = await prisma.comment.findFirst({
    where: { id, authorId: userId, deletedAt: null },
  })

  if (!comment) {
    throw createError({ statusCode: 404, message: 'Comment not found' })
  }

  return await prisma.comment.update({
    where: { id },
    data: { deletedAt: new Date() },
  })
}

export const getCommentsByPostId = async (postId: number) => {
  return await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: { select: { id: true, name: true } },
    },
  })
}
