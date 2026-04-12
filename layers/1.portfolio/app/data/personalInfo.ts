export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface PersonalInfo {
  name: string
  title: string
  tagline: string
  about: string
  resumeUrl: string
}

export const personalInfo: PersonalInfo = {
  name: 'Lucas Grass Beraldo',
  title: 'Engenheiro de Software',
  tagline: 'Desenvolvimento backend com experiência em NLP',
  about:
    'Sou engenheiro de software com experiência em NLP e foco em desenvolvimento backend. Atualmente, atuo na construção de APIs escaláveis utilizando NestJS e Prisma.',
  resumeUrl: 'https://www.linkedin.com/in/lucas-grass/',
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/lucasgrass',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/lucas-grass/',
    icon: 'linkedin',
  },
]
