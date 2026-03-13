import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

export default function ModeToggle() {
  const { mode, toggleMode } = useTheme()
  const isFun = mode === 'fun'

  return (
    <motion.div
      className="fixed top-4 left-1/2 z-50"
      style={{ translateX: '-50%' }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.3 }}
    >
      <div
        className={`
          flex items-center gap-2 rounded-full px-3 py-2 shadow-lg cursor-pointer
          select-none transition-colors duration-500
          ${isFun
            ? 'bg-white/25 backdrop-blur-md border border-white/40'
            : 'bg-white border border-gray-200 shadow-md'
          }
        `}
        onClick={toggleMode}
        role="switch"
        aria-checked={!isFun}
        aria-label="Toggle between Fun Mode and Business Mode"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMode() } }}
      >
        {/* Fun label */}
        <motion.span
          className={`
            flex items-center gap-1.5 text-sm font-bold pr-1 transition-all duration-300
            ${isFun
              ? 'text-white drop-shadow font-wii'
              : 'text-gray-400 font-business'
            }
          `}
          animate={{ scale: isFun ? 1.05 : 0.95 }}
        >
          <span className="text-base" role="img" aria-label="bowling">🎳</span>
          <span className="hidden sm:inline">Fun Mode</span>
        </motion.span>

        {/* Track */}
        <div
          className={`
            relative w-12 h-6 rounded-full transition-colors duration-500
            ${isFun ? 'bg-wii-blue' : 'bg-gray-300'}
          `}
        >
          <motion.div
            className={`
              absolute top-0.5 w-5 h-5 rounded-full shadow-md
              ${isFun ? 'bg-white' : 'bg-gray-700'}
            `}
            animate={{ left: isFun ? '2px' : '26px' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </div>

        {/* Business label */}
        <motion.span
          className={`
            flex items-center gap-1.5 text-sm font-bold pl-1 transition-all duration-300
            ${!isFun
              ? 'text-gray-800 font-business'
              : 'text-white/60 font-wii'
            }
          `}
          animate={{ scale: !isFun ? 1.05 : 0.95 }}
        >
          <span className="text-base" role="img" aria-label="briefcase">💼</span>
          <span className="hidden sm:inline">Business Mode</span>
        </motion.span>
      </div>
    </motion.div>
  )
}
