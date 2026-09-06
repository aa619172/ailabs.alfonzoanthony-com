import { useEffect, useRef, useState } from 'react'
import { type ThemePreference, useTheme } from '../../theme/ThemeProvider'
import { IconMonitor, IconMoon, IconSun } from './icons'

const options: { value: ThemePreference; label: string; icon: typeof IconSun }[] = [
  { value: 'light', label: 'Light', icon: IconSun },
  { value: 'dark', label: 'Dark', icon: IconMoon },
  { value: 'system', label: 'System', icon: IconMonitor },
]

type ThemeToggleProps = {
  compact?: boolean
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const active = options.find((o) => o.value === theme) ?? options[1]
  const ActiveIcon = active.icon

  useEffect(() => {
    if (!open) return

    function handlePointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title="Theme"
        aria-label="Theme options"
        aria-expanded={open}
        aria-haspopup="listbox"
        className={
          compact
            ? 'flex h-10 w-10 items-center justify-center rounded-lg text-muted transition hover:bg-surface/70 hover:text-ink'
            : 'inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted transition hover:bg-surface/70 hover:text-ink'
        }
      >
        <ActiveIcon className="h-4 w-4" />
        {!compact ? <span className="hidden xl:inline">{active.label}</span> : null}
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label="Theme"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-36 -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-surface p-1 shadow-lg lg:bottom-auto lg:left-auto lg:right-0 lg:top-full lg:mb-0 lg:mt-2 lg:translate-x-0"
        >
          {options.map(({ value, label, icon: Icon }) => {
            const selected = theme === value
            return (
              <button
                key={value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  setTheme(value)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
                  selected
                    ? 'bg-surface-muted text-ink'
                    : 'text-muted hover:bg-surface-muted/60 hover:text-ink'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
