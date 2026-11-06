import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * PreloaderScreen
 * Shows a brief animated preloader while fonts & initial assets load.
 * Calls onDone() when complete so App can show the opening screen.
 */
export default function PreloaderScreen({ onDone }) {
  const containerRef = useRef(null)
  const textRef      = useRef(null)
  const dotsRef      = useRef(null)
  const barRef       = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Fade in
    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    )
    // Animate the progress bar
    .fromTo(barRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1.6, ease: 'power2.inOut' },
      0.3
    )
    // Fade out
    .to(containerRef.current,
      { opacity: 0, duration: 0.5, ease: 'power2.in',
        onComplete: () => onDone()
      },
      '+=0.2'
    )
  }, [onDone])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'linear-gradient(135deg, #3D0E0E 0%, #2C1810 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '1.5rem',
      }}
    >
      {/* Lotus SVG spinner */}
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ animation: 'lotus-spin 3s linear infinite' }}>
        <style>{`@keyframes lotus-spin { to { transform: rotate(360deg); } }`}</style>
        {[0,45,90,135,180,225,270,315].map((deg, i) => (
          <ellipse
            key={i}
            cx="32" cy="18" rx="5" ry="12"
            fill="#C9A84C"
            opacity={0.3 + i * 0.09}
            transform={`rotate(${deg} 32 32)`}
          />
        ))}
        <circle cx="32" cy="32" r="6" fill="#C9A84C" opacity="0.9" />
      </svg>

      {/* Text */}
      <div ref={textRef} style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: '1.1rem',
          color: 'var(--color-gold-light)',
          letterSpacing: '0.12em',
        }}>
          শুভ বিবাহ
        </p>
        <p ref={dotsRef} style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          color: 'rgba(201,168,76,0.55)',
          marginTop: '0.35rem',
          letterSpacing: '0.2em',
        }}>
          LOADING
        </p>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 160, height: 2,
        background: 'rgba(201,168,76,0.2)',
        borderRadius: 2, overflow: 'hidden',
      }}>
        <div
          ref={barRef}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  )
}
