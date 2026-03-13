import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const contactLinks = [
  {
    label: 'Email',
    href: 'mailto:matt@example.com',
    icon: '✉️',
    businessIcon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/mattkerns',
    icon: '💼',
    businessIcon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/mattkerns',
    icon: '🐙',
    businessIcon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    href: 'https://discord.com/',
    icon: '🎮',
    businessIcon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
      </svg>
    ),
  },
]

// Falling pin animation for fun mode
function StrikeAnimation({ visible }: { visible: boolean }) {
  const pinPositions = [
    { x: 50, y: 30, rot: -45, delay: 0 },
    { x: 35, y: 40, rot: 35, delay: 0.05 },
    { x: 65, y: 40, rot: -55, delay: 0.08 },
    { x: 25, y: 55, rot: 40, delay: 0.1 },
    { x: 50, y: 55, rot: -30, delay: 0.12 },
    { x: 75, y: 55, rot: 50, delay: 0.15 },
    { x: 15, y: 70, rot: -60, delay: 0.18 },
    { x: 40, y: 70, rot: 35, delay: 0.2 },
    { x: 60, y: 70, rot: -40, delay: 0.22 },
    { x: 85, y: 70, rot: 55, delay: 0.25 },
  ]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Flying pins */}
          {pinPositions.map((pin, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              initial={{ scale: 0, opacity: 1, rotate: 0 }}
              animate={{
                scale: [0, 1.2, 0.8],
                opacity: [1, 1, 0],
                rotate: [0, pin.rot * 2],
                y: [0, -30, 40],
                x: [0, (pin.x - 50) * 0.5],
              }}
              transition={{ delay: pin.delay, duration: 0.7, ease: 'easeOut' }}
              aria-hidden="true"
            >
              <div className="w-3 h-6 bg-white rounded-full shadow-pin" />
            </motion.div>
          ))}

          {/* STRIKE text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 1] }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div
              className="text-5xl font-black text-yellow-400"
              style={{
                fontFamily: 'Impact, Arial Black, sans-serif',
                WebkitTextStroke: '2px #FF6600',
                textShadow: '0 0 20px #FF6600',
              }}
            >
              STRIKE!
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Contact() {
  const { isFun } = useTheme()
  const [strikeVisible, setStrikeVisible] = useState(false)

  const handleSendMessage = () => {
    setStrikeVisible(true)
  }

  useEffect(() => {
    if (strikeVisible) {
      const t = setTimeout(() => setStrikeVisible(false), 2200)
      return () => clearTimeout(t)
    }
  }, [strikeVisible])

  return (
    <section
      id="contact"
      className={`py-20 px-4 sm:px-6 lg:px-8 ${isFun ? '' : 'bg-white'}`}
      aria-label="Contact section"
    >
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {isFun ? (
            /* Fun Mode Contact */
            <div className="relative">
              <StrikeAnimation visible={strikeVisible} />

              <div className="bg-gradient-to-b from-[#1A1A2E] to-[#16213E] rounded-2xl border-2 border-yellow-400/40 p-8 sm:p-12 text-center shadow-2xl">
                {/* Bowling pin decoration */}
                <div className="flex justify-center gap-2 mb-6" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map(i => (
                    <motion.div
                      key={i}
                      className="w-4 h-10 bg-white rounded-full shadow-pin"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ delay: i * 0.1, duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ))}
                </div>

                <h2 className="text-3xl sm:text-4xl font-wii font-black text-white mb-3 drop-shadow-lg">
                  Let's build something great.
                </h2>
                <p className="text-white/70 font-wii text-lg mb-8">
                  Roll the ball. Let's connect!
                </p>

                {/* Contact buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {contactLinks.map(link => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-2 bg-white/15 text-white font-wii font-bold px-5 py-2.5 rounded-full border border-white/30 hover:bg-white/25 transition-colors"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      aria-label={link.label}
                    >
                      <span aria-hidden="true">{link.icon}</span>
                      {link.label}
                    </motion.a>
                  ))}
                </div>

                {/* Strike button */}
                <motion.button
                  type="button"
                  className="bg-gradient-to-b from-orange-400 to-orange-600 text-white font-wii font-black text-xl px-10 py-4 rounded-full border-b-4 border-orange-700 shadow-wii hover:shadow-wii-hover hover:-translate-y-1 active:translate-y-0.5 active:shadow-wii-active transition-all"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSendMessage}
                  aria-label="Roll a strike animation"
                >
                  🎳 Roll a Strike!
                </motion.button>
              </div>
            </div>
          ) : (
            /* Business Mode Contact */
            <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center shadow-card-business">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h2 className="text-2xl sm:text-3xl font-business font-bold text-gray-900 mb-3">
                Let's build something great.
              </h2>
              <p className="text-gray-500 font-business mb-8 max-w-md mx-auto">
                Open to new opportunities, collaborations, and interesting projects.
              </p>

              {/* Contact link buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                {contactLinks.map(link => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 bg-white text-gray-700 font-business font-medium px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm text-sm"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label={link.label}
                  >
                    {link.businessIcon}
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
