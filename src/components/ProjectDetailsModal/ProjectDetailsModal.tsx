import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../../data/projects'
import { useTheme } from '../../context/ThemeContext'

interface ProjectDetailsModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  const { isFun } = useTheme()

  useEffect(() => {
    if (!project) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            className={`relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[32px] border ${isFun ? 'border-yellow-300/40 bg-[#101a33] text-white' : 'border-slate-200 bg-white text-slate-900'} shadow-2xl`}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={event => event.stopPropagation()}
          >
            <div className="max-h-[90vh] overflow-y-auto">
              <div className={`sticky top-0 z-10 border-b px-6 py-5 sm:px-8 ${isFun ? 'border-white/10 bg-[#101a33]/95' : 'border-slate-200 bg-white/95'} backdrop-blur`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={`mb-2 text-sm uppercase tracking-[0.3em] ${isFun ? 'font-wii text-yellow-300' : 'font-business text-slate-500'}`}>
                      Frame {project.frameNumber}
                    </p>
                    <h2 id="project-modal-title" className={`text-3xl font-bold ${isFun ? 'font-wii text-white' : 'font-business text-slate-950'}`}>
                      {project.title}
                    </h2>
                    <p className={`mt-2 max-w-2xl text-sm sm:text-base ${isFun ? 'font-wii text-white/75' : 'font-business text-slate-600'}`}>
                      {project.summary}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${isFun ? 'bg-white/10 font-wii text-white hover:bg-white/20' : 'bg-slate-100 font-business text-slate-700 hover:bg-slate-200'}`}
                    aria-label="Close project details"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="grid gap-8 px-6 py-6 sm:px-8 lg:grid-cols-[1.4fr_0.9fr]">
                <div className="space-y-8">
                  <div className="grid gap-4 md:grid-cols-2">
                    {project.screenshots.map(shot => (
                      <div key={shot.title} className={`overflow-hidden rounded-[24px] border ${isFun ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
                        <div className={`relative min-h-[220px] bg-gradient-to-br ${shot.accent} p-5`}>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_38%)]" />
                          <div className="relative flex h-full flex-col justify-between gap-6">
                            <div>
                              <p className="text-xs uppercase tracking-[0.3em] text-white/80">Screenshot</p>
                              <h3 className="mt-2 text-2xl font-semibold text-white">{shot.title}</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                              {shot.metrics.map(metric => (
                                <span key={metric} className="rounded-2xl bg-white/15 px-3 py-2 text-center text-xs font-medium text-white backdrop-blur-sm">
                                  {metric}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className={`px-5 py-4 text-sm leading-relaxed ${isFun ? 'font-wii text-white/75' : 'font-business text-slate-600'}`}>
                          {shot.caption}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <section className={`rounded-[24px] border p-5 ${isFun ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
                      <h3 className={`text-lg font-semibold ${isFun ? 'font-wii text-white' : 'font-business text-slate-900'}`}>Key Features</h3>
                      <ul className="mt-4 space-y-3">
                        {project.features.map(feature => (
                          <li key={feature} className={`rounded-2xl px-4 py-3 text-sm ${isFun ? 'bg-white/5 font-wii text-white/80' : 'bg-slate-50 font-business text-slate-600'}`}>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className={`rounded-[24px] border p-5 ${isFun ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
                      <h3 className={`text-lg font-semibold ${isFun ? 'font-wii text-white' : 'font-business text-slate-900'}`}>Architecture Highlights</h3>
                      <ul className="mt-4 space-y-3">
                        {project.architecture.map(item => (
                          <li key={item} className={`rounded-2xl px-4 py-3 text-sm ${isFun ? 'bg-white/5 font-wii text-white/80' : 'bg-slate-50 font-business text-slate-600'}`}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>

                <aside className="space-y-6">
                  <section className={`rounded-[24px] border p-5 ${isFun ? 'border-yellow-300/20 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
                    <p className={`text-xs uppercase tracking-[0.3em] ${isFun ? 'font-wii text-yellow-300' : 'font-business text-slate-500'}`}>Tech Stack</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map(item => (
                        <span key={item} className={`rounded-full px-3 py-2 text-sm ${isFun ? 'bg-white/10 font-wii text-white' : 'bg-white font-business text-slate-700 border border-slate-200'}`}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section className={`rounded-[24px] border p-5 ${isFun ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
                    <p className={`text-xs uppercase tracking-[0.3em] ${isFun ? 'font-wii text-yellow-300' : 'font-business text-slate-500'}`}>Project Snapshot</p>
                    <div className="mt-4 space-y-3">
                      <div className={`rounded-2xl px-4 py-3 ${isFun ? 'bg-white/5 font-wii text-white' : 'bg-slate-50 font-business text-slate-700'}`}>
                        <span className="block text-xs opacity-70">Frame</span>
                        <span className="mt-1 block text-lg font-semibold">{project.frameNumber}</span>
                      </div>
                      <div className={`rounded-2xl px-4 py-3 ${isFun ? 'bg-white/5 font-wii text-white' : 'bg-slate-50 font-business text-slate-700'}`}>
                        <span className="block text-xs opacity-70">Score</span>
                        <span className="mt-1 block text-lg font-semibold">{project.scoreMarks[0]} {project.scoreMarks[1]} · {project.totalScore}</span>
                      </div>
                    </div>
                  </section>

                  <section className="grid gap-3">
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`rounded-2xl px-5 py-3 text-center text-sm font-semibold transition-transform hover:-translate-y-0.5 ${isFun ? 'bg-gradient-to-r from-sky-400 to-blue-500 font-wii text-white' : 'bg-slate-950 font-business text-white'}`}
                      >
                        View Live Demo
                      </a>
                    ) : (
                      <span className={`rounded-2xl px-5 py-3 text-center text-sm font-semibold ${isFun ? 'bg-white/10 font-wii text-white/40' : 'bg-slate-100 font-business text-slate-400'}`} aria-disabled="true">
                        Live Demo Not Available
                      </span>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-2xl px-5 py-3 text-center text-sm font-semibold transition-colors ${isFun ? 'border border-white/20 bg-white/10 font-wii text-white hover:bg-white/20' : 'border border-slate-300 bg-white font-business text-slate-800 hover:bg-slate-50'}`}
                    >
                      View GitHub Repository
                    </a>
                  </section>
                </aside>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
