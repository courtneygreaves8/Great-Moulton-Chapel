import { useEffect, useRef } from 'react'
import welcomeStrokeUrl from '@/assets/welcome-to-stroke.svg?url'
import { cn } from '@/lib/utils'

type WelcomeStrokeTextProps = {
  className?: string
}

export function WelcomeStrokeText({ className }: WelcomeStrokeTextProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let cancelled = false
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timers: number[] = []

    async function run() {
      const response = await fetch(welcomeStrokeUrl)
      const markup = await response.text()
      if (cancelled || !host) return

      host.innerHTML = markup
      const svg = host.querySelector('svg')
      const paths = Array.from(host.querySelectorAll<SVGPathElement>('.welcome-glyph'))
      if (!svg || !paths.length) return

      svg.setAttribute('class', 'welcome-stroke-svg')
      svg.setAttribute('role', 'img')
      svg.setAttribute('aria-label', 'Welcome to')

      for (const path of paths) {
        const length = Math.max(path.getTotalLength(), 1)
        path.style.strokeDasharray = `${length}`
        path.style.strokeDashoffset = `${length}`
      }

      if (reduced) {
        for (const path of paths) {
          path.style.strokeDashoffset = '0'
        }
        return
      }

      // Letter-by-letter stroke write — stays as outline (no fill)
      const perGlyph = 120

      paths.forEach((path, index) => {
        const delay = 140 + index * perGlyph
        timers.push(
          window.setTimeout(() => {
            path.classList.add('welcome-glyph-drawing')
          }, delay),
        )
      })
    }

    void run()

    return () => {
      cancelled = true
      for (const timer of timers) window.clearTimeout(timer)
      if (host) host.innerHTML = ''
    }
  }, [])

  return <div ref={hostRef} className={cn('welcome-stroke-host text-primary', className)} />
}
