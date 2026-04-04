import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    education: defineCollection({
      type: 'data',
      source: 'education/*.yml',
      schema: z.object({
        order: z.number(),
        period: z.string(),
        degree: z.string(),
        institution: z.string(),
      }),
    }),
    experiences: defineCollection({
      type: 'data',
      source: 'experiences/*.yml',
      schema: z.object({
        order: z.number(),
        period: z.string(),
        title: z.string(),
        company: z.string(),
        description: z.string(),
        technologies: z.array(z.string()),
        link: z.string().optional(),
      }),
    }),
  },
})
