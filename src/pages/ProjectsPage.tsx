import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { caseStudies } from '../data/content'
import { PageEyebrow, PageLead, PageTitle, WhyWorkFooter } from '../components/aivor/AivorShell'
import { ZoomableProjectImage } from '../components/aivor/ZoomableProjectImage'
import { IconSearch } from '../components/aivor/icons'

export default function ProjectsPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return caseStudies
    return caseStudies.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q)),
    )
  }, [query])

  return (
    <div className="mx-auto max-w-4xl py-4 lg:py-8">
      <PageEyebrow>Selected work · {caseStudies.length} projects</PageEyebrow>
      <PageTitle>Projects</PageTitle>
      <PageLead>
        End-to-end AI products, agents and operating systems built for real teams.
      </PageLead>

      <label className="relative mt-8 block">
        <IconSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, technologies or outcomes…"
          className="w-full rounded-xl border border-line bg-surface py-3.5 pl-11 pr-4 text-sm text-ink outline-none placeholder:text-muted/70 focus:border-border-focus"
        />
      </label>

      <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-surface">
        {filtered.map((project) => {
          const images =
            project.galleryImages ??
            (project.previewImage ? [project.previewImage] : [])

          return (
          <article key={project.id} className="flex flex-col gap-4 p-6 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              <Link
                to={`/projects/${project.id}`}
                className="group block"
              >
                <h3 className="font-display text-2xl text-ink transition group-hover:text-accent">
                  {project.title}
                </h3>
              </Link>
              <p className="mt-1 text-sm text-muted">{project.category}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
              {project.highlight ? (
                <p className="mt-3 text-xs font-medium text-accent">{project.highlight}</p>
              ) : null}
              <Link
                to={`/projects/${project.id}`}
                className="mt-4 inline-block text-sm font-medium text-ink underline decoration-line underline-offset-4 transition hover:decoration-accent"
              >
                Read case study →
              </Link>
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 inline-block text-sm font-medium text-muted underline decoration-line underline-offset-4 transition hover:text-ink"
                >
                  Repository →
                </a>
              ) : null}
              <p className="mt-4 text-xs text-muted lg:hidden">{project.period}</p>
            </div>
            {images.length > 0 ? (
              <div className="flex w-full shrink-0 flex-col gap-2 lg:w-72">
                {images.map((src) => (
                  <div
                    key={src}
                    className="overflow-hidden rounded-xl border border-line bg-screenshot transition hover:border-border-hover"
                  >
                    <ZoomableProjectImage
                      src={src}
                      alt={`${project.title} screenshot`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-36 w-full shrink-0 rounded-xl border border-line bg-canvas lg:h-40 lg:w-72" />
            )}
            <p className="hidden shrink-0 text-xs text-muted lg:block lg:w-24 lg:text-right">
              {project.period}
            </p>
          </article>
          )
        })}
      </div>

      <WhyWorkFooter />
    </div>
  )
}
