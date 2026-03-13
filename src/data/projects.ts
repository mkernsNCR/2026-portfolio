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
    github: '#',
    demo: '#',
    frameNumber: 1,
  },
  {
    id: 2,
    title: 'Bowling Calculator',
    description: 'Bowling scoring and probability calculator.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    github: '#',
    demo: '#',
    frameNumber: 2,
  },
  {
    id: 3,
    title: 'Resume Builder',
    description: 'Tool for generating structured professional resumes.',
    tech: ['React', 'Fastify', 'PDF.js'],
    github: '#',
    demo: '#',
    frameNumber: 3,
  },
  {
    id: 4,
    title: 'Bowling League Tracker',
    description: 'League tracking and performance analytics.',
    tech: ['React', 'Node.js', 'Docker'],
    github: '#',
    demo: '#',
    frameNumber: 4,
  },
]

export const skills = [
  { name: 'React', color: '#1B6FD6', bgClass: 'bg-ball-blue' },
  { name: 'Node.js', color: '#CC2222', bgClass: 'bg-ball-red' },
  { name: 'Fastify', color: '#7B2FBE', bgClass: 'bg-ball-purple' },
  { name: 'Docker', color: '#1A8A3A', bgClass: 'bg-ball-green' },
  { name: 'AI Systems', color: '#1A1A1A', bgClass: 'bg-ball-black' },
  { name: 'Cloud', color: '#D4A017', bgClass: 'bg-ball-gold' },
]
