import { getPosts } from '../../service/postService'

export default defineEventHandler(async () => {
  return await getPosts()
})
