import { Link } from 'react-router-dom'
import { about, whyWorkWithMe } from '../data/content'
import { hobbyGroups, hobbiesIntro } from '../data/hobbies'
import { Avatar, PageEyebrow, PageLead, PageTitle, WhyWorkFooter } from '../components/aivor/AivorShell'

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl py-4 lg:py-8">
      <PageEyebrow>{about.eyebrow}</PageEyebrow>
      <PageTitle>{about.title}</PageTitle>
      <PageLead>{about.lead}</PageLead>

      <section className="mt-8 max-w-2xl rounded-2xl border border-line bg-surface p-6 md:p-8">
        <PageEyebrow>Who I am</PageEyebrow>
        <div className="mt-4 space-y-4">
          {about.personalStory.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-relaxed text-ink md:text-[1.05rem] md:leading-[1.75]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="grid md:grid-cols-[240px_1fr]">
          <div className="flex items-center justify-center bg-surface-muted p-10">
            <Avatar size="lg" />
          </div>
          <div className="p-8">
            <div className="flex items-center gap-2 text-accent">
              <span className="text-lg">✦</span>
              <h2 className="font-display text-2xl text-ink">How I work</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{about.howIWork}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-surface p-8">
        <h2 className="font-display text-2xl text-ink">Education</h2>
        <div className="mt-6 space-y-6">
          {about.education.map((item) => (
            <div key={item.program}>
              <p className="text-sm font-medium text-ink">{item.program}</p>
              <p className="mt-1 text-xs text-muted">{item.school}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <section id="hobbies" className="mt-16 scroll-mt-8">
        <PageEyebrow>{hobbiesIntro.eyebrow}</PageEyebrow>
        <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-ink">
          {hobbiesIntro.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{hobbiesIntro.lead}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted/90 italic">
          {hobbiesIntro.note}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {hobbyGroups.map((group) => (
            <span
              key={group.id}
              className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted"
            >
              {group.title}
            </span>
          ))}
        </div>

        <div className="mt-10 space-y-14">
          {hobbyGroups.map((group) => (
            <div key={group.id}>
              <h3 className="font-display text-2xl text-ink">{group.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                {group.description}
              </p>
              {group.highlights ? (
                <ul className="mt-4 space-y-2 rounded-2xl border border-line bg-surface p-6">
                  {group.highlights.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted">
                      <span className="text-accent shrink-0" aria-hidden>
                        ·
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {group.projects && group.projects.length > 0 ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {group.projects.map((project) => (
                  <figure
                    key={project.id}
                    className="overflow-hidden rounded-2xl border border-line bg-surface"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-surface-muted">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <figcaption className="p-4">
                      <p className="text-sm font-medium text-ink">{project.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        {project.description}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section id="why-work-with-me" className="mt-16 scroll-mt-8">
        <PageEyebrow>Why work with me</PageEyebrow>
        <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-ink">
          {whyWorkWithMe.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{whyWorkWithMe.lead}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {whyWorkWithMe.items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-display text-xl text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>
        <Link
          to="/projects"
          className="mt-8 inline-flex text-sm font-medium text-ink underline decoration-line underline-offset-4"
        >
          View selected projects →
        </Link>
      </section>

      <WhyWorkFooter />
    </div>
  )
}
