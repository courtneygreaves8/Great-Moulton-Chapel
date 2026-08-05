import { Coffee, Church } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const meetings = [
  {
    icon: Church,
    title: 'Sunday service',
    time: 'Every Sunday at 10:30am',
    detail:
      'A simple, welcoming service of worship and teaching. All are invited — families, neighbours, and visitors alike.',
  },
  {
    icon: Coffee,
    title: 'Coffee morning',
    time: 'Every Wednesday at 10:30am',
    detail:
      'An open morning for a cuppa and a chat. Come for company, catch up with friends, or meet someone new.',
  },
]

export function Meetings() {
  return (
    <section
      id="meetings"
      className="section-pad section-soft"
      aria-labelledby="meetings-heading"
    >
      <div className="content-width">
        <div className="max-w-2xl">
          <p className="eyebrow">Regular gatherings</p>
          <h2 id="meetings-heading" className="mt-3 text-5xl sm:text-6xl md:text-7xl">
            Meetings &amp; gatherings
          </h2>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
            Our weekly rhythm is kept simple so it’s easy to join in.
          </p>
        </div>

        <div className="mt-12 space-y-0">
          {meetings.map((meeting, index) => {
            const Icon = meeting.icon
            return (
              <div key={meeting.title}>
                {index > 0 && <Separator className="my-8 bg-border" />}
                <article className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-8">
                  <div className="flex size-16 items-center justify-center rounded-full bg-sage-soft text-foreground">
                    <Icon className="size-7" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-4xl sm:text-5xl">{meeting.title}</h3>
                    <p className="mt-2 text-xl font-semibold text-sage-deep">
                      {meeting.time}
                    </p>
                    <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                      {meeting.detail}
                    </p>
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
