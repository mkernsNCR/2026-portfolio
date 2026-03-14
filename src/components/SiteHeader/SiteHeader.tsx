import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme, type ThemeMode } from '../../context/ThemeContext'

const navLinks = [
  { label: 'Home', href: 'home' },
  { label: 'Projects', href: 'projects' },
  { label: 'Skills', href: 'skills' },
  { label: 'Contact', href: 'contact' },
]

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (!element) return
  const headerOffset = 92
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset
  window.history.replaceState(null, '', `#${id}`)
  window.scrollTo({ top, behavior: 'smooth' })
}

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
      className="relative z-10 flex min-w-[132px] items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      aria-pressed={selected}
      aria-label={label}
    >
      <span aria-hidden="true">{emoji}</span>
      <span>{label}</span>
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
      ? 'border-white/45 bg-slate-950/[0.55] text-white shadow-2xl backdrop-blur-xl'
      : 'border-white/25 bg-slate-950/[0.35] text-white backdrop-blur-lg'
    : scrolled
      ? 'border-slate-200/90 bg-white/95 text-slate-900 shadow-lg backdrop-blur-xl'
      : 'border-slate-200/60 bg-white/80 text-slate-900 shadow-sm backdrop-blur-lg'

  const toggleShell = isFun
    ? 'border-white/20 bg-white/10 text-white'
    : 'border-slate-200 bg-slate-100 text-slate-700'

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className={`rounded-[28px] border transition-all duration-300 ${headerShell}`}>
          <div className="flex flex-col gap-4 px-4 py-3 sm:px-5 lg:px-6">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => scrollToSection('home')}
                className="flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                aria-label="Go to home section"
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${isFun ? 'bg-white/[0.15]' : 'bg-slate-900 text-white'}`}>
                  {isFun ? '🎳' : 'MK'}
                </span>
                <span className="text-left">
                  <span className={`block text-sm font-semibold ${isFun ? 'font-wii text-white' : 'font-business text-slate-900'}`}>
                    Matt Kerns
                  </span>
                  <span className={`block text-xs ${isFun ? 'font-wii text-white/70' : 'font-business text-slate-500'}`}>
                    Full Stack Engineer
                  </span>
                </span>
              </button>

              <div className={`relative flex rounded-full border p-1 transition-colors duration-300 ${toggleShell}`} role="tablist" aria-label="Portfolio mode selector">
                <motion.div
                  className={`absolute inset-y-1 rounded-full ${isFun ? 'bg-wii-blue shadow-wii' : 'bg-white shadow-sm'}`}
                  animate={{
                    x: mode === 'fun' ? 0 : '100%',
                    width: '50%',
                  }}
                  transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                />
                <ModeSegment value="fun" current={mode} label="Fun Mode" emoji="🎳" onSelect={setMode} />
                <ModeSegment value="business" current={mode} label="Business Mode" emoji="💼" onSelect={setMode} />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <nav aria-label="Main navigation" className="hidden md:block">
                <ul className="flex items-center gap-2">
                  {navLinks.map(link => {
                    const active = activeSection === link.href
                    return (
                      <li key={link.href}>
                        <button
                          type="button"
                          onClick={() => scrollToSection(link.href)}
                          className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isFun ? 'font-wii' : 'font-business'} ${active ? isFun ? 'text-white' : 'text-slate-950' : isFun ? 'text-white/70 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                          aria-current={active ? 'page' : undefined}
                        >
                          {active && (
                            <motion.span
                              layoutId="active-nav-indicator"
                              className={`absolute inset-0 rounded-full ${isFun ? 'bg-white/[0.12]' : 'bg-slate-100'}`}
                              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                            />
                          )}
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
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${isFun ? 'bg-white/10 font-wii text-white' : 'bg-slate-100 font-business text-slate-800'}`}
                  aria-expanded={mobileOpen}
                  aria-label="Toggle navigation menu"
                >
                  {navLinks.find(link => link.href === activeSection)?.label ?? 'Navigate'}
                </button>
              </div>

              <div className={`hidden rounded-full px-4 py-2 text-xs md:block ${isFun ? 'bg-white/10 font-wii text-white/75' : 'bg-slate-100 font-business text-slate-500'}`}>
                {isFun ? 'Creative mode on lane' : 'Professional mode active'}
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
                            className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition-colors ${isFun ? 'font-wii text-white' : 'font-business text-slate-800'} ${active ? isFun ? 'bg-white/[0.15]' : 'bg-slate-100' : isFun ? 'bg-white/5' : 'bg-slate-50'}`}
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
