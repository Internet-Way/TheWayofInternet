export interface Contributor {
  id: string
  name: string
  aka: string
  pfp: string
  portfolio: string
  discord: string
  discordId?: string
  github: string
  description: string
  type: 'Editor' | 'Co-Editor' | 'Special' | 'Contributor'
}

export const contributors: Contributor[] = [
  {
    id: '1320',
    name: '𝖘𝖚𝖕𝖗𝖊𝖒𝖊𝖒𝖚𝖍𝖎𝖙',
    aka: '𝖘𝖚𝖕𝖗𝖊𝖒𝖆𝖈𝖞',
    pfp: 'none',
    portfolio: 'https://suprememuhit.github.io',
    discord: 'https://discord.com/users/1341440502104592507',
    discordId: '1341440502104592507',
    github: 'https://github.com/SupremeMuhit',
    description: 'No Description Yet LOL',
    type: 'Editor'
  },
  {
    id: '1321',
    name: 'VORTEX',
    aka: 'none',
    pfp: 'none',
    portfolio: 'none',
    discord: 'https://discord.com/users/1419714928134062191',
    discordId: '1419714928134062191',
    github: 'https://github.com/VortexStack777',
    description: 'No Description Yet LOL',
    type: 'Editor'
  }
]
