import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../../data/projects'
import { useTheme } from '../../context/ThemeContext'

interface ProjectDetailsModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  const { isFun } = useTheme()
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!project) return

    const previousOverflow = document.body.style.overflow
    const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'

    const getFocusableElements = () => {
      const dialogElement = dialogRef.current
      if (!dialogElement) return []

      return Array.from(
        dialogElement.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter(element => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true')
    }

    requestAnimationFrame(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus()
        return
      }

      dialogRef.current?.focus()
    })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab') return

      const dialogElement = dialogRef.current
      if (!dialogElement) return

      const focusableElements = getFocusableElements()
      if (!focusableElements.length) {
        event.preventDefault()
        dialogElement.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null

      if (event.shiftKey) {
        if (!activeElement || activeElement === firstElement || !dialogElement.contains(activeElement)) {
          event.preventDefault()
          lastElement.focus()
        }
        return
      }

      if (!activeElement || activeElement === lastElement || !dialogElement.contains(activeElement)) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      previousActiveElement?.focus()
    }
  }, [project])

  const hasDemo = Boolean(project?.demo && project.demo !== '#')
  const hasGithub = Boolean(project?.github && project.github !== '#')

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
            ref={dialogRef}
            tabIndex={-1}
            className={`relative max-h-[90vh] w-full max-w-5xl overflow-hidden border ${isFun ? 'border-neon-pink/50 bg-deck text-white shadow-neon-pink' : 'border-ink/30 bg-white text-ink shadow-sheet'}`}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={event => event.stopPropagation()}
          >
            <div className="max-h-[90vh] overflow-y-auto">
              <div className={`sticky top-0 z-10 border-b px-6 py-5 sm:px-8 ${isFun ? 'border-deck-edge bg-deck/95' : 'border-hairline bg-white/95'} backdrop-blur`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={`mb-2 font-data text-[10px] uppercase tracking-[0.34em] ${isFun ? 'text-uv-cyan' : 'text-kegel'}`}>
                      Frame {String(project.frameNumber).padStart(2, '0')}
                    </p>
                    <h2 id="project-modal-title" className={`font-marquee text-2xl sm:text-3xl ${isFun ? 'text-white' : 'text-ink'}`}>
                      {project.title}
                    </h2>
                    <p className={`mt-2 max-w-2xl text-sm sm:text-base ${isFun ? 'text-lav' : 'text-steel'}`}>
                      {project.summary}
                    </p>
                  </div>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    className={`border px-4 py-2 font-data text-xs uppercase tracking-[0.18em] transition-colors ${isFun ? 'border-deck-edge bg-void/40 text-lav hover:border-neon-pink hover:text-neon-pink' : 'border-hairline bg-paper text-steel hover:border-kegel hover:text-kegel'}`}
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
                      <div key={shot.title} className={`overflow-hidden border ${isFun ? 'border-deck-edge bg-void/30' : 'border-hairline bg-paper'}`}>
                        <div className={`relative min-h-[220px] bg-gradient-to-br ${shot.accent} p-5`}>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_38%)]" />
                          <div className="relative flex h-full flex-col justify-between gap-6">
                            <div>
                              <p className="font-data text-[10px] uppercase tracking-[0.3em] text-white/80">Screenshot</p>
                              <h3 className="mt-2 text-2xl font-semibold text-white">{shot.title}</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                              {shot.metrics.map(metric => (
                                <span key={metric} className="bg-white/15 px-3 py-2 text-center font-data text-[11px] font-medium text-white backdrop-blur-sm">
                                  {metric}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className={`px-5 py-4 text-sm leading-relaxed ${isFun ? 'text-lav' : 'text-steel'}`}>
                          {shot.caption}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <section className={`border p-5 ${isFun ? 'border-deck-edge bg-void/30' : 'border-hairline bg-white'}`}>
                      <h3 className={`font-data text-xs font-semibold uppercase tracking-[0.24em] ${isFun ? 'text-uv-cyan' : 'text-kegel'}`}>Key Features</h3>
                      <ul className="mt-4 space-y-3">
                        {project.features.map(feature => (
                          <li key={feature} className={`border-l-2 pl-4 text-sm leading-6 ${isFun ? 'border-uv-cyan/50 text-lav' : 'border-kegel/40 text-steel'}`}>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className={`border p-5 ${isFun ? 'border-deck-edge bg-void/30' : 'border-hairline bg-white'}`}>
                      <h3 className={`font-data text-xs font-semibold uppercase tracking-[0.24em] ${isFun ? 'text-uv-cyan' : 'text-kegel'}`}>Architecture Highlights</h3>
                      <ul className="mt-4 space-y-3">
                        {project.architecture.map(item => (
                          <li key={item} className={`border-l-2 pl-4 text-sm leading-6 ${isFun ? 'border-neon-pink/50 text-lav' : 'border-ink/30 text-steel'}`}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>

                <aside className="space-y-6">
                  <section className={`border p-5 ${isFun ? 'border-deck-edge bg-void/30' : 'border-hairline bg-paper'}`}>
                    <p className={`font-data text-[10px] uppercase tracking-[0.3em] ${isFun ? 'text-uv-cyan' : 'text-kegel'}`}>Tech Stack</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map(item => (
                        <span key={item} className={`border px-3 py-1.5 font-data text-xs ${isFun ? 'border-deck-edge bg-deck text-white' : 'border-hairline bg-white text-ink'}`}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section className={`border p-5 ${isFun ? 'border-deck-edge bg-void/30' : 'border-hairline bg-white'}`}>
                    <p className={`font-data text-[10px] uppercase tracking-[0.3em] ${isFun ? 'text-uv-cyan' : 'text-kegel'}`}>Project Snapshot</p>
                    <div className="mt-4 grid grid-cols-2 gap-3 font-data">
                      <div className={`border px-4 py-3 ${isFun ? 'border-deck-edge text-white' : 'border-hairline text-ink'}`}>
                        <span className="block text-[10px] uppercase tracking-[0.2em] opacity-70">Frame</span>
                        <span className="mt-1 block text-lg font-semibold">{String(project.frameNumber).padStart(2, '0')}</span>
                      </div>
                      <div className={`border px-4 py-3 ${isFun ? 'border-deck-edge text-pin-gold' : 'border-hairline text-kegel'}`}>
                        <span className="block text-[10px] uppercase tracking-[0.2em] opacity-70">Score</span>
                        <span className="mt-1 block text-lg font-semibold">{project.scoreMarks[0]} {project.scoreMarks[1]} · {project.totalScore}</span>
                      </div>
                    </div>
                  </section>

                  <section className="grid gap-3">
                    {hasDemo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`border px-5 py-3 text-center font-data text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${isFun ? 'border-neon-pink bg-neon-pink/10 text-neon-pink hover:bg-neon-pink hover:text-void' : 'border-ink bg-ink text-paper hover:bg-kegel hover:border-kegel'}`}
                      >
                        View Live Demo
                      </a>
                    ) : (
                      <span className={`border px-5 py-3 text-center font-data text-xs font-semibold uppercase tracking-[0.18em] ${isFun ? 'border-deck-edge text-lav/40' : 'border-hairline text-steel/50'}`} aria-disabled="true">
                        Live Demo Not Available
                      </span>
                    )}
                    {hasGithub ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`border px-5 py-3 text-center font-data text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${isFun ? 'border-uv-cyan/70 bg-uv-cyan/[0.06] text-uv-cyan hover:bg-uv-cyan hover:text-void' : 'border-kegel/60 bg-white text-kegel hover:bg-kegel hover:text-white'}`}
                      >
                        View GitHub Repository
                      </a>
                    ) : (
                      <span className={`border px-5 py-3 text-center font-data text-xs font-semibold uppercase tracking-[0.18em] ${isFun ? 'border-deck-edge text-lav/40' : 'border-hairline text-steel/50'}`} aria-disabled="true">
                        GitHub Link Not Available
                      </span>
                    )}
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
