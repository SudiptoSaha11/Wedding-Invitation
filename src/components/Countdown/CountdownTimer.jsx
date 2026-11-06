import { useEffect, useRef } from 'react'
import { useCountdown } from '../../hooks/useCountdown'
import { scaleIn, staggerFadeIn } from '../../animations/scrollAnimations'

const CountBox = ({ value, labelBn }) => (
  <div className="countdown-box">
    <span className="countdown-number" style={{ color: '#F5F5DC' }}>
      {String(value).padStart(2, '0')}
    </span>
    <span className="countdown-label" style={{ color: 'var(--color-gold-pale)' }}>
      {labelBn}
    </span>
  </div>
)

export default function CountdownTimer() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown()
  const sectionRef  = useRef(null)
  const titleRef    = useRef(null)
  const boxesRef    = useRef(null)

  useEffect(() => {
    scaleIn(titleRef.current, { start: 'top 88%' })
    scaleIn(boxesRef.current, { start: 'top 88%', duration: 1.0 })
  }, [])

  return (
    <section
      id="countdown"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(135deg, var(--color-maroon-dark) 0%, var(--color-maroon) 60%, #7A2020 100%)',
        padding: '5rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        pointerEvents: 'none',
      }} />

      {/* Decorative top divider */}
      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)', marginBottom: '3rem' }} />

      <div ref={titleRef}>
        <p style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: '0.8rem',
          letterSpacing: '0.25em',
          color: 'rgba(201,168,76,0.7)',
          marginBottom: '0.75rem',
        }}>
          ✦ গণনা ✦
        </p>
        <h2 style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: 'clamp(1.5rem, 5vw, 2rem)',
          fontWeight: 600,
          color: 'var(--color-cream)',
          marginBottom: '0.5rem',
        }}>
          শুভ দিনের অপেক্ষায়
        </h2>
        <p style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: '0.9rem',
          color: 'rgba(245,230,192,0.65)',
          marginBottom: '2.5rem',
        }}>
          ২৬শে নভেম্বর, ২০২৬
        </p>
      </div>

      {isExpired ? (
        <div style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: 'clamp(1.4rem, 5vw, 2rem)',
          color: 'var(--color-gold-light)',
          padding: '2rem',
        }}>
          🎉 আজই সেই শুভ বিবাহের দিন! ❤️
        </div>
      ) : (
        <div
          ref={boxesRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <CountBox value={days}    labelBn="দিন" />
          <CountBox value={hours}   labelBn="ঘণ্টা" />
          <CountBox value={minutes} labelBn="মিনিট" />
          <CountBox value={seconds} labelBn="সেকেন্ড" />
        </div>
      )}

      {/* Decorative bottom divider */}
      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)', marginTop: '3rem' }} />
    </section>
  )
}
