import welcomeIllustration from '@/assets/welcome-fellowship.png'

export function Welcome() {
  return (
    <section id="welcome" className="section-pad" aria-labelledby="welcome-heading">
      <div className="content-width grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="eyebrow">About us</p>
          <h2 id="welcome-heading" className="mt-3 text-5xl sm:text-6xl md:text-7xl">
            You’re always welcome here
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            Great Moulton Evangelical Chapel is a friendly village chapel, part of
            Rural Ministries. We gather to worship, share fellowship, and support
            one another — and we’d love you to join us.
          </p>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
            Whether you’ve lived in Great Moulton for years or you’re just visiting,
            come as you are. There’s no need to dress up or know what to do — simply
            arrive, and we’ll look after the rest.
          </p>
        </div>
        <img
          src={welcomeIllustration}
          alt="Watercolor illustration of two people sharing coffee and an open Bible at a table"
          className="aspect-[4/3] w-full rounded-[2rem] object-cover object-center sm:rounded-[2.5rem]"
        />
      </div>
    </section>
  )
}
