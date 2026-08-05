import { ArrowUpRight } from 'lucide-react'
import eventChristmas from '@/assets/event-christmas.png'
import eventTea from '@/assets/event-tea.png'
import eventWorship from '@/assets/event-worship.png'

const events = [
  {
    date: 'Sunday services',
    title: 'Weekly worship together',
    body: 'Join us each Sunday morning for worship, prayer, and a short message. Stay afterwards for a warm drink and conversation.',
    image: eventWorship,
    href: '#meetings',
  },
  {
    date: 'Wednesday mornings',
    title: 'Village coffee & fellowship',
    body: 'Our coffee mornings are open to everyone in the community — church family or not. A gentle, friendly space to pause midweek.',
    image: eventTea,
    href: '#opening-times',
  },
  {
    date: 'Coming soon',
    title: 'Seasonal gatherings',
    body: 'Special services and village events are shared here as they’re planned — harvest, Christmas, and other moments through the year.',
    image: eventChristmas,
    href: '#contact',
  },
]

export function Events() {
  return (
    <section id="events" className="section-pad" aria-labelledby="events-heading">
      <div className="content-width">
        <div className="max-w-2xl">
          <p className="eyebrow">What’s on</p>
          <h2 id="events-heading" className="mt-3 text-5xl sm:text-6xl md:text-7xl">
            News &amp; events
          </h2>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
            A few notes from chapel life — kept short and easy to scan.
          </p>
        </div>

        <div className="mt-12 space-y-5">
          {events.map((event) => (
            <a
              key={event.title}
              href={event.href}
              className="group grid overflow-hidden rounded-[2rem] bg-card shadow-[0_1px_0_rgba(100,93,86,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-beige-soft/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/35 sm:grid-cols-[12rem_1fr_auto] sm:rounded-[2.25rem]"
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
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
