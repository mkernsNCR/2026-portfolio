import { useState, useEffect, Suspense, lazy } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import ModeToggle from './components/ModeToggle/ModeToggle'
import Nav from './components/Nav/Nav'
import Home from './pages/Home'

const BowlingLaneIntro = lazy(() => import('./components/BowlingLaneIntro/BowlingLaneIntro'))

function AppContent() {
  const { isFun } = useTheme()
  const [showIntro, setShowIntro] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    // Show intro only once per session in fun mode
    const seen = sessionStorage.getItem('intro-seen')
    if (isFun && !seen) {
      setShowIntro(true)
      setIntroComplete(false)
    }
  }, [isFun])

  const handleIntroComplete = () => {
    sessionStorage.setItem('intro-seen', '1')
    setShowIntro(false)
    setIntroComplete(true)
  }

  return (
    <>
      {/* Bowling intro overlay */}
      {showIntro && (
        <Suspense fallback={null}>
          <BowlingLaneIntro onComplete={handleIntroComplete} />
        </Suspense>
      )}

      {/* Main app - fade in after intro or immediately in business mode */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isFun ? 'fun' : 'business'}
          initial={{ opacity: 0 }}
          animate={{ opacity: showIntro && !introComplete ? 0 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <ModeToggle />
          <Nav />
          <Home />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
