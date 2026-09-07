import { Link, Navigate, useParams } from 'react-router-dom'
import { PageEyebrow, WhyWorkFooter } from '../components/aivor/AivorShell'
import { ZoomableProjectImage } from '../components/aivor/ZoomableProjectImage'
import { caseStudies, kindLabel } from '../data/content'
import { getCaseStudyDetail } from '../data/caseStudyDetails'

export default function ProjectCaseStudyPage() {
  const { id } = useParams<{ id: string }>()
  const project = caseStudies.find((p) => p.id === id)
  const detail = id ? getCaseStudyDetail(id) : undefined

  if (!project || !detail) {
    return <Navigate to="/projects" replace />
  }

  const images =
    project.galleryImages ?? (project.previewImage ? [project.previewImage] : [])

  const sections = [
    { step: '01 · The problem', body: detail.challenge },
    { step: '02 · What I did', body: detail.whatIBuilt },
    { step: '03 · Outcome', body: detail.impact },
  ] as const

  return (
    <div className="mx-auto max-w-3xl py-4 lg:py-8">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink"
      >
        ← All projects
      </Link>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface">
        {images[0] ? (
          <div className="border-b border-line bg-screenshot">
            <ZoomableProjectImage
              src={images[0]}
              alt={`${project.title} preview`}
              className="max-h-[420px] w-full object-cover object-top"
            />
          </div>
        ) : null}
        <div className="p-6 md:p-8">
          <p className="text-xs text-muted">{project.period}</p>
          <h1 className="mt-2 font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-tight text-ink">
            {project.title}
          </h1>
          <p className="mt-2 text-sm font-medium text-accent">{detail.role}</p>
          <p className="mt-4 text-base leading-relaxed text-muted">{project.description}</p>
          {project.highlight ? (
            <p className="mt-4 text-sm font-medium text-accent">{project.highlight}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <PageEyebrow>Project context</PageEyebrow>
          <p className="mt-3 text-sm leading-relaxed text-muted">{detail.context}</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6">
          <PageEyebrow>Technologies</PageEyebrow>
          <p className="mt-3 text-sm leading-relaxed text-ink">
            {project.stack.join(' · ')}
          </p>
          <p className="mt-4 text-xs uppercase tracking-wider text-muted">
            {kindLabel(project.kind)} · {project.org}
          </p>
        </div>
      </div>

      {images.length > 1 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {images.slice(1).map((src) => (
            <div
              key={src}
              className="overflow-hidden rounded-2xl border border-line bg-screenshot"
            >
              <ZoomableProjectImage
                src={src}
                alt={`${project.title} additional screenshot`}
              />
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-10 space-y-6">
        {sections.map((section) => (
          <article
            key={section.step}
            className="rounded-2xl border border-line bg-surface p-6 md:p-8"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
              {section.step}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              {section.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {project.interactiveLabUrl ? (
          <a
            href={project.interactiveLabUrl}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-fg transition hover:opacity-85"
          >
            Open interactive lab
          </a>
        ) : null}
        <Link
          to="/contact"
          className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition hover:border-border-hover"
        >
          Discuss this project
        </Link>
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition hover:border-border-hover"
          >
            View repository
          </a>
        ) : null}
      </div>

      <WhyWorkFooter />
    </div>
  )
}
