import chapelIllustration from '@/assets/chapel-watercolor.png'
import { openCoffeeDialog } from '@/lib/events-calendar'
import { cn } from '@/lib/utils'

type HeroProps = {
  /** Shared heading is being shown / moved by the loader intro */
  titleReady?: boolean
  /** Heading has docked into the hero layout */
  titleSettled?: boolean
  /** Subcopy can animate in */
  copyReady?: boolean
  /** Image + open pill can animate in */
  mediaReady?: boolean
}

export function Hero({
  titleReady = true,
  titleSettled = true,
  copyReady = true,
  mediaReady = true,
}: HeroProps) {
  return (
    <section
      id="top"
      className="section-pad !pb-14 !pt-[32px] sm:!pb-16"
      aria-label="Welcome"
    >
      <div className="content-width">
        <div className="mx-auto w-full max-w-3xl px-1 text-center">
          <div id="hero-brand-slot" className="mx-auto w-full">
            <h1
              id="hero-brand"
              className={cn(
                'mx-auto max-w-full text-[2.95rem] leading-[0.95] break-words hyphens-none sm:text-[clamp(2.75rem,9.5vw,5.5rem)]',
                !titleReady && !titleSettled && 'opacity-0',
              )}
            >
              Great Moulton
              <br />
              Chapel
            </h1>
          </div>
          <p
            className={cn(
              'mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground sm:mt-8 sm:text-2xl',
              copyReady ? 'hero-rise' : 'hero-intro-hidden',
            )}
          >
            A friendly village chapel — Sunday worship, midweek coffee, and a
            warm welcome for everyone.
          </p>
        </div>

        <div
          className={cn(
            'relative mt-10 w-full sm:mt-12',
            !mediaReady && 'pointer-events-none',
          )}
        >
          <div
            className={cn(
              'overflow-hidden rounded-[2rem] bg-[color-mix(in_srgb,var(--linen-soft)_70%,#dfe8f0)] sm:rounded-[2.5rem]',
              mediaReady ? 'hero-media-enter' : 'hero-media-hidden',
            )}
          >
            <img
              src={chapelIllustration}
              alt="Watercolor illustration of Great Moulton Chapel"
              className="mx-auto h-auto w-full object-contain object-center"
            />
          </div>

          <div className="absolute bottom-0 left-1/2 z-10 w-[calc(100%-1rem)] max-w-xl -translate-x-1/2 translate-y-1/2 sm:w-auto sm:max-w-2xl md:max-w-3xl">
            <a
              href="#events"
              onClick={(event) => {
                event.preventDefault()
                openCoffeeDialog()
              }}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-full bg-primary/90 px-3.5 py-2.5 text-primary-foreground shadow-sm backdrop-blur-sm transition-colors duration-300 hover:bg-primary sm:gap-4 sm:px-6 sm:py-3 md:gap-5 md:px-8 md:py-4',
                mediaReady ? 'hero-pill-enter' : 'hero-pill-hidden',
              )}
            >
              <span className="shrink-0 rounded-full bg-sage-soft px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-foreground sm:px-3 sm:text-xs md:px-3.5 md:py-1.5 md:text-sm">
                Open
              </span>
              <p className="min-w-0 flex-1 text-left text-sm font-semibold leading-snug sm:text-base md:text-lg">
                Coffee mornings every Wednesday at 10:30am — all welcome
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
