import {
  certifications,
  experience,
  projectStatusLabel,
  projects,
  site,
  skillGroups,
} from './data/content'

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a
          href="#"
          className="font-display text-xl tracking-tight text-cream transition hover:text-accent-soft"
        >
          {site.name}
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={site.resumePdf}
          download
          className="rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-medium text-cream transition hover:border-accent/50 hover:text-accent-soft"
        >
          Resume
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% -10%, color-mix(in srgb, var(--color-teal) 25%, transparent), transparent), radial-gradient(ellipse 50% 40% at 10% 80%, color-mix(in srgb, var(--color-accent) 15%, transparent), transparent)',
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Building with AI, end to end
          </p>
          <h1 className="font-display text-4xl leading-[1.1] text-cream md:text-5xl lg:text-6xl">
            Same instinct.
            <br />
            <span className="italic text-accent-soft">New tools.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            I started as a graphic designer and spent decades in technical
            support — diagnosing complex systems and solving problems for
            people. Moving into AI automation and software building felt
            seamless: it&apos;s the same core work, with a bigger canvas. I still
            get to be an artist; I just get to be useful on a larger scale.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#work"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent-soft"
            >
              View projects
            </a>
            <a
              href={site.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-cream transition hover:border-muted"
            >
              Open resume
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="rounded-2xl border border-border bg-surface-elevated/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal">
              Current focus
            </p>
            <h2 className="mt-3 font-display text-2xl text-cream">
              AI Automation &amp; Software Builder
            </h2>
            <p className="mt-1 text-sm text-muted">Independent · 2025 – Present</p>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              n8n workflow engines, multi-model AI integrations, and standalone
              apps — Mockup Magic, Crusoe Rip Pro, and SeamCut Pro — designed
              and built with formal UX training and twenty years of
              troubleshooting instinct.
            </p>
            <ul className="mt-6 space-y-2 border-t border-border pt-6 text-sm text-cream/90">
              <li className="flex gap-2">
                <span className="text-accent" aria-hidden>
                  →
                </span>
                User-centered products, not throwaway scripts
              </li>
              <li className="flex gap-2">
                <span className="text-accent" aria-hidden>
                  →
                </span>
                Design background + support depth
              </li>
              <li className="flex gap-2">
                <span className="text-accent" aria-hidden>
                  →
                </span>
                Google UX Design coursework (in progress)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="work" className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Selected work
          </p>
          <h2 className="mt-3 font-display text-3xl text-cream md:text-4xl">
            What I&apos;m building
          </h2>
          <p className="mt-4 text-muted">
            Active builds wired to their GitHub repos. Case studies and demos
            land here as they ship — no filler metrics.
          </p>
        </div>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <li
              key={project.id}
              className="group relative flex min-h-[280px] flex-col justify-between rounded-2xl border border-border bg-surface p-8 transition hover:border-accent/30 hover:bg-surface-elevated"
            >
              <div>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                    project.status === 'in-development'
                      ? 'border-teal/40 bg-teal/10 text-teal'
                      : 'border-border bg-ink text-muted'
                  }`}
                >
                  {projectStatusLabel(project.status)}
                </span>
                <h3 className="mt-5 font-display text-2xl text-cream">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{project.category}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border bg-ink/60 px-2 py-0.5 text-xs text-cream/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-accent-soft transition hover:text-accent"
                  >
                    View repository →
                  </a>
                ) : null}
                <span className="text-sm text-muted/80">
                  Case study — coming soon
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Toolkit
        </p>
        <h2 className="mt-3 font-display text-3xl text-cream md:text-4xl">
          Skills across the stack
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-border bg-surface p-8"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-teal">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-dashed border-border p-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cream">
            Certifications &amp; learning
          </h3>
          <ul className="mt-4 grid gap-2 text-sm text-muted md:grid-cols-2">
            {certifications.map((cert) => (
              <li key={cert} className="flex gap-2">
                <span className="text-accent shrink-0" aria-hidden>
                  ·
                </span>
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section id="experience" className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Background
        </p>
        <h2 className="mt-3 font-display text-3xl text-cream md:text-4xl">
          Experience that compounds
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Technical support specialist and former graphic designer with 20+
          years diagnosing systems and mentoring teams — now pointed at AI
          automation and product builds.
        </p>
        <ol className="mt-14 space-y-10">
          {experience.map((job) => (
            <li
              key={job.role + job.org}
              className="grid gap-4 border-l-2 border-border pl-8 md:grid-cols-[240px_1fr] md:gap-8 md:pl-10"
            >
              <div>
                <p className="text-sm font-medium text-cream">{job.period}</p>
                <p className="mt-1 text-sm text-muted">{job.org}</p>
              </div>
              <div>
                <h3 className="font-display text-xl text-cream">{job.role}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                  {job.highlights.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-accent shrink-0" aria-hidden>
                        ·
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="font-display text-3xl text-cream md:text-4xl">
          Let&apos;s build something useful
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          AI lab portfolio at{' '}
          <a
            href={site.url}
            className="text-accent-soft underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
          >
            {site.url.replace('https://', '')}
          </a>
          . Main site:{' '}
          <a
            href={site.mainSiteUrl}
            className="text-accent-soft underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
          >
            {site.mainSiteUrl.replace('https://', '')}
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={site.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-ink transition hover:bg-accent-soft"
          >
            GitHub profile
          </a>
          <a
            href={site.resumePdf}
            download
            className="rounded-full border border-border px-8 py-3 text-sm font-semibold text-cream transition hover:border-muted"
          >
            Download resume (PDF)
          </a>
        </div>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted md:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. {site.tagline}
        </p>
        <nav className="flex flex-wrap justify-center gap-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-cream">
              {link.label}
            </a>
          ))}
          <a
            href={site.deployRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cream"
          >
            Source
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-cream">
      <SiteHeader />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <ExperienceSection />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}
