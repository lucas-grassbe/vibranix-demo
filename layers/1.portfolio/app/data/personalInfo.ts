export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface PersonalInfo {
  name: string
  resumeUrl: string
}

export const personalInfo: PersonalInfo = {
  name: 'Lucas Grass Beraldo',
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
