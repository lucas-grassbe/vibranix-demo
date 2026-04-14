import { uploadImageToR2 } from './r2Service'

type CreatePostInput = {
  content: string
  authorId: number
  file?: { data: Buffer; type: string }
}

export const createPost = async ({ content, authorId, file }: CreatePostInput) => {
  let imageUrl: string | undefined
  if (file) {
    imageUrl = await uploadImageToR2(file.data, file.type)
  }

  return prisma.post.create({
    data: { content, imageUrl, authorId },
    select: {
      id: true,
      content: true,
      imageUrl: true,
      edited: true,
      createdAt: true,
      author: { select: { id: true, name: true } },
    },
  })
}

export const getPostById = async (id: number) => {
  const post = await prisma.post.findFirst({
    where: { id, deletedAt: null },
    select: {
      id: true,
      content: true,
      imageUrl: true,
      edited: true,
      createdAt: true,
      author: { select: { id: true, name: true } },
      comments: {
        where: { deletedAt: null },
        orderBy: { createdAt: 'asc' },
        select: {
          id: true,
          content: true,
          createdAt: true,
          author: { select: { id: true, name: true } },
        },
      },
    },
  })

  if (!post) {
    throw createError({ statusCode: 404, message: 'Post not found' })
  }

  return post
}

export const getPosts = async () => {
  return prisma.post.findMany({
    where: { deletedAt: null },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    select: {
      id: true,
      content: true,
      imageUrl: true,
      edited: true,
      createdAt: true,
      author: { select: { id: true, name: true } },
    },
  })
}

export const deletePost = async (id: number, userId: number) => {
  const post = await prisma.post.findFirst({
    where: { id, authorId: userId, deletedAt: null },
  })

  if (!post) {
    throw createError({ statusCode: 404, message: 'Post not found' })
  }

  return prisma.post.update({
    where: { id },
    data: { deletedAt: new Date() },
  })
}
