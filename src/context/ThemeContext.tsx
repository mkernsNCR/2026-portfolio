import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type ThemeMode = 'fun' | 'business'

interface ThemeContextValue {
  mode: ThemeMode
  toggleMode: () => void
  isFun: boolean
  isBusiness: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('portfolio-theme')
    return (saved as ThemeMode) || 'fun'
  })

  useEffect(() => {
    localStorage.setItem('portfolio-theme', mode)
    document.documentElement.className = `theme-${mode}`
  }, [mode])

  const toggleMode = () => {
    setMode(prev => (prev === 'fun' ? 'business' : 'fun'))
  }

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleMode,
        isFun: mode === 'fun',
        isBusiness: mode === 'business',
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
