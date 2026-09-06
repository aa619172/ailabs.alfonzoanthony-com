import { useCallback, useEffect, useState } from 'react'

type ZoomableProjectImageProps = {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
}

const MIN_ZOOM = 0.5
const MAX_ZOOM = 3
const ZOOM_STEP = 0.25

export function ZoomableProjectImage({
  src,
  alt,
  className = 'w-full object-cover object-top',
  wrapperClassName = '',
}: ZoomableProjectImageProps) {
  const [open, setOpen] = useState(false)
  const [zoom, setZoom] = useState(1)

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
        setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)))
      }
      if (event.key === '-') {
        setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)))
      }
      if (event.key === '0') resetZoom()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, closeViewer, resetZoom])

  return (
    <>
      <button
        type="button"
        onClick={openViewer}
        className={`group relative block w-full cursor-zoom-in text-left ${wrapperClassName}`}
        aria-label={`Zoom ${alt}`}
      >
        <img src={src} alt={alt} className={className} loading="lazy" />
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-line bg-surface/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted backdrop-blur">
          ↗ Zoom
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} viewer`}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-zoom-out"
            aria-label="Close image viewer"
            onClick={closeViewer}
          />

          <div className="relative z-10 flex max-h-full max-w-full flex-col items-center gap-3">
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
              className="max-h-[calc(100vh-8rem)] max-w-[min(100vw-2rem,72rem)] overflow-auto rounded-xl border border-line bg-screenshot"
              onWheel={(event) => {
                event.preventDefault()
                if (event.deltaY < 0) zoomIn()
                else zoomOut()
              }}
            >
              <img
                src={src}
                alt={alt}
                draggable={false}
                className="max-h-[calc(100vh-8rem)] w-auto max-w-full origin-center transition-transform duration-150"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>

            <p className="text-xs text-white/70">+ / − to zoom · Esc to close · Scroll to zoom</p>
          </div>
        </div>
      ) : null}
    </>
  )
}
