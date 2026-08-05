import { useEffect, useState, type FormEvent } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { readContactPrefill } from '@/lib/contact-prefill'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    function applyPrefill() {
      const prefill = readContactPrefill()
      if (!prefill) return
      setSubmitted(false)
      if (prefill.subject) setSubject(prefill.subject)
      if (prefill.message) setMessage(prefill.message)
      window.setTimeout(() => {
        const nameField = document.getElementById('name')
        nameField?.focus()
        nameField?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 400)
    }

    applyPrefill()
    window.addEventListener('gmc:contact-prefill', applyPrefill)
    window.addEventListener('hashchange', applyPrefill)
    return () => {
      window.removeEventListener('gmc:contact-prefill', applyPrefill)
      window.removeEventListener('hashchange', applyPrefill)
    }
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    setSubject('')
    setMessage('')
  }

  return (
    <section
      id="contact"
      className="section-pad section-soft"
      aria-labelledby="contact-heading"
    >
      <div className="content-width">
        <div className="max-w-2xl">
          <p className="eyebrow">Get in touch</p>
          <h2 id="contact-heading" className="mt-3 text-5xl sm:text-6xl md:text-7xl">
            Contact us
          </h2>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
            Questions about services, a visit, or how to help? Send a message —
            we’d love to hear from you.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-14">
          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-card p-6 shadow-[0_1px_0_rgba(100,93,86,0.06)] sm:p-7">
              <div className="flex gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-sage-soft text-foreground">
                  <MapPin className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-3xl">Find us</h3>
                  <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
                    High Green
                    <br />
                    Great Moulton
                    <br />
                    Norfolk NR15 2HU
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-card p-6 shadow-[0_1px_0_rgba(100,93,86,0.06)] sm:p-7">
              <div className="flex gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-beige-soft text-foreground">
                  <Phone className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-3xl">Telephone</h3>
                  <p className="mt-2 text-lg text-muted-foreground">
                    <a
                      href="tel:01379677370"
                      className="font-semibold text-foreground underline-offset-4 hover:underline"
                    >
                      01379 677370
                    </a>
                  </p>
                  <p className="mt-1 text-base text-muted-foreground">
                    Chapel Secretary: Rosemary Davies
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-card p-6 shadow-[0_1px_0_rgba(100,93,86,0.06)] sm:p-7">
              <div className="flex gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-sage-soft text-foreground">
                  <Mail className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-3xl">Email</h3>
                  <p className="mt-2 text-lg text-muted-foreground">
                    <a
                      href="mailto:rosemary.davies7@btinternet.com"
                      className="break-all font-semibold text-foreground underline-offset-4 hover:underline"
                    >
                      rosemary.davies7@btinternet.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <div className="rounded-[2rem] bg-card p-6 shadow-[0_1px_0_rgba(100,93,86,0.06)] sm:rounded-[2.5rem] sm:p-8">
            {submitted ? (
              <div className="flex min-h-72 flex-col items-start justify-center">
                <h3 className="text-5xl">Thank you</h3>
                <p className="mt-4 max-w-md text-xl leading-relaxed text-muted-foreground">
                  Your message has been noted. Someone from the chapel will be in
                  touch as soon as they can.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-8"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="space-y-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telephone (optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    required
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="What is this about?"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="How can we help?"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Send message
                </Button>
                <p className="text-base text-muted-foreground">
                  Prefer a quick reply? Call or email using the details{' '}
                  <span className="lg:hidden">above</span>
                  <span className="hidden lg:inline">on the left</span>
                  {' '}— we’ll get back to you as soon as we can.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
