export const funTheme = {
  // Layout
  pageBackground: 'bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200',
  sectionBackground: 'bg-white/10 backdrop-blur-sm',
  cardBackground: 'bg-white/20 backdrop-blur-md border border-white/30',

  // Typography
  heading: 'font-wii font-black text-white drop-shadow-lg',
  subheading: 'font-wii font-bold text-white/90',
  body: 'font-wii text-white/80',

  // Buttons
  primaryButton:
    'bg-wii-button text-white font-wii font-bold rounded-full px-6 py-3 shadow-wii hover:shadow-wii-hover active:shadow-wii-active hover:-translate-y-0.5 transition-all border-b-4 border-wii-blue-dark',
  secondaryButton:
    'bg-wii-button-orange text-white font-wii font-bold rounded-full px-6 py-3 shadow-wii hover:shadow-wii-hover active:shadow-wii-active hover:-translate-y-0.5 transition-all border-b-4 border-orange-700',
  outlineButton:
    'bg-white/20 text-white font-wii font-bold rounded-full px-5 py-2 border-2 border-white/60 hover:bg-white/30 transition-all',

  // Navigation
  nav: 'bg-white/20 backdrop-blur-md border-b border-white/20',
  navLink:
    'font-wii font-bold text-white hover:text-wii-orange transition-colors px-4 py-2 rounded-full hover:bg-white/20',
  navLinkActive:
    'font-wii font-bold text-white bg-wii-blue rounded-full px-4 py-2 shadow-wii',

  // Cards
  projectCard:
    'bg-scoreboard border-2 border-yellow-400/60 rounded-xl overflow-hidden hover:scale-105 transition-transform shadow-lg cursor-pointer',
  skillBall: 'rounded-full shadow-ball flex items-center justify-center text-white font-wii font-bold text-sm cursor-pointer hover:scale-110 transition-transform',

  // Misc
  divider: 'border-white/30',
  badge: 'bg-white/20 text-white font-wii text-sm px-3 py-1 rounded-full border border-white/30',
} as const
