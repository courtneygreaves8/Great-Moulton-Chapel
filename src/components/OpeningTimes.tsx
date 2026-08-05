import { Church, Coffee, type LucideIcon, MessageCircle } from 'lucide-react'
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

export function OpeningTimes() {
  return (
    <section
      id="opening-times"
      className="section-pad !pt-10 !pb-24 sm:!pt-16 sm:!pb-12"
      aria-label="Opening times"
    >
      <div className="content-width">
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {openingCards.map((card) => {
            const Icon = card.icon
            return (
              <article
                key={card.title}
                className={cn(
                  'flex min-h-44 flex-col justify-between rounded-[2rem] p-6 sm:min-h-56 sm:rounded-[2.25rem] sm:p-8',
                  card.tone === 'soft' &&
                    'bg-card text-foreground shadow-[0_1px_0_rgba(100,93,86,0.06)]',
                  card.tone === 'sage' && 'bg-sage-soft text-foreground',
                  card.tone === 'dark' && 'bg-primary text-primary-foreground',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <p
                    className={cn(
                      'text-sm font-bold uppercase tracking-[0.16em]',
                      card.tone === 'dark'
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground',
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
                  <p className="font-display text-4xl leading-none tracking-wide sm:text-6xl md:text-7xl">
                    {card.time}
                  </p>
                  <p
                    className={cn(
                      'mt-3 flex items-center gap-2.5 text-base font-semibold sm:text-lg',
                      card.tone === 'dark'
                        ? 'text-primary-foreground/80'
                        : 'text-muted-foreground',
                    )}
                  >
                    <Icon className="size-5 shrink-0" aria-hidden="true" strokeWidth={2} />
                    {card.detail}
                  </p>
                </div>

              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
