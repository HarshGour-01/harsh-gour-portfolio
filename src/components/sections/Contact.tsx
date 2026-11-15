import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { personal, socials } from '../../data/site'
import { ArrowButton, SectionLabel, SocialLinks } from '../ui/Primitives'

type FormValues = { name: string; email: string; subject: string; message: string }
const emptyForm: FormValues = { name: '', email: '', subject: '', message: '' }

export function Contact() {
  const [values, setValues] = useState(emptyForm)
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' })
  const update = (field: keyof FormValues, value: string) => setValues((current) => ({ ...current, [field]: value }))
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!values.name.trim() || !values.subject.trim() || !values.message.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setStatus({ type: 'error', message: 'Please complete every field with a valid email address.' })
      return
    }
    setStatus({ type: 'loading', message: 'Sending your note…' })
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.message || 'The contact endpoint is not configured yet.')
      setStatus({ type: 'success', message: 'Your message was accepted. Thank you for reaching out.' })
      setValues(emptyForm)
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to send the message right now.' })
    }
  }
  return <section id="contact" className="contact-section section-anchor"><div className="shell"><SectionLabel number="06">LET'S CONNECT</SectionLabel><div className="contact-layout"><motion.div className="contact-copy" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}><p className="eyebrow">A GOOD QUESTION IS A GOOD START</p><h2>Let's Create Something <em>Extraordinary.</em></h2><p>Have an interesting idea, a project or an opportunity? I'd love to connect and explore what we can build together.</p><div className="contact-details"><span><MapPin size={16} /> {personal.location}</span><span><Mail size={16} /> Open to thoughtful conversations</span></div><SocialLinks links={socials} /></motion.div><motion.form className="contact-form" onSubmit={submit} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.1 }}><div className="form-row"><label>Name<input value={values.name} onChange={(event) => update('name', event.target.value)} placeholder="Your name" autoComplete="name" /></label><label>Email<input value={values.email} onChange={(event) => update('email', event.target.value)} placeholder="you@example.com" type="email" autoComplete="email" /></label></div><label>Subject<input value={values.subject} onChange={(event) => update('subject', event.target.value)} placeholder="What are you thinking about?" /></label><label>Message<textarea value={values.message} onChange={(event) => update('message', event.target.value)} placeholder="A little context goes a long way." rows={5} /></label><div className="form-submit"><ArrowButton type="submit">{status.type === 'loading' ? 'Sending…' : 'Send Message'}</ArrowButton>{status.message && <p className={`form-status form-status--${status.type}`} role="status" aria-live="polite">{status.message}</p>}</div></motion.form></div></div><div className="contact-rail"><div className="shell"><span>HARSH GOUR / AI &amp; CODE</span><span><i /> CURRENTLY LEARNING, ALWAYS BUILDING</span><a href={socials.find((social) => social.id === 'linkedin')?.href} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} /></a></div></div></section>
}
