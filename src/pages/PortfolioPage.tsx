import { Suspense, lazy, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { githubActivity, professionalSummary, projects, skills, skillStyleMap, type Project } from '../data/projects'
import { siteConfig } from '../data/site'
import ProjectDetailsModal from '../components/ProjectDetailsModal/ProjectDetailsModal'
import { scrollToSection } from '../utils/scrollToSection'

const BowlingBall3D = lazy(() => import('../components/Hero/BowlingBall3D'))

function ActionButton({
  label,
  onClick,
  href,
  variant,
  disabled,
  isFun,
}: {
  label: string
  onClick?: () => void
  href?: string
  variant: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  isFun: boolean
}) {
  const className = `${
    isFun
      ? variant === 'primary'
        ? 'bg-gradient-to-r from-sky-400 to-blue-500 font-wii text-white'
        : variant === 'secondary'
          ? 'bg-gradient-to-r from-orange-400 to-orange-500 font-wii text-white'
          : 'border border-white/20 bg-white/10 font-wii text-white'
      : variant === 'primary'
        ? 'bg-slate-950 font-business text-white'
        : variant === 'secondary'
          ? 'border border-slate-300 bg-white font-business text-slate-900'
          : 'bg-slate-100 font-business text-slate-600'
  } ${disabled ? 'cursor-not-allowed opacity-[0.55]' : 'hover:-translate-y-0.5'} inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`

  if (href && !disabled) {
    return (
      <a href={href} className={className} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {label}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className} disabled={disabled}>
      {label}
    </button>
  )
}

function HeroSection() {
  const { isFun } = useTheme()

  return (
    <section id="home" className="relative overflow-hidden px-4 pt-36 sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className={`relative overflow-hidden rounded-[36px] border px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16 ${isFun ? 'border-white/[0.15] bg-slate-950/[0.35] text-white backdrop-blur-sm' : 'border-slate-200 bg-white/[0.85] text-slate-950 shadow-xl backdrop-blur-sm'}`}>
          {isFun ? (
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,25,52,0.25),rgba(14,25,52,0.62))]" />
              <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,#d6a24b_0%,#b37a2d_55%,#8f5b1d_100%)]" />
              <div className="absolute inset-x-[6%] bottom-0 h-[39%] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.16)_0,rgba(255,255,255,0.16)_4px,transparent_4px,transparent_80px)] opacity-50" />
              <motion.div
                className="absolute left-[-12%] top-[57%] h-10 w-10 rounded-full bg-ball-blue shadow-[0_20px_40px_rgba(27,111,214,0.45)]"
                animate={{ x: ['0%', '135%'], y: [0, -12, -16, 4], rotate: [0, 360, 720] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute left-[10%] top-[14%] h-px w-[42%] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ opacity: [0.25, 0.8, 0.25] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="absolute right-[7%] top-[12%] grid grid-cols-4 gap-3 opacity-30">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="h-12 w-5 rounded-full bg-white" />
                ))}
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_38%),radial-gradient(circle_at_bottom_right,#e2e8f0,transparent_42%),linear-gradient(135deg,#f8fafc,#ffffff_45%,#eef2ff)]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
            </div>
          )}

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className={`text-sm uppercase tracking-[0.35em] ${isFun ? 'font-wii text-yellow-300' : 'font-business text-slate-500'}`}>
                {siteConfig.role}
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }} className={`mt-4 max-w-3xl text-5xl font-black leading-[0.98] sm:text-6xl lg:text-7xl ${isFun ? 'font-wii text-white' : 'font-business text-slate-950'}`}>
                Matt Kerns
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }} className={`mt-5 max-w-2xl text-xl leading-relaxed sm:text-2xl ${isFun ? 'font-wii text-white/[0.88]' : 'font-business text-slate-600'}`}>
                Building modern web applications,
                <span className={isFun ? 'text-yellow-300' : 'text-slate-900'}> developer tools</span>, and tools and analytics platforms for bowling players and leagues.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }} className={`mt-5 max-w-2xl text-base leading-7 ${isFun ? 'font-wii text-white/[0.72]' : 'font-business text-slate-500'}`}>
                {siteConfig.headline}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }} className="mt-8 flex flex-wrap gap-3">
                <ActionButton label={isFun ? 'View Projects 🎳' : 'View Projects'} onClick={() => scrollToSection('projects')} variant="primary" isFun={isFun} />
                <ActionButton label={siteConfig.resumeHref ? 'Download Resume' : 'Resume Available on Request'} href={siteConfig.resumeHref || undefined} variant="secondary" isFun={isFun} disabled={!siteConfig.resumeHref} />
                <ActionButton label={isFun ? 'Contact Me 💬' : 'Contact Me'} onClick={() => scrollToSection('contact')} variant="ghost" isFun={isFun} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.25 }} className={`mt-8 grid gap-3 sm:grid-cols-3 ${isFun ? 'font-wii' : 'font-business'}`}>
                {[
                  { label: 'Focus', value: 'Modern product engineering' },
                  { label: 'Specialty', value: 'Developer tools + bowling analytics' },
                  { label: 'Mode', value: isFun ? 'Creative recruiter experience' : 'Professional portfolio view' },
                ].map(item => (
                  <div key={item.label} className={`rounded-2xl border px-4 py-4 ${isFun ? 'border-white/10 bg-white/[0.08] text-white/80' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
                    <span className="block text-xs uppercase tracking-[0.25em] opacity-70">{item.label}</span>
                    <span className={`mt-2 block text-sm font-semibold ${isFun ? 'text-white' : 'text-slate-900'}`}>{item.value}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }} className="relative flex min-h-[360px] items-center justify-center lg:min-h-[460px]">
              <div className={`absolute inset-x-[16%] bottom-10 top-10 rounded-full blur-3xl ${isFun ? 'bg-sky-300/30' : 'bg-slate-300/40'}`} aria-hidden="true" />
              <div className="relative h-[320px] w-full max-w-[460px] lg:h-[420px]">
                <Suspense
                  fallback={
                    <div className={`flex h-full items-center justify-center rounded-[28px] border ${isFun ? 'border-white/10 bg-white/5 text-white' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                      <span className={`text-base ${isFun ? 'font-wii' : 'font-business'}`}>Loading 3D hero...</span>
                    </div>
                  }
                >
                  <BowlingBall3D isFun={isFun} />
                </Suspense>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SummarySection() {
  const { isFun } = useTheme()

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className={`rounded-[30px] border px-6 py-6 sm:px-8 ${isFun ? 'border-white/10 bg-slate-950/[0.35] backdrop-blur-sm' : 'border-slate-200 bg-white shadow-sm'}`}>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className={`text-sm uppercase tracking-[0.3em] ${isFun ? 'font-wii text-yellow-300' : 'font-business text-slate-500'}`}>Professional Summary</p>
              <p className={`mt-4 max-w-3xl text-lg leading-8 ${isFun ? 'font-wii text-white/[0.85]' : 'font-business text-slate-700'}`}>{professionalSummary}</p>
            </div>
            <div className={`grid gap-3 ${isFun ? 'font-wii' : 'font-business'}`}>
              {[
                'Full stack engineer specializing in product-minded frontend execution',
                'Experienced with React, Node.js, Fastify, Docker, AI systems, and cloud workflows',
                'Combines niche bowling product strategy with polished recruiter-friendly storytelling',
              ].map(item => (
                <div key={item} className={`rounded-2xl px-4 py-3 text-sm ${isFun ? 'bg-white/[0.08] text-white/75' : 'bg-slate-50 text-slate-600'}`}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ScoreboardStrip() {
  const { isFun } = useTheme()

  if (!isFun) return null

  return (
    <div className="overflow-hidden rounded-[28px] border border-yellow-300/25 bg-[#0f1a31] text-white shadow-xl">
      <div className="grid grid-cols-[110px_repeat(4,minmax(0,1fr))] border-b border-white/10 text-xs uppercase tracking-[0.3em] text-yellow-300">
        <div className="px-4 py-3 font-wii">Frame</div>
        {projects.map(project => (
          <div key={project.id} className="border-l border-white/10 px-4 py-3 text-center font-wii">
            {project.frameNumber}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[110px_repeat(4,minmax(0,1fr))] border-b border-white/10 text-sm text-white/80">
        <div className="px-4 py-4 font-wii">Score</div>
        {projects.map(project => (
          <div key={project.id} className="grid grid-cols-2 border-l border-white/10 font-wii">
            <span className="border-r border-white/10 px-4 py-4 text-center">{project.scoreMarks[0]}</span>
            <span className="px-4 py-4 text-center">{project.scoreMarks[1]}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[110px_repeat(4,minmax(0,1fr))] text-sm text-white">
        <div className="px-4 py-4 font-wii text-yellow-300">Total</div>
        {projects.map(project => (
          <div key={project.id} className="border-l border-white/10 px-4 py-4 text-center font-wii">
            {project.totalScore}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  const { isFun } = useTheme()
  const ballColors = ['bg-ball-blue', 'bg-ball-red', 'bg-ball-purple', 'bg-ball-green']
  const ballColor = ballColors[index % ballColors.length]

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project)}
      whileHover={isFun ? { y: -6, rotate: -0.4 } : { y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left ${isFun ? 'rounded-[28px] border border-yellow-300/30 bg-[#101a33] text-white shadow-xl' : 'rounded-[28px] border border-slate-200 bg-white text-slate-900 shadow-sm hover:shadow-xl'} overflow-hidden transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
      aria-label={`Open details for ${project.title}`}
    >
      {isFun ? (
        <div>
          <div className="grid grid-cols-[78px_1fr_76px] border-b border-white/10">
            <div className="border-r border-white/10 px-4 py-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-black text-white shadow-ball ${ballColor}`}>
                {project.frameNumber}
              </div>
            </div>
            <div className="grid grid-cols-2 border-r border-white/10 text-center font-wii text-2xl text-yellow-300">
              <span className="border-r border-white/10 px-3 py-4">{project.scoreMarks[0]}</span>
              <span className="px-3 py-4">{project.scoreMarks[1]}</span>
            </div>
            <div className="flex items-center justify-center px-3 py-4 font-wii text-lg text-white/90">{project.totalScore}</div>
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-yellow-300 font-wii">Frame {project.frameNumber}</p>
                <h3 className="mt-2 text-2xl font-black font-wii">{project.title}</h3>
                <p className="mt-2 text-sm font-wii text-white/75">{project.tagline}</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-wii text-white/75">Open</span>
            </div>
            <p className="mt-4 text-sm leading-7 font-wii text-white/[0.78]">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map(item => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-wii text-white/75">{item}</span>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between gap-3 text-xs font-wii text-white/60" aria-hidden="true">
              <span>Includes live demo, screenshots, and code context</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Click to expand</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-business">Project 0{project.frameNumber}</p>
              <h3 className="mt-2 text-2xl font-bold font-business text-slate-950">{project.title}</h3>
              <p className="mt-2 text-sm font-business text-slate-500">{project.tagline}</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-business text-slate-600">Details</span>
          </div>
          <p className="mt-4 text-sm leading-7 font-business text-slate-600">{project.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map(item => (
              <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-business text-slate-600">{item}</span>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between gap-3 text-xs font-business text-slate-500" aria-hidden="true">
            <span>Includes demo, architecture notes, and repository details</span>
            <span className="rounded-full border border-slate-200 px-3 py-1 text-slate-600">Click to expand</span>
          </div>
        </div>
      )}
    </motion.button>
  )
}

function ProjectsSection({ onOpen }: { onOpen: (project: Project) => void }) {
  const { isFun } = useTheme()

  return (
    <section id="projects" className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className={`text-sm uppercase tracking-[0.3em] ${isFun ? 'font-wii text-yellow-300' : 'font-business text-slate-500'}`}>{isFun ? 'Scoreboard Projects' : 'Selected Work'}</p>
            <h2 className={`mt-3 text-4xl font-black ${isFun ? 'font-wii text-white' : 'font-business text-slate-950'}`}>Projects</h2>
            <p className={`mt-3 max-w-2xl text-base leading-7 ${isFun ? 'font-wii text-white/[0.78]' : 'font-business text-slate-600'}`}>
              Every project includes stronger context, clearer calls to action, and a detail view with screenshots, features, architecture highlights, GitHub access, and live demo status.
            </p>
          </div>
          <div className={`rounded-full px-4 py-2 text-sm ${isFun ? 'bg-white/10 font-wii text-white/70' : 'bg-slate-100 font-business text-slate-600'}`}>
            Click any project to open the full modal brief.
          </div>
        </div>

        <ScoreboardStrip />

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const { isFun } = useTheme()
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  return (
    <section id="skills" className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className={`text-sm uppercase tracking-[0.3em] ${isFun ? 'font-wii text-yellow-300' : 'font-business text-slate-500'}`}>{isFun ? 'Ball Rack Skills' : 'Core Skills'}</p>
          <h2 className={`mt-3 text-4xl font-black ${isFun ? 'font-wii text-white' : 'font-business text-slate-950'}`}>Skills</h2>
          <p className={`mt-3 text-base ${isFun ? 'font-wii text-white/75' : 'font-business text-slate-600'}`}>
            {isFun ? 'Hover each bowling ball to see what it represents.' : 'A practical toolkit for shipping polished, modern products.'}
          </p>
        </div>

        {isFun ? (
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/[0.35] px-6 py-10 backdrop-blur-sm">
            <div className="absolute inset-x-10 bottom-5 h-6 rounded-full bg-[linear-gradient(180deg,#8b5e20,#5f3d0d)] shadow-xl" aria-hidden="true" />
            <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map(skill => {
                const { color } = skillStyleMap[skill.colorKey]
                const visible = activeSkill === skill.name
                return (
                  <div key={skill.name} className="relative flex flex-col items-center text-center">
                    <button
                      type="button"
                      onMouseEnter={() => setActiveSkill(skill.name)}
                      onMouseLeave={() => setActiveSkill(null)}
                      onFocus={() => setActiveSkill(skill.name)}
                      onBlur={() => setActiveSkill(null)}
                      className="group flex flex-col items-center rounded-[28px] px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      aria-label={`${skill.name}: ${skill.description}`}
                    >
                      <motion.div
                        whileHover={{ rotate: 18, scale: 1.06, y: -8 }}
                        transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                        className="relative flex h-28 w-28 items-center justify-center rounded-full shadow-ball"
                        style={{ background: `radial-gradient(circle at 30% 30%, #ffffff, ${color} 38%, ${color} 60%, rgba(0,0,0,0.35) 100%)` }}
                      >
                        <span className="absolute left-[34%] top-[24%] h-3 w-3 rounded-full bg-black/45" />
                        <span className="absolute left-[52%] top-[18%] h-3 w-3 rounded-full bg-black/45" />
                        <span className="absolute left-[50%] top-[36%] h-3 w-3 rounded-full bg-black/45" />
                        <span className="absolute right-5 top-5 h-5 w-5 rounded-full bg-white/35 blur-sm" />
                      </motion.div>
                      <span className="mt-4 text-lg font-black font-wii text-white">🎳 {skill.name}</span>
                    </button>
                    <motion.div
                      animate={{ opacity: visible ? 1 : 0.65, y: visible ? 0 : 8 }}
                      className="mt-3 min-h-[72px] max-w-xs rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-wii text-white/[0.78]"
                    >
                      {skill.description}
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map(skill => {
              const { color } = skillStyleMap[skill.colorKey]
              return (
                <div key={skill.name} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-4 w-4 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
                    <h3 className="text-lg font-semibold font-business text-slate-900">{skill.name}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 font-business text-slate-600">{skill.description}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

function GitHubSection() {
  const { isFun } = useTheme()

  const heatColors = useMemo(() => (isFun
    ? ['bg-white/[0.08]', 'bg-sky-900/60', 'bg-sky-700/70', 'bg-sky-500/80', 'bg-yellow-300']
    : ['bg-slate-100', 'bg-slate-200', 'bg-sky-200', 'bg-sky-400', 'bg-slate-900']), [isFun])
  const contributionValues = useMemo(() => githubActivity.contributionGraph.flat(), [])
  const activeContributionDays = contributionValues.filter(value => value > 0).length
  const highestContribution = Math.max(...contributionValues)

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className={`rounded-[32px] border px-6 py-8 sm:px-8 ${isFun ? 'border-white/10 bg-slate-950/[0.35] backdrop-blur-sm' : 'border-slate-200 bg-white shadow-sm'}`}>
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={`text-sm uppercase tracking-[0.3em] ${isFun ? 'font-wii text-yellow-300' : 'font-business text-slate-500'}`}>GitHub Activity</p>
              <h2 className={`mt-3 text-4xl font-black ${isFun ? 'font-wii text-white' : 'font-business text-slate-950'}`}>Development Activity</h2>
              <p className={`mt-3 max-w-2xl text-base leading-7 ${isFun ? 'font-wii text-white/75' : 'font-business text-slate-600'}`}>
                A lightweight recruiter-friendly snapshot of contribution momentum, recent repository focus, and visible open-source activity.
              </p>
            </div>
            <ActionButton label="View GitHub Profile" href={siteConfig.github} variant="ghost" isFun={isFun} />
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div role="img" aria-label={`GitHub contribution heatmap showing ${activeContributionDays} active days with intensity levels from 0 to ${highestContribution}.`} className={`grid grid-cols-12 gap-2 rounded-[28px] border p-5 ${isFun ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
                {githubActivity.contributionGraph.flatMap((row, rowIndex) => row.map((value, columnIndex) => (
                  <div
                    key={`${rowIndex}-${columnIndex}`}
                    className={`aspect-square rounded-md ${heatColors[value]}`}
                    aria-hidden="true"
                  />
                )))}
              </div>
            </div>
            <div className="grid gap-4">
              {githubActivity.repositories.map(repo => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-[24px] border p-5 transition-transform hover:-translate-y-0.5 ${isFun ? 'border-white/10 bg-white/5 text-white' : 'border-slate-200 bg-white text-slate-900'}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className={`text-lg font-semibold ${isFun ? 'font-wii' : 'font-business'}`}>{repo.name}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs ${isFun ? 'bg-white/10 font-wii text-yellow-300' : 'bg-slate-100 font-business text-slate-600'}`}>★ {repo.stars}</span>
                  </div>
                  <p className={`mt-3 text-sm leading-7 ${isFun ? 'font-wii text-white/75' : 'font-business text-slate-600'}`}>{repo.description}</p>
                  <div className={`mt-4 text-xs uppercase tracking-[0.28em] ${isFun ? 'font-wii text-white/55' : 'font-business text-slate-500'}`}>{repo.language}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MiniBowlingGame() {
  const { isFun } = useTheme()
  const [rollCount, setRollCount] = useState(0)

  const revealed = Math.min(projects.length, rollCount)
  const standingPins = projects.length - revealed

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className={`overflow-hidden rounded-[32px] border px-6 py-8 sm:px-8 ${isFun ? 'border-white/10 bg-slate-950/[0.35] text-white backdrop-blur-sm' : 'border-slate-200 bg-white text-slate-900 shadow-sm'}`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={`text-sm uppercase tracking-[0.3em] ${isFun ? 'font-wii text-yellow-300' : 'font-business text-slate-500'}`}>Mini Bowling Game</p>
              <h2 className={`mt-3 text-4xl font-black ${isFun ? 'font-wii text-white' : 'font-business text-slate-950'}`}>Roll the Ball to Reveal Projects</h2>
              <p className={`mt-3 max-w-2xl text-base leading-7 ${isFun ? 'font-wii text-white/75' : 'font-business text-slate-600'}`}>
                Each roll knocks down another set of pins and surfaces another project card, giving recruiters an interactive way to explore your portfolio depth.
              </p>
            </div>
            <ActionButton
              label={revealed < projects.length ? 'Roll the Ball' : 'Reset Lane'}
              onClick={() => setRollCount(current => revealed < projects.length ? current + 1 : 0)}
              variant="primary"
              isFun={isFun}
            />
          </div>

          <div className={`mt-8 overflow-hidden rounded-[28px] border p-5 ${isFun ? 'border-white/10 bg-[#11203d]' : 'border-slate-200 bg-slate-50'}`}>
            <div className="relative h-44 overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(125,211,252,0.15),transparent_30%),linear-gradient(180deg,#d8a45d,#ba7e31_58%,#905a1b)]">
              <div className="absolute inset-x-[7%] bottom-0 top-[34%] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_4px,transparent_4px,transparent_74px)] opacity-45" />
              <motion.div
                key={rollCount}
                initial={{ x: '-10%', rotate: 0, opacity: 0.75 }}
                animate={{ x: rollCount ? '108%' : '-10%', rotate: rollCount ? 900 : 0, opacity: rollCount ? [0.85, 1, 0.92] : 0.75 }}
                transition={{ duration: rollCount ? 1.4 : 0.2, ease: 'easeInOut' }}
                className="absolute bottom-7 left-0 h-12 w-12 rounded-full bg-ball-blue shadow-[0_14px_28px_rgba(27,111,214,0.4)]"
              />
              <div
                role="img"
                aria-label={`Bowling lane pin display showing ${revealed} knocked pins and ${standingPins} standing pins.`}
                className="absolute right-10 top-7 grid grid-cols-4 gap-2"
              >
                {projects.map((project, index) => {
                  const knocked = index < revealed
                  return (
                    <motion.div
                      key={project.id}
                      animate={knocked ? { rotate: index % 2 === 0 ? 35 : -28, y: 22, opacity: 0.35 } : { rotate: 0, y: 0, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                      className="h-12 w-5 rounded-full bg-white shadow-pin"
                      aria-hidden="true"
                    />
                  )
                })}
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-4">
              {projects.map((project, index) => {
                const visible = index < revealed
                return (
                  <motion.div
                    key={project.id}
                    initial={false}
                    animate={{ opacity: visible ? 1 : 0.35, y: visible ? 0 : 8, scale: visible ? 1 : 0.98 }}
                    className={`rounded-[24px] border p-4 ${visible ? isFun ? 'border-yellow-300/30 bg-white/5' : 'border-slate-200 bg-white' : isFun ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'} transition-all`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs ${isFun ? 'bg-white/10 font-wii text-yellow-300' : 'bg-slate-100 font-business text-slate-600'}`}>Frame {project.frameNumber}</span>
                      <span className={`text-xs ${isFun ? 'font-wii text-white/60' : 'font-business text-slate-500'}`}>{visible ? 'Revealed' : 'Waiting'}</span>
                    </div>
                    <h3 className={`mt-4 text-lg font-semibold ${isFun ? 'font-wii text-white' : 'font-business text-slate-900'}`}>{project.title}</h3>
                    <p className={`mt-2 text-sm leading-7 ${isFun ? 'font-wii text-white/[0.72]' : 'font-business text-slate-600'}`}>{project.tagline}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const { isFun } = useTheme()

  const links = [
    { label: 'GitHub', href: siteConfig.github, enabled: Boolean(siteConfig.github) },
    { label: 'LinkedIn', href: siteConfig.linkedin, enabled: Boolean(siteConfig.linkedin) },
    { label: 'Email', href: siteConfig.email ? `mailto:${siteConfig.email}` : '', enabled: Boolean(siteConfig.email) },
    { label: 'Discord', href: siteConfig.discord, enabled: Boolean(siteConfig.discord) },
  ]

  return (
    <section id="contact" className="px-4 py-12 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className={`overflow-hidden rounded-[36px] border px-6 py-10 sm:px-8 lg:px-12 ${isFun ? 'border-yellow-300/25 bg-[#101a33] text-white shadow-2xl' : 'border-slate-200 bg-white text-slate-950 shadow-xl'}`}>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className={`text-sm uppercase tracking-[0.3em] ${isFun ? 'font-wii text-yellow-300' : 'font-business text-slate-500'}`}>Call To Action</p>
              <h2 className={`mt-3 text-4xl font-black ${isFun ? 'font-wii text-white' : 'font-business text-slate-950'}`}>Let's build something great.</h2>
              <p className={`mt-4 max-w-2xl text-base leading-7 ${isFun ? 'font-wii text-white/75' : 'font-business text-slate-600'}`}>
                Whether you're hiring, collaborating, or exploring bowling-focused product ideas, this portfolio is designed to make the work easy to evaluate and the next step easy to take.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ActionButton label="View Projects" onClick={() => scrollToSection('projects')} variant="primary" isFun={isFun} />
                <ActionButton label={siteConfig.resumeHref ? 'Download Resume' : 'Resume Available on Request'} href={siteConfig.resumeHref || undefined} variant="secondary" isFun={isFun} disabled={!siteConfig.resumeHref} />
                <ActionButton label="Contact Me" onClick={() => scrollToSection('contact')} variant="ghost" isFun={isFun} />
              </div>
            </div>

            <div className={`rounded-[28px] border p-6 ${isFun ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
              <div className="grid gap-3 sm:grid-cols-2">
                {links.map(link => link.enabled ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`rounded-2xl px-4 py-4 text-sm transition-colors ${isFun ? 'bg-white/10 font-wii text-white hover:bg-white/15' : 'bg-white font-business text-slate-700 hover:bg-slate-100 border border-slate-200'}`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <div key={link.label} className={`rounded-2xl px-4 py-4 text-sm ${isFun ? 'bg-white/[0.06] font-wii text-white/40' : 'bg-white/70 font-business text-slate-400 border border-slate-200'}`}>
                    {link.label} pending
                  </div>
                ))}
              </div>
              <div className={`mt-5 rounded-2xl px-4 py-4 text-sm leading-7 ${isFun ? 'bg-white/[0.06] font-wii text-white/[0.65]' : 'bg-white font-business text-slate-600 border border-slate-200'}`}>
                {siteConfig.email
                  ? `Email: ${siteConfig.email}`
                  : 'Add your real email, Discord link, and resume PDF to complete the final contact polish.'}
              </div>
            </div>
          </div>
        </div>

        <footer className={`pt-8 text-center text-sm ${isFun ? 'font-wii text-white/[0.45]' : 'font-business text-slate-500'}`}>
          © {new Date().getFullYear()} Matt Kerns. Built with React, Vite, Framer Motion, and Three.js.
        </footer>
      </div>
    </section>
  )
}

export default function PortfolioPage() {
  const { isFun } = useTheme()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <main className={`${isFun ? 'bg-[linear-gradient(180deg,#57aef7_0%,#3b82f6_28%,#1e3a8a_100%)]' : 'bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_45%,#e2e8f0_100%)]'} min-h-screen transition-colors duration-700`}>
      <HeroSection />
      <SummarySection />
      <ProjectsSection onOpen={setSelectedProject} />
      <SkillsSection />
      <GitHubSection />
      <MiniBowlingGame />
      <ContactSection />
      <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  )
}
