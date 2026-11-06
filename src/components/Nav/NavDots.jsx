import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const SECTIONS = [
  { id: 'hero',               label: 'শুরু' },
  { id: 'couple',             label: 'বর-কনে' },
  { id: 'invitation-message', label: 'আমন্ত্রণ' },
  { id: 'countdown',          label: 'গণনা' },
  { id: 'events',             label: 'অনুষ্ঠান' },
  { id: 'family',             label: 'পরিবার' },
  { id: 'venue',              label: 'স্থান' },
  { id: 'gallery',            label: 'গ্যালারি' },
  { id: 'rsvp',               label: 'RSVP' },
  { id: 'closing',            label: 'শেষ' },
]

/**
 * NavDots — fixed right-side navigation dots for the main sections.
 * Highlights the current section as the user scrolls.
 */
export default function NavDots() {
  const [active, setActive]   = useState('hero')
  const [visible, setVisible] = useState(false)
  const tooltipRef            = useRef(null)
  const containerRef          = useRef(null)

  // Show after a short delay so it doesn't clash with page entrance
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true)
      if (containerRef.current) {
        gsap.fromTo(containerRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
        )
      }
    }, 800)
    return () => clearTimeout(t)
  }, [])

  // IntersectionObserver to track active section
  useEffect(() => {
    const observers = []
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <nav
      ref={containerRef}
      aria-label="Section navigation"
      style={{
        position: 'fixed',
        right: '0.75rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 8888,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.55rem',
        opacity: 0,  // GSAP animates this in
      }}
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            title={label}
            aria-label={`${label} বিভাগে যান`}
            style={{
              width: isActive ? 10 : 7,
              height: isActive ? 10 : 7,
              borderRadius: '50%',
              border: `1.5px solid ${isActive ? 'var(--color-gold)' : 'rgba(201,168,76,0.4)'}`,
              background: isActive ? 'var(--color-gold)' : 'transparent',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.25s ease',
              boxShadow: isActive ? '0 0 6px rgba(201,168,76,0.6)' : 'none',
              alignSelf: 'center',
            }}
          />
        )
      })}
    </nav>
  )
}
