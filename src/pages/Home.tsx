import { motion } from 'framer-motion'
import Hero from '../components/Hero/Hero'
import Projects from '../components/Projects/Projects'
import Skills from '../components/Skills/Skills'
import Contact from '../components/Contact/Contact'
import { useTheme } from '../context/ThemeContext'

function Divider({ isFun }: { isFun: boolean }) {
  return (
    <div
      className={`h-px mx-8 ${isFun ? 'bg-white/20' : 'bg-gray-200'}`}
      aria-hidden="true"
    />
  )
}

export default function Home() {
  const { isFun } = useTheme()

  const scrollToProjects = () => {
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.main
      className={`
        min-h-screen transition-colors duration-700
        ${isFun
          ? 'bg-gradient-to-b from-sky-500 via-sky-400 to-sky-300'
          : 'bg-gray-50'
        }
      `}
      initial={false}
      animate={{ opacity: 1 }}
    >
      {/* Hero */}
      <Hero onViewProjects={scrollToProjects} onContact={scrollToContact} />

      <Divider isFun={isFun} />

      {/* Projects */}
      <Projects />

      <Divider isFun={isFun} />

      {/* Skills */}
      <Skills />

      <Divider isFun={isFun} />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <footer
        className={`
          py-8 text-center text-sm
          ${isFun
            ? 'text-white/50 font-wii border-t border-white/10'
            : 'text-gray-400 font-business border-t border-gray-200'
          }
        `}
      >
        <p>© {new Date().getFullYear()} Matt Kerns. Built with React, Vite &amp; Three.js.</p>
        {isFun && (
          <p className="mt-1 text-xs text-white/30">🎳 Perfect game: 300</p>
        )}
      </footer>
    </motion.main>
  )
}
