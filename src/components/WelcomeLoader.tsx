import { useEffect } from 'react'
import { WelcomeStrokeText } from '@/components/WelcomeStrokeText'
import { cn } from '@/lib/utils'

type WelcomeLoaderProps = {
  exiting?: boolean
  onExitComplete?: () => void
}

export function WelcomeLoader({ exiting = false, onExitComplete }: WelcomeLoaderProps) {
  useEffect(() => {
    if (!exiting || !onExitComplete) return
    const doneTimer = window.setTimeout(onExitComplete, 900)
    return () => window.clearTimeout(doneTimer)
  }, [exiting, onExitComplete])

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center overflow-hidden',
        exiting ? 'loader-exit' : 'loader-enter',
      )}
      style={{
        background:
          'linear-gradient(160deg, color-mix(in srgb, var(--sage) 55%, var(--linen)) 0%, color-mix(in srgb, var(--beige) 45%, white) 45%, var(--linen-soft) 100%)',
      }}
      role="status"
      aria-live="polite"
      aria-label="Welcome to Great Moulton Chapel"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 50% at 50% 40%, color-mix(in srgb, white 40%, transparent), transparent 70%)',
        }}
      />

      <WelcomeStrokeText className="relative w-[min(90vw,40rem)]" />
    </div>
  )
}
