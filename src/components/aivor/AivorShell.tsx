import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { site } from '../../data/content'
import {
  IconAbout,
  IconContact,
  IconDownload,
  IconExperience,
  IconHome,
  IconProjects,
} from './icons'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { to: '/', label: 'New exploration', icon: IconHome, end: true as const },
  { to: '/projects', label: 'Projects', icon: IconProjects, end: false as const },
  { to: '/experience', label: 'Experience', icon: IconExperience, end: false as const },
  { to: '/about', label: 'About', icon: IconAbout, end: false as const },
  { to: '/contact', label: 'Contact', icon: IconContact, end: false as const },
] as const

function Avatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-16 w-16 text-xl',
    lg: 'h-20 w-20 text-2xl',
  }
  return (
    <div
      className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-full bg-surface-muted font-display text-avatar-fg`}
      aria-hidden
    >
      {site.firstName[0]}
    </div>
  )
}

export function AivorShell() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Mobile header */}
      <header className="flex items-center justify-between border-b border-line px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <Avatar size="sm" />
          <div>
            <p className="font-display text-base leading-none">{site.name}</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
              {site.role}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle compact />
          <NavLink to="/contact" className="text-sm text-muted hover:text-ink">
            Contact
          </NavLink>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-57px)] lg:min-h-screen">
        {/* Icon sidebar — AIVOR desktop nav */}
        <aside className="hidden w-[72px] shrink-0 flex-col border-r border-line lg:flex">
          <nav className="flex flex-1 flex-col items-center gap-1 px-3 py-5">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                title={label}
                className={({ isActive }) =>
                  `flex h-10 w-10 items-center justify-center rounded-lg transition ${
                    isActive
                      ? 'bg-surface text-ink shadow-sm ring-1 ring-line'
                      : 'text-muted hover:bg-surface/70 hover:text-ink'
                  }`
                }
              >
                <Icon />
              </NavLink>
            ))}
          </nav>
          <div className="flex flex-col items-center gap-3 border-t border-line px-3 py-5">
            <ThemeToggle compact />
            <NavLink
              to="/cv"
              title="Download CV"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition hover:bg-surface/70 hover:text-ink"
            >
              <IconDownload />
            </NavLink>
            <Avatar size="sm" />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar — subpages only on desktop; home has minimal top */}
          {!isHome ? (
            <div className="hidden items-center justify-end gap-3 px-8 py-5 lg:flex">
              <ThemeToggle />
              <span className="text-sm text-muted">{site.roleShort}</span>
              <NavLink to="/contact" className="text-sm font-medium text-ink hover:opacity-70">
                Contact me
              </NavLink>
            </div>
          ) : (
            <div className="hidden items-center justify-end gap-3 px-8 py-5 lg:flex">
              <ThemeToggle />
              <span className="text-sm text-muted">{site.roleShort}</span>
              <NavLink to="/contact" className="text-sm font-medium text-ink hover:opacity-70">
                Contact me
              </NavLink>
            </div>
          )}

          <main className="flex-1 px-4 pb-16 pt-2 md:px-8 lg:px-12">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-canvas/95 backdrop-blur lg:hidden">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-2 text-[10px] ${
                isActive ? 'text-ink' : 'text-muted'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            <span className="truncate px-1">{label.split(' ')[0]}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export function PageEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">{children}</p>
  )
}

export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-ink">
      {children}
    </h1>
  )
}

export function PageLead({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{children}</p>
}

export function WhyWorkFooter() {
  return (
    <div className="mt-16 border-t border-line pt-8">
      <NavLink
        to="/about#why-work-with-me"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:opacity-70"
      >
        Why work with me →
      </NavLink>
    </div>
  )
}

export { Avatar }
