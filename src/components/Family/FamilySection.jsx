import { useEffect, useRef } from 'react'
import { weddingData } from '../../data/weddingData'
import { fadeIn, staggerFadeIn } from '../../animations/scrollAnimations'

export default function FamilySection() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    fadeIn(contentRef.current, { duration: 1.2, start: 'top 85%' })
  }, [])

  const { bride, groom, brideFamily, groomFamily } = weddingData

  return (
    <section
      id="family"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, var(--color-cream-dark) 0%, #EEE0C2 100%)',
        padding: '5rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(107,26,26,0.04) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        pointerEvents: 'none',
      }} />

      <div className="ornament-divider">
        <span>🌼</span>
      </div>

      <div ref={contentRef} style={{ maxWidth: 460, margin: '2rem auto 0', position: 'relative' }}>

        <p style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: '0.8rem',
          letterSpacing: '0.2em',
          color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          ✦ পরিবারের পক্ষ থেকে ✦
        </p>

        <h2 style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: 'clamp(1.3rem, 5vw, 1.8rem)',
          fontWeight: 600,
          color: 'var(--color-maroon)',
          lineHeight: 1.5,
          marginBottom: '2rem',
        }}>
          আমাদের পরিবারের সাথে মিলিত হয়ে<br />
          এই আনন্দের অনুষ্ঠানে যোগ দেওয়ার জন্য<br />
          আপনাকে সাদর আমন্ত্রণ জানাই
        </h2>

        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #C9A84C, transparent)', margin: '0 auto 2rem', maxWidth: 200 }} />

        {/* Two family panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>

          {/* Bride's side */}
          <div style={{
            border: '1px solid rgba(201,168,76,0.4)',
            borderRadius: 12,
            padding: '1.25rem 1rem',
            background: 'rgba(232,180,184,0.1)',
          }}>
            <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              কনের পরিবার
            </p>
            <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-maroon)' }}>
              {bride.nameBn}
            </p>
            <div style={{ height: 1, background: 'rgba(201,168,76,0.3)', margin: '0.6rem 0' }} />
            <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
              {brideFamily.fatherBn}<br />
              {brideFamily.motherBn}
            </p>
            <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.65rem', color: 'rgba(107,75,59,0.45)', marginTop: '0.4rem', fontStyle: 'italic' }}>
              {brideFamily.note}
            </p>
          </div>

          {/* Groom's side */}
          <div style={{
            border: '1px solid rgba(201,168,76,0.4)',
            borderRadius: 12,
            padding: '1.25rem 1rem',
            background: 'rgba(201,168,76,0.07)',
          }}>
            <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              বরের পরিবার
            </p>
            <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-maroon)' }}>
              {groom.nameBn}
            </p>
            <div style={{ height: 1, background: 'rgba(201,168,76,0.3)', margin: '0.6rem 0' }} />
            <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
              {groomFamily.fatherBn}<br />
              {groomFamily.motherBn}
            </p>
            <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.65rem', color: 'rgba(107,75,59,0.45)', marginTop: '0.4rem', fontStyle: 'italic' }}>
              {groomFamily.note}
            </p>
          </div>
        </div>

        <p style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: '0.95rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.9,
          fontStyle: 'italic',
        }}>
          আপনার আশীর্বাদ ও শুভেচ্ছাই আমাদের সবচেয়ে বড় পাওয়া।
        </p>
      </div>

      <div className="ornament-divider" style={{ marginTop: '3rem' }}>
        <span>🌼</span>
      </div>
    </section>
  )
}
