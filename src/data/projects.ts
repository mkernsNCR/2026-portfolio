export interface Project {
  id: number
  title: string
  tagline: string
  description: string
  summary: string
  tech: string[]
  github: string
  demo?: string
  frameNumber: number
  scoreMarks: [string, string]
  totalScore: number
  features: string[]
  architecture: string[]
  screenshots: Array<{
    title: string
    caption: string
    accent: string
    metrics: string[]
  }>
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Kanban',
    tagline: 'Collaborative workflow board for fast-moving teams',
    description: 'A lightweight Kanban board built for quick task triage, status tracking, and team-friendly workflow management.',
    summary: 'Designed for small teams that need a fast, focused planning surface without the overhead of enterprise PM tools.',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/mkernsNCR',
    frameNumber: 1,
    scoreMarks: ['X', '/'],
    totalScore: 54,
    features: [
      'Drag-and-drop board interactions for task prioritization',
      'Column-based workflow views for backlog, in progress, and done states',
      'Fast create and edit flows optimized for keyboard-heavy users',
    ],
    architecture: [
      'React client with typed state management for responsive UI updates',
      'Node.js API layer backed by PostgreSQL for durable task storage',
      'Structured domain model separating boards, columns, and task entities',
    ],
    screenshots: [
      {
        title: 'Board Overview',
        caption: 'A focused planning view for monitoring work across every stage of delivery.',
        accent: 'from-sky-500 to-cyan-400',
        metrics: ['3 active boards', '28 tasks', '12 due this week'],
      },
      {
        title: 'Task Detail',
        caption: 'Task metadata, owners, and due dates are surfaced without leaving the board.',
        accent: 'from-indigo-500 to-violet-500',
        metrics: ['Priority states', 'Checklists', 'Assignees'],
      },
    ],
  },
  {
    id: 2,
    title: 'Bowling Calculator',
    tagline: 'Scoring and probability analysis for bowlers',
    description: 'A bowling scoring and probability calculator that helps players analyze scoring scenarios, spare conversions, and frame-by-frame outcomes.',
    summary: 'Built to translate scoring logic into a clear interface for players, coaches, and league organizers.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    github: 'https://github.com/mkernsNCR',
    frameNumber: 2,
    scoreMarks: ['X', 'X'],
    totalScore: 96,
    features: [
      'Frame simulation for strike, spare, and open-frame scoring paths',
      'Probability views for common spare leave and conversion scenarios',
      'Responsive visualizations that make scoring logic easy to understand',
    ],
    architecture: [
      'Typed scoring engine that encapsulates bowling rules and frame resolution',
      'Component-driven UI that separates calculators, visual charts, and summaries',
      'Client-side performance optimized for instant recalculation during input',
    ],
    screenshots: [
      {
        title: 'Score Breakdown',
        caption: 'Per-frame outcomes and cumulative scoring are displayed like a modern lane console.',
        accent: 'from-orange-500 to-amber-400',
        metrics: ['Instant scoring', 'Frame insights', 'Probability views'],
      },
      {
        title: 'Scenario Analysis',
        caption: 'Compare strike and spare paths to understand how each frame impacts the game.',
        accent: 'from-emerald-500 to-teal-400',
        metrics: ['Spare conversion', 'Expected score', 'Shot paths'],
      },
    ],
  },
  {
    id: 3,
    title: 'Resume Builder',
    tagline: 'Structured resume generation for modern job seekers',
    description: 'A resume builder for generating structured, polished professional resumes with reusable content blocks and export-ready layouts.',
    summary: 'Created to streamline the process of turning raw experience data into recruiter-friendly application materials.',
    tech: ['React', 'Fastify', 'TypeScript', 'PDF.js'],
    github: 'https://github.com/mkernsNCR',
    frameNumber: 3,
    scoreMarks: ['9', '/'],
    totalScore: 147,
    features: [
      'Guided editing flows for experience, skills, and summary sections',
      'Template-ready layout previews for export confidence',
      'Structured data model for reusable resume content across variants',
    ],
    architecture: [
      'React frontend paired with a Fastify service for template orchestration',
      'PDF export pipeline designed around structured content schemas',
      'Shared TypeScript models ensure consistency between UI and export layers',
    ],
    screenshots: [
      {
        title: 'Resume Editor',
        caption: 'A clean authoring workspace for managing resume sections and professional highlights.',
        accent: 'from-slate-700 to-slate-500',
        metrics: ['Template switching', 'Live preview', 'Export-ready'],
      },
      {
        title: 'Document Preview',
        caption: 'Preview typography and hierarchy before generating a polished PDF output.',
        accent: 'from-zinc-700 to-stone-500',
        metrics: ['A4 preview', 'Section hierarchy', 'Print-safe layout'],
      },
    ],
  },
  {
    id: 4,
    title: 'Bowling League Tracker',
    tagline: 'League operations and performance analytics platform',
    description: 'A bowling league tracker for managing schedules, standings, roster data, and player performance analytics across a full season.',
    summary: 'Focused on helping leagues centralize weekly operations while surfacing meaningful trends for bowlers and organizers.',
    tech: ['React', 'Node.js', 'Docker', 'PostgreSQL'],
    github: 'https://github.com/mkernsNCR',
    frameNumber: 4,
    scoreMarks: ['X', 'X'],
    totalScore: 205,
    features: [
      'League standings, schedules, and roster management in one dashboard',
      'Player trend analysis across series, games, and lane conditions',
      'Admin tooling for recurring weekly operations and stat updates',
    ],
    architecture: [
      'Dashboard-driven frontend for scores, standings, and reporting workflows',
      'Service-oriented backend for league data ingestion and team management',
      'Dockerized deployment flow for repeatable local and hosted environments',
    ],
    screenshots: [
      {
        title: 'League Dashboard',
        caption: 'Standings, upcoming matchups, and key player metrics are visible at a glance.',
        accent: 'from-fuchsia-600 to-pink-500',
        metrics: ['12 teams', 'Weekly standings', 'Player trends'],
      },
      {
        title: 'Analytics View',
        caption: 'Surface score trends, average changes, and high-value league insights over time.',
        accent: 'from-blue-700 to-cyan-500',
        metrics: ['Trend lines', 'Series history', 'League insights'],
      },
    ],
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
  description: string
}

export const skills: Skill[] = [
  { name: 'React', colorKey: 'blue', description: 'Building polished, component-driven interfaces with strong UX fundamentals.' },
  { name: 'Node.js', colorKey: 'red', description: 'Designing backend services, APIs, and data flows for modern web applications.' },
  { name: 'Fastify', colorKey: 'purple', description: 'Shipping high-performance TypeScript-first APIs with clean plugin architecture.' },
  { name: 'Docker', colorKey: 'green', description: 'Containerizing services for reproducible environments and predictable deployment.' },
  { name: 'AI Systems', colorKey: 'black', description: 'Integrating model-driven workflows, developer tools, and intelligent product features.' },
  { name: 'Cloud', colorKey: 'gold', description: 'Deploying scalable applications and services with production-minded infrastructure.' },
]

export const professionalSummary = 'Full stack engineer specializing in modern React applications, developer tools, and data driven bowling analytics platforms.'

export const githubActivity = {
  contributionGraph: [
    [0, 1, 2, 3, 2, 1, 0, 2, 3, 4, 3, 2],
    [1, 2, 3, 2, 1, 1, 2, 3, 2, 3, 4, 2],
    [2, 3, 2, 1, 0, 2, 3, 4, 3, 2, 2, 1],
    [1, 2, 4, 3, 2, 2, 1, 2, 3, 4, 3, 2],
    [0, 1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 3],
    [1, 2, 3, 2, 2, 1, 0, 1, 3, 4, 2, 1],
    [2, 3, 4, 3, 1, 0, 1, 2, 4, 3, 2, 1],
  ],
  repositories: [
    {
      name: 'bowling-calculator',
      description: 'Scoring and probability tooling for bowlers, coaches, and leagues.',
      language: 'TypeScript',
      stars: 18,
      url: 'https://github.com/mkernsNCR',
    },
    {
      name: 'league-tracker',
      description: 'Analytics and operations tooling for bowling leagues.',
      language: 'React',
      stars: 11,
      url: 'https://github.com/mkernsNCR',
    },
    {
      name: 'resume-builder',
      description: 'Structured resume authoring and export workflows.',
      language: 'Fastify',
      stars: 9,
      url: 'https://github.com/mkernsNCR',
    },
  ],
}
