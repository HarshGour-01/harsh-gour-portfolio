import { ArrowUpRight, MoveUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { SocialLink } from '../../data/site'

const socialGlyphs = {
  github: 'GH',
  linkedin: 'in',
  instagram: 'IG',
}

export function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return (
    <div className="section-label">
      <span className="section-label__number">{number}</span>
      <span className="section-label__line" />
      <span>{children}</span>
    </div>
  )
}

export function ArrowButton({ children, href, onClick, variant = 'solid', type = 'button' }: { children: ReactNode; href?: string; onClick?: () => void; variant?: 'solid' | 'outline'; type?: 'button' | 'submit' }) {
  const content = <>{children}<ArrowUpRight size={16} strokeWidth={1.5} /></>
  const className = `arrow-button arrow-button--${variant}`
  if (href) return <a className={className} href={href}>{content}</a>
  return <button className={className} type={type} onClick={onClick}>{content}</button>
}

export function SocialLinks({ links, compact = false }: { links: SocialLink[]; compact?: boolean }) {
  return (
    <div className={`social-links${compact ? ' social-links--compact' : ''}`}>
      {links.map((link) => {
        return (
          <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`Open Harsh Gour's ${link.label} profile`} className="social-link">
            <span className="social-glyph" aria-hidden="true">{socialGlyphs[link.id]}</span>
            {!compact && <span>{link.label}</span>}
          </a>
        )
      })}
    </div>
  )
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">{children}<MoveUpRight size={14} /></a>
}
