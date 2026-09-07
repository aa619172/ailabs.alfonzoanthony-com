import { useState } from 'react'
import { Link } from 'react-router-dom'
import { askResponses, caseStudies, homeQuickLinks, intro, site } from '../data/content'
import { Avatar } from '../components/aivor/AivorShell'
import { IconAbout, IconBot, IconClock, IconPlus, IconResume, IconSpark } from '../components/aivor/icons'

const pillIcons = {
  resume: IconResume,
  experience: IconClock,
  why: IconSpark,
  agents: IconBot,
  about: IconAbout,
} as const

const FLAGSHIP_ID = 'adversarial-prompt-lab'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState<string | null>(null)
  const flagship = caseStudies.find((project) => project.id === FLAGSHIP_ID)

  function handleAsk(event: React.FormEvent) {
    event.preventDefault()
    const q = query.toLowerCase()
    if (q.includes('project') || q.includes('work') || q.includes('build')) {
      setResponse(askResponses.projects)
    } else if (q.includes('agent') || q.includes('lab')) {
      setResponse(askResponses.agents)
    } else if (q.includes('experience') || q.includes('background') || q.includes('history')) {
      setResponse(askResponses.experience)
    } else if (q.includes('contact') || q.includes('email') || q.includes('hire')) {
      setResponse(askResponses.contact)
    } else {
      setResponse(askResponses.background)
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center py-8 lg:py-16">
      <Avatar size="lg" />
      <h1 className="mt-6 text-center font-display text-[clamp(2rem,5vw,2.75rem)] leading-tight tracking-[-0.02em] text-ink">
        {site.name}
      </h1>
      <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-muted">
        {site.role}
      </p>

      <form onSubmit={handleAsk} className="mt-10 w-full">
        <div className="rounded-2xl border border-line bg-surface px-4 py-4 shadow-[var(--shadow-card)]">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={intro.askPlaceholder}
            rows={3}
            className="w-full resize-none bg-transparent text-base text-ink outline-none placeholder:text-muted/70"
          />
          <div className="mt-2 flex items-center justify-between">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-canvas"
              aria-label="New prompt"
            >
              <IconPlus />
            </button>
            <button
              type="submit"
              className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-fg transition hover:opacity-85"
            >
              Ask
            </button>
          </div>
        </div>
      </form>

      {response ? (
        <div className="mt-4 w-full rounded-2xl border border-line bg-surface px-5 py-4 text-sm leading-relaxed text-muted">
          {response}
        </div>
      ) : null}

      <div className="mt-5 flex w-full flex-wrap justify-center gap-2">
        {homeQuickLinks.map((item) => {
          const Icon = pillIcons[item.icon]
          return (
            <Link
              key={item.href}
              to={item.href}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink transition hover:border-border-hover"
            >
              <Icon className="text-muted" />
              {item.label}
            </Link>
          )
        })}
      </div>

      {flagship ? (
        <section className="mt-8 w-full rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full border border-line bg-canvas px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              Flagship project
            </span>
            <span className="text-xs text-muted">Controlled Prompt Engineering evaluation</span>
          </div>

          <h2 className="mt-4 font-display text-2xl leading-tight text-ink">
            {flagship.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{flagship.description}</p>

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            <div className="rounded-xl border border-line bg-canvas p-3">
              <strong className="block text-lg text-ink">12</strong>
              <span className="text-[11px] text-muted">controlled tests</span>
            </div>
            <div className="rounded-xl border border-line bg-canvas p-3">
              <strong className="block text-lg text-ink">12 → 0</strong>
              <span className="text-[11px] text-muted">controlled failures</span>
            </div>
            <div className="rounded-xl border border-line bg-canvas p-3">
              <strong className="block text-lg text-ink">84 → 0</strong>
              <span className="text-[11px] text-muted">project lab risk</span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to={`/projects/${flagship.id}`}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-fg transition hover:opacity-85"
            >
              Read flagship case study
            </Link>
            {flagship.interactiveLabUrl ? (
              <a
                href={flagship.interactiveLabUrl}
                className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition hover:border-border-hover"
              >
                Open interactive lab
              </a>
            ) : null}
          </div>
        </section>
      ) : null}

      <p className="mt-12 text-center text-xs text-muted/80">
        {site.name} · {site.role}
      </p>
    </div>
  )
}
