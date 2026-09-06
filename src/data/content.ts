export const site = {
  name: 'Alfonzo Anthony',
  firstName: 'Alfonzo',
  role: 'AI Prompt Engineer',
  roleShort: 'AI Prompt Engineer',
  tagline: 'AI Prompt Engineer · Automation Builder · Product Developer',
  url: 'https://ailabs.alfonzoanthony.com',
  mainSiteUrl: 'https://www.alfonzoanthony.com',
  resumePdf: '/Alfonzo_Anthony_Resume.pdf',
  githubProfile: 'https://github.com/aa619172',
  deployRepo: 'https://github.com/aa619172/ailabs.alfonzoanthony-com',
  email: 'contact@alfonzoanthony.com',
  location: 'Gulf Coast · Remote · Available',
} as const

export type ProjectKind = 'case-study' | 'lab' | 'product'

export type CaseStudy = {
  id: string
  title: string
  category: string
  kind: ProjectKind
  eyebrow: string
  description: string
  stack: readonly string[]
  previewImage?: string
  /** Extra screenshots (e.g. live test proof) */
  galleryImages?: readonly string[]
  repoUrl?: string
  highlight?: string
  period?: string
  org?: string
}

export const intro = {
  askPlaceholder: 'Ask about my background',
  paragraphs: [
    "I've spent more than half my life in the technical world, but I've been an artist for as long as I can remember. I love solving problems, creating things, and figuring out how ideas can become something real and useful.",
    'AI feels like a new creative medium — a way to take an idea in my head and shape it into a working product, a visual experience, an automated system, or something that did not exist before.',
  ],
} as const

export const homeQuickLinks = [
  { label: 'Resume', href: '/cv', icon: 'resume' as const },
  { label: 'Experience', href: '/experience', icon: 'experience' as const },
  { label: 'Why work with me', href: '/about#why-work-with-me', icon: 'why' as const },
  { label: 'AI Agents', href: '/ai-agents', icon: 'agents' as const },
  { label: 'About', href: '/about', icon: 'about' as const },
] as const

export const askResponses: Record<string, string> = {
  background:
    'Graphic design roots, 20+ years in technical support, now building AI automation, prompt systems, and product software end to end.',
  projects:
    'I have 8 featured builds — from live-tested n8n ad engines to desktop print tools, SaaS mockup platforms, and AI lab systems.',
  experience:
    'Independent AI builder since 2025, AT&T technical support and peer mentor since 2015, freelance design since 2000.',
  agents:
    'My labs cover multi-agent orchestration, prompt reliability evaluation, and GPU fleet orchestration with production guardrails.',
  contact: `Email me at ${site.email} or use the contact form — I reply within one business day.`,
}

export const stats = [
  { label: 'Featured AI builds', value: '8' },
  { label: 'n8n engines built', value: '2' },
  { label: 'People reached (live Meta test)', value: '16,653' },
  { label: 'Ad spend · within 7 days', value: '$26.53' },
] as const

export const experienceStats = [
  { value: '8', label: 'AI case studies' },
  { value: '2', label: 'live-tested automations' },
  { value: '3 layers', label: 'prompt · workflow · product' },
] as const

export const caseStudies: readonly CaseStudy[] = [
  {
    id: 'agent-orchestration',
    title: 'Agent Orchestration Lab',
    category: 'Multi-agent control plane · Python/FastAPI',
    kind: 'lab',
    eyebrow: 'AI platform engineering',
    org: 'Independent Lab',
    period: '2025 — 2026',
    description:
      'Multi-agent runs were hard to observe and recover from. I built a control plane with routing, permissions, guardrails, and Mission Control — so agent teams can be stress-tested before production.',
    stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'Multi-agent'],
    previewImage: '/projects/agent-orchestration-lab.png',
  },
  {
    id: 'prompt-reliability',
    title: 'Prompt Reliability Lab',
    category: 'LLM evaluation · PromptOps',
    kind: 'lab',
    eyebrow: 'AI prompt engineering',
    org: 'Independent Lab',
    period: '2025 — 2026',
    description:
      'Prompt changes were shipping without regression checks. I built a reliability platform for versioning, evaluation, and verified fixes — so teams know a change is safe before users see it.',
    stack: ['LLM eval', 'PromptOps', 'Structured output', 'Regression testing'],
    previewImage: '/projects/prompt-reliability-lab.png',
  },
  {
    id: 'gpu-fleet',
    title: 'GPU Fleet Lab',
    category: 'GPU infrastructure · Python/FastAPI',
    kind: 'lab',
    eyebrow: 'Systems',
    org: 'Independent Lab',
    period: '2025 — 2026',
    description:
      'GPU jobs were landing without explainable placement or health context. I built a fleet control plane with topology-aware scheduling and telemetry — so operators can see why a job runs where it does.',
    stack: ['Python', 'FastAPI', 'DCGM', 'Prometheus', 'GPU scheduling'],
    previewImage: '/projects/gpu-fleet-lab.png',
  },
  {
    id: '2timesacharm',
    title: '2TimesACharm AI Ad Engine',
    category: 'AI automation · n8n',
    kind: 'case-study',
    eyebrow: 'Live-tested automation',
    org: '2 Times a Charm',
    period: '2025 — 2026',
    description:
      'Weekly ad ops meant manual handoffs between Claude, Meta, Sheets, and email. I built one n8n pipeline to generate copy, publish, log, capture leads, and run follow-ups — live-tested in Meta Ads.',
    stack: ['n8n', 'Meta Ads', 'Claude', 'Google Sheets', 'Webhooks'],
    previewImage: '/projects/n8n-2timesacharm.png',
    galleryImages: [
      '/projects/n8n-2timesacharm.png',
      '/projects/meta-ads-live-test.png',
    ],
    repoUrl: 'https://github.com/aa619172/n8n-automation-engines',
    highlight: '16,653 reach · $26.53 ad spend · within 7 days · live Meta test',
  },
  {
    id: 'credit-rise',
    title: 'Credit Rise',
    category: 'AI-assisted product · Credit education',
    kind: 'product',
    eyebrow: 'Product case study',
    org: 'Independent',
    period: '2025 — 2026',
    description:
      'Credit repair data was scattered across too many tools. I built one dashboard for scores, disputes, errors, and planning — with honest framing and no false outcome promises.',
    stack: ['Claude', 'Lovable', 'Cursor', 'UX/UI'],
    previewImage: '/projects/credit-rise.png',
  },
  {
    id: 'ai-video-engine',
    title: 'AI Video Generation Engine',
    category: 'Generative media · n8n',
    kind: 'case-study',
    eyebrow: 'Generative pipeline',
    org: 'Independent',
    period: '2025 — 2026',
    description:
      'Video pipelines broke when script output was prose instead of structured data. I built an n8n chain with Gemini, validation, and video generation — each stage visible and debuggable.',
    stack: ['n8n', 'Gemini', 'Structured output', 'Generative video'],
    previewImage: '/projects/ai-video-engine.png',
  },
  {
    id: 'crusoe-rippro',
    title: 'Crusoe RipPro Studio',
    category: 'Desktop product · Print workflow',
    kind: 'product',
    eyebrow: 'Desktop product',
    org: 'Independent',
    period: '2025 — 2026',
    description:
      'Print shops juggled artwork, presets, queues, and hot folders across disconnected tools. I built a desktop app that centralizes the full DTF/DTG prep workflow in one operator-focused workspace.',
    stack: ['Python', 'PySide6', 'OpenCV', 'Print workflow'],
    repoUrl: 'https://github.com/aa619172/Crusoe-RipPro-Studio',
    previewImage: '/projects/crusoe-rippro.png',
  },
  {
    id: 'mockup-magic',
    title: 'Mockup Magic',
    category: 'AI commerce product · SaaS',
    kind: 'product',
    eyebrow: 'SaaS product',
    org: 'Independent',
    period: '2025 — 2026',
    description:
      'Apparel sellers used too many tools to get from artwork to marketplace mockups and ad creative. I built a SaaS platform that covers mockups, AI model scenes, ads, and organized exports in one flow.',
    stack: ['Next.js', 'Supabase', 'TypeScript', 'Konva'],
    repoUrl: 'https://github.com/aa619172/Mockup-Magic',
    previewImage: '/projects/mockup-magic.png',
  },
]

export const agents = [
  {
    org: 'Agent Orchestration Lab',
    title: 'Multi-Agent Control Plane',
    description:
      'Routes goals across specialist agents with explicit tool permissions, failure recovery, run analytics, and a Mission Control interface for observability.',
  },
  {
    org: 'Prompt Reliability Lab',
    title: 'Prompt Evaluation Suite',
    description:
      'Versions prompts, runs reusable evaluations, validates structured output, detects regressions, and verifies corrective changes before deployment.',
  },
  {
    org: 'GPU Fleet Lab',
    title: 'Capacity Orchestration Agent',
    description:
      'Topology-aware GPU scheduling with explainable placement, NVLink-aware multi-GPU routing, fault simulation, and Prometheus observability.',
  },
  {
    org: '2TimesACharm',
    title: 'Ad Engine Automation Agent',
    description:
      'Generates ad copy, publishes to Meta, logs activity to Sheets, captures leads, and runs follow-up sequences — live-tested with real ad spend.',
  },
  {
    org: 'Mockup Magic',
    title: 'Product Content Agent',
    description:
      'Moves sellers from artwork to mockups, AI model scenes, ad creative, and organized exports through a guided SaaS workflow.',
  },
  {
    org: 'Crusoe RipPro',
    title: 'Print Prep Workflow Agent',
    description:
      'Centralizes artwork intake, presets, calibration, printer queues, hot folders, and job history for DTF/DTG production teams.',
  },
] as const

export const agentTags = ['Guardrails', 'Grounded data', 'Orchestrated tools'] as const

export const experience = [
  {
    role: 'AI Prompt Engineer & Automation Builder',
    org: 'Independent',
    period: '2025 — Present',
    description:
      'Builds AI-assisted software products and n8n workflow engines connecting models to marketing, media, and business processes with prompt architecture and validation.',
  },
  {
    role: 'Technical Support, Customer Service & Peer Mentor',
    org: 'AT&T',
    period: '2015 — Present',
    description:
      'Diagnoses complex mobile OS, network, application, account, and billing issues; mentors peers and improves troubleshooting documentation.',
  },
  {
    role: 'Designer & Creative Operations Consultant',
    org: 'Independent / Freelance',
    period: '2000 — Present',
    description:
      'Translates ambiguous client needs into concrete visual, technical, and product deliverables with AI-assisted prototyping.',
  },
] as const

export const about = {
  eyebrow: 'About Alfonzo',
  title: 'AI engineering with product instincts.',
  lead: 'I am an AI Prompt Engineer and automation builder on the Gulf Coast. I build complete products around AI: interfaces, workflows, prompt systems, orchestration, and the troubleshooting instinct to ship what teams can actually use.',
  personalStory: [
    'I love what I do — it feels as natural to me as breathing. I’ve been an artist by nature for as long as I can remember, and more than 20 years in tech have taught me to look at the world through a different lens. I understand problems and how to fix them based on what the user actually needs. It’s not about being right; it’s about making it right.',
    'AI prompting is another form of art in my eyes. It’s like a canvas where I can input ideas and get fast outputs to build on — and in some cases, find new inspiration.',
  ],
  howIWork:
    'Creative, rigorous, and willing to own the difficult middle: defining prompt context, designing workflow actions, limiting tool scope, validating outputs, tracing failures, and measuring quality before calling something done.',
  education: [
    {
      school: 'Google / Coursera',
      program: 'UX Design Professional Certificate',
      detail: 'User research, prototyping, and product decision-making applied to AI tools.',
    },
    {
      school: 'Google / Coursera',
      program: 'AI & Prompting Essentials',
      detail: 'Prompt architecture, structured outputs, and AI workflow orchestration.',
    },
  ],
} as const

export const whyWorkWithMe = {
  title: 'Product clarity. Production discipline.',
  lead: 'I turn ambiguous operational problems into AI products and automations that teams can understand, control, and improve.',
  items: [
    {
      title: 'End-to-end ownership',
      description:
        'Prompt design, workflow orchestration, UI, APIs, validation, deployment, and honest status labeling — shaped as one coherent product.',
    },
    {
      title: 'Controlled by design',
      description:
        'Permissions, tool limits, structured outputs, logs, error paths, and human checkpoints are designed from the start — not bolted on later.',
    },
    {
      title: 'Fast, without fragility',
      description:
        'I prototype quickly with Cursor and Lovable, then make workflows maintainable with real metrics instead of invented ones.',
    },
  ],
} as const

export const contact = {
  eyebrow: 'Open to meaningful AI products',
  title: "Let's build something useful.",
  lead: 'Tell me about the workflow, product, or team you want to improve. I am available for prompt engineering, n8n automation, agent systems, and AI-assisted product development.',
  emailNote: 'Available through this form',
  phoneNote: 'Shared after first contact',
  locationNote: site.location,
  formNote: 'I usually reply within one business day.',
} as const

export const cv = {
  eyebrow: 'Resume',
  title: 'Download CV',
  lead: 'Public resume with AI prompt engineering, automation, UX coursework, and technical support background.',
} as const

export function kindLabel(kind: ProjectKind): string {
  if (kind === 'lab') return 'Lab'
  if (kind === 'case-study') return 'Live test'
  return 'Product'
}
