/** Shared key for pre-filling the contact form from event enquiries */
export const CONTACT_PREFILL_KEY = 'gmc-contact-prefill'

export type ContactPrefill = {
  message: string
}

export function writeContactPrefill(prefill: ContactPrefill) {
  try {
    sessionStorage.setItem(CONTACT_PREFILL_KEY, JSON.stringify(prefill))
  } catch {
    // Ignore storage failures (private mode, etc.)
  }
}

export function readContactPrefill(): ContactPrefill | null {
  try {
    const raw = sessionStorage.getItem(CONTACT_PREFILL_KEY)
    if (!raw) return null
    sessionStorage.removeItem(CONTACT_PREFILL_KEY)
    const parsed = JSON.parse(raw) as ContactPrefill
    if (!parsed?.message) return null
    return parsed
  } catch {
    return null
  }
}

export function goToContactForm(prefill: ContactPrefill) {
  writeContactPrefill(prefill)
  window.dispatchEvent(new CustomEvent('gmc:contact-prefill'))
  const contact = document.getElementById('contact')
  if (contact) {
    contact.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  window.history.replaceState(null, '', '#contact')
}
