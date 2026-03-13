import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const { isFun } = useTheme()
  const [active, setActive] = useState('Home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (label: string, href: string) => {
    setActive(label)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`
        fixed bottom-6 left-1/2 z-40 -translate-x-1/2
        transition-all duration-500
        ${isFun
          ? scrolled
            ? 'bg-white/30 backdrop-blur-lg border border-white/40 shadow-xl'
            : 'bg-white/20 backdrop-blur-md border border-white/30'
          : scrolled
            ? 'bg-white shadow-md border border-gray-200'
            : 'bg-white/90 backdrop-blur-sm border border-gray-100 shadow-sm'
        }
        rounded-full px-2 py-1.5
      `}
      aria-label="Main navigation"
    >
      {/* Desktop nav */}
      <ul className="hidden sm:flex items-center gap-1">
        {navLinks.map(link => (
          <li key={link.label}>
            <button
              type="button"
              onClick={() => handleNav(link.label, link.href)}
              className={`
                relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                ${isFun
                  ? active === link.label
                    ? 'text-white font-wii font-bold'
                    : 'text-white/80 font-wii hover:text-white hover:bg-white/20'
                  : active === link.label
                    ? 'text-gray-900 font-business font-semibold'
                    : 'text-gray-600 font-business hover:text-gray-900 hover:bg-gray-100'
                }
              `}
              aria-current={active === link.label ? 'page' : undefined}
            >
              {active === link.label && (
                <motion.div
                  layoutId="nav-indicator"
                  className={`
                    absolute inset-0 rounded-full
                    ${isFun ? 'bg-wii-blue shadow-wii' : 'bg-gray-100'}
                  `}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile nav */}
      <div className="sm:hidden flex items-center gap-2 px-2">
        <span
          className={`text-sm font-medium ${isFun ? 'text-white font-wii' : 'text-gray-700 font-business'}`}
        >
          {active}
        </span>
        <button
          type="button"
          className={`p-1.5 rounded-full ${isFun ? 'text-white hover:bg-white/20' : 'text-gray-600 hover:bg-gray-100'}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>

        {menuOpen && (
          <motion.div
            className={`
              absolute bottom-full mb-2 left-0 right-0 rounded-2xl p-2
              ${isFun
                ? 'bg-white/25 backdrop-blur-lg border border-white/40'
                : 'bg-white border border-gray-200 shadow-lg'
              }
            `}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            {navLinks.map(link => (
              <button
                type="button"
                key={link.label}
                onClick={() => handleNav(link.label, link.href)}
                className={`
                  w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors
                  ${isFun
                    ? 'text-white font-wii hover:bg-white/20'
                    : 'text-gray-700 font-business hover:bg-gray-50'
                  }
                  ${active === link.label ? (isFun ? 'bg-white/20' : 'bg-gray-100') : ''}
                `}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
