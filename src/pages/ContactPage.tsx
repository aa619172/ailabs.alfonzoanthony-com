import { type FormEvent, useState } from 'react'
import { contact, site } from '../data/content'
import { PageEyebrow, PageLead, PageTitle, WhyWorkFooter } from '../components/aivor/AivorShell'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-4xl py-4 lg:py-8">
      <PageEyebrow>{contact.eyebrow}</PageEyebrow>
      <PageTitle>{contact.title}</PageTitle>
      <PageLead>{contact.lead}</PageLead>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          {[
            { label: 'Email', value: contact.emailNote },
            { label: 'Phone', value: contact.phoneNote },
            { label: 'Based in', value: contact.locationNote },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
                {item.label}
              </p>
              <p className="mt-1 text-sm text-ink">{item.value}</p>
            </div>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="inline-block text-sm font-medium text-ink underline decoration-line underline-offset-4"
          >
            {site.email}
          </a>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6">
          <h2 className="font-display text-xl text-ink">Start with a short brief</h2>
          {submitted ? (
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Thanks — your brief was captured locally. Email {site.email} to reach me directly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-xs font-medium text-muted">Name</span>
                <input
                  required
                  name="name"
                  placeholder="Your name"
                  className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-border-focus"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-border-focus"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted">Project brief</span>
                <textarea
                  required
                  name="brief"
                  rows={4}
                  placeholder="What do you want to build or improve?"
                  className="mt-1 w-full resize-none rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-border-focus"
                />
              </label>
              <p className="text-xs text-muted">{contact.formNote}</p>
              <button
                type="submit"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-fg transition hover:opacity-85"
              >
                Send project brief
              </button>
            </form>
          )}
        </div>
      </div>

      <WhyWorkFooter />
    </div>
  )
}
