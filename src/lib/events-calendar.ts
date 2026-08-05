/** Open the seasonal events calendar dialog from nav or other triggers */
export function openEventsCalendar() {
  window.dispatchEvent(new CustomEvent('gmc:open-events-calendar'))
}
