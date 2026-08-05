import { ArrowUpRight, Church, Coffee, type LucideIcon, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import chapelIllustration from '@/assets/chapel-watercolor.png'
import { cn } from '@/lib/utils'

const openingCards: {
  title: string
  time: string
  detail: string
  tag: string
  tone: 'soft' | 'sage' | 'dark'
  icon: LucideIcon
}[] = [
  {
    title: 'Sunday',
    time: '10:30',
    detail: 'Morning service',
    tag: 'Worship',
    tone: 'soft',
    icon: Church,
  },
  {
    title: 'Wednesday',
    time: '10:30',
    detail: 'Coffee morning',
    tag: 'Open to all',
    tone: 'sage',
    icon: Coffee,
  },
  {
    title: 'Visit us',
    time: 'Anytime',
    detail: 'Just get in touch',
    tag: 'Welcome',
    tone: 'dark',
    icon: MessageCircle,
  },
]

export function Hero() {
  return (
    <section id="top" className="section-pad !pb-10 pt-[calc(7rem+24px)] sm:pt-[calc(8rem+24px)]" aria-label="Welcome">
      <div className="content-width">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="fade-up text-[clamp(3.25rem,10vw,6.75rem)] leading-[0.9]">
            Great Moulton Chapel
          </h1>
          <p className="fade-up-delay-1 mx-auto mt-6 max-w-xl text-xl leading-relaxed text-muted-foreground sm:mt-8 sm:text-2xl">
            A friendly village chapel — Sunday worship, midweek coffee, and a
            warm welcome for everyone.
          </p>
        </div>

        <div className="fade-up-delay-2 relative mt-10 sm:mt-12">
          <div className="overflow-hidden rounded-[2rem] bg-[color-mix(in_srgb,var(--linen-soft)_70%,#dfe8f0)] sm:rounded-[2.5rem]">
            <img
              src={chapelIllustration}
              alt="Watercolor illustration of Great Moulton Chapel"
              className="mx-auto h-auto w-full object-contain object-center"
            />
          </div>

          <a
            href="#events"
            className="absolute bottom-0 left-1/2 z-10 flex w-max max-w-[calc(100%-1.5rem)] -translate-x-1/2 translate-y-1/2 items-center gap-3 rounded-full bg-primary/90 py-2.5 pl-4 pr-2.5 text-primary-foreground shadow-sm backdrop-blur-sm transition-colors duration-300 hover:bg-primary sm:gap-4 sm:py-3 sm:pl-5 sm:pr-3"
          >
            <span className="rounded-full bg-sage-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-foreground">
              News
            </span>
            <p className="max-w-[16rem] text-sm font-semibold leading-snug sm:max-w-none sm:text-base">
              Coffee mornings every Wednesday at 10:30am — all welcome
            </p>
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-card text-foreground sm:size-12">
              <ArrowUpRight className="size-5" aria-hidden="true" />
              <span className="sr-only">See events</span>
            </span>
          </a>
        </div>

        <div
          id="opening-times"
          className="fade-up-delay-3 mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3 sm:gap-5"
        >
          {openingCards.map((card) => {
            const Icon = card.icon
            return (
            <article
              key={card.title}
              className={cn(
                'relative flex min-h-48 flex-col justify-between rounded-[2rem] p-7 sm:min-h-56 sm:rounded-[2.25rem] sm:p-8',
                card.tone === 'soft' && 'bg-card text-foreground shadow-[0_1px_0_rgba(100,93,86,0.06)]',
                card.tone === 'sage' && 'bg-sage-soft text-foreground',
                card.tone === 'dark' && 'bg-primary text-primary-foreground',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <p
                  className={cn(
                    'text-sm font-bold uppercase tracking-[0.16em]',
                    card.tone === 'dark' ? 'text-primary-foreground/70' : 'text-muted-foreground',
                  )}
                >
                  {card.title}
                </p>
                <span
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]',
                    card.tone === 'soft' && 'bg-beige-soft text-foreground',
                    card.tone === 'sage' && 'bg-card/80 text-foreground',
                    card.tone === 'dark' && 'bg-sage/85 text-primary-foreground',
                  )}
                >
                  {card.tag}
                </span>
              </div>

              <div>
                <p className="font-display text-6xl leading-none tracking-wide sm:text-7xl">
                  {card.time}
                </p>
                <p
                  className={cn(
                    'mt-3 flex items-center gap-2.5 text-lg font-semibold',
                    card.tone === 'dark' ? 'text-primary-foreground/80' : 'text-muted-foreground',
                  )}
                >
                  <Icon className="size-5 shrink-0" aria-hidden="true" strokeWidth={2} />
                  {card.detail}
                </p>
              </div>

              {card.tone === 'dark' && (
                <Button
                  asChild
                  size="icon"
                  className="absolute bottom-6 right-6 size-12 bg-card text-foreground hover:bg-beige-soft"
                  aria-label="Contact us"
                >
                  <a href="#contact">
                    <ArrowUpRight className="size-5" />
                  </a>
                </Button>
              )}
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
