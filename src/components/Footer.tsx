export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="content-width section-pad !py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-4xl tracking-wide sm:text-5xl">
              Great Moulton Chapel
            </p>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-primary-foreground/75">
              A friendly evangelical chapel in Great Moulton, Norfolk — part of
              Rural Ministries.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer">
            <a
              href="#meetings"
              className="text-lg font-semibold text-primary-foreground/85 transition-colors hover:text-sage-soft"
            >
              Meetings
            </a>
            <a
              href="#events"
              className="text-lg font-semibold text-primary-foreground/85 transition-colors hover:text-sage-soft"
            >
              Events
            </a>
            <a
              href="#contact"
              className="text-lg font-semibold text-primary-foreground/85 transition-colors hover:text-sage-soft"
            >
              Contact
            </a>
          </nav>
        </div>
        <p className="mt-10 text-base text-primary-foreground/55">
          © {new Date().getFullYear()} Great Moulton Chapel. All welcome.
          {' · '}
          Built by{' '}
          <a
            href="https://beblessed.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/75 underline-offset-4 transition-colors hover:text-sage-soft hover:underline"
          >
            Babe
          </a>
        </p>
      </div>
    </footer>
  )
}
