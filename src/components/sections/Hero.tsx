import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { personal, socials } from '../../data/site'
import { ArrowButton, SectionLabel, SocialLinks } from '../ui/Primitives'

const HeroScene = lazy(() => import('../three/HeroScene').then((module) => ({ default: module.HeroScene })))

export function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <section id="home" className="hero-section section-anchor">
      <div className="hero-grid shell">
        <div className="hero-copy">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.16 }}>
            <SectionLabel number="00">INTRODUCTION</SectionLabel>
          </motion.div>
          <motion.p className="hero-kicker" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.28 }}>HELLO, I'M {personal.name.toUpperCase()}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.38 }}>Building Intelligent <em>Experiences</em> at the Intersection of AI &amp; Code.</motion.h1>
          <motion.p className="hero-description" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.52 }}>{personal.intro}</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.64 }}>
            <ArrowButton onClick={() => onNavigate('projects')}>Explore My Work</ArrowButton>
            <ArrowButton variant="outline" onClick={() => onNavigate('contact')}>Let's Connect</ArrowButton>
          </motion.div>
          <motion.div className="hero-socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.82 }}>
            <span className="micro-label">FIND ME IN THE FIELD</span>
            <SocialLinks links={socials} />
          </motion.div>
        </div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.25, delay: 0.18 }}>
          <div className="hero-visual__halo" />
          <Suspense fallback={<div className="hero-scene-fallback" aria-label="Loading interactive sculpture" />}><HeroScene /></Suspense>
          <div className="hero-orbit-note hero-orbit-note--one">AI / ML <span>01</span></div>
          <div className="hero-orbit-note hero-orbit-note--two">BUILDING <span>02</span></div>
          <div className="hero-visual__caption"><span>CURIOUS BY DEFAULT</span><strong>MP / IN</strong></div>
        </motion.div>
      </div>
      <div className="hero-footer shell">
        <span className="scroll-note"><ArrowDown size={14} /> SCROLL TO EXPLORE</span>
        <span className="hero-index">01 <i>/</i> 07</span>
        <a href="#about" onClick={(event) => { event.preventDefault(); onNavigate('about') }} className="hero-side-link">A FIELD GUIDE TO CURIOSITY <ArrowUpRight size={14} /></a>
      </div>
    </section>
  )
}
