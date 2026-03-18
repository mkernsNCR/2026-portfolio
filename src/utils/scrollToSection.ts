export const SITE_HEADER_ID = 'site-header'

export function scrollToSection(id: string, fallbackOffset = 92) {
  const element = document.getElementById(id)
  if (!element) return

  const headerElement = document.getElementById(SITE_HEADER_ID) ?? document.querySelector('header')
  const headerOffset = Math.ceil(headerElement?.getBoundingClientRect().height ?? fallbackOffset)
  const top = Math.max(0, element.getBoundingClientRect().top + window.scrollY - headerOffset)

  window.history.replaceState(null, '', `#${id}`)
  window.scrollTo({ top, behavior: 'smooth' })
}
