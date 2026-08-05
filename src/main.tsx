import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

const navEntry = performance.getEntriesByType('navigation')[0] as
  | PerformanceNavigationTiming
  | undefined

if (navEntry?.type === 'reload') {
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }
  window.scrollTo(0, 0)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
