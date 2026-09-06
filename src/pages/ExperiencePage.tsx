import { experience, experienceStats } from '../data/content'
import { IconBriefcase } from '../components/aivor/icons'
import { PageEyebrow, PageLead, PageTitle, WhyWorkFooter } from '../components/aivor/AivorShell'

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-4xl py-4 lg:py-8">
      <PageEyebrow>Selected experience · 2025—2026</PageEyebrow>
      <PageTitle>Products delivered, not just prototypes.</PageTitle>
      <PageLead>
        I design, build and ship complete AI products: interface, workflows, prompt systems,
        orchestration, deployment and honest production follow-up.
      </PageLead>

      <div className="mt-10 grid gap-0 divide-x divide-line rounded-2xl border border-line bg-surface sm:grid-cols-3">
        {experienceStats.map((stat) => (
          <div key={stat.label} className="px-6 py-8 text-center sm:text-left">
            <p className="font-display text-4xl text-ink">{stat.value}</p>
            <p className="mt-2 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-surface">
        {experience.map((job) => (
          <article key={job.role} className="grid gap-4 p-6 md:grid-cols-[120px_1fr]">
            <div className="flex items-start gap-3 md:flex-col md:gap-2">
              <p className="text-xs text-muted">{job.period}</p>
              <IconBriefcase className="text-accent" />
            </div>
            <div>
              <h3 className="font-display text-2xl text-ink">{job.org}</h3>
              <p className="mt-1 text-sm text-muted">{job.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{job.description}</p>
            </div>
          </article>
        ))}
      </div>

      <WhyWorkFooter />
    </div>
  )
}
