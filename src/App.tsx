import { useCallback, useEffect, useState } from 'react'
import { Contact } from '@/components/Contact'
import { Events } from '@/components/Events'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { MadeByBabe } from '@/components/MadeByBabe'
import { Meetings } from '@/components/Meetings'
import { OpeningTimes } from '@/components/OpeningTimes'
import { Welcome } from '@/components/Welcome'
import { WelcomeLoader } from '@/components/WelcomeLoader'
import { cn } from '@/lib/utils'

type LoadPhase = 'loading' | 'revealing' | 'done'

const COPY_DELAY_MS = 120
const MEDIA_DELAY_MS = 320

function App() {
  const [phase, setPhase] = useState<LoadPhase>(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'done'
      : 'loading',
  )
  const [titleReady, setTitleReady] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [titleSettled, setTitleSettled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [copyReady, setCopyReady] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [mediaReady, setMediaReady] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const handleBrandAppear = useCallback(() => {
    setPhase('revealing')
    setTitleReady(true)
  }, [])

  const handleHeadingSettled = useCallback(() => {
    setTitleSettled(true)
    window.setTimeout(() => setCopyReady(true), COPY_DELAY_MS)
    window.setTimeout(() => setMediaReady(true), MEDIA_DELAY_MS)
  }, [])

  const handleComplete = useCallback(() => {
    setPhase('done')
  }, [])

  useEffect(() => {
    document.getElementById('boot-loader')?.remove()
    document.documentElement.classList.remove('boot-loading')
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (phase === 'loading' || phase === 'revealing') {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)
      return
    }
    document.body.style.overflow = ''
  }, [phase])

  return (
    <>
      {phase !== 'done' && (
        <WelcomeLoader
          onBrandAppear={handleBrandAppear}
          onHeadingSettled={handleHeadingSettled}
          onComplete={handleComplete}
        />
      )}

      <div
        className={cn(
          'min-h-svh',
          // Keep layout measurable, but hide chrome until the shared heading appears
          phase === 'loading' && 'invisible',
        )}
        aria-hidden={phase === 'loading' || undefined}
      >
        <Header />
        <main id="main" className="flex flex-col">
          <div className="order-1">
            <Hero
              titleReady={titleReady}
              titleSettled={titleSettled}
              copyReady={copyReady}
              mediaReady={mediaReady}
            />
          </div>
          <div className="order-2 md:order-3">
            <Welcome />
          </div>
          <div className="order-3 md:order-2">
            <OpeningTimes />
          </div>
          <div className="order-4">
            <Meetings />
          </div>
          <div className="order-5">
            <Events />
          </div>
          <div className="order-6">
            <Contact />
          </div>
        </main>
        <Footer />
      </div>

      {phase !== 'loading' ? <MadeByBabe /> : null}
    </>
  )
}

export default App
