import type { ThemeTokens } from './types'

export const businessTheme = {
  // Layout
  pageBackground: 'bg-gray-50',
  sectionBackground: 'bg-white',
  cardBackground: 'bg-white border border-gray-200',

  // Typography
  heading: 'font-business font-bold text-gray-900',
  subheading: 'font-business font-semibold text-gray-700',
  body: 'font-business text-gray-600',

  // Buttons
  primaryButton:
    'bg-gray-900 text-white font-business font-medium px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-sm',
  secondaryButton:
    'bg-white text-gray-900 font-business font-medium px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm',
  outlineButton:
    'bg-transparent text-gray-700 font-business font-medium px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors',

  // Navigation
  nav: 'bg-white border-b border-gray-200 shadow-sm',
  navLink:
    'font-business font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-md hover:bg-gray-100',
  navLinkActive: 'font-business font-semibold text-gray-900 px-4 py-2',

  // Cards
  projectCard:
    'bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-card-business-hover transition-shadow shadow-card-business cursor-pointer',
  skillBall: 'rounded-md shadow-sm flex items-center justify-center text-gray-700 font-business font-medium text-sm cursor-pointer hover:shadow-md transition-shadow',

  // Misc
  divider: 'border-gray-200',
  badge: 'bg-gray-100 text-gray-700 font-business text-sm px-3 py-1 rounded-md border border-gray-200',
} as const satisfies ThemeTokens
