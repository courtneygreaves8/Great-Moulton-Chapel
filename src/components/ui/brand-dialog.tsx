import { useEffect, useId, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type BrandDialogProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  className?: string
  size?: 'md' | 'lg' | 'xl'
}

export function BrandDialog({
  open,
  onClose,
  title,
  description,
  children,
  className,
  size = 'md',
}: BrandDialogProps) {
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center sm:p-8"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-primary/55 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className={cn(
          'relative z-10 max-h-[90svh] w-full overflow-y-auto rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_28px_60px_-24px_rgba(100,93,86,0.45)] sm:p-8',
          size === 'md' && 'max-w-lg',
          size === 'lg' && 'max-w-2xl',
          size === 'xl' && 'max-w-6xl',
          className,
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
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex size-12 items-center justify-center rounded-full text-muted-foreground transition hover:bg-beige-soft hover:text-foreground"
          aria-label="Close dialog"
        >
          <X className="size-5" strokeWidth={2} />
        </button>

        <div className="relative">
          <h2
            id={titleId}
            className="pr-12 font-display text-4xl tracking-wide text-foreground sm:text-5xl"
          >
            {title}
          </h2>
          {description ? (
            <p
              id={descId}
              className="mt-4 text-lg leading-relaxed text-muted-foreground"
            >
              {description}
            </p>
          ) : null}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
