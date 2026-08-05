import { Contact } from '@/components/Contact'
import { Events } from '@/components/Events'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { MadeByBabe } from '@/components/MadeByBabe'
import { Meetings } from '@/components/Meetings'
import { Welcome } from '@/components/Welcome'

function App() {
  return (
    <div className="min-h-svh">
      <Header />
      <main id="main">
        <Hero />
        <Welcome />
        <Meetings />
        <Events />
        <Contact />
      </main>
      <Footer />
      <MadeByBabe />
    </div>
  )
}

export default App
