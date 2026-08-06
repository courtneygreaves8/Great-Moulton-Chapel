import { useEffect, useState } from 'react'
import { WelcomeStrokeText } from '@/components/WelcomeStrokeText'
import { cn } from '@/lib/utils'

type WelcomeLoaderProps = {
  /** Reveal page under the loader so the shared hero heading can be positioned */
  onBrandAppear?: () => void
  /** Heading has settled in the hero — fade loader bg and reveal copy/image */
  onHeadingSettled?: () => void
  onComplete?: () => void
}

const BRAND_ENTER_MS = 1550
const BRAND_HOLD_MS = 1000
const WELCOME_OUT_MS = 450
const BRAND_APPEAR_MS = 900
const BRAND_RISE_MS = 1400
const BG_FADE_MS = 1000

const SOFT_EASE = 'cubic-bezier(0.33, 0.1, 0.25, 1)'

let didIntroMotion = false

function clearBrandInline(brand: HTMLElement) {
  brand.style.position = ''
  brand.style.left = ''
  brand.style.top = ''
  brand.style.width = ''
  brand.style.margin = ''
  brand.style.zIndex = ''
  brand.style.transform = ''
  brand.style.opacity = ''
  brand.style.willChange = ''
  brand.style.animation = ''
  brand.style.textAlign = ''
}

export function WelcomeLoader({
  onBrandAppear,
  onHeadingSettled,
  onComplete,
}: WelcomeLoaderProps) {
  const [welcomeOut, setWelcomeOut] = useState(false)
  const [bgFading, setBgFading] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timers: number[] = []

    if (reduced) {
      onBrandAppear?.()
      onHeadingSettled?.()
      onComplete?.()
      return
    }

    if (didIntroMotion) return

    timers.push(
      window.setTimeout(() => {
        didIntroMotion = true
        void runBrandSequence()
      }, BRAND_ENTER_MS),
    )

    async function runBrandSequence() {
      const brand = document.getElementById('hero-brand')
      const anchor = document.getElementById('loader-brand-anchor')
      const slot = document.getElementById('hero-brand-slot')
      if (!brand || !anchor || !slot) {
        onBrandAppear?.()
        onHeadingSettled?.()
        onComplete?.()
        return
      }

      // Reveal page under the loader, then wait for React to drop `invisible`
      onBrandAppear?.()
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            window.setTimeout(resolve, 48)
          })
        })
      })

      // Measure the heading’s natural hero size first (same size throughout — no scale)
      clearBrandInline(brand)
      brand.style.opacity = '0'
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      )

      const natural = brand.getBoundingClientRect()
      const width = Math.max(natural.width, 1)
      const height = Math.max(natural.height, 1)
      slot.style.minHeight = `${height}px`

      const anchorRect = anchor.getBoundingClientRect()
      const startLeft = anchorRect.left + anchorRect.width / 2 - width / 2
      const startTop = anchorRect.top

      brand.style.position = 'fixed'
      brand.style.left = `${startLeft}px`
      brand.style.top = `${startTop}px`
      brand.style.width = `${width}px`
      brand.style.margin = '0'
      brand.style.zIndex = '110'
      brand.style.textAlign = 'center'
      brand.style.willChange = 'transform, opacity, left, top'
      brand.style.opacity = '0'
      brand.style.transform = 'translateY(28px)'

      // Soft appear under “Welcome to”
      await brand
        .animate(
          [
            { opacity: 0, transform: 'translateY(28px)' },
            { opacity: 1, transform: 'translateY(0px)' },
          ],
          { duration: BRAND_APPEAR_MS, easing: SOFT_EASE, fill: 'forwards' },
        )
        .finished.catch(() => undefined)

      brand.style.opacity = '1'
      brand.style.transform = 'translateY(0px)'

      // Hold, then fade welcome away
      await new Promise((resolve) => window.setTimeout(resolve, BRAND_HOLD_MS))
      setWelcomeOut(true)
      await new Promise((resolve) => window.setTimeout(resolve, WELCOME_OUT_MS))

      // Remeasure destination slot, glide up with no size change
      const slotRect = slot.getBoundingClientRect()
      const endLeft = slotRect.left + slotRect.width / 2 - width / 2
      const endTop = slotRect.top

      await brand
        .animate(
          [
            { left: `${startLeft}px`, top: `${startTop}px` },
            { left: `${endLeft}px`, top: `${endTop}px` },
          ],
          { duration: BRAND_RISE_MS, easing: SOFT_EASE, fill: 'forwards' },
        )
        .finished.catch(() => undefined)

      // Lock the heading at the hero position (still the same fixed element)
      brand.style.position = 'fixed'
      brand.style.left = `${endLeft}px`
      brand.style.top = `${endTop}px`
      brand.style.width = `${width}px`
      brand.style.margin = '0'
      brand.style.zIndex = '110'
      brand.style.textAlign = 'center'
      brand.style.transform = 'none'
      brand.style.opacity = '1'
      brand.getAnimations().forEach((animation) => {
        try {
          animation.commitStyles()
        } catch {
          // commitStyles can throw if the animation was already canceled
        }
        animation.cancel()
      })
      // Re-assert after commitStyles/cancel so nothing snaps away
      brand.style.position = 'fixed'
      brand.style.left = `${endLeft}px`
      brand.style.top = `${endTop}px`
      brand.style.width = `${width}px`
      brand.style.opacity = '1'
      brand.style.transform = 'none'

      onHeadingSettled?.()
      setBgFading(true)
      await new Promise((resolve) => window.setTimeout(resolve, BG_FADE_MS))

      // Seamless dock into document flow (FLIP invert — no visible blink)
      const visual = brand.getBoundingClientRect()
      slot.style.minHeight = ''
      clearBrandInline(brand)
      brand.style.opacity = '1'
      const laidOut = brand.getBoundingClientRect()
      const dx = visual.left - laidOut.left
      const dy = visual.top - laidOut.top
      if (dx !== 0 || dy !== 0) {
        brand.style.transform = `translate(${dx}px, ${dy}px)`
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        )
        brand.style.transition = 'none'
        brand.style.transform = ''
        void brand.offsetWidth
        brand.style.transition = ''
      }

      onComplete?.()
    }

    return () => {
      for (const timer of timers) window.clearTimeout(timer)
    }
  }, [onBrandAppear, onHeadingSettled, onComplete])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Welcome to Great Moulton Chapel"
    >
      <div
        className={cn('absolute inset-0', bgFading && 'loader-bg-exit')}
        style={{
          background:
            'linear-gradient(160deg, color-mix(in srgb, var(--sage) 55%, var(--linen)) 0%, color-mix(in srgb, var(--beige) 45%, white) 45%, var(--linen-soft) 100%)',
        }}
        aria-hidden
      />
      <div
        className={cn(
          'pointer-events-none absolute inset-0 opacity-50',
          bgFading && 'loader-bg-exit',
        )}
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 50% at 50% 40%, color-mix(in srgb, white 40%, transparent), transparent 70%)',
        }}
      />

      <div className="relative flex w-full max-w-3xl flex-col items-center px-5 text-center">
        <WelcomeStrokeText
          className={cn(
            'relative w-[min(45vw,calc(20rem-6px))]',
            welcomeOut && 'loader-welcome-exit',
          )}
        />
        {/* Anchor only — the real heading lives in the hero and moves here */}
        <div
          id="loader-brand-anchor"
          className="mt-6 w-full sm:mt-8"
          style={{ height: '5.6rem' }}
          aria-hidden
        />
      </div>
    </div>
  )
}
