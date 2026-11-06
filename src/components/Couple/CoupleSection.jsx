import { useState, useEffect, useRef } from 'react'
import { weddingData } from '../../data/weddingData'
import { staggerFadeIn, fadeInUp } from '../../animations/scrollAnimations'

// Graceful fallback silhouette
const BridePlaceholder = () => (
  <svg viewBox="0 0 160 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 160, height: 'auto' }}>
    <ellipse cx="80" cy="45" rx="32" ry="36" fill="#E8B4B8" opacity="0.6"/>
    <path d="M30 260 Q40 140 80 120 Q120 140 130 260Z" fill="#C0392B" opacity="0.4"/>
    <path d="M45 200 Q80 180 115 200" stroke="#C9A84C" strokeWidth="2" fill="none"/>
    <circle cx="80" cy="25" r="8" fill="#C9A84C" opacity="0.7"/>
    <line x1="80" y1="45" x2="80" y2="120" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
    <text x="80" y="248" textAnchor="middle" fontFamily="Noto Serif Bengali" fontSize="12" fill="#6B1A1A" opacity="0.7">কনে</text>
  </svg>
)

const GroomPlaceholder = () => (
  <svg viewBox="0 0 160 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 160, height: 'auto' }}>
    <ellipse cx="80" cy="45" rx="28" ry="32" fill="#D4A870" opacity="0.6"/>
    <path d="M35 260 Q45 150 80 130 Q115 150 125 260Z" fill="#FDF6E3" opacity="0.5"/>
    <path d="M35 260 Q45 150 80 130 Q115 150 125 260Z" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
    <polygon points="80,5 70,25 90,25" fill="#C9A84C" opacity="0.8"/>
    <line x1="80" y1="45" x2="80" y2="130" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
    <text x="80" y="248" textAnchor="middle" fontFamily="Noto Serif Bengali" fontSize="12" fill="#6B1A1A" opacity="0.7">বর</text>
  </svg>
)

export default function CoupleSection() {
  const brideRef   = useRef(null)
  const groomRef   = useRef(null)
  const centerRef  = useRef(null)

  const [brideErr, setBrideErr] = useState(false)
  const [groomErr, setGroomErr] = useState(false)

  useEffect(() => {
    if (brideRef.current && groomRef.current) {
      staggerFadeIn([brideRef.current, groomRef.current], { y: 40, stagger: 0.25, start: 'top 85%' })
    }
    if (centerRef.current) {
      fadeInUp(centerRef.current, { y: 20, start: 'top 80%' })
    }
  }, [])

  return (
    <section
      id="couple"
      style={{
        background: 'linear-gradient(180deg, var(--color-cream) 0%, var(--color-cream-dark) 100%)',
        padding: '5rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern dots */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

      {/* Ornament top */}
      <div className="ornament-divider" style={{ marginBottom: '2rem' }}>
        <span>🌸</span>
      </div>

      <p style={{
        fontFamily: 'var(--font-bengali)',
        fontSize: '0.9rem',
        letterSpacing: '0.2em',
        color: 'var(--color-gold)',
        marginBottom: '2.5rem',
        fontWeight: 600,
      }}>
        বর ও কনের শুভ পরিচয়
      </p>

      {/* Two illustrations side by side */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1.25rem',
        maxWidth: 520,
        margin: '0 auto',
      }}>

        {/* Bride */}
        <div ref={brideRef} style={{ flex: 1, maxWidth: 190 }}>
          <div style={{
            background: 'linear-gradient(180deg, rgba(232,180,184,0.2) 0%, rgba(253,246,227,0.4) 100%)',
            border: '2px solid var(--color-gold)',
            borderRadius: '110px 110px 24px 24px',
            padding: '8px',
            marginBottom: '1rem',
            boxShadow: '0 12px 30px rgba(107,26,26,0.12)',
            overflow: 'hidden',
          }}>
            {!brideErr ? (
              <img
                src={weddingData.bride.image}
                alt={weddingData.bride.nameBn}
                onError={() => setBrideErr(true)}
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'cover',
                  borderRadius: '100px 100px 18px 18px',
                  display: 'block',
                }}
              />
            ) : (
              <div style={{ padding: '1rem 0' }}>
                <BridePlaceholder />
              </div>
            )}
          </div>
          <p style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'var(--color-maroon)',
            marginBottom: '0.2rem',
          }}>
            {weddingData.bride.nameBn}
          </p>
          <p style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: '0.8rem',
            color: 'var(--color-gold)',
            letterSpacing: '0.12em',
            fontWeight: 600,
          }}>
            কনে
          </p>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.85rem',
            color: 'var(--color-charcoal-light)',
            fontStyle: 'italic',
            marginTop: '0.15rem',
          }}>
            {weddingData.bride.nameEn}
          </p>
        </div>

        {/* Center Heart / Ampersand */}
        <div ref={centerRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: 52, height: 52,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-maroon), var(--color-maroon-dark))',
            border: '2px solid var(--color-gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(107,26,26,0.25)',
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--color-gold-light)', fontSize: '1.4rem' }}>ও</span>
          </div>
          <span style={{ fontSize: '0.75rem', marginTop: '6px', color: 'var(--color-gold)' }}>❤️</span>
        </div>

        {/* Groom */}
        <div ref={groomRef} style={{ flex: 1, maxWidth: 190 }}>
          <div style={{
            background: 'linear-gradient(180deg, rgba(201,168,76,0.18) 0%, rgba(253,246,227,0.4) 100%)',
            border: '2px solid var(--color-gold)',
            borderRadius: '110px 110px 24px 24px',
            padding: '8px',
            marginBottom: '1rem',
            boxShadow: '0 12px 30px rgba(107,26,26,0.12)',
            overflow: 'hidden',
          }}>
            {!groomErr ? (
              <img
                src={weddingData.groom.image}
                alt={weddingData.groom.nameBn}
                onError={() => setGroomErr(true)}
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'cover',
                  borderRadius: '100px 100px 18px 18px',
                  display: 'block',
                }}
              />
            ) : (
              <div style={{ padding: '1rem 0' }}>
                <GroomPlaceholder />
              </div>
            )}
          </div>
          <p style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'var(--color-maroon)',
            marginBottom: '0.2rem',
          }}>
            {weddingData.groom.nameBn}
          </p>
          <p style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: '0.8rem',
            color: 'var(--color-gold)',
            letterSpacing: '0.12em',
            fontWeight: 600,
          }}>
            বর
          </p>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.85rem',
            color: 'var(--color-charcoal-light)',
            fontStyle: 'italic',
            marginTop: '0.15rem',
          }}>
            {weddingData.groom.nameEn}
          </p>
        </div>
      </div>

      <div className="ornament-divider" style={{ marginTop: '3.5rem' }}>
        <span>🌸</span>
      </div>
    </section>
  )
}
