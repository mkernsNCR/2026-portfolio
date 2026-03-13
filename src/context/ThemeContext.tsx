import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type ThemeMode = 'fun' | 'business'

interface ThemeContextValue {
  mode: ThemeMode
  toggleMode: () => void
  isFun: boolean
  isBusiness: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const VALID_MODES: ThemeMode[] = ['fun', 'business']

function getSavedMode(): ThemeMode {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return 'fun'
    const saved = localStorage.getItem('portfolio-theme')
    if (saved && (VALID_MODES as string[]).includes(saved)) return saved as ThemeMode
  } catch {
    // localStorage blocked (e.g. private browsing with strict settings)
  }
  return 'fun'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getSavedMode)

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-theme', mode)
    } catch {
      // storage write blocked; non-fatal
    }
    const root = document.documentElement
    for (const cls of Array.from(root.classList)) {
      if (cls.startsWith('theme-')) root.classList.remove(cls)
    }
    root.classList.add(`theme-${mode}`)
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
