/** Open the seasonal events calendar dialog from nav or other triggers */
export function openEventsCalendar() {
  window.dispatchEvent(new CustomEvent('gmc:open-events-calendar'))
}

/** Open the Wednesday coffee morning dialog */
export function openCoffeeDialog() {
  window.dispatchEvent(new CustomEvent('gmc:open-coffee-dialog'))
}
