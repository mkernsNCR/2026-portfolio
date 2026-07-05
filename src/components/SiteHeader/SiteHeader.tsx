import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme, type ThemeMode } from '../../context/ThemeContext'
import { scrollToSection, SITE_HEADER_ID } from '../../utils/scrollToSection'

const navLinks = [
  { label: 'Home', href: 'home' },
  { label: 'Projects', href: 'projects' },
  { label: 'Skills', href: 'skills' },
  { label: 'Contact', href: 'contact' },
]

function ModeSegment({
  value,
  current,
  label,
  emoji,
  onSelect,
}: {
  value: ThemeMode
  current: ThemeMode
  label: string
  emoji: string
  onSelect: (mode: ThemeMode) => void
}) {
  const selected = value === current

  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      onKeyDown={event => {
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault()
          onSelect(value)
        }
      }}
      role="radio"
      aria-checked={selected}
      className="relative z-10 flex min-w-[96px] items-center justify-center gap-2 px-3 py-2 font-data text-[11px] font-semibold uppercase tracking-[0.18em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:min-w-[112px]"
      aria-label={label}
    >
      <span aria-hidden="true">{emoji}</span>
      <span>{label.replace(' Mode', '')}</span>
    </button>
  )
}

export default function SiteHeader() {
  const { mode, setMode, isFun } = useTheme()
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const observerIds = useMemo(() => navLinks.map(link => link.href), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = observerIds
      .map(id => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-30% 0px -45% 0px',
        threshold: [0.2, 0.4, 0.6],
      }
    )

    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [observerIds])

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) setActiveSection(hash)
  }, [])

  const headerShell = isFun
    ? scrolled
      ? 'border-neon-pink/40 bg-void/95 text-white shadow-neon-pink backdrop-blur-xl'
      : 'border-deck-edge bg-void/80 text-white backdrop-blur-lg'
    : scrolled
      ? 'border-ink/20 bg-paper/95 text-ink shadow-sheet backdrop-blur-xl'
      : 'border-hairline bg-paper/90 text-ink backdrop-blur-lg'

  const toggleShell = isFun
    ? 'border-deck-edge bg-deck text-lav'
    : 'border-hairline bg-white text-steel'

  return (
    <header id={SITE_HEADER_ID} className="fixed inset-x-0 top-0 z-50">
      <div className={`border-b transition-all duration-300 ${headerShell}`}>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => scrollToSection('home')}
                className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                aria-label="Go to home section"
              >
                <span className={`flex h-10 w-10 items-center justify-center font-marquee text-xs ${isFun ? 'border border-neon-pink/60 bg-deck text-neon-pink shadow-neon-pink' : 'border border-ink bg-ink text-paper'}`}>
                  26
                </span>
                <span className="text-left">
                  <span className={`block font-marquee text-[13px] leading-tight tracking-wide ${isFun ? 'text-white' : 'text-ink'}`}>
                    Matt Kerns
                  </span>
                  <span className={`block font-data text-[10px] uppercase tracking-[0.22em] ${isFun ? 'text-uv-cyan' : 'text-kegel'}`}>
                    {isFun ? 'Lane 26 · Midnight League' : 'Lane 26 · Spec Sheet'}
                  </span>
                </span>
              </button>

              <div className={`relative flex border p-1 transition-colors duration-300 ${toggleShell}`} role="radiogroup" aria-label="Portfolio mode selector">
                <motion.div
                  className={`absolute inset-y-1 ${isFun ? 'bg-neon-pink/20 ring-1 ring-neon-pink/70' : 'bg-ink'}`}
                  animate={{
                    x: mode === 'fun' ? 0 : '100%',
                    width: '50%',
                  }}
                  transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                />
                <span className={mode === 'fun' ? 'text-neon-pink' : ''} style={{ display: 'contents' }}>
                  <ModeSegment value="fun" current={mode} label="Fun Mode" emoji="🎳" onSelect={setMode} />
                </span>
                <span className={mode === 'business' ? (isFun ? 'text-white' : 'text-paper') : ''} style={{ display: 'contents' }}>
                  <ModeSegment value="business" current={mode} label="Business Mode" emoji="💼" onSelect={setMode} />
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <nav aria-label="Main navigation" className="hidden md:block">
                <ul className={`flex items-stretch divide-x border ${isFun ? 'divide-deck-edge border-deck-edge' : 'divide-hairline border-hairline'}`}>
                  {navLinks.map((link, index) => {
                    const active = activeSection === link.href
                    return (
                      <li key={link.href}>
                        <button
                          type="button"
                          onClick={() => scrollToSection(link.href)}
                          className={`relative flex items-center gap-2 px-4 py-2 font-data text-xs uppercase tracking-[0.18em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset ${active ? isFun ? 'text-uv-cyan' : 'text-ink' : isFun ? 'text-lav hover:text-white' : 'text-steel hover:text-ink'}`}
                          aria-current={active ? 'page' : undefined}
                        >
                          {active && (
                            <motion.span
                              layoutId="active-nav-indicator"
                              className={`absolute inset-0 ${isFun ? 'bg-uv-cyan/10 ring-1 ring-inset ring-uv-cyan/50' : 'bg-kegel/[0.07] ring-1 ring-inset ring-kegel/40'}`}
                              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                            />
                          )}
                          <span className={`relative z-10 text-[10px] ${active ? isFun ? 'text-neon-pink' : 'text-kegel' : 'opacity-50'}`} aria-hidden="true">{index + 1}</span>
                          <span className="relative z-10">{link.label}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <div className="md:hidden">
                <button
                  type="button"
                  onClick={() => setMobileOpen(open => !open)}
                  className={`inline-flex items-center border px-4 py-2 font-data text-xs uppercase tracking-[0.18em] transition-colors ${isFun ? 'border-deck-edge bg-deck text-white' : 'border-hairline bg-white text-ink'}`}
                  aria-expanded={mobileOpen}
                  aria-label="Toggle navigation menu"
                >
                  {navLinks.find(link => link.href === activeSection)?.label ?? 'Navigate'}
                </button>
              </div>

              <div className={`hidden font-data text-[10px] uppercase tracking-[0.24em] md:block ${isFun ? 'text-neon-pink glow-pink' : 'text-steel'}`}>
                {isFun ? '● Cosmic session in progress' : 'Open play · pro shop hours'}
              </div>
            </div>

            <AnimatePresence>
              {mobileOpen && (
                <motion.nav
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden md:hidden"
                  aria-label="Mobile navigation"
                >
                  <ul className="grid grid-cols-2 gap-2 pt-1">
                    {navLinks.map(link => {
                      const active = activeSection === link.href
                      return (
                        <li key={link.href}>
                          <button
                            type="button"
                            onClick={() => {
                              scrollToSection(link.href)
                              setMobileOpen(false)
                            }}
                            className={`w-full border px-4 py-3 text-left font-data text-xs uppercase tracking-[0.18em] transition-colors ${isFun ? 'text-white' : 'text-ink'} ${active ? isFun ? 'border-uv-cyan/50 bg-uv-cyan/10' : 'border-kegel/40 bg-kegel/[0.06]' : isFun ? 'border-deck-edge bg-deck' : 'border-hairline bg-white'}`}
                          >
                            {link.label}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
