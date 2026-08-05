import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ExampleEvent = {
  day: number
  title: string
  time: string
  note: string
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/** Example events for the demo month — shown as a preview of the coming feature */
const EXAMPLE_EVENTS: ExampleEvent[] = [
  {
    day: 7,
    title: 'Harvest thanksgiving',
    time: '10:30am',
    note: 'A warm service of thanks for the season — all welcome.',
  },
  {
    day: 14,
    title: 'Carol service',
    time: '4:00pm',
    note: 'Familiar carols, candlelight, and festive fellowship afterwards.',
  },
  {
    day: 24,
    title: 'Christmas Eve gathering',
    time: '6:00pm',
    note: 'A gentle evening service for families and neighbours.',
  },
]

function getMonthMatrix(year: number, month: number) {
  const first = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  // Monday-first index: Sun=0 -> 6, Mon=1 -> 0
  const startOffset = (first.getDay() + 6) % 7
  const cells: Array<number | null> = Array.from({ length: startOffset }, () => null)
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day)
  }
  while (cells.length % 7 !== 0) {
    cells.push(null)
  }
  return cells
}

export function EventCalendar() {
  const today = new Date()
  const [monthCursor, setMonthCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  )
  const [selectedDay, setSelectedDay] = useState<number | null>(
    EXAMPLE_EVENTS[0]?.day ?? null,
  )

  const year = monthCursor.getFullYear()
  const month = monthCursor.getMonth()
  const cells = useMemo(() => getMonthMatrix(year, month), [year, month])
  const monthLabel = monthCursor.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  })

  const eventByDay = useMemo(() => {
    const map = new Map<number, ExampleEvent>()
    for (const event of EXAMPLE_EVENTS) {
      map.set(event.day, event)
    }
    return map
  }, [])

  const selectedEvent = selectedDay ? eventByDay.get(selectedDay) ?? null : null

  function shiftMonth(delta: number) {
    setMonthCursor((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1))
    setSelectedDay(null)
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-sage-soft/80 px-5 py-4">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-sage-deep">
          Coming soon
        </p>
        <p className="mt-2 text-base leading-relaxed text-foreground sm:text-lg">
          An events calendar is on the way. Seasonal gatherings will be posted
          here — below is an example of how it will look and feel.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-[minmax(0,1.35fr)_minmax(16rem,1fr)] md:items-start">
        <div className="rounded-[1.5rem] border border-border bg-background/80 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-12 shrink-0"
              onClick={() => shiftMonth(-1)}
              aria-label="Previous month"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <p className="font-display text-center text-3xl tracking-wide sm:text-4xl">
              {monthLabel}
            </p>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-12 shrink-0"
              onClick={() => shiftMonth(1)}
              aria-label="Next month"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="pb-1 text-center text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground sm:text-sm"
              >
                {day}
              </div>
            ))}

            {cells.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="min-h-11 sm:min-h-14" />
              }

              const example = eventByDay.get(day)
              const isSelected = selectedDay === day

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    'relative flex min-h-11 flex-col items-center justify-center rounded-xl text-base font-semibold transition-colors sm:min-h-14 sm:text-lg',
                    example
                      ? 'bg-beige-soft text-foreground hover:bg-sage-soft'
                      : 'text-foreground/80 hover:bg-beige-soft/60',
                    isSelected && 'bg-primary text-primary-foreground hover:bg-primary',
                  )}
                  aria-pressed={isSelected}
                  aria-label={
                    example
                      ? `${day} ${monthLabel}, example event: ${example.title}`
                      : `${day} ${monthLabel}`
                  }
                >
                  {day}
                  {example ? (
                    <span
                      className={cn(
                        'mt-0.5 size-1.5 rounded-full',
                        isSelected ? 'bg-primary-foreground' : 'bg-sage-deep',
                      )}
                      aria-hidden
                    />
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-[1.5rem] bg-beige-soft/70 px-5 py-5 md:min-h-full md:self-stretch">
          {selectedEvent ? (
            <>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-sage-deep">
                Example event
              </p>
              <p className="mt-2 font-display text-3xl tracking-wide">
                {selectedEvent.title}
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {selectedEvent.time}
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {selectedEvent.note}
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-sage-deep">
                Tip
              </p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Tap a highlighted day to see an example of how events will appear.
                Real dates will be added when this feature launches.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
