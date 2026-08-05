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

type LoadPhase = 'loading' | 'exiting' | 'done'

function App() {
  const [phase, setPhase] = useState<LoadPhase>(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'done'
      : 'loading',
  )

  const finishLoader = useCallback(() => {
    setPhase('done')
  }, [])

  useEffect(() => {
    if (phase !== 'loading') return

    document.body.style.overflow = 'hidden'
    const exitTimer = window.setTimeout(() => setPhase('exiting'), 2200)

    return () => {
      window.clearTimeout(exitTimer)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'done') {
      document.body.style.overflow = ''
    }
  }, [phase])

  const introReady = phase === 'exiting' || phase === 'done'

  return (
    <>
      {phase !== 'done' && (
        <WelcomeLoader
          exiting={phase === 'exiting'}
          onExitComplete={finishLoader}
        />
      )}

      <div className="min-h-svh">
        <Header />
        <main id="main" className="flex flex-col">
          <div className="order-1">
            <Hero introReady={introReady} />
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

      <MadeByBabe />
    </>
  )
}

export default App
