import { useEffect, useRef } from 'react'
import { weddingData } from '../../data/weddingData'
import { fadeIn, staggerFadeIn } from '../../animations/scrollAnimations'

export default function InvitationMessage() {
  const sectionRef = useRef(null)
  const linesRef   = useRef([])

  useEffect(() => {
    linesRef.current.forEach((el, i) => {
      if (el) {
        fadeIn(el, { duration: 1.0, delay: i * 0.1, start: 'top 90%' })
      }
    })
  }, [])

  const addLineRef = (i) => (el) => { linesRef.current[i] = el }

  const { invitationMessage: msg, bride, groom, weddingDateBn, weddingDateBengaliCal, weddingDay } = weddingData

  return (
    <section
      id="invitation-message"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, var(--color-cream-dark) 0%, var(--color-cream) 100%)',
        padding: '1rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Decorative ornament image */}
      <img
        src="/assets/images/ornament.png"
        alt=""
        aria-hidden="true"
        style={{ width: '100%', maxWidth: 300, height: 'auto', opacity: 0.55, marginBottom: '2rem' }}
      />

      {/* Outer gold frame */}
      <div style={{
        maxWidth: 420,
        margin: '0 auto',
        border: '1px solid rgba(201,168,76,0.45)',
        borderRadius: 4,
        padding: '2.5rem 1.75rem',
        position: 'relative',
        background: 'rgba(253,246,227,0.6)',
        backdropFilter: 'blur(2px)',
      }}>
        {/* Inner border */}
        <div style={{ position: 'absolute', inset: 8, border: '1px solid rgba(201,168,76,0.2)', borderRadius: 2, pointerEvents: 'none' }} />

        <p ref={addLineRef(0)} style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: '0.85rem',
          letterSpacing: '0.08em',
          color: 'var(--color-gold)',
          marginBottom: '0.5rem',
        }}>
          ✦ ✦ ✦
        </p>

        <p ref={addLineRef(1)} style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.8,
          marginBottom: '1.25rem',
        }}>
          {msg.line1}
        </p>

        <p ref={addLineRef(2)} style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.8,
        }}>
          {msg.line2}
        </p>

        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #C9A84C, transparent)', margin: '1.25rem auto', maxWidth: 140 }} />

        <p ref={addLineRef(3)} style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.8,
          marginBottom: '1rem',
        }}>
          {msg.line3}
        </p>

        {/* Bride name */}
        <p ref={addLineRef(4)} style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: 'clamp(1.6rem, 6vw, 2.2rem)',
          fontWeight: 700,
          color: 'var(--color-maroon)',
          lineHeight: 1.2,
        }}>
          {bride.nameBn}
        </p>

        <p ref={addLineRef(5)} style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: '1.2rem',
          color: 'var(--color-gold)',
          margin: '0.35rem 0',
        }}>
          &amp;
        </p>

        {/* Groom name */}
        <p ref={addLineRef(6)} style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: 'clamp(1.6rem, 6vw, 2.2rem)',
          fontWeight: 700,
          color: 'var(--color-maroon)',
          lineHeight: 1.2,
        }}>
          {groom.nameBn}
        </p>

        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #C9A84C, transparent)', margin: '1.25rem auto', maxWidth: 140 }} />

        {/* Date block */}
        <div ref={addLineRef(7)} style={{
          background: 'rgba(107,26,26,0.06)',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: 8,
          padding: '0.9rem 1.25rem',
          marginBottom: '1.25rem',
        }}>
          <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '1.05rem', color: 'var(--color-maroon)', fontWeight: 600 }}>
            {weddingDateBn}
          </p>
          <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.75rem', color: 'var(--color-gold)', marginTop: '0.2rem' }}>
            {weddingDay} &bull; {weddingDateBengaliCal}
          </p>
        </div>

        <p ref={addLineRef(8)} style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: '0.9rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.8,
          fontStyle: 'italic',
        }}>
          {msg.closing}
        </p>

        <p style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: '0.85rem',
          letterSpacing: '0.08em',
          color: 'var(--color-gold)',
          marginTop: '1rem',
        }}>
          ✦ ✦ ✦
        </p>
      </div>

      <img
        src="/assets/images/ornament.png"
        alt=""
        aria-hidden="true"
        style={{ width: '100%', maxWidth: 300, height: 'auto', opacity: 0.55, marginTop: '2rem', transform: 'scaleY(-1)' }}
      />
    </section>
  )
}
