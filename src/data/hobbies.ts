export type HobbyCategory =
  | 'prompting'
  | 'painting'
  | 'laser-engraving'
  | 'paper-mache'
  | 'construction'

export type HobbyProject = {
  id: string
  title: string
  description: string
  image: string
}

export type HobbyGroup = {
  id: HobbyCategory
  title: string
  description: string
  projects?: readonly HobbyProject[]
  /** Text-only hobby notes when there are no gallery photos */
  highlights?: readonly string[]
}

export const hobbiesIntro = {
  eyebrow: 'Off the clock',
  title: 'Hobbies — not client work.',
  lead: 'The photos below are personal art and build projects I do for fun: painting, laser engraving, paper mache, and construction. I also love prompting for its own sake — experimenting with models, structures, and creative outputs outside of any paid brief.',
  note: 'Nothing in this gallery is portfolio client work. It is how I recharge the same creative and troubleshooting instincts I bring to AI products.',
} as const

export const hobbyGroups: readonly HobbyGroup[] = [
  {
    id: 'prompting',
    title: 'Prompting',
    description:
      'Prompt engineering is my profession, but prompting is also a hobby — I enjoy pushing models creatively, testing structured outputs, and seeing what happens when an idea starts in my head and ends as text, image, or workflow output.',
    highlights: [
      'Creative prompt experiments with ChatGPT, Claude, and Gemini',
      'Structured output and “what if this breaks?” testing for fun',
      'Image and scene prompts tied to my art and build projects',
      'Notebook-style prompt iterations — the same playfulness as sketching',
    ],
  },
  {
    id: 'painting',
    title: 'Painting',
    description:
      'Abstract canvases — personal ways of expressing thoughts and emotion, not commissions. Color, texture, and composition as feeling rather than subject matter.',
    projects: [
      {
        id: 'abstract-geometric',
        title: 'Layered abstract study',
        description:
          'An abstract idea turned into form — stenciled geometry, splatter, and cool-tone layers expressing a mood I could not put into words.',
        image: '/hobbies/painting-abstract-geometric.png',
      },
      {
        id: 'abstract-textured',
        title: 'Palette-knife texture piece',
        description:
          'Scraped acrylic in blue, magenta, and white — built up layer by layer until the surface matched the emotion I was working through.',
        image: '/hobbies/painting-abstract-textured.png',
      },
    ],
  },
  {
    id: 'laser-engraving',
    title: 'Laser engraving',
    description:
      'Personal laser-cut and engraved pieces — portrait tributes, silhouette lanterns, and precision craft projects.',
    projects: [
      {
        id: 'kobe-tribute',
        title: 'Kobe Bryant tribute engraving',
        description:
          'Detailed laser-engraved portrait with career stats and Mamba Forever typography.',
        image: '/hobbies/laser-engraving-kobe.png',
      },
      {
        id: 'witch-lantern',
        title: 'Witch & moon silhouette lantern',
        description:
          'Backlit laser-cut silhouette box — witch, cat, and full moon scene.',
        image: '/hobbies/laser-lantern-witch.png',
      },
      {
        id: 'haunted-lantern',
        title: 'Haunted house lantern',
        description:
          'Laser-cut haunted house silhouette with bats, moon, and graveyard details.',
        image: '/hobbies/laser-lantern-haunted-house.png',
      },
    ],
  },
  {
    id: 'paper-mache',
    title: 'Paper mache',
    description:
      'Large-scale sculptural hobby builds — monsters, props, and set pieces for Halloween and community events.',
    projects: [
      {
        id: 'demon-sculpture',
        title: 'Paper mache demon sculpture',
        description:
          'Built for a call-center Halloween competition — I collected paper every day at work and layered it with glue, flour paste, and newspaper until he took shape. Added a power switch so his eyes glow, plus Bluetooth speakers so he could laugh and growl on cue.',
        image: '/hobbies/papier-mache-demon.png',
      },
      {
        id: 'halloween-gate',
        title: 'Halloween gate installation',
        description:
          'Full gate-and-demon set piece with fog, lighting, skull props, and reaper figures.',
        image: '/hobbies/papier-mache-halloween-gate.png',
      },
      {
        id: 'grim-reapers',
        title: 'Grim reaper figures',
        description:
          'Hooded reaper props with distressed fabric and sculpted skull faces.',
        image: '/hobbies/papier-mache-reapers.png',
      },
    ],
  },
  {
    id: 'construction',
    title: 'Construction',
    description:
      'Structural hobby builds from cardboard, fabric, and found materials — gingerbread architecture, life-size cutouts, and haunted facades.',
    projects: [
      {
        id: 'gingerbread-a',
        title: 'Gingerbread house build',
        description:
          'Structural gingerbread architecture with cereal-shingle roof, candy trim, and iced walkway.',
        image: '/hobbies/construction-gingerbread-a.png',
      },
      {
        id: 'gingerbread-b',
        title: 'Gingerbread house — detail view',
        description:
          'Alternate angle showing candy-cane pillars, wreath detail, and chocolate-bar door.',
        image: '/hobbies/construction-gingerbread-b.png',
      },
      {
        id: 'grinch-cutout',
        title: 'Life-size Grinch cutout',
        description:
          'Neon-green foam board Santa Grinch with fabric suit and cotton trim — office holiday build.',
        image: '/hobbies/construction-grinch-cutout.png',
      },
      {
        id: 'haunted-facade',
        title: 'Office haunted house facade',
        description:
          'Cardboard-and-fabric haunted house with shingled roof, clock tower, cobwebs, and Ghostface prop.',
        image: '/hobbies/construction-haunted-facade.png',
      },
    ],
  },
]

export function hobbyCategoryLabel(id: HobbyCategory): string {
  const labels: Record<HobbyCategory, string> = {
    prompting: 'Prompting',
    painting: 'Painting',
    'laser-engraving': 'Laser engraving',
    'paper-mache': 'Paper mache',
    construction: 'Construction',
  }
  return labels[id]
}
