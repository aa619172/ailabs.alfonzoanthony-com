import { useCallback, useEffect, useState } from 'react'
import { site } from '../../data/content'

type ZoomableProjectImageProps = {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
}

const MIN_ZOOM = 0.5
const MAX_ZOOM = 3
const ZOOM_STEP = 0.25
const PROTECTION_MARK = `${site.name} • ${site.url.replace('https://', '')}`

function useProtectionToast() {
  const [toast, setToast] = useState<string | null>(null)

  const notify = useCallback((message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 1800)
  }, [])

  return { toast, notify }
}

function blockProtectedAction(
  event: React.MouseEvent | React.DragEvent,
  notify: (message: string) => void,
  message = `Protected portfolio content • ${site.name}`,
) {
  event.preventDefault()
  event.stopPropagation()
  notify(message)
}

export function ZoomableProjectImage({
  src,
  alt,
  className = 'w-full object-cover object-top',
  wrapperClassName = '',
}: ZoomableProjectImageProps) {
  const [open, setOpen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const { toast, notify } = useProtectionToast()

  const resetZoom = useCallback(() => setZoom(1), [])

  const openViewer = () => {
    resetZoom()
    setOpen(true)
  }

  const closeViewer = useCallback(() => {
    setOpen(false)
    resetZoom()
  }, [resetZoom])

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)))
  const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)))

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeViewer()
      if (event.key === '+' || event.key === '=') {
        event.preventDefault()
        setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)))
      }
      if (event.key === '-') {
        event.preventDefault()
        setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)))
      }
      if (event.key === '0') {
        event.preventDefault()
        resetZoom()
      }
      if (event.key === 'PrintScreen') {
        document.body.classList.add('capture-alert')
        notify(`Capture deterrence active • ${site.name}`)
        window.setTimeout(() => document.body.classList.remove('capture-alert'), 1600)
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('capture-alert')
    }
  }, [open, closeViewer, resetZoom, notify])

  return (
    <>
      <button
        type="button"
        onClick={openViewer}
        onContextMenu={(event) => blockProtectedAction(event, notify)}
        onDragStart={(event) =>
          blockProtectedAction(event, notify, 'Image dragging is disabled on protected portfolio assets.')
        }
        className={`protected-image group relative block w-full cursor-zoom-in text-left ${wrapperClassName}`}
        aria-label={`Zoom ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          className={`protected-image ${className}`}
          loading="lazy"
          draggable={false}
          onContextMenu={(event) => blockProtectedAction(event, notify)}
          onDragStart={(event) =>
            blockProtectedAction(event, notify, 'Image dragging is disabled on protected portfolio assets.')
          }
        />
        <span className="pointer-events-none absolute bottom-3 right-3 z-[2] rounded-full border border-line bg-surface/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted backdrop-blur">
          ↗ Zoom
        </span>
      </button>

      {toast ? (
        <div className="protection-toast show" role="status" aria-live="polite">
          {toast}
        </div>
      ) : null}

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} viewer`}
          onContextMenu={(event) => blockProtectedAction(event, notify)}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-zoom-out"
            aria-label="Close image viewer"
            onClick={closeViewer}
          />

          <div className="relative z-10 flex max-h-full w-full max-w-[min(100vw-2rem,72rem)] flex-col items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 shadow-lg">
              <button
                type="button"
                onClick={zoomOut}
                className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-ink transition hover:bg-surface-muted"
                aria-label="Zoom out"
              >
                −
              </button>
              <span className="min-w-[3.5rem] text-center text-xs font-medium text-muted">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={zoomIn}
                className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-ink transition hover:bg-surface-muted"
                aria-label="Zoom in"
              >
                +
              </button>
              <button
                type="button"
                onClick={resetZoom}
                className="rounded-full px-3 py-1 text-xs font-medium text-muted transition hover:bg-surface-muted hover:text-ink"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={closeViewer}
                className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-ink transition hover:bg-surface-muted"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div
              className="image-viewer-scroll max-h-[calc(100vh-8rem)] w-full overflow-auto rounded-xl border border-line bg-screenshot"
              onWheel={(event) => {
                if (event.ctrlKey || event.metaKey) {
                  event.preventDefault()
                  if (event.deltaY < 0) zoomIn()
                  else zoomOut()
                }
              }}
              onContextMenu={(event) => blockProtectedAction(event, notify)}
            >
              <div
                className="relative inline-block min-w-full align-top"
                style={{ width: `${zoom * 100}%` }}
              >
                <img
                  src={src}
                  alt={alt}
                  draggable={false}
                  className="protected-image block w-full select-none"
                  onContextMenu={(event) => blockProtectedAction(event, notify)}
                  onDragStart={(event) =>
                    blockProtectedAction(
                      event,
                      notify,
                      'Image dragging is disabled on protected portfolio assets.',
                    )
                  }
                />
                <div className="image-viewer-watermark" aria-hidden>
                  {Array.from({ length: 12 }, (_, index) => (
                    <span key={index}>{PROTECTION_MARK}</span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-white/70">
              Scroll to pan when zoomed · Ctrl + scroll to zoom · Esc to close
            </p>
          </div>
        </div>
      ) : null}
    </>
  )
}
