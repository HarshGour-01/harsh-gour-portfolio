import { motion } from 'framer-motion'
import { BrainCircuit, Code2, Globe2, Wrench } from 'lucide-react'
import { learningPath, skillGroups } from '../../data/site'
import { SectionLabel } from '../ui/Primitives'

const skillIcons = { programming: Code2, web: Globe2, tools: Wrench, learning: BrainCircuit }

export function Skills() {
  return (
    <section id="skills" className="content-section skills-section section-anchor">
      <div className="shell">
        <SectionLabel number="02">TOOLS FOR THE JOURNEY</SectionLabel>
        <div className="section-intro section-intro--split">
          <div><p className="eyebrow">A GROWING TOOLKIT, NOT A LIST OF CLAIMS</p><h2>Built to <em>keep learning.</em></h2></div>
          <p>Each tool is an invitation to go deeper. I am building solid foundations, making small experiments and staying honest about what is in progress.</p>
        </div>
        <div className="skill-grid">
          {skillGroups.map((group, index) => {
            const Icon = skillIcons[group.id as keyof typeof skillIcons]
            return <motion.article key={group.id} className={`skill-card skill-card--${group.mode}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay: index * 0.08 }}>
              <div className="skill-card__top"><span>{group.eyebrow}</span><Icon size={21} strokeWidth={1.4} /></div>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
              <div className="skill-card__foot"><span>{group.mode === 'known' ? 'CURRENT TOOLKIT' : 'ACTIVE EXPLORATION'}</span><span>0{index + 1}</span></div>
            </motion.article>
          })}
        </div>
        <div className="learning-journey">
          <div className="learning-heading"><p className="eyebrow">THE THROUGH-LINE</p><h3>Always Learning.<br /><em>Always Building.</em></h3><p>Learn something <b>→</b> make something <b>→</b> learn again.</p></div>
          <div className="learning-path">{learningPath.map((item) => <div key={item.index} className="learning-step"><span>{item.index}</span><div><h4>{item.title}</h4><p>{item.copy}</p></div></div>)}</div>
        </div>
      </div>
    </section>
  )
}
