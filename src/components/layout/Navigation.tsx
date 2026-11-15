import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { navItems, personal } from '../../data/site'

export function Navigation({ activeSection, onNavigate }: { activeSection: string; onNavigate: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  const navigate = (id: string) => { onNavigate(id); setOpen(false) }
  return (
    <header className={`site-nav${open ? ' site-nav--open' : ''}`}>
      <div className="nav-inner shell">
        <a className="brand-lockup" href="/#home" onClick={() => navigate('home')} aria-label="Harsh Gour home">
          <span className="brand-mark">{personal.mark}</span>
          <span className="brand-name">{personal.brand}</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.id} className={activeSection === item.id ? 'is-active' : ''} href={`#${item.id}`} onClick={(event) => { event.preventDefault(); navigate(item.id) }}>{item.label}</a>)}
        </nav>
        <button type="button" className="mobile-menu-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
        {navItems.map((item) => <a key={item.id} className={activeSection === item.id ? 'is-active' : ''} href={`#${item.id}`} onClick={(event) => { event.preventDefault(); navigate(item.id) }}>{item.label}<span>0{navItems.indexOf(item) + 1}</span></a>)}
      </nav>
    </header>
  )
}
