export type SocialId = 'linkedin' | 'github' | 'instagram'

export type SocialLink = {
  id: SocialId
  label: string
  href: string
}

export type Project = {
  id: string
  number: string
  name: string
  category: string
  description: string
  details: string
  stack: string[]
  tone: string
  repo?: string
  demo?: string
}

export const personal = {
  name: 'Harsh Gour',
  brand: 'HARSH GOUR',
  mark: 'HG.',
  title: 'Aspiring AI/ML Engineer | Software Developer | Technology Enthusiast',
  location: 'Madhya Pradesh, India',
  education: 'B.Tech in Computer Science and Engineering (AI & ML)',
  college: 'Indore Institute of Science and Technology (IIST), Indore',
  goal: 'To become an AI/ML Engineer and build intelligent applications, scalable software products and innovative technology solutions.',
  intro: 'I am a technology enthusiast and aspiring AI/ML Engineer passionate about programming, software development, artificial intelligence and solving real-world problems through technology.',
  about: [
    "I'm Harsh Gour, a B.Tech Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning.",
    'I enjoy exploring technology, developing software applications and understanding how intelligent systems can solve practical problems.',
    'My journey is driven by curiosity, continuous learning and the desire to transform ideas into meaningful digital experiences.',
  ],
}

export const socials: SocialLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/HarshGour-01' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/harsh-gour-45aa0941a' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/harshgour_01/?hl=en' },
]

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export const skillGroups = [
  {
    id: 'programming',
    eyebrow: '01 / FOUNDATIONS',
    title: 'Programming',
    description: 'Core languages for thinking clearly and building from first principles.',
    items: ['C', 'C++', 'Python'],
    mode: 'known' as const,
  },
  {
    id: 'web',
    eyebrow: '02 / INTERFACES',
    title: 'Web Development',
    description: 'Tools for shaping ideas into responsive, accessible experiences.',
    items: ['HTML', 'CSS', 'JavaScript', 'React'],
    mode: 'known' as const,
  },
  {
    id: 'tools',
    eyebrow: '03 / WORKFLOW',
    title: 'Tools',
    description: 'A practical toolkit for moving from a first draft to a clean handoff.',
    items: ['Git', 'GitHub', 'VS Code'],
    mode: 'known' as const,
  },
  {
    id: 'learning',
    eyebrow: '04 / IN PROGRESS',
    title: 'Currently Learning',
    description: 'The next layer of questions I am actively exploring through practice.',
    items: ['Data Structures & Algorithms', 'Artificial Intelligence', 'Machine Learning', 'Full Stack Development', 'Problem Solving'],
    mode: 'learning' as const,
  },
]

export const learningPath = [
  { index: '01', title: 'C++ + DSA', copy: 'Sharpening fundamentals through deliberate practice, one pattern at a time.' },
  { index: '02', title: 'Python', copy: 'Using a versatile language to make experiments clearer and more useful.' },
  { index: '03', title: 'Artificial Intelligence', copy: 'Understanding the ideas behind intelligent systems and their practical potential.' },
  { index: '04', title: 'Machine Learning', copy: 'Building the foundations for models that can learn from real-world signals.' },
  { index: '05', title: 'Full Stack Development', copy: 'Connecting thoughtful interfaces to reliable application logic.' },
  { index: '06', title: 'Software Engineering', copy: 'Learning to turn working code into resilient, maintainable products.' },
]

export const projects: Project[] = [
  {
    id: 'nexora-ai',
    number: '01',
    name: 'Nexora AI',
    category: 'AI / CONVERSATIONAL SYSTEMS',
    description: 'An AI-powered personal assistant concept focused on conversational AI, voice interaction and intelligent automation.',
    details: 'Nexora AI explores how a personal assistant can feel more useful when conversation, voice and automation meet in one considered experience.',
    stack: ['AI concept', 'Voice interaction', 'Automation'],
    tone: 'warm',
  },
  {
    id: 'mitra',
    number: '02',
    name: 'Mitra',
    category: 'PLATFORM / COLLABORATION',
    description: 'An academia-industry collaboration platform concept connecting students, institutions and industry to support opportunities, collaboration and innovation.',
    details: 'Mitra imagines a shared surface where students, academic communities and industry partners can find meaningful opportunities to learn and build together.',
    stack: ['Platform concept', 'Collaboration', 'Opportunity mapping'],
    tone: 'champagne',
  },
  {
    id: 'bank-management',
    number: '03',
    name: 'Bank Management System',
    category: 'C++ / OBJECT-ORIENTED PROGRAMMING',
    description: 'A C++ application demonstrating object-oriented programming concepts and fundamental software development practices.',
    details: 'A focused C++ project for practicing the structure of real-world software through objects, data flow and fundamental application logic.',
    stack: ['C++', 'OOP', 'Application logic'],
    tone: 'graphite',
  },
  {
    id: 'library-management',
    number: '04',
    name: 'Library Management System',
    category: 'C++ / ABSTRACTION',
    description: 'A C++ project demonstrating abstraction and object-oriented programming concepts.',
    details: 'A learning project centered on abstraction and object-oriented thinking, translating a familiar library workflow into a structured C++ application.',
    stack: ['C++', 'Abstraction', 'OOP'],
    tone: 'dark',
  },
]

export const achievementsCategories = [
  { label: 'Hackathons', copy: 'A place for future experiments and team builds.', icon: '↗' },
  { label: 'Technical competitions', copy: 'Milestones will be added as they happen.', icon: '◇' },
  { label: 'Certifications', copy: 'Verified learning records, when available.', icon: '◌' },
  { label: 'Workshops', copy: 'Notes from focused learning sessions.', icon: '＋' },
  { label: 'Project milestones', copy: 'Small launches that move the practice forward.', icon: '—' },
]

export const interests = ['Artificial Intelligence', 'Machine Learning', 'Software Engineering', 'Full Stack Development', 'Data Structures & Algorithms', 'Building innovative applications']
