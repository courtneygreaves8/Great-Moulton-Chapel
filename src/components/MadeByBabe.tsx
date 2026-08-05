import { useEffect, useId, useState } from 'react'
import { ArrowUpRight, Heart, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const BABE_URL = 'https://beblessed.io'

/**
 * Fixed vertical credit tab — right edge, vertically centered.
 * Opens a short note about Babe’s gift of the site.
 */
export function MadeByBabe() {
  const [open, setOpen] = useState(false)
  const titleId = useId()
  const descId = useId()
  const isEmbed =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('embed')

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  if (isEmbed) return null

  return (
    <>
      <aside className="pointer-events-none fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 sm:block">
        <div className="pointer-events-auto origin-center translate-x-[calc(50%-0.85rem)] -rotate-90">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-t-2xl border border-border bg-card px-5 py-2.5 font-sans text-sm font-medium text-foreground shadow-[0_10px_28px_-14px_rgba(100,93,86,0.35)] transition hover:bg-beige-soft"
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            <span>Made with ❤️ by</span>
            <span className="font-display text-xl leading-none tracking-wide">
              BABE
            </span>
          </button>
        </div>
      </aside>

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-5 sm:p-8"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-primary/55 backdrop-blur-[2px]"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className={cn(
              'relative z-10 w-full max-w-md overflow-hidden rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_28px_60px_-24px_rgba(100,93,86,0.45)] sm:p-8',
            )}
          >
            <div
              className="pointer-events-none absolute -top-10 -right-8 size-32 rounded-full bg-sage-soft blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-12 -left-10 size-28 rounded-full bg-beige-soft blur-2xl"
              aria-hidden
            />

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-beige-soft hover:text-foreground"
              aria-label="Close dialog"
            >
              <X className="size-4" strokeWidth={2} />
            </button>

            <div className="relative">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-sage-soft text-foreground">
                <Heart className="size-5" strokeWidth={1.75} fill="currentColor" />
              </span>
              <h2
                id={titleId}
                className="mt-4 font-display text-4xl tracking-wide text-foreground sm:text-5xl"
              >
                Made by Babe
              </h2>
              <p
                id={descId}
                className="mt-3 text-base leading-relaxed text-foreground/85"
              >
                This website was designed and built <strong>for free</strong> by{' '}
                <strong>Babe</strong> — pouring creativity, craft, and care into
                Great Moulton Chapel.
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Offered as a gift so this friendly village chapel can welcome
                neighbours online with the same warmth you’ll find on a Sunday
                morning.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button className="w-full sm:w-auto" asChild>
                  <a
                    href={BABE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit beblessed.io
                    <ArrowUpRight className="size-4" strokeWidth={2} />
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full sm:w-auto"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
