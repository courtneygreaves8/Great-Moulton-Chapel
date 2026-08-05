import { useEffect, useRef } from 'react'
import welcomeStrokeUrl from '@/assets/welcome-to-stroke.svg?url'

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
        const length = path.getTotalLength()
        path.style.stroke = 'currentColor'
        path.style.fill = 'transparent'
        path.style.strokeWidth = '2.4'
        path.style.strokeLinecap = 'round'
        path.style.strokeLinejoin = 'round'
        path.style.strokeDasharray = `${length}`
        path.style.strokeDashoffset = `${length}`
      }

      if (reduced) {
        for (const path of paths) {
          path.style.strokeDashoffset = '0'
          path.style.fill = 'currentColor'
          path.style.strokeWidth = '0'
        }
        return
      }

      const perGlyph = 165
      const fillDelay = paths.length * perGlyph + 120

      paths.forEach((path, index) => {
        path.animate(
          [
            { strokeDashoffset: path.getTotalLength() },
            { strokeDashoffset: 0 },
          ],
          {
            duration: 420,
            delay: 180 + index * perGlyph,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards',
          },
        )

        path.animate(
          [
            { fill: 'transparent', strokeWidth: 2.4 },
            { fill: 'currentColor', strokeWidth: 0.4 },
          ],
          {
            duration: 380,
            delay: fillDelay + index * 40,
            easing: 'ease-out',
            fill: 'forwards',
          },
        )
      })
    }

    void run()

    return () => {
      cancelled = true
      if (host) host.innerHTML = ''
    }
  }, [])

  return (
    <div
      ref={hostRef}
      className={className}
      aria-hidden={false}
    />
  )
}
