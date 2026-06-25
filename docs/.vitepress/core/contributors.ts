export interface Contributor {
  name: string
  aka: string
  pfp: string
  portfolio: string
  discord: string
  discordId?: string
  github: string
  description: string
  type: 'Author' | 'Co-Author'
}

export const contributors: Contributor[] = [
  // {
  //   name: '𝖘𝖚𝖕𝖗𝖊𝖒𝖊𝖒𝖚𝖍𝖎𝖙',
  //   aka: '𝖘𝖚𝖕𝖗𝖊𝖒𝖆𝖈𝖞',
  //   pfp: 'none',
  //   portfolio: 'https://suprememuhit.github.io',
  //   discord: 'https://discord.com/users/1341440502104592507',
  //   discordId: '1341440502104592507',
  //   github: 'https://github.com/SupremeMuhit',
  //   description: 'No Description Yet LOL',
  //   type: 'Author'
  // },

]
