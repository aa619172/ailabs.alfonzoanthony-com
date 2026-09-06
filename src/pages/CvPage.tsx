import { cv, site } from '../data/content'
import { PageEyebrow, PageLead, PageTitle, WhyWorkFooter } from '../components/aivor/AivorShell'

export default function CvPage() {
  return (
    <div className="mx-auto max-w-3xl py-4 lg:py-8">
      <PageEyebrow>{cv.eyebrow}</PageEyebrow>
      <PageTitle>{cv.title}</PageTitle>
      <PageLead>{cv.lead}</PageLead>

      <div className="mt-10 rounded-2xl border border-line bg-surface p-8">
        <p className="text-sm leading-relaxed text-muted">
          Resume includes AI prompt engineering, n8n automation, Google UX and AI certifications,
          AT&amp;T technical support experience, and featured builds with honest status labels.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={site.resumePdf}
            download
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-fg transition hover:opacity-85"
          >
            Download CV (PDF)
          </a>
          <a
            href={site.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition hover:border-border-hover"
          >
            Open in browser
          </a>
        </div>
      </div>

      <WhyWorkFooter />
    </div>
  )
}
