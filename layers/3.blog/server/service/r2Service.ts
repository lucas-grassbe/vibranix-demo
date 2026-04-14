import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import * as bcrypt from 'bcrypt'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_DEFAULT_URL,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: false,
})

export const uploadImageToR2 = async (file: Buffer, contentType: string): Promise<string> => {
  if (!ALLOWED_TYPES.includes(contentType)) {
    throw createError({ statusCode: 400, message: 'Invalid file type' })
  }

  const ext = EXTENSIONS[contentType]
  const salt = await bcrypt.genSalt(10)
  const randomPart = salt.replace(/[^a-zA-Z0-9]/g, '')
  const key = `posts/${randomPart}.${ext}`

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
      Body: file,
      ContentType: contentType,
    }),
  )

  return key
}
