export const site = {
  name: 'Alfonzo Anthony',
  tagline: 'UX Designer · Technical Support Specialist · AI Builder',
  url: 'https://ailabs.alfonzoanthony.com',
  mainSiteUrl: 'https://www.alfonzoanthony.com',
  resumePdf: '/Alfonzo_Anthony_Resume.pdf',
  githubProfile: 'https://github.com/aa619172',
  deployRepo: 'https://github.com/aa619172/ailabs.alfonzoanthony-com',
} as const

export type ProjectStatus = 'in-development' | 'coming-soon'

export type Project = {
  id: string
  title: string
  category: string
  status: ProjectStatus
  description: string
  stack: readonly string[]
  /** Set when the GitHub repo exists (public or private). */
  repoUrl?: string
}

export const projects: readonly Project[] = [
  {
    id: 'n8n-engines',
    title: 'n8n Automation Engines',
    category: 'Workflow automation',
    status: 'in-development',
    description:
      'Workflow engines in n8n that connect Gemini, Claude, and GPT to content, media, and business processes. Shared automation repo and walkthroughs will publish here when ready.',
    stack: ['n8n', 'Gemini', 'Claude', 'GPT'],
    repoUrl: 'https://github.com/aa619172/n8n-automation-engines',
  },
  {
    id: 'mockup-magic',
    title: 'Mockup Magic',
    category: 'SaaS · Software build',
    status: 'in-development',
    description:
      'Production SaaS for clothing mockups, AI model generation, and advertising content — Next.js monorepo with Supabase, Konva editor, and server-side compositing.',
    stack: ['Next.js', 'Supabase', 'TypeScript', 'Konva'],
    repoUrl: 'https://github.com/aa619172/Mockup-Magic',
  },
  {
    id: 'crusoe-rip-pro',
    title: 'Crusoe Rip Pro',
    category: 'Desktop · Software build',
    status: 'in-development',
    description:
      'Windows desktop app for print production prep: apparel transfers, white toner, DTF, queue management, hot folders, and specialty media — original tooling, not a clone of proprietary RIPs.',
    stack: ['Python', 'PySide6', 'OpenCV', 'PyInstaller'],
    repoUrl: 'https://github.com/aa619172/Crusoe-RipPro-Studio',
  },
  {
    id: 'seamcut-pro',
    title: 'SeamCut Pro',
    category: 'Desktop · Software build',
    status: 'in-development',
    description:
      '3D seam analysis and cut-prep desktop app for Windows — mesh tooling, native UI shell, and packaged executable build pipeline.',
    stack: ['Python', 'FastAPI', 'PyInstaller', 'WebView'],
    repoUrl: 'https://github.com/aa619172/SeamCut-Pro',
  },
] as const

export const skillGroups = [
  {
    title: 'AI & automation',
    items: [
      'ChatGPT, Claude, Gemini',
      'Prompt engineering',
      'n8n workflow automation',
      'End-to-end software builds',
    ],
  },
  {
    title: 'Design & creative',
    items: [
      'Figma — wireframes, prototyping, high-fidelity UI',
      'Adobe Creative Cloud',
      'User research & usability testing',
      'Design systems & visual design',
    ],
  },
  {
    title: 'Technical systems',
    items: [
      'CRM: Salesforce, Oracle',
      'Windows, Linux, macOS',
      'Network & hardware troubleshooting',
      'Technical documentation',
    ],
  },
] as const

export const certifications = [
  'Google UX Design Coursework — 5 of 7 courses (Coursera, 2026)',
  'Technical Support Fundamentals — Google, Coursera (Dec 2025)',
  'Google AI Essentials Specialization — Coursera (Dec 2025)',
  'Google Prompting Essentials Specialization — Coursera (Dec 2025)',
] as const

export const experience = [
  {
    role: 'AI Automation & Software Builder',
    org: 'Independent',
    period: '2025 – Present',
    highlights: [
      'Building automated workflow engines with n8n, connecting AI models (Gemini, Claude, GPT) to streamline content, media, and business processes.',
      'Designing and developing standalone tools — Mockup Magic, Crusoe Rip Pro, and SeamCut Pro — from UI/UX through front-end implementation.',
      'Applying graphic design and troubleshooting experience to ship practical, user-facing tools, not just internal scripts.',
    ],
  },
  {
    role: 'Senior Technical Support & Peer Mentor',
    org: 'AT&T',
    period: '2021 – Present',
    highlights: [
      'Mentors new hires on diagnostics, call flow, and de-escalation; handles Tier 2 escalations across mobile OS, network, and billing systems.',
      'Improves team troubleshooting by closing gaps in internal documentation and knowledge base resources.',
    ],
  },
  {
    role: 'Lead Designer & Creative Operations Consultant',
    org: 'Freelance',
    period: '2000 – Present',
    highlights: [
      'Early adopter of AI for rapid prototyping and prompt engineering.',
      'Translates vague client requirements into concrete design and technical deliverables.',
    ],
  },
] as const

export function projectStatusLabel(status: ProjectStatus): string {
  return status === 'in-development' ? 'In development' : 'Coming soon'
}
