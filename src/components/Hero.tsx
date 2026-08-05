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
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className={cn(
              'text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.9]',
              introReady ? 'hero-from-top' : 'hero-intro-hidden',
            )}
          >
            Great Moulton Chapel
          </h1>
          <p
            className={cn(
              'mx-auto mt-6 max-w-xl text-xl leading-relaxed text-muted-foreground sm:mt-8 sm:text-2xl',
              introReady ? 'hero-from-top-delay-1' : 'hero-intro-hidden',
            )}
          >
            A friendly village chapel — Sunday worship, midweek coffee, and a
            warm welcome for everyone.
          </p>
        </div>

        <div
          className={cn(
            'relative mt-10 sm:mt-12',
            introReady ? 'hero-from-top-delay-2' : 'hero-intro-hidden',
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
            className="absolute bottom-0 left-1/2 z-10 flex w-max max-w-[calc(100%-1.5rem)] -translate-x-1/2 translate-y-1/2 items-center gap-3 rounded-full bg-primary/90 px-5 py-2.5 text-primary-foreground shadow-sm backdrop-blur-sm transition-colors duration-300 hover:bg-primary sm:gap-4 sm:px-6 sm:py-3"
          >
            <span className="rounded-full bg-sage-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-foreground">
              Open
            </span>
            <p className="max-w-[16rem] text-sm font-semibold leading-snug sm:max-w-none sm:text-base">
              Coffee mornings every Wednesday at 10:30am — all welcome
            </p>
          </a>
        </div>
      </div>
    </section>
  )
}
