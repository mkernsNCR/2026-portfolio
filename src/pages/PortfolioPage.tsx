import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { githubActivity, professionalSummary, projects, skills, skillStyleMap, type Project } from '../data/projects'
import { siteConfig } from '../data/site'
import ProjectDetailsModal from '../components/ProjectDetailsModal/ProjectDetailsModal'
import { scrollToSection } from '../utils/scrollToSection'

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
  const BUTTON_STYLES: Record<'fun' | 'business', Record<'primary' | 'secondary' | 'ghost', string>> = {
    fun: {
      primary: 'border border-neon-pink bg-neon-pink/10 text-neon-pink shadow-neon-pink hover:bg-neon-pink hover:text-void',
      secondary: 'border border-uv-cyan/70 bg-uv-cyan/[0.06] text-uv-cyan hover:bg-uv-cyan hover:text-void',
      ghost: 'border border-deck-edge bg-deck text-lav hover:border-lav hover:text-white',
    },
    business: {
      primary: 'border border-ink bg-ink text-paper hover:bg-kegel hover:border-kegel',
      secondary: 'border border-kegel/60 bg-white text-kegel hover:bg-kegel hover:text-white',
      ghost: 'border border-hairline bg-white text-steel hover:border-steel hover:text-ink',
    },
  }

  const className = `${BUTTON_STYLES[isFun ? 'fun' : 'business'][variant]} ${disabled ? 'cursor-not-allowed opacity-[0.55]' : ''} inline-flex items-center justify-center px-5 py-3 font-data text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`

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

function LaneArrows({ isFun }: { isFun: boolean }) {
  const offsets = [0, 16, 32, 50, 32, 16, 0]

  return (
    <div className="flex items-start justify-center gap-4 sm:gap-6" aria-hidden="true">
      {offsets.map((offset, index) => (
        <motion.span
          key={index}
          className={`block h-8 w-4 [clip-path:polygon(50%_100%,0_0,100%_0)] ${
            index === 3
              ? isFun ? 'bg-pin-gold' : 'bg-kegel'
              : isFun ? 'bg-uv-cyan/80' : 'bg-ink/25'
          }`}
          style={{ marginTop: offset }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function HeroSection() {
  const { isFun } = useTheme()

  return (
    <section id="home" className="relative overflow-hidden px-4 pb-20 pt-44 sm:px-6 lg:px-8 lg:pt-52">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center gap-4 font-data text-[11px] uppercase tracking-[0.5em] ${isFun ? 'text-uv-cyan glow-cyan' : 'text-kegel'}`}
        >
          <span className={`h-px w-10 ${isFun ? 'bg-uv-cyan/60' : 'bg-kegel/50'}`} aria-hidden="true" />
          Full Stack Engineer
          <span className={`h-px w-10 ${isFun ? 'bg-uv-cyan/60' : 'bg-kegel/50'}`} aria-hidden="true" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className={`mt-8 font-marquee text-5xl leading-[1.08] sm:text-7xl lg:text-[6.5rem] ${isFun ? 'text-white glow-cyan' : 'text-ink'}`}
        >
          Matt <span className={isFun ? 'text-neon-pink glow-pink animate-flicker' : 'text-kegel'}>Kerns</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className={`mt-8 max-w-2xl text-lg leading-8 sm:text-xl ${isFun ? 'text-lav' : 'text-steel'}`}
        >
          {siteConfig.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <ActionButton label="View Projects" onClick={() => scrollToSection('projects')} variant="primary" isFun={isFun} />
          <ActionButton label={siteConfig.resumeHref ? 'Download Resume' : 'Resume on Request'} href={siteConfig.resumeHref || undefined} variant="secondary" isFun={isFun} disabled={!siteConfig.resumeHref} />
          <ActionButton label="Contact Me" onClick={() => scrollToSection('contact')} variant="ghost" isFun={isFun} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className={`mt-14 grid w-full max-w-3xl grid-cols-3 divide-x border font-data text-[11px] uppercase tracking-[0.2em] ${isFun ? 'divide-deck-edge border-deck-edge bg-deck/60' : 'divide-hairline border-hairline bg-white shadow-sheet'}`}
        >
          {[
            { label: 'Frames on the sheet', value: String(projects.length).padStart(2, '0') },
            { label: 'Running total', value: String(Math.max(...projects.map(project => project.totalScore))) },
            { label: 'Season', value: '2026' },
          ].map(stat => (
            <div key={stat.label} className="px-3 py-5 sm:px-6">
              <span className={`block text-2xl sm:text-3xl ${isFun ? 'text-pin-gold glow-gold' : 'text-ink'}`}>{stat.value}</span>
              <span className={`mt-2 block text-[9px] sm:text-[10px] ${isFun ? 'text-lav/80' : 'text-steel'}`}>{stat.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <LaneArrows isFun={isFun} />
        </motion.div>
      </div>
    </section>
  )
}

function SectionHeading({ eyebrow, title, isFun }: { eyebrow: string; title: string; isFun: boolean }) {
  return (
    <div>
      <p className={`font-data text-[11px] uppercase tracking-[0.4em] ${isFun ? 'text-uv-cyan' : 'text-kegel'}`}>{eyebrow}</p>
      <h2 className={`mt-3 font-marquee text-3xl sm:text-4xl ${isFun ? 'text-white' : 'text-ink'}`}>{title}</h2>
    </div>
  )
}

function SummarySection() {
  const { isFun } = useTheme()

  const specs = [
    { label: 'Style', value: 'Product-minded frontend execution' },
    { label: 'Equipment', value: 'React · Node.js · Fastify · Docker · AI · Cloud' },
    { label: 'House', value: 'Bowling analytics + developer tooling' },
  ]

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className={`border ${isFun ? 'border-deck-edge bg-deck/60' : 'border-hairline bg-white shadow-sheet'}`}>
          <div className={`border-b px-6 py-3 font-data text-[10px] uppercase tracking-[0.4em] ${isFun ? 'border-deck-edge text-neon-pink' : 'border-hairline text-kegel'}`}>
            Player Card · Kerns, M.
          </div>
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className={`px-6 py-8 sm:px-8 lg:border-r ${isFun ? 'lg:border-deck-edge' : 'lg:border-hairline'}`}>
              <p className={`max-w-3xl text-lg leading-8 ${isFun ? 'text-lav' : 'text-ink/80'}`}>{professionalSummary}</p>
            </div>
            <dl className={`divide-y ${isFun ? 'divide-deck-edge' : 'divide-hairline'}`}>
              {specs.map(spec => (
                <div key={spec.label} className="grid grid-cols-[92px_1fr] gap-4 px-6 py-4 sm:px-8">
                  <dt className={`font-data text-[10px] uppercase tracking-[0.24em] leading-6 ${isFun ? 'text-uv-cyan' : 'text-kegel'}`}>{spec.label}</dt>
                  <dd className={`m-0 text-sm leading-6 ${isFun ? 'text-white/85' : 'text-steel'}`}>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

function ScoreMarkBox({ mark, isFun }: { mark: string; isFun: boolean }) {
  const markColor = isFun ? 'text-neon-pink' : 'text-kegel'

  return (
    <span className={`relative flex h-8 w-8 items-center justify-center border font-data text-sm font-semibold ${isFun ? 'border-deck-edge bg-void/50' : 'border-ink/30 bg-white'} ${markColor}`}>
      {mark === '/' ? (
        <svg viewBox="0 0 32 32" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <line x1="4" y1="28" x2="28" y2="4" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      ) : mark === 'X' ? (
        <svg viewBox="0 0 32 32" className="absolute inset-[3px] h-auto w-auto" aria-hidden="true">
          <line x1="5" y1="5" x2="27" y2="27" stroke="currentColor" strokeWidth="2.5" />
          <line x1="27" y1="5" x2="5" y2="27" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      ) : (
        <span aria-hidden="true">{mark}</span>
      )}
      <span className="sr-only">{mark === 'X' ? 'strike' : mark === '/' ? 'spare' : mark}</span>
    </span>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const { isFun } = useTheme()

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      className={`w-full overflow-hidden border text-left transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        isFun
          ? 'border-deck-edge bg-deck/70 text-white hover:border-neon-pink/70 hover:shadow-neon-pink'
          : 'border-hairline bg-white text-ink shadow-sheet hover:border-kegel/50'
      }`}
      aria-label={`Open details for ${project.title}`}
    >
      <div className={`flex items-stretch justify-between border-b ${isFun ? 'border-deck-edge' : 'border-hairline'}`}>
        <div className={`flex items-center gap-3 px-5 py-3 font-data text-[10px] uppercase tracking-[0.3em] ${isFun ? 'text-uv-cyan' : 'text-kegel'}`}>
          Frame {String(project.frameNumber).padStart(2, '0')}
        </div>
        <div className="flex items-center gap-2 px-5 py-3">
          <ScoreMarkBox mark={project.scoreMarks[0]} isFun={isFun} />
          <ScoreMarkBox mark={project.scoreMarks[1]} isFun={isFun} />
          <span className={`ml-3 font-data text-xl font-semibold ${isFun ? 'text-pin-gold glow-gold' : 'text-ink'}`}>{project.totalScore}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className={`font-marquee text-xl sm:text-2xl ${isFun ? 'text-white' : 'text-ink'}`}>{project.title}</h3>
        <p className={`mt-2 text-sm ${isFun ? 'text-uv-cyan/90' : 'text-kegel'}`}>{project.tagline}</p>
        <p className={`mt-4 text-sm leading-7 ${isFun ? 'text-lav' : 'text-steel'}`}>{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map(item => (
            <span key={item} className={`border px-2.5 py-1 font-data text-[10px] uppercase tracking-[0.14em] ${isFun ? 'border-deck-edge bg-void/40 text-lav' : 'border-hairline bg-paper text-steel'}`}>
              {item}
            </span>
          ))}
        </div>
        <div className={`mt-6 flex items-center justify-between font-data text-[10px] uppercase tracking-[0.2em] ${isFun ? 'text-lav/70' : 'text-steel/80'}`} aria-hidden="true">
          <span>Demo · architecture · repository</span>
          <span className={isFun ? 'text-neon-pink' : 'text-kegel'}>Open frame →</span>
        </div>
      </div>
    </motion.button>
  )
}

function ProjectsSection({ onOpen }: { onOpen: (project: Project) => void }) {
  const { isFun } = useTheme()

  return (
    <section id="projects" className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Game 01 · The Scoresheet" title="Projects" isFun={isFun} />
          <p className={`max-w-md font-data text-[11px] uppercase leading-5 tracking-[0.16em] ${isFun ? 'text-lav/80' : 'text-steel'}`}>
            Four frames on the sheet. Open any frame for screenshots, architecture notes, and repository access.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} onOpen={onOpen} />
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
    <section id="skills" className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="The Arsenal · Ball Rack" title="Skills" isFun={isFun} />
          <p className={`max-w-md font-data text-[11px] uppercase leading-5 tracking-[0.16em] ${isFun ? 'text-lav/80' : 'text-steel'}`}>
            {isFun ? 'Six balls drilled for different lane conditions.' : 'Six pieces of equipment, spec’d for production conditions.'}
          </p>
        </div>

        {isFun ? (
          <div className="relative overflow-hidden border border-deck-edge bg-deck/60 px-6 pb-12 pt-10">
            <div className="absolute inset-x-8 bottom-6 h-1.5 bg-uv-cyan/40 shadow-neon-cyan" aria-hidden="true" />
            <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
                      className="group flex flex-col items-center px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      aria-label={`${skill.name}: ${skill.description}`}
                    >
                      <motion.div
                        whileHover={{ rotate: 14, scale: 1.05, y: -8 }}
                        transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                        className="relative flex h-24 w-24 items-center justify-center rounded-full ring-2 ring-white/10"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), ${color} 40%, ${color} 62%, rgba(0,0,0,0.5) 100%)`,
                          boxShadow: visible ? `0 0 26px ${color}` : `0 0 12px ${color}55`,
                        }}
                      >
                        <span className="absolute left-[36%] top-[26%] h-2.5 w-2.5 rounded-full bg-black/50" />
                        <span className="absolute left-[52%] top-[20%] h-2.5 w-2.5 rounded-full bg-black/50" />
                        <span className="absolute left-[50%] top-[37%] h-2.5 w-2.5 rounded-full bg-black/50" />
                      </motion.div>
                      <span className="mt-4 font-marquee text-sm text-white">{skill.name}</span>
                    </button>
                    <motion.p
                      animate={{ opacity: visible ? 1 : 0.55 }}
                      className="mt-2 min-h-[64px] max-w-xs text-sm leading-6 text-lav"
                    >
                      {skill.description}
                    </motion.p>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="border border-hairline bg-white shadow-sheet">
            <div className="grid grid-cols-[52px_1fr] border-b border-hairline font-data text-[10px] uppercase tracking-[0.3em] text-steel sm:grid-cols-[52px_180px_1fr]">
              <span className="px-4 py-3">No.</span>
              <span className="px-4 py-3">Equipment</span>
              <span className="hidden px-4 py-3 sm:block">Drilling notes</span>
            </div>
            <ul className="divide-y divide-hairline">
              {skills.map((skill, index) => {
                const { color } = skillStyleMap[skill.colorKey]
                return (
                  <li key={skill.name} className="grid grid-cols-[52px_1fr] items-center sm:grid-cols-[52px_180px_1fr]">
                    <span className="px-4 py-4 font-data text-xs text-kegel">{String(index + 1).padStart(2, '0')}</span>
                    <span className="flex items-center gap-3 px-4 py-4">
                      <span className="inline-flex h-3.5 w-3.5 rounded-full ring-1 ring-ink/20" style={{ backgroundColor: color }} aria-hidden="true" />
                      <h3 className="text-sm font-semibold text-ink">{skill.name}</h3>
                    </span>
                    <p className="col-span-2 px-4 pb-4 text-sm leading-6 text-steel sm:col-span-1 sm:py-4">{skill.description}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

function GitHubSection() {
  const { isFun } = useTheme()

  const heatColors = useMemo(() => (isFun
    ? ['bg-white/[0.06]', 'bg-neon-pink/25', 'bg-neon-pink/45', 'bg-neon-pink/75', 'bg-uv-cyan']
    : ['bg-ink/[0.05]', 'bg-kegel/20', 'bg-kegel/40', 'bg-kegel/65', 'bg-ink']), [isFun])
  const contributionValues = useMemo(() => githubActivity.contributionGraph.flat(), [])
  const activeContributionDays = contributionValues.filter(value => value > 0).length
  const highestContribution = Math.max(...contributionValues)

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Practice Log · GitHub" title="Development Activity" isFun={isFun} />
          <ActionButton label="View GitHub Profile" href={siteConfig.github} variant="ghost" isFun={isFun} />
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className={`border p-5 ${isFun ? 'border-deck-edge bg-deck/60' : 'border-hairline bg-white shadow-sheet'}`}>
            <div className={`mb-4 font-data text-[10px] uppercase tracking-[0.3em] ${isFun ? 'text-lav/70' : 'text-steel'}`}>
              Sessions logged · last 12 weeks
            </div>
            <div role="img" aria-label={`GitHub contribution heatmap showing ${activeContributionDays} active days with intensity levels from 0 to ${highestContribution}.`} className="grid grid-cols-12 gap-1.5">
              {githubActivity.contributionGraph.flatMap((row, rowIndex) => row.map((value, columnIndex) => (
                <div
                  key={`${rowIndex}-${columnIndex}`}
                  className={`aspect-square ${heatColors[value]}`}
                  aria-hidden="true"
                />
              )))}
            </div>
          </div>
          <div className={`grid divide-y border ${isFun ? 'divide-deck-edge border-deck-edge bg-deck/60' : 'divide-hairline border-hairline bg-white shadow-sheet'}`}>
            {githubActivity.repositories.map(repo => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-5 transition-colors ${isFun ? 'text-white hover:bg-void/40' : 'text-ink hover:bg-paper'}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-data text-sm font-semibold">{repo.name}</h3>
                  <span className={`font-data text-xs ${isFun ? 'text-pin-gold' : 'text-kegel'}`}>★ {repo.stars}</span>
                </div>
                <p className={`mt-2 text-sm leading-6 ${isFun ? 'text-lav' : 'text-steel'}`}>{repo.description}</p>
                <div className={`mt-3 font-data text-[10px] uppercase tracking-[0.24em] ${isFun ? 'text-uv-cyan/80' : 'text-steel/80'}`}>{repo.language}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const PIN_SCATTER: Array<[number, number]> = [
  [34, -22], [42, 16], [28, -38], [46, 28], [24, 44],
  [40, -10], [30, 24], [48, -30], [26, 10], [38, 40],
]

const PIN_COLUMNS = (() => {
  let index = 0
  return [1, 2, 3, 4].map(count => Array.from({ length: count }, () => index++))
})()

function MiniBowlingGame() {
  const { isFun } = useTheme()
  const [rollCount, setRollCount] = useState(0)

  const revealed = Math.min(projects.length, rollCount)
  const pinsDown = Math.round((revealed / projects.length) * 10)

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Open Play · Lane 26" title="Roll to Reveal" isFun={isFun} />
          <ActionButton
            label={revealed < projects.length ? 'Roll the Ball' : 'Reset Lane'}
            onClick={() => setRollCount(current => revealed < projects.length ? current + 1 : 0)}
            variant="primary"
            isFun={isFun}
          />
        </div>

        <div className={`overflow-hidden border p-5 ${isFun ? 'border-deck-edge bg-deck/60' : 'border-hairline bg-white shadow-sheet'}`}>
          <div
            className={`relative h-56 overflow-hidden ${
              isFun
                ? 'bg-[#0B0B1E] bg-[repeating-linear-gradient(180deg,rgba(0,229,255,0.05)_0px,rgba(0,229,255,0.05)_1px,transparent_1px,transparent_16px)]'
                : 'bg-[#D9A968] bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(0,0,0,0.05)_40%,rgba(0,0,0,0.12)),repeating-linear-gradient(180deg,rgba(122,74,22,0.22)_0px,rgba(122,74,22,0.22)_1px,transparent_1px,transparent_15px)]'
            }`}
          >
            <div
              className={`pointer-events-none absolute inset-0 ${isFun ? 'shadow-[inset_0_14px_24px_rgba(0,0,0,0.55),inset_0_-14px_24px_rgba(0,0,0,0.55)]' : 'shadow-[inset_0_12px_20px_rgba(92,58,20,0.25),inset_0_-12px_20px_rgba(92,58,20,0.25)]'}`}
              aria-hidden="true"
            />

            <div className={`absolute inset-y-0 left-[13%] w-px ${isFun ? 'bg-neon-pink/70' : 'bg-[#7a4a16]/50'}`} aria-hidden="true" />

            <div className="absolute left-[32%] top-1/2 flex -translate-y-1/2 flex-col items-start gap-2" aria-hidden="true">
              {[0, 14, 28, 44, 28, 14, 0].map((offset, index) => (
                <span
                  key={index}
                  className={`block h-3.5 w-5 [clip-path:polygon(100%_50%,0_0,0_100%)] ${
                    index === 3 ? (isFun ? 'bg-pin-gold' : 'bg-kegel/75') : isFun ? 'bg-uv-cyan/70' : 'bg-[#7a4a16]/55'
                  }`}
                  style={{ marginLeft: offset }}
                />
              ))}
            </div>

            <motion.div
              key={rollCount}
              initial={{ left: '4%', rotate: 0 }}
              animate={{ left: rollCount ? '72%' : '4%', rotate: rollCount ? 900 : 0 }}
              transition={{ duration: rollCount ? 1.4 : 0.2, ease: 'easeInOut' }}
              className={`absolute top-[calc(50%-1.5rem)] h-12 w-12 rounded-full ${isFun ? 'bg-neon-pink shadow-neon-pink' : 'bg-ink shadow-[0_6px_12px_rgba(0,0,0,0.35)]'}`}
            >
              <span className="absolute left-3.5 top-3 flex gap-1 opacity-50" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-black" />
                <span className="h-1.5 w-1.5 rounded-full bg-black" />
              </span>
              <span className="absolute left-[19px] top-[22px] h-1.5 w-1.5 rounded-full bg-black opacity-50" aria-hidden="true" />
            </motion.div>

            <div
              role="img"
              aria-label={`Bowling pin deck showing ${pinsDown} knocked pins and ${10 - pinsDown} standing pins.`}
              className="absolute right-[4%] top-1/2 flex -translate-y-1/2 items-center gap-3"
            >
              {PIN_COLUMNS.map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-col items-center gap-2.5">
                  {column.map(pin => {
                    const knocked = pin < pinsDown
                    const [scatterX, scatterY] = PIN_SCATTER[pin]
                    return (
                      <motion.div
                        key={pin}
                        animate={knocked
                          ? { x: scatterX, y: scatterY, rotate: scatterX > scatterY ? 80 : -70, opacity: 0.15, scale: 0.9 }
                          : { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 160, damping: 17 }}
                        className={`relative h-9 w-9 rounded-full bg-white ${isFun ? 'shadow-neon-cyan' : 'shadow-[2px_4px_8px_rgba(0,0,0,0.35)]'}`}
                        aria-hidden="true"
                      >
                        <span className={`absolute inset-[5px] rounded-full border-2 ${isFun ? 'border-neon-pink/80' : 'border-kegel/85'}`} />
                        <span className="absolute inset-[12px] rounded-full bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]" />
                      </motion.div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-4">
            {projects.map((project, index) => {
              const visible = index < revealed
              return (
                <motion.div
                  key={project.id}
                  initial={false}
                  animate={{ opacity: visible ? 1 : 0.35, y: visible ? 0 : 8 }}
                  className={`border p-4 transition-all ${visible ? isFun ? 'border-uv-cyan/40 bg-void/40' : 'border-kegel/40 bg-white' : isFun ? 'border-deck-edge bg-void/20' : 'border-hairline bg-paper'}`}
                >
                  <div className="flex items-center justify-between gap-3 font-data text-[10px] uppercase tracking-[0.2em]">
                    <span className={isFun ? 'text-uv-cyan' : 'text-kegel'}>Frame {String(project.frameNumber).padStart(2, '0')}</span>
                    <span className={isFun ? 'text-lav/70' : 'text-steel'}>{visible ? 'Revealed' : 'Waiting'}</span>
                  </div>
                  <h3 className={`mt-3 font-marquee text-sm ${isFun ? 'text-white' : 'text-ink'}`}>{project.title}</h3>
                  <p className={`mt-2 text-sm leading-6 ${isFun ? 'text-lav' : 'text-steel'}`}>{project.tagline}</p>
                </motion.div>
              )
            })}
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
    <section id="contact" className="px-4 py-14 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className={`overflow-hidden border ${isFun ? 'border-neon-pink/40 bg-deck/70 text-white shadow-neon-pink' : 'border-ink/30 bg-white text-ink shadow-sheet'}`}>
          <div className={`border-b px-6 py-3 font-data text-[10px] uppercase tracking-[0.4em] sm:px-8 lg:px-12 ${isFun ? 'border-deck-edge text-neon-pink' : 'border-hairline text-kegel'}`}>
            The 10th Frame · Bonus Roll
          </div>
          <div className="grid gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-12">
            <div>
              <h2 className={`font-marquee text-3xl sm:text-4xl ${isFun ? 'text-white glow-pink' : 'text-ink'}`}>Let's build something great.</h2>
              <p className={`mt-5 max-w-2xl text-base leading-7 ${isFun ? 'text-lav' : 'text-steel'}`}>
                Whether you're hiring, collaborating, or exploring bowling-focused product ideas, this portfolio is designed to make the work easy to evaluate and the next step easy to take.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ActionButton label="View Projects" onClick={() => scrollToSection('projects')} variant="primary" isFun={isFun} />
                <ActionButton label={siteConfig.resumeHref ? 'Download Resume' : 'Resume on Request'} href={siteConfig.resumeHref || undefined} variant="secondary" isFun={isFun} disabled={!siteConfig.resumeHref} />
              </div>
            </div>

            <div className={`border ${isFun ? 'border-deck-edge bg-void/40' : 'border-hairline bg-paper'}`}>
              <div className={`grid grid-cols-2 divide-x divide-y ${isFun ? 'divide-deck-edge' : 'divide-hairline'}`}>
                {links.map(link => link.enabled ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`px-4 py-5 font-data text-xs uppercase tracking-[0.2em] transition-colors ${isFun ? 'text-uv-cyan hover:bg-uv-cyan/10' : 'text-ink hover:bg-kegel/[0.06] hover:text-kegel'}`}
                  >
                    {link.label} →
                  </a>
                ) : (
                  <div key={link.label} className={`px-4 py-5 font-data text-xs uppercase tracking-[0.2em] ${isFun ? 'text-lav/40' : 'text-steel/50'}`}>
                    {link.label} pending
                  </div>
                ))}
              </div>
              <div className={`border-t px-4 py-4 text-sm leading-6 ${isFun ? 'border-deck-edge text-lav/70' : 'border-hairline text-steel'}`}>
                {siteConfig.email
                  ? `Email: ${siteConfig.email}`
                  : 'Add your real email, Discord link, and resume PDF to complete the final contact polish.'}
              </div>
            </div>
          </div>
        </div>

        <footer className={`pt-8 text-center font-data text-xs tracking-[0.14em] ${isFun ? 'text-lav/50' : 'text-steel/70'}`}>
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
    <main className={`${isFun ? 'bg-void bg-[radial-gradient(55%_38%_at_18%_0%,rgba(255,46,136,0.14),transparent),radial-gradient(48%_34%_at_84%_6%,rgba(0,229,255,0.12),transparent)] text-white' : 'bg-paper text-ink'} min-h-screen transition-colors duration-700`}>
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
