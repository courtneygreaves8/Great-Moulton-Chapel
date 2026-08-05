import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import eventChristmas from '@/assets/event-christmas.png'
import eventTea from '@/assets/event-tea.png'
import eventWorship from '@/assets/event-worship.png'
import { EventCalendar } from '@/components/EventCalendar'
import { BrandDialog } from '@/components/ui/brand-dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type EventKey = 'worship' | 'coffee' | 'seasonal'

const events: {
  key: EventKey
  date: string
  title: string
  body: string
  image: string
  alt: string
}[] = [
  {
    key: 'worship',
    date: 'Sunday services',
    title: 'Weekly worship together',
    body: 'Join us each Sunday morning for worship, prayer, and a short message. Stay afterwards for a warm drink and conversation.',
    image: eventWorship,
    alt: 'Watercolor illustration of hands raised in worship in a chapel',
  },
  {
    key: 'coffee',
    date: 'Wednesday mornings',
    title: 'Village coffee & fellowship',
    body: 'Open to everyone in the village — a gentle midweek pause for tea, coffee, and good company.',
    image: eventTea,
    alt: 'Watercolor illustration of a welcoming tea set on a wooden table',
  },
  {
    key: 'seasonal',
    date: 'Coming soon',
    title: 'Seasonal gatherings',
    body: 'Look out for harvest, Christmas, and other special services through the year — warm gatherings for the whole village to share.',
    image: eventChristmas,
    alt: 'Watercolor illustration of a simple Christmas candle, evergreen sprig, and ribbon',
  },
]

export function Events() {
  const [active, setActive] = useState<EventKey | null>(null)

  return (
    <section id="events" className="section-pad" aria-labelledby="events-heading">
      <div className="content-width">
        <div className="max-w-2xl">
          <p className="eyebrow">What’s on</p>
          <h2 id="events-heading" className="mt-3 text-5xl sm:text-6xl md:text-7xl">
            News &amp; events
          </h2>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
            From Sunday worship to midweek coffee and seasonal celebrations —
            here’s what you can join in with at the chapel.
          </p>
        </div>

        <div className="mt-12 space-y-5">
          {events.map((event) => (
            <button
              key={event.key}
              type="button"
              onClick={() => setActive(event.key)}
              className={cn(
                'group grid w-full overflow-hidden rounded-[2rem] bg-card text-left shadow-[0_1px_0_rgba(100,93,86,0.06)] transition-all duration-300',
                'hover:-translate-y-0.5 hover:bg-beige-soft/50',
                'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/35',
                'sm:grid-cols-[12rem_1fr_auto] sm:rounded-[2.25rem]',
              )}
            >
              <img
                src={event.image}
                alt=""
                className="aspect-[4/3] w-full object-cover object-center sm:aspect-auto sm:h-full"
              />
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <p className="eyebrow !tracking-[0.14em]">{event.date}</p>
                <h3 className="mt-2 text-3xl transition-colors duration-300 group-hover:text-sage-deep sm:text-4xl">
                  {event.title}
                </h3>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {event.body}
                </p>
              </div>
              <div className="flex items-end justify-end p-6 pt-0 sm:items-center sm:p-8">
                <span
                  className="flex size-12 items-center justify-center rounded-full bg-sage-soft text-foreground transition-colors duration-300 group-hover:bg-sage/35"
                  aria-hidden="true"
                >
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
              <span className="sr-only">Open details for {event.title}</span>
            </button>
          ))}
        </div>
      </div>

      <BrandDialog
        open={active === 'worship'}
        onClose={() => setActive(null)}
        title="Sunday services"
        description="You’re warmly welcome — just come along on Sunday morning. There’s no need to know anyone first, and no special clothes required."
      >
        <div className="space-y-5">
          <p className="text-lg leading-relaxed text-foreground/90">
            Services begin at <strong>10:30am</strong>. Stay afterwards for a
            drink and a chat if you’d like — or slip away quietly whenever you
            need to.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            If you’d feel more comfortable messaging ahead, please do. We’re
            happy to arrange for someone to greet you at the door and help you
            settle in.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="#contact" onClick={() => setActive(null)}>
                Message ahead
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => setActive(null)}
            >
              Close
            </Button>
          </div>
        </div>
      </BrandDialog>

      <BrandDialog
        open={active === 'coffee'}
        onClose={() => setActive(null)}
        title="Village coffee morning"
        description="You’re warmly invited every Wednesday — whether it’s your first visit or you’re already part of the circle."
      >
        <div className="space-y-5">
          <p className="text-lg leading-relaxed text-foreground/90">
            We gather from <strong>10:30am</strong> for tea, coffee, and a
            little something to eat. It’s a gentle midweek pause — time to
            chat with neighbours and feel at home.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            If you’d like to message ahead, we’d love to hear from you. Let us
            know you’re coming and we’ll make sure someone is there to welcome
            you.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="#contact" onClick={() => setActive(null)}>
                Message ahead
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => setActive(null)}
            >
              Close
            </Button>
          </div>
        </div>
      </BrandDialog>

      <BrandDialog
        open={active === 'seasonal'}
        onClose={() => setActive(null)}
        title="Seasonal gatherings"
        description="Special services and village celebrations through the year — harvest, Christmas, and more."
        size="xl"
      >
        <EventCalendar />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#contact" onClick={() => setActive(null)}>
              Ask about events
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => setActive(null)}
          >
            Close
          </Button>
        </div>
      </BrandDialog>
    </section>
  )
}
