export type AuthorDto = {
  id: number
  name: string
}

export type CommentDto = {
  id: number
  content: string
  createdAt: Date
  author: AuthorDto
}

export type PostDto = {
  id: number
  content: string
  edited: boolean
  createdAt: Date
  author: AuthorDto
  comments?: CommentDto[]
}
