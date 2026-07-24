"use client"

import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Logo from './Logo'

const links = [
  ['Product', '#product'],
  ['How it works', '#runtime'],
  ['Pricing', '#pricing'],
  ['Docs', '/docs'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const closeOnDesktop = () => {
      if (window.innerWidth > 640) setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnDesktop)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', closeOnDesktop)
    }
  }, [open])

  return (
    <header className="nav-shell">
      <nav className="nav container" aria-label="Main navigation">
        <Logo />
        <button className="nav-menu-button" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <div id="mobile-navigation" className={`nav-content${open ? ' is-open' : ''}`}>
          <div className="nav-links">
            {links.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </div>
          <div className="nav-actions">
            <a className="nav-signin" href="/login" onClick={() => setOpen(false)}>Sign in</a>
            <a className="nav-cta" href="/signup" onClick={() => setOpen(false)}>Start building <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </nav>
    </header>
  )
}
