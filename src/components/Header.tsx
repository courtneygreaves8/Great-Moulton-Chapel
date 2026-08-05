import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '#welcome', label: 'Welcome' },
  { href: '#meetings', label: 'Meetings' },
  { href: '#events', label: 'Events' },
  { href: '#opening-times', label: 'Times' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled || open ? 'bg-background/95 shadow-sm backdrop-blur-md' : 'bg-background',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-lg focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="content-width flex items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-12">
        <a
          href="#top"
          className="font-display text-2xl tracking-wide text-foreground sm:text-3xl"
          onClick={() => setOpen(false)}
        >
          Great Moulton Chapel
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          'border-t border-border bg-background lg:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <nav className="content-width flex flex-col gap-2 px-5 py-6 sm:px-8" aria-label="Mobile">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-2xl px-4 py-4 text-xl font-semibold text-foreground transition-colors hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button asChild className="mt-2 w-full" size="lg">
            <a href="#contact" onClick={() => setOpen(false)}>
              Get in touch
            </a>
          </Button>
        </nav>
      </div>
    </header>
  )
}
