export interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  github?: string
  demo?: string
  frameNumber: number
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Kanban',
    description: 'Lightweight Kanban board for task management.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    frameNumber: 1,
  },
  {
    id: 2,
    title: 'Bowling Calculator',
    description: 'Bowling scoring and probability calculator.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    frameNumber: 2,
  },
  {
    id: 3,
    title: 'Resume Builder',
    description: 'Tool for generating structured professional resumes.',
    tech: ['React', 'Fastify', 'PDF.js'],
    frameNumber: 3,
  },
  {
    id: 4,
    title: 'Bowling League Tracker',
    description: 'League tracking and performance analytics.',
    tech: ['React', 'Node.js', 'Docker'],
    frameNumber: 4,
  },
]

export type SkillColorKey = 'blue' | 'red' | 'purple' | 'green' | 'black' | 'gold'

export interface SkillStyle {
  color: string
  bgClass: string
}

export const skillStyleMap: Record<SkillColorKey, SkillStyle> = {
  blue:   { color: '#1B6FD6', bgClass: 'bg-ball-blue' },
  red:    { color: '#CC2222', bgClass: 'bg-ball-red' },
  purple: { color: '#7B2FBE', bgClass: 'bg-ball-purple' },
  green:  { color: '#1A8A3A', bgClass: 'bg-ball-green' },
  black:  { color: '#1A1A1A', bgClass: 'bg-ball-black' },
  gold:   { color: '#D4A017', bgClass: 'bg-ball-gold' },
}

export interface Skill {
  name: string
  colorKey: SkillColorKey
}

export const skills: Skill[] = [
  { name: 'React',       colorKey: 'blue'   },
  { name: 'Node.js',     colorKey: 'red'    },
  { name: 'Fastify',     colorKey: 'purple' },
  { name: 'Docker',      colorKey: 'green'  },
  { name: 'AI Systems',  colorKey: 'black'  },
  { name: 'Cloud',       colorKey: 'gold'   },
]
