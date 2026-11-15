import { ArrowUp } from 'lucide-react'
import { personal, socials } from '../../data/site'
import { SocialLinks } from '../ui/Primitives'

export function Footer({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div>
          <a className="footer-brand" href="/#home" onClick={() => onNavigate('home')}><span className="brand-mark">{personal.mark}</span><span>{personal.brand}</span></a>
          <p className="footer-intro">Aspiring AI/ML Engineer, software developer and technology enthusiast building with curiosity.</p>
        </div>
        <div className="footer-nav-wrap">
          <p className="micro-label">EXPLORE</p>
          <div className="footer-nav">
            {['home', 'about', 'skills', 'projects', 'education', 'achievements', 'contact'].map((id) => <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); onNavigate(id) }}>{id}</a>)}
          </div>
        </div>
        <div className="footer-social-wrap">
          <p className="micro-label">CONNECT</p>
          <SocialLinks links={socials} compact />
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {personal.brand}. Built with intent.</span>
        <button type="button" className="back-to-top" onClick={() => onNavigate('home')}>Back to top <ArrowUp size={14} /></button>
      </div>
    </footer>
  )
}
