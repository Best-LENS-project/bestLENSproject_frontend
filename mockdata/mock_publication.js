import _ from 'lodash'

export const publications = [...Array(6)].map((a) => {
  return {
    title: 'Hackthon Projects for LFGrow',
    short_description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Volupatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
    description: `
    Every day, we count on technology to provide us with open communication to the people we love, reliable information on the world around us, and to share our creativity and experiences. But, while it might be free to post a story or a tweet, you pay with your data, the very uniqueness that makes you, and trust a centralized opaque system to deliver it to the world.

    The world needs an open platform to communicate, to share, and to publish, and the world needs builders like you to build it.
    
    LFGrow is an event for just that, using Lens Protocol as the foundation to create a social platform with digital ownership-first experiences, tools for transparent moderation, censorship-resistant ways to publish and profit, and much more.
    
    We can't wait to see what you build. LFGrow
    `,
    type: 'submission',
    comments: 4,
    collections: 2,
    shares: 2,
    img:
      'https://s3-alpha-sig.figma.com/img/c5dd/c595/f603de63c6ce0ff8d6a7be6e3d80a0fe?Expires=1649030400&Signature=Ul9aLVUQ4OhHemX7atLWtgDvfy-~pXZjznwVbgv3VQCUB5AvTL7HSmXH8NsY4QOiUv~AXThSEaOq~a28NnjlmnJ-5Pq5rcBoxNkcWe3mIkmURK5mVbeu~2j22~7NRgM8JHjWdQP59d7q5HU5jKfHEc0eIfb-n4l03va9lKLkmt~jR1LqVv5lspf4qkFXK28kyDbUvPR34argd2ctt9pjL6uFC~mC1NQbtcQpUFw92hyQ79NGa5RalXFjjE0Gf5Q3ORikEfNFRYYcU9RPpRGUPD~c7c3AM1Qe09JTgmXlPaRDWYsyW0zoXfKCswyNgpjlyMnT3AEL6M6sZbRkrgUdYw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    createdAt: Date.now(),
    fields: [
      { name: 'Github', value: 'https://github.com/Best-LENS-project' },
      { name: 'Social Impact', value: 'https://github.com/Best-LENS-project' },
    ],
    creator: {
      name: 'PretzelDAO',
      img:
        'https://s3-alpha-sig.figma.com/img/d765/bae1/ab1d304b126ee31d6fbcbab6e65f0078?Expires=1649030400&Signature=QUx9ssK8uOSZVfvpdDW-ID2rV8FvS0xcLf~0mNTY5bk901y8UJ7BFkZ81mhJInYHv527Q5wytAJWhZQ7-Bv7I-QJxm9hbHkpgNEWvDJeXiimOjXVCNXSzY0PuGbrxbxuaIFJ5vGA8Q5yitL40ahDLZRc6EP6ITDbcI5HGVD59~ySFAdze-OXgUsvzNtTnHVWMKBB4RW1xvGbSr~6dcLuiztSC~JVtixhGnDpwxL-me~jN5dH5vLS~4s7KjWRruU6kW5lI~yL8a1sXe6Ji1W0NV4akSC6TtT8JqLa28ylykfK3C2wNngxm7C4N7V6O9fviwCbaX7L3E-BAMZV0lrDnA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
  }
})

export const comment = {
  title: '(Finding the) best LENS Project',
  fields: [{ name: 'Github', value: 'https://github.com/Best-LENS-project' }],
  description: ` We are building an interface for DAOs to publish Hackathons, collect Submissions and Vote for their Winner all on Lens.
Participants can make their contributions to Hackathons public and - depending on the voting module the Organiser chooses to participate in the voting.
  `,
  createdAt: Date.now(),
  creator: {
    name: 'PretzelDAO',
    img:
      'https://s3-alpha-sig.figma.com/img/d765/bae1/ab1d304b126ee31d6fbcbab6e65f0078?Expires=1649030400&Signature=QUx9ssK8uOSZVfvpdDW-ID2rV8FvS0xcLf~0mNTY5bk901y8UJ7BFkZ81mhJInYHv527Q5wytAJWhZQ7-Bv7I-QJxm9hbHkpgNEWvDJeXiimOjXVCNXSzY0PuGbrxbxuaIFJ5vGA8Q5yitL40ahDLZRc6EP6ITDbcI5HGVD59~ySFAdze-OXgUsvzNtTnHVWMKBB4RW1xvGbSr~6dcLuiztSC~JVtixhGnDpwxL-me~jN5dH5vLS~4s7KjWRruU6kW5lI~yL8a1sXe6Ji1W0NV4akSC6TtT8JqLa28ylykfK3C2wNngxm7C4N7V6O9fviwCbaX7L3E-BAMZV0lrDnA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  },
}

export const comments = [...Array(6)].map((a) => {
  comment.createdAt += Math.floor(
    (Math.random() - 0.5) * 3 * 24 * 60 * 60 * 1000,
  )
  comment.collections = Math.floor(Math.random() * 200)
  comment.shares = Math.floor(Math.random() * 100)
  comment.comments = Math.floor(Math.random() * 40)
  // console.log('date', comment)
  return _.cloneDeep(comment)
})
