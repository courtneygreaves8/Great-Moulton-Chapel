import chapelIllustration from '@/assets/chapel-watercolor.png'
import { cn } from '@/lib/utils'

type HeroProps = {
  introReady?: boolean
}

export function Hero({ introReady = true }: HeroProps) {
  return (
    <section
      id="top"
      className="section-pad !pb-14 !pt-[32px] sm:!pb-16"
      aria-label="Welcome"
    >
      <div className="content-width">
        <div className="mx-auto w-full max-w-3xl px-1 text-center">
          <h1
            className={cn(
              'mx-auto max-w-full text-[clamp(2.1rem,9.5vw,5.5rem)] leading-[0.95] break-words hyphens-none',
              introReady ? 'hero-rise' : 'hero-intro-hidden',
            )}
          >
            Great Moulton
            <br />
            Chapel
          </h1>
          <p
            className={cn(
              'mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground sm:mt-8 sm:text-2xl',
              introReady ? 'hero-rise-delay-1' : 'hero-intro-hidden',
            )}
          >
            A friendly village chapel — Sunday worship, midweek coffee, and a
            warm welcome for everyone.
          </p>
        </div>

        <div
          className={cn(
            'relative mt-10 w-full sm:mt-12',
            introReady ? 'hero-rise-delay-2' : 'hero-intro-hidden',
          )}
        >
          <div className="overflow-hidden rounded-[2rem] bg-[color-mix(in_srgb,var(--linen-soft)_70%,#dfe8f0)] sm:rounded-[2.5rem]">
            <img
              src={chapelIllustration}
              alt="Watercolor illustration of Great Moulton Chapel"
              className="mx-auto h-auto w-full object-contain object-center"
            />
          </div>

          <a
            href="#opening-times"
            className="absolute bottom-0 left-1/2 z-10 flex w-[calc(100%-1rem)] max-w-xl -translate-x-1/2 translate-y-1/2 items-center gap-2.5 rounded-full bg-primary/90 px-3.5 py-2.5 text-primary-foreground shadow-sm backdrop-blur-sm transition-colors duration-300 hover:bg-primary sm:w-auto sm:max-w-[calc(100%-1.5rem)] sm:gap-4 sm:px-6 sm:py-3"
          >
            <span className="shrink-0 rounded-full bg-sage-soft px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-foreground sm:px-3 sm:text-xs">
              Open
            </span>
            <p className="min-w-0 flex-1 text-left text-sm font-semibold leading-snug sm:text-base">
              Coffee mornings every Wednesday at 10:30am — all welcome
            </p>
          </a>
        </div>
      </div>
    </section>
  )
}
