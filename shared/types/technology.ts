import type { Technology } from '../../app/generated/prisma/client'

export type TechnologyDto = Pick<Technology, 'id' | 'name'>

export type CreateTechnologyDto = {
  name: string
}
