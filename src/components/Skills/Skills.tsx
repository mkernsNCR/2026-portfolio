import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { skills } from '../../data/projects'

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
}

// Fun Mode: Bowling ball rack
function BowlingBallSkill({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const sizes = [80, 76, 82, 74, 78, 80]
  const size = sizes[index % sizes.length]

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center gap-3 cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -12, scale: 1.1 }}
      whileTap={{ scale: 0.93 }}
      role="button"
      tabIndex={0}
      aria-label={`${skill.name} skill`}
    >
      {/* Ball */}
      <motion.div
        className="relative rounded-full flex items-center justify-center shadow-lg"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 35% 35%, ${lightenColor(skill.color)}, ${skill.color} 60%, ${darkenColor(skill.color)} 100%)`,
          boxShadow: isHovered
            ? `0 8px 24px ${skill.color}88, inset -4px -4px 10px rgba(0,0,0,0.4), inset 3px 3px 6px rgba(255,255,255,0.25)`
            : `0 4px 12px rgba(0,0,0,0.3), inset -4px -4px 10px rgba(0,0,0,0.4), inset 3px 3px 6px rgba(255,255,255,0.2)`,
        }}
        animate={isHovered ? { rotate: [0, -5, 5, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Finger holes */}
        <div
          className="absolute rounded-full bg-black/50"
          style={{ width: 8, height: 8, top: '28%', left: '38%' }}
        />
        <div
          className="absolute rounded-full bg-black/50"
          style={{ width: 8, height: 8, top: '20%', left: '54%' }}
        />
        <div
          className="absolute rounded-full bg-black/50"
          style={{ width: 8, height: 8, top: '36%', left: '52%' }}
        />

        {/* Shine */}
        <div
          className="absolute rounded-full bg-white/30"
          style={{ width: 14, height: 14, top: '18%', left: '22%', filter: 'blur(2px)' }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Label */}
      <span
        className="text-white font-wii font-bold text-sm text-center leading-tight drop-shadow"
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
      >
        {skill.name}
      </span>

      {/* Ball return shadow */}
      <div
        className="w-14 h-2 bg-black/20 rounded-full blur-sm -mt-2"
        aria-hidden="true"
      />
    </motion.div>
  )
}

// Business Mode: Badge
function SkillBadge({ skill }: { skill: typeof skills[0] }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      className="bg-white border border-gray-200 rounded-lg px-5 py-3 flex items-center gap-3 shadow-sm cursor-default"
      role="listitem"
    >
      <div
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ backgroundColor: skill.color }}
        aria-hidden="true"
      />
      <span className="font-business font-medium text-gray-700 text-sm">
        {skill.name}
      </span>
    </motion.div>
  )
}

// Color helpers
function lightenColor(hex: string): string {
  const num = parseInt(hex.slice(1), 16)
  const r = Math.min(255, (num >> 16) + 60)
  const g = Math.min(255, ((num >> 8) & 0xff) + 60)
  const b = Math.min(255, (num & 0xff) + 60)
  return `rgb(${r},${g},${b})`
}

function darkenColor(hex: string): string {
  const num = parseInt(hex.slice(1), 16)
  const r = Math.max(0, (num >> 16) - 40)
  const g = Math.max(0, ((num >> 8) & 0xff) - 40)
  const b = Math.max(0, (num & 0xff) - 40)
  return `rgb(${r},${g},${b})`
}

export default function Skills() {
  const { isFun } = useTheme()

  return (
    <section
      id="skills"
      className={`py-20 px-4 sm:px-6 lg:px-8 ${isFun ? '' : 'bg-gray-50'}`}
      aria-label="Skills section"
    >
      <div className="container mx-auto max-w-4xl">
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
                  🎳 Ball Rack
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-wii font-black text-white drop-shadow-lg">
                My Skills
              </h2>
              <p className="text-white/80 font-wii mt-3 text-lg">
                Pick your ball!
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-500 font-business text-sm uppercase tracking-widest mb-3">
                Technologies
              </p>
              <h2 className="text-3xl sm:text-4xl font-business font-bold text-gray-900">
                Skills
              </h2>
            </>
          )}
        </motion.div>

        {isFun ? (
          /* Fun: Ball rack with perspective shelf */
          <div className="relative">
            {/* Rack shelf */}
            <div
              className="absolute bottom-0 left-0 right-0 h-6 rounded-b-xl"
              style={{
                background: 'linear-gradient(180deg, #8B6020 0%, #6B4810 100%)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              }}
              aria-hidden="true"
            />
            {/* Rack back wall */}
            <div
              className="absolute top-0 left-0 right-0 h-4 rounded-t-lg"
              style={{
                background: 'linear-gradient(180deg, #4A3010 0%, #6B4810 100%)',
              }}
              aria-hidden="true"
            />

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="relative z-10 flex flex-wrap justify-center gap-6 sm:gap-8 py-8 px-4"
              role="list"
              aria-label="Skills ball rack"
            >
              {skills.map((skill, index) => (
                <BowlingBallSkill key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>
          </div>
        ) : (
          /* Business: Badge grid */
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="flex flex-wrap justify-center gap-3"
            role="list"
            aria-label="Skills list"
          >
            {skills.map(skill => (
              <SkillBadge key={skill.name} skill={skill} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
