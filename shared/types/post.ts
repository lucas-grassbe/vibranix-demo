import type { Post, Comment } from '../../app/generated/prisma/client'

export type AuthorDto = {
  id: number
  name: string
}

export type CommentDto = Comment & {
  author: AuthorDto
}

export type PostDto = Post & {
  author: AuthorDto
  comments?: CommentDto[]
}
