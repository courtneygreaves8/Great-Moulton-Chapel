import { useEffect } from 'react'
import welcomeSign from '@/assets/welcome-sign.png'
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
        'fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background',
        exiting ? 'loader-exit' : 'loader-enter',
      )}
      role="status"
      aria-live="polite"
      aria-label="Welcome to Great Moulton"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 55% at 50% 45%, color-mix(in srgb, var(--linen) 55%, transparent), transparent 65%), radial-gradient(ellipse 50% 40% at 15% 85%, color-mix(in srgb, var(--beige) 35%, transparent), transparent 55%), radial-gradient(ellipse 45% 35% at 90% 15%, color-mix(in srgb, var(--sage) 18%, transparent), transparent 50%)',
        }}
      />

      <div className="loader-sign relative px-6">
        <img
          src={welcomeSign}
          alt="Welcome to Great Moulton — a fine village"
          className="mx-auto h-auto w-[min(78vw,22rem)] drop-shadow-[0_24px_48px_rgba(100,93,86,0.22)] sm:w-[min(70vw,26rem)]"
        />
      </div>
    </div>
  )
}
