import { motion } from 'framer-motion'
import { MapPin, Sparkles } from 'lucide-react'
import { interests, personal } from '../../data/site'
import { SectionLabel } from '../ui/Primitives'

export function About() {
  return (
    <section id="about" className="content-section about-section section-anchor">
      <div className="shell">
        <SectionLabel number="01">ABOUT THE BUILDER</SectionLabel>
        <div className="about-layout">
          <motion.div className="about-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
            <p className="eyebrow">A LITTLE BEYOND THE SYNTAX</p>
            <h2>Beyond the <em>Code.</em></h2>
            <div className="about-stamp"><span>HG.</span><small>BUILDING<br />WITH INTENT</small></div>
          </motion.div>
          <motion.div className="about-copy" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: 0.12 }}>
            {personal.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="about-meta">
              <span><MapPin size={15} /> {personal.location}</span>
              <span><Sparkles size={15} /> {personal.education}</span>
            </div>
          </motion.div>
        </div>
        <div className="interest-strip">
          <span className="micro-label">INTERESTS /</span>
          <div className="interest-list">{interests.map((interest, index) => <span key={interest}><b>0{index + 1}</b>{interest}</span>)}</div>
        </div>
      </div>
    </section>
  )
}
