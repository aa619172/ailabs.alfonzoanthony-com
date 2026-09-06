import { agentTags, agents } from '../data/content'
import { PageEyebrow, PageLead, PageTitle, WhyWorkFooter } from '../components/aivor/AivorShell'
import { IconAgent, IconDatabase, IconShield, IconTools } from '../components/aivor/icons'

const tagIcons = [IconShield, IconDatabase, IconTools] as const

export default function AiAgentsPage() {
  return (
    <div className="mx-auto max-w-4xl py-4 lg:py-8">
      <PageEyebrow>Agent systems · Production first</PageEyebrow>
      <PageTitle>Agents with tools, boundaries and observable outcomes.</PageTitle>
      <PageLead>
        From live-tested ad automation to prompt reliability labs and GPU orchestration: each
        system is connected to real data, permissions and workflows.
      </PageLead>

      <div className="mt-6 flex flex-wrap gap-2">
        {agentTags.map((tag, i) => {
          const Icon = tagIcons[i]
          return (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted"
            >
              <Icon className="text-accent" />
              {tag}
            </span>
          )
        })}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {agents.map((agent) => (
          <article
            key={agent.title}
            className="rounded-2xl border border-line bg-surface p-6 transition hover:border-border-hover"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-warm text-accent">
              <IconAgent />
            </div>
            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
              {agent.org}
            </p>
            <h3 className="mt-2 font-display text-xl text-ink">{agent.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{agent.description}</p>
          </article>
        ))}
      </div>

      <WhyWorkFooter />
    </div>
  )
}
