export const createPost = async (data: { content: string; authorId: number }) => {
  return await prisma.post.create({
    data,
    include: { author: { select: { id: true, name: true } } },
  })
}

export const getPostById = async (id: number) => {
  const post = await prisma.post.findFirst({
    where: { id, deletedAt: null },
    include: {
      author: { select: { id: true, name: true } },
      comments: {
        where: { deletedAt: null },
        orderBy: { createdAt: 'asc' },
        include: { author: { select: { id: true, name: true } } },
      },
    },
  })

  if (!post) {
    throw createError({ statusCode: 404, message: 'Post not found' })
  }

  return post
}

export const getPosts = async () => {
  return await prisma.post.findMany({
    where: { deletedAt: null },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    include: { author: { select: { id: true, name: true } } },
  })
}

export const deletePost = async (id: number, userId: number) => {
  const post = await prisma.post.findFirst({
    where: { id, authorId: userId, deletedAt: null },
  })

  if (!post) {
    throw createError({ statusCode: 404, message: 'Post not found' })
  }

  return await prisma.post.update({
    where: { id },
    data: { deletedAt: new Date() },
  })
}