import type { Technology } from '../../prisma/generated/client'

export type TechnologyDto = Pick<Technology, 'id' | 'name'>

export type CreateTechnologyDto = {
  name: string
}

export type UpdateTechnologyDto = Partial<CreateTechnologyDto>
