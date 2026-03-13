import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { projects, type Project } from '../../data/projects'

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 22 } },
}

// Fun Mode: Bowling scoreboard frame
function ScoreboardFrame({ project, index, isExpanded, onToggle }: {
  project: Project
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const frameColors = ['bg-ball-blue', 'bg-ball-red', 'bg-ball-purple', 'bg-ball-green']
  const ballColor = frameColors[index % frameColors.length]

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="cursor-pointer"
      onClick={onToggle}
      whileHover={{ scale: isExpanded ? 1 : 1.03 }}
      whileTap={{ scale: 0.97 }}
      role="button"
      aria-expanded={isExpanded}
      aria-label={`${project.title} project frame`}
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle() } }}
    >
      <div
        className={`
          rounded-xl overflow-hidden border-2 border-yellow-400/50 shadow-lg
          bg-gradient-to-b from-[#1A1A2E] to-[#16213E]
          ${isExpanded ? 'ring-2 ring-yellow-400' : ''}
        `}
      >
        {/* Frame header */}
        <div className="flex items-center gap-3 px-4 pt-3 pb-2 border-b border-white/10">
          <div
            className={`
              w-8 h-8 rounded-full ${ballColor} shadow-ball
              flex items-center justify-center text-white font-wii font-black text-sm
            `}
          >
            {project.frameNumber}
          </div>
          <span className="text-yellow-300 font-wii font-bold text-sm uppercase tracking-wider">
            Frame {project.frameNumber}
          </span>
          <div className="ml-auto flex gap-1">
            <div className="w-6 h-6 border border-yellow-400/40 rounded flex items-center justify-center">
              <span className="text-yellow-400 text-xs font-bold">X</span>
            </div>
            <div className="w-6 h-6 border border-yellow-400/40 rounded flex items-center justify-center">
              <span className="text-yellow-400 text-xs font-bold">/</span>
            </div>
          </div>
        </div>

        {/* Frame content */}
        <div className="p-4">
          <h3 className="text-white font-wii font-black text-lg mb-1 leading-tight">
            {project.title}
          </h3>
          <p className="text-white/70 font-wii text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech badges */}
        <div className="px-4 pb-3 flex flex-wrap gap-1.5">
          {project.tech.map(t => (
            <span
              key={t}
              className="bg-white/10 text-white/70 font-wii text-xs px-2 py-0.5 rounded-full border border-white/20"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Expanded details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-2 border-t border-white/10 flex gap-2">
                <a
                  href={project.demo || '#'}
                  className="flex-1 text-center bg-gradient-to-b from-sky-400 to-sky-600 text-white font-wii font-bold text-sm py-2 rounded-full border-b-2 border-sky-700 hover:-translate-y-0.5 transition-transform"
                  onClick={e => e.stopPropagation()}
                  aria-label={`View ${project.title} demo`}
                >
                  ▶ View Project
                </a>
                <a
                  href={project.github || '#'}
                  className="flex-1 text-center bg-white/15 text-white font-wii font-bold text-sm py-2 rounded-full border border-white/30 hover:bg-white/25 transition-colors"
                  onClick={e => e.stopPropagation()}
                  aria-label={`View ${project.title} code`}
                >
                  {'</>'}  Code
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bowling pin decoration */}
        <div className="absolute top-3 right-3 text-white/10 text-2xl pointer-events-none" aria-hidden="true">
          🎳
        </div>
      </div>
    </motion.div>
  )
}

// Business Mode: Clean card
function BusinessCard({ project, isExpanded, onToggle }: {
  project: Project
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      variants={cardVariants}
      layout
      className={`
        bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer
        shadow-card-business hover:shadow-card-business-hover transition-shadow
        ${isExpanded ? 'ring-2 ring-gray-900' : ''}
      `}
      onClick={onToggle}
      whileHover={{ y: isExpanded ? 0 : -2 }}
      role="button"
      aria-expanded={isExpanded}
      aria-label={`${project.title} project card`}
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle() } }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-business font-semibold text-gray-900 text-lg leading-tight">
            {project.title}
          </h3>
          <span className="text-gray-400 text-sm font-business font-medium">
            0{project.frameNumber}
          </span>
        </div>
        <p className="font-business text-gray-500 text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map(t => (
            <span
              key={t}
              className="bg-gray-100 text-gray-600 font-business text-xs px-2.5 py-1 rounded-md"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex gap-2">
              <a
                href={project.demo || '#'}
                className="flex-1 text-center bg-gray-900 text-white font-business font-medium text-sm py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={e => e.stopPropagation()}
                aria-label={`View ${project.title} demo`}
              >
                View Project
              </a>
              <a
                href={project.github || '#'}
                className="flex-1 text-center bg-white text-gray-700 font-business font-medium text-sm py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                onClick={e => e.stopPropagation()}
                aria-label={`View ${project.title} source code`}
              >
                View Code
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Projects() {
  const { isFun } = useTheme()
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggle = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  return (
    <section
      id="projects"
      className={`py-20 px-4 sm:px-6 lg:px-8 ${isFun ? '' : 'bg-white'}`}
      aria-label="Projects section"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {isFun ? (
            <>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-4 border border-white/30">
                <span className="text-yellow-300 text-sm font-wii font-bold uppercase tracking-widest">
                  🎳 Scoreboard
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-wii font-black text-white drop-shadow-lg">
                My Projects
              </h2>
              <p className="text-white/80 font-wii mt-3 text-lg">
                Click a frame to see details
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-500 font-business text-sm uppercase tracking-widest mb-3">
                Portfolio
              </p>
              <h2 className="text-3xl sm:text-4xl font-business font-bold text-gray-900">
                Projects
              </h2>
              <p className="text-gray-500 font-business mt-3">
                Click a card to see details
              </p>
            </>
          )}
        </motion.div>

        {/* Fun mode: scoreboard-style header bar */}
        {isFun && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            className="hidden sm:flex bg-gradient-to-r from-[#1A1A2E] to-[#16213E] rounded-t-xl border border-yellow-400/30 overflow-hidden mb-0 -mb-[1px]"
          >
            {projects.map((p, i) => (
              <div
                key={p.id}
                className={`
                  flex-1 text-center py-2 text-yellow-400 font-wii font-bold text-sm border-r border-yellow-400/20 last:border-r-0
                  ${i % 2 === 0 ? 'bg-white/5' : ''}
                `}
              >
                {p.title}
              </div>
            ))}
          </motion.div>
        )}

        {/* Project grid */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {projects.map((project, index) =>
            isFun ? (
              <ScoreboardFrame
                key={project.id}
                project={project}
                index={index}
                isExpanded={expandedId === project.id}
                onToggle={() => toggle(project.id)}
              />
            ) : (
              <BusinessCard
                key={project.id}
                project={project}
                isExpanded={expandedId === project.id}
                onToggle={() => toggle(project.id)}
              />
            )
          )}
        </motion.div>
      </div>
    </section>
  )
}
