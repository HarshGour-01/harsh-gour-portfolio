import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { ArrowUpRight, Check, X } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Project } from '../../data/site'
import { projects } from '../../data/site'
import { ExternalLink, SectionLabel } from '../ui/Primitives'

function ProjectArtwork({ project }: { project: Project }) {
  return <div className={`project-art project-art--${project.tone}`} aria-hidden="true"><span className="project-art__number">{project.number}</span><span className="project-art__ring project-art__ring--one" /><span className="project-art__ring project-art__ring--two" /><span className="project-art__orb" /><span className="project-art__word">{project.name.split(' ')[0]}</span></div>
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const focusable = Array.from(panel.querySelectorAll<HTMLElement>('button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])'))
    focusable[0]?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
      if (event.key !== 'Tab' || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.classList.add('modal-open')
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.classList.remove('modal-open') }
  }, [onClose])
  return <div className="project-modal" role="dialog" aria-modal="true" aria-label={`${project.name} details`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><div ref={panelRef} className="project-modal__panel"><button type="button" className="modal-close" onClick={onClose} aria-label="Close project details"><X size={20} /></button><p className="eyebrow">PROJECT {project.number} / {project.category}</p><h2>{project.name}</h2><p className="project-modal__description">{project.details}</p><div className="project-modal__stack">{project.stack.map((item) => <span key={item}><Check size={13} /> {item}</span>)}</div><div className="modal-actions">{project.repo ? <ExternalLink href={project.repo}>Open GitHub repository</ExternalLink> : <span className="modal-note">Repository link will be added once verified.</span>}{project.demo && <ExternalLink href={project.demo}>View live demo</ExternalLink>}</div></div></div>
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const openProject = (event: MouseEvent<HTMLButtonElement>, project: Project) => { triggerRef.current = event.currentTarget; setSelectedProject(project) }
  const closeProject = () => { setSelectedProject(null); window.requestAnimationFrame(() => triggerRef.current?.focus()) }
  return <section id="projects" className="content-section projects-section section-anchor"><div className="shell"><SectionLabel number="03">THINGS I'VE BUILT</SectionLabel><div className="section-intro section-intro--split"><div><p className="eyebrow">A SMALL ARCHIVE OF EXPERIMENTS</p><h2>Ideas made <em>tangible.</em></h2></div><p>Every project is a way to learn faster, think clearer and make an idea feel real. Links appear only when they are verified.</p></div><div className="project-list">{projects.map((project, index) => <motion.article key={project.id} className="project-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.6, delay: index * 0.06 }}><ProjectArtwork project={project} /><div className="project-card__body"><div className="project-card__meta"><span>{project.category}</span><span>0{index + 1}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="project-card__bottom"><div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><div className="project-actions">{project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} GitHub repository`}><span className="project-repo-glyph">GH</span></a>}<button type="button" onClick={(event) => openProject(event, project)} aria-label={`View details for ${project.name}`}>View details <ArrowUpRight size={15} /></button></div></div></div></motion.article>)}</div></div>{selectedProject && <ProjectModal project={selectedProject} onClose={closeProject} />}</section>
}
