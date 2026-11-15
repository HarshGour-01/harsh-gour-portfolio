import { useEffect, useState } from 'react'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Journey } from './components/sections/Journey'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Footer } from './components/layout/Footer'
import { Navigation } from './components/layout/Navigation'

const sectionIds = ['home', 'about', 'skills', 'projects', 'education', 'achievements', 'contact']

function setMeta(name: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!element) { element = document.createElement('meta'); element.name = name; document.head.appendChild(element) }
  element.content = content
}

function setProperty(property: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!element) { element = document.createElement('meta'); element.setAttribute('property', property); document.head.appendChild(element) }
  element.content = content
}

export default function App() {
  const [activeSection, setActiveSection] = useState(() => {
    const hash = window.location.hash.slice(1)
    return sectionIds.includes(hash) ? hash : 'home'
  })
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (sectionIds.includes(hash) && hash !== 'home') window.requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ block: 'start' }))
  }, [])
  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-22% 0px -58% 0px', threshold: [0.05, 0.2, 0.5] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const origin = import.meta.env.VITE_PUBLIC_ORIGIN?.replace(/\/$/, '')
    if (!origin) return
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]') || document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'canonical' }))
    canonical.href = `${origin}/`
    setProperty('og:url', `${origin}/`)
    setProperty('og:image', `${origin}/favicon.svg`)
    setMeta('twitter:image', `${origin}/favicon.svg`)
  }, [])
  const onNavigate = (id: string) => {
    const target = document.getElementById(id)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', id === 'home' ? '/#home' : `#${id}`)
  }
  return <div className="app-shell"><Navigation activeSection={activeSection} onNavigate={onNavigate} /><main><Hero onNavigate={onNavigate} /><About /><Skills /><Projects /><Journey /><Contact /></main><Footer onNavigate={onNavigate} /></div>
}
