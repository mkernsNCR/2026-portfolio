import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const BowlingBall3D = lazy(() => import('./BowlingBall3D'))

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
}

export default function Hero({
  onViewProjects,
  onContact,
}: {
  onViewProjects: () => void
  onContact: () => void
}) {
  const { isFun } = useTheme()

  return (
    <section
      id="home"
      className={`
        relative min-h-screen flex items-center overflow-hidden
        ${isFun ? 'pt-20' : 'pt-16'}
      `}
      aria-label="Hero section"
    >
      {/* Fun mode: bowling lane background */}
      {isFun && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          {/* Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200" />
          {/* Lane perspective */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-[55%]"
            style={{
              background: 'linear-gradient(180deg, #C8922A 0%, #A0722A 60%, #8B6020 100%)',
              clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
            }}
          />
          {/* Lane guide arrows */}
          <div className="absolute bottom-[40%] left-1/2 -translate-x-1/2 flex gap-8">
            {[0, 1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="w-3 h-5 bg-red-500/70 rotate-180"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
              />
            ))}
          </div>
          {/* Pins silhouette */}
          <div className="absolute bottom-[52%] left-1/2 -translate-x-1/2 scale-75">
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-8 bg-white/80 rounded-full shadow" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-8 bg-white/80 rounded-full shadow" />
                <div className="w-3 h-8 bg-white/80 rounded-full shadow" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-8 bg-white/80 rounded-full shadow" />
                <div className="w-3 h-8 bg-white/80 rounded-full shadow" />
                <div className="w-3 h-8 bg-white/80 rounded-full shadow" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-8 bg-white/80 rounded-full shadow" />
                <div className="w-3 h-8 bg-white/80 rounded-full shadow" />
                <div className="w-3 h-8 bg-white/80 rounded-full shadow" />
                <div className="w-3 h-8 bg-white/80 rounded-full shadow" />
              </div>
            </div>
          </div>
          {/* Gutter lines */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-[55%] pointer-events-none"
            style={{ clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)' }}
          >
            <div className="absolute left-[16%] top-0 bottom-0 w-0.5 bg-black/20" />
            <div className="absolute left-[32%] top-0 bottom-0 w-0.5 bg-black/10" />
            <div className="absolute right-[16%] top-0 bottom-0 w-0.5 bg-black/20" />
            <div className="absolute right-[32%] top-0 bottom-0 w-0.5 bg-black/10" />
          </div>
          {/* Clouds */}
          {[
            { left: '5%', top: '8%', scale: 1 },
            { left: '20%', top: '5%', scale: 0.7 },
            { left: '75%', top: '10%', scale: 0.8 },
            { left: '88%', top: '6%', scale: 0.6 },
          ].map((c, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/70 rounded-full"
              style={{ left: c.left, top: c.top, width: `${80 * c.scale}px`, height: `${30 * c.scale}px` }}
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      {/* Business mode: subtle gradient */}
      {!isFun && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-slate-100 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left"
          >
            <motion.div variants={itemVariants}>
              <h1
                className={`
                  text-5xl sm:text-6xl lg:text-7xl mb-3 leading-tight
                  ${isFun
                    ? 'font-wii font-black text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]'
                    : 'font-business font-bold text-gray-900'
                  }
                `}
              >
                Matt Kerns
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p
                className={`
                  text-xl sm:text-2xl mb-4 font-semibold
                  ${isFun
                    ? 'font-wii text-yellow-200 drop-shadow-md'
                    : 'font-business text-gray-600'
                  }
                `}
              >
                Full Stack Engineer
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p
                className={`
                  text-base sm:text-lg mb-8 max-w-md leading-relaxed
                  ${isFun
                    ? 'font-wii text-white/90 drop-shadow'
                    : 'font-business text-gray-500'
                  }
                `}
              >
                Building modern web applications,{' '}
                <span className={isFun ? 'text-yellow-200 font-bold' : 'font-semibold text-gray-700'}>
                  developer tools
                </span>
                , and bowling focused applications.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onViewProjects}
                className={`
                  flex items-center gap-2 transition-all duration-200
                  ${isFun
                    ? 'bg-gradient-to-b from-sky-400 to-sky-600 text-white font-wii font-bold rounded-full px-7 py-3 shadow-wii border-b-4 border-sky-700 hover:-translate-y-0.5 hover:shadow-wii-hover active:translate-y-0.5 active:shadow-wii-active'
                    : 'bg-gray-900 text-white font-business font-medium px-7 py-3 rounded-lg hover:bg-gray-800 shadow-sm'
                  }
                `}
                aria-label="View projects"
              >
                {isFun && <span>▶</span>}
                View Projects
              </button>

              <button
                type="button"
                onClick={onContact}
                className={`
                  flex items-center gap-2 transition-all duration-200
                  ${isFun
                    ? 'bg-gradient-to-b from-orange-400 to-orange-600 text-white font-wii font-bold rounded-full px-7 py-3 shadow-wii border-b-4 border-orange-700 hover:-translate-y-0.5 hover:shadow-wii-hover active:translate-y-0.5 active:shadow-wii-active'
                    : 'bg-white text-gray-900 font-business font-medium px-7 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 shadow-sm'
                  }
                `}
                aria-label="Contact me"
              >
                {isFun && <span>🎳</span>}
                Contact
              </button>
            </motion.div>
          </motion.div>

          {/* Right: 3D Ball */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.4 }}
            className="relative flex items-center justify-center"
            style={{ height: '420px' }}
          >
            {/* Glow behind ball */}
            <div
              className={`
                absolute w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none
                ${isFun ? 'bg-sky-300' : 'bg-slate-300'}
              `}
              aria-hidden="true"
            />

            <Suspense
              fallback={
                <div
                  role="status"
                  aria-live="polite"
                  className={`
                    w-48 h-48 rounded-full flex items-center justify-center text-6xl
                    ${isFun ? 'bg-wii-blue animate-spin-slow' : 'bg-gray-200 animate-spin-slow'}
                  `}
                >
                  <span className="sr-only">Loading 3D bowling ball</span>
                  🎳
                </div>
              }
            >
              <BowlingBall3D isFun={isFun} />
            </Suspense>

            {/* Fun mode: shadow under ball */}
            {isFun && (
              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/20 rounded-full blur-md pointer-events-none"
                aria-hidden="true"
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
