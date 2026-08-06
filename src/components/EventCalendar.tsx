import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Church,
  Flame,
  Gift,
  HeartHandshake,
  Leaf,
  Music,
  Sprout,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CalendarEvent = {
  id: string
  month: number
  day: number
  title: string
  time: string
  note: string
  icon: LucideIcon
}

type EventCalendarProps = {
  onAskAboutEvent?: (event: {
    title: string
    date: string
    time: string
  }) => void
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const CARD_COUNT = 6

/** Demo seasonal events across the year — used for calendar marks and the sliding card window */
const EVENT_TEMPLATES: Omit<CalendarEvent, 'id'>[] = [
  {
    month: 0,
    day: 12,
    title: 'New Year prayer morning',
    time: '10:30am',
    note: 'A quiet start to the year — open to the whole village.',
    icon: HeartHandshake,
  },
  {
    month: 1,
    day: 8,
    title: 'Winter fellowship tea',
    time: '3:00pm',
    note: 'Warm drinks, cake, and conversation on a winter afternoon.',
    icon: Church,
  },
  {
    month: 2,
    day: 29,
    title: 'Mothering Sunday',
    time: '10:30am',
    note: 'A special service of thanks for mothers and carers.',
    icon: HeartHandshake,
  },
  {
    month: 3,
    day: 5,
    title: 'Easter celebration',
    time: '10:30am',
    note: 'Joyful worship and a warm welcome for all ages.',
    icon: Sprout,
  },
  {
    month: 4,
    day: 17,
    title: 'Spring thanksgiving',
    time: '10:30am',
    note: 'Giving thanks for new life and the season ahead.',
    icon: Leaf,
  },
  {
    month: 5,
    day: 14,
    title: 'Village hymns evening',
    time: '6:00pm',
    note: 'Familiar hymns and a gentle evening gathering.',
    icon: Music,
  },
  {
    month: 6,
    day: 19,
    title: 'Summer open chapel',
    time: '3:00pm',
    note: 'Doors open for tea, chat, and a quiet look around.',
    icon: Church,
  },
  {
    month: 7,
    day: 9,
    title: 'Holiday club Sunday',
    time: '10:30am',
    note: 'A friendly summer service with something for families.',
    icon: Gift,
  },
  {
    month: 7,
    day: 23,
    title: 'August fellowship tea',
    time: '3:00pm',
    note: 'Tea, cake, and company mid-summer — all welcome.',
    icon: HeartHandshake,
  },
  {
    month: 8,
    day: 20,
    title: 'Harvest thanksgiving',
    time: '10:30am',
    note: 'A warm service of thanks for the season — all welcome.',
    icon: Sprout,
  },
  {
    month: 9,
    day: 11,
    title: 'Harvest supper',
    time: '5:30pm',
    note: 'Shared food and fellowship after the harvest season.',
    icon: Leaf,
  },
  {
    month: 10,
    day: 8,
    title: 'Remembrance Sunday',
    time: '10:30am',
    note: 'A thoughtful service of remembrance for the village.',
    icon: Church,
  },
  {
    month: 11,
    day: 14,
    title: 'Carol service',
    time: '4:00pm',
    note: 'Familiar carols, candlelight, and festive fellowship afterwards.',
    icon: Music,
  },
  {
    month: 11,
    day: 24,
    title: 'Christmas Eve gathering',
    time: '6:00pm',
    note: 'A gentle evening service for families and neighbours.',
    icon: Flame,
  },
]

function buildYearEvents(year: number): CalendarEvent[] {
  return EVENT_TEMPLATES.map((event) => ({
    ...event,
    id: `${year}-${event.month}-${event.day}-${event.title}`,
    day: Math.min(event.day, new Date(year, event.month + 1, 0).getDate()),
  })).sort((a, b) => a.month - b.month || a.day - b.day)
}

function getMonthMatrix(year: number, month: number) {
  const first = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
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

function eventDateValue(year: number, event: CalendarEvent) {
  return year * 10000 + event.month * 100 + event.day
}

function formatEventDate(year: number, event: CalendarEvent) {
  return new Date(year, event.month, event.day).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export function EventCalendar({ onAskAboutEvent }: EventCalendarProps) {
  const today = new Date()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const featureCardRef = useRef<HTMLDivElement>(null)
  const [monthCursor, setMonthCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  )
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const year = monthCursor.getFullYear()
  const month = monthCursor.getMonth()
  const cells = useMemo(() => getMonthMatrix(year, month), [year, month])
  const monthLabel = monthCursor.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  })

  const catalog = useMemo(() => {
    return [...buildYearEvents(year), ...buildYearEvents(year + 1)]
  }, [year])

  const monthEvents = useMemo(
    () => catalog.filter((event) => event.id.startsWith(`${year}-`) && event.month === month),
    [catalog, year, month],
  )

  const eventByDay = useMemo(() => {
    const map = new Map<number, CalendarEvent>()
    for (const event of monthEvents) {
      map.set(event.day, event)
    }
    return map
  }, [monthEvents])

  const visibleCards = useMemo(() => {
    const cursorValue = year * 10000 + month * 100 + 1
    return catalog
      .filter((event) => {
        const eventYear = Number(event.id.slice(0, 4))
        return eventDateValue(eventYear, event) >= cursorValue
      })
      .slice(0, CARD_COUNT)
  }, [catalog, year, month])

  const selectedEvent =
    (selectedId ? catalog.find((event) => event.id === selectedId) : null) ??
    (selectedId === null ? visibleCards[0] ?? null : null)

  function updateScrollState() {
    const el = scrollerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  function scrollCards(direction: -1 | 1) {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.min(320, el.clientWidth * 0.8)
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ left: 0 })
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [visibleCards])

  function scrollFeatureCardIntoView() {
    // Feature card sits below the calendar only below the lg breakpoint
    if (window.matchMedia('(min-width: 1024px)').matches) return
    window.setTimeout(() => {
      featureCardRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      })
    }, 50)
  }

  function shiftMonth(delta: number) {
    setMonthCursor((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1))
    setSelectedId(null)
  }

  function selectDay(day: number) {
    const event = eventByDay.get(day)
    setSelectedId(event?.id ?? `empty-${year}-${month}-${day}`)
    if (event) scrollFeatureCardIntoView()
  }

  function selectCard(event: CalendarEvent) {
    const eventYear = Number(event.id.slice(0, 4))
    setSelectedId(event.id)
    if (eventYear !== year || event.month !== month) {
      setMonthCursor(new Date(eventYear, event.month, 1))
    }
    scrollFeatureCardIntoView()
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              'absolute top-1/2 left-0 z-10 size-10 -translate-x-1 -translate-y-1/2 bg-card shadow-sm sm:-translate-x-2',
              !canScrollLeft && 'pointer-events-none opacity-35',
            )}
            onClick={() => scrollCards(-1)}
            aria-label="Scroll key events left"
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="size-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              'absolute top-1/2 right-0 z-10 size-10 translate-x-1 -translate-y-1/2 bg-card shadow-sm sm:translate-x-2',
              !canScrollRight && 'pointer-events-none opacity-35',
            )}
            onClick={() => scrollCards(1)}
            aria-label="Scroll key events right"
            disabled={!canScrollRight}
          >
            <ChevronRight className="size-4" />
          </Button>

          <div
            ref={scrollerRef}
            className="flex touch-pan-x gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-7 py-0.5 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory sm:px-9 [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {visibleCards.map((event, index) => {
              const eventYear = Number(event.id.slice(0, 4))
              const Icon = event.icon
              const isActive = selectedEvent?.id === event.id
              const tones = [
                'bg-[color-mix(in_srgb,var(--beige)_55%,white)]',
                'bg-[color-mix(in_srgb,var(--sage)_28%,white)]',
                'bg-[color-mix(in_srgb,var(--linen)_70%,white)]',
              ]
              const tone = tones[index % tones.length]

              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => selectCard(event)}
                  className={cn(
                    'snap-start shrink-0 w-[min(72vw,14.5rem)] rounded-[1.25rem] border p-3.5 text-left transition-all',
                    tone,
                    isActive
                      ? 'border-primary ring-2 ring-primary/25'
                      : 'border-border/70 hover:border-primary/30',
                  )}
                  aria-pressed={isActive}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex size-9 items-center justify-center rounded-xl bg-background/80 text-sage-deep shadow-[inset_0_0_0_1px_rgba(100,93,86,0.06)]">
                      <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="rounded-full bg-background/75 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-sage-deep">
                      {formatEventDate(eventYear, event)}
                    </span>
                  </div>

                  <p className="mt-3 font-display text-[1.45rem] leading-[0.95] tracking-wide text-foreground">
                    {event.title}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-foreground">
                    {event.time}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {event.note}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(12rem,15rem)] lg:items-start">
        <div className="rounded-[1.25rem] border border-border bg-background/80 p-3 sm:p-4">
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-10 shrink-0"
              onClick={() => shiftMonth(-1)}
              aria-label="Previous month"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <p className="font-display text-center text-2xl tracking-wide sm:text-3xl">
              {monthLabel}
            </p>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-10 shrink-0"
              onClick={() => shiftMonth(1)}
              aria-label="Next month"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="pb-0.5 text-center text-[0.65rem] font-bold uppercase tracking-[0.1em] text-muted-foreground"
              >
                {day}
              </div>
            ))}

            {cells.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="min-h-9 sm:min-h-10" />
              }

              const example = eventByDay.get(day)
              const isSelected =
                selectedEvent?.id === example?.id ||
                selectedId === `empty-${year}-${month}-${day}`
              const Icon = example?.icon

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => selectDay(day)}
                  className={cn(
                    'relative flex min-h-9 flex-col items-center justify-center gap-0 rounded-lg px-0.5 py-0.5 text-xs font-semibold transition-colors sm:min-h-10 sm:text-sm',
                    example
                      ? 'bg-beige-soft text-foreground hover:bg-sage-soft'
                      : 'text-foreground/80 hover:bg-beige-soft/60',
                    isSelected && 'bg-primary text-primary-foreground hover:bg-primary',
                  )}
                  aria-pressed={isSelected}
                  aria-label={
                    example
                      ? `${day} ${monthLabel}, ${example.title}`
                      : `${day} ${monthLabel}`
                  }
                >
                  <span>{day}</span>
                  {Icon ? (
                    <Icon
                      className={cn(
                        'size-2.5',
                        isSelected ? 'text-primary-foreground' : 'text-sage-deep',
                      )}
                      aria-hidden
                      strokeWidth={2}
                    />
                  ) : (
                    <span className="size-2.5" aria-hidden />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div
          ref={featureCardRef}
          id="event-feature-card"
          className="rounded-[1.25rem] bg-beige-soft/70 px-4 py-4 lg:min-h-full lg:self-stretch"
        >
          {selectedEvent && !selectedId?.startsWith('empty-') ? (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-sage-deep">
                Selected
              </p>
              <p className="mt-1.5 font-display text-2xl tracking-wide">
                {selectedEvent.title}
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {formatEventDate(Number(selectedEvent.id.slice(0, 4)), selectedEvent)} ·{' '}
                {selectedEvent.time}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {selectedEvent.note}
              </p>
              {onAskAboutEvent ? (
                <Button
                  type="button"
                  size="default"
                  className="mt-4 h-10 w-full px-4 text-sm sm:w-auto"
                  onClick={() =>
                    onAskAboutEvent({
                      title: selectedEvent.title,
                      date: formatEventDate(
                        Number(selectedEvent.id.slice(0, 4)),
                        selectedEvent,
                      ),
                      time: selectedEvent.time,
                    })
                  }
                >
                  Ask for more info
                </Button>
              ) : null}
            </>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-sage-deep">
                Tip
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Choose a highlighted day or a key event card to preview how
                gatherings will appear here.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
