import { useState, useEffect, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import SiteHeader from './components/SiteHeader/SiteHeader'
import PortfolioPage from './pages/PortfolioPage'
import { siteConfig } from './data/site'

const BowlingLaneIntro = lazy(() => import('./components/BowlingLaneIntro/BowlingLaneIntro'))

function AppContent() {
  const { isFun, mode } = useTheme()
  const [showIntro, setShowIntro] = useState(() => {
    const seen = sessionStorage.getItem('intro-seen')
    return isFun && !seen
  })
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('intro-seen')
    if (isFun && !seen) {
      setShowIntro(true)
      setIntroComplete(false)
    }
  }, [isFun])

  useEffect(() => {
    if (!isFun && showIntro) {
      sessionStorage.setItem('intro-seen', '1')
      setShowIntro(false)
      setIntroComplete(true)
    }
  }, [isFun, showIntro])

  useEffect(() => {
    document.title = siteConfig.seoTitle
    const ogImage = siteConfig.ogImage.startsWith('http')
      ? siteConfig.ogImage
      : new URL(siteConfig.ogImage, window.location.origin).toString()

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | null
      if (!element) {
        element = document.createElement('meta')
        document.head.appendChild(element)
      }

      Object.entries(attributes).forEach(([key, value]) => {
        element?.setAttribute(key, value)
      })
    }

    upsertMeta('meta[name="description"]', { name: 'description', content: siteConfig.seoDescription })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: siteConfig.seoTitle })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: siteConfig.seoDescription })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage })
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: siteConfig.seoTitle })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: siteConfig.seoDescription })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImage })
    upsertMeta('meta[name="theme-color"]', { name: 'theme-color', content: mode === 'fun' ? '#0A0A18' : '#FAFAF7' })
  }, [mode])

  const handleIntroComplete = () => {
    sessionStorage.setItem('intro-seen', '1')
    setShowIntro(false)
    setIntroComplete(true)
  }

  return (
    <>
      {showIntro && (
        <Suspense fallback={null}>
          <BowlingLaneIntro onComplete={handleIntroComplete} />
        </Suspense>
      )}

      {(!showIntro || introComplete) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <SiteHeader />
          <PortfolioPage />
        </motion.div>
      )}
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
