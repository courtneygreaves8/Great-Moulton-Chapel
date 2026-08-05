import { Contact } from '@/components/Contact'
import { Events } from '@/components/Events'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { MadeByBabe } from '@/components/MadeByBabe'
import { Meetings } from '@/components/Meetings'
import { OpeningTimes } from '@/components/OpeningTimes'
import { Welcome } from '@/components/Welcome'

function App() {
  return (
    <div className="min-h-svh">
      <Header />
      <main id="main" className="flex flex-col">
        <div className="order-1">
          <Hero />
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
      <MadeByBabe />
    </div>
  )
}

export default App
