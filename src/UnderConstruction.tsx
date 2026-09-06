import { site } from './data/content'

export default function UnderConstruction() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <div className="max-w-lg rounded-2xl border border-line bg-surface px-8 py-12 shadow-sm">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
          AI Labs
        </p>
        <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl">
          Under construction
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          This site is being refreshed with the AIVOR layout. Check back soon — or email{' '}
          <a
            href={`mailto:${site.email}`}
            className="text-ink underline decoration-line underline-offset-4"
          >
            {site.email}
          </a>
          .
        </p>
        <p className="mt-8 text-xs text-muted">{site.url}</p>
      </div>
    </div>
  )
}
