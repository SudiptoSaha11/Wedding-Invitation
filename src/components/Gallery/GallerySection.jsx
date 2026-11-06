import { useRef, useEffect } from 'react'
import { weddingData } from '../../data/weddingData'
import { fadeIn, staggerFadeIn } from '../../animations/scrollAnimations'

export default function GallerySection() {
  const titleRef  = useRef(null)
  const gridRef   = useRef(null)

  useEffect(() => {
    fadeIn(titleRef.current, { start: 'top 88%' })
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.gallery-item')
      staggerFadeIn(Array.from(items), { y: 40, stagger: 0.1, start: 'top 85%' })
    }
  }, [])

  const { gallery } = weddingData

  return (
    <section
      id="gallery"
      style={{
        background: 'var(--color-cream)',
        padding: '5rem 1.5rem',
        textAlign: 'center',
      }}
    >
      {/* Title */}
      <div ref={titleRef} style={{ marginBottom: '2.5rem' }}>
        <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.8rem', letterSpacing: '0.25em', color: 'var(--color-gold)', marginBottom: '0.5rem' }}>
          ✦ গ্যালারি ✦
        </p>
        <h2 style={{ fontFamily: 'var(--font-bengali)', fontSize: 'clamp(1.6rem, 6vw, 2.2rem)', fontWeight: 700, color: 'var(--color-maroon)' }}>
          স্মৃতির ভাঁজে
        </h2>
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #C9A84C, transparent)', margin: '1rem auto', maxWidth: 160 }} />
        <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          আমাদের বিশেষ মুহূর্তগুলি
        </p>
      </div>

      {/* Asymmetric gallery grid */}
      <div
        ref={gridRef}
        className="gallery-grid"
        style={{ maxWidth: 480, margin: '0 auto' }}
      >
        {gallery.map((item, i) => (
          <div
            key={i}
            className="gallery-item"
            style={{
              height: i === 0 ? '240px' : i < 3 ? '180px' : '150px',
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }}
            />
          </div>
        ))}
      </div>

      <p style={{
        fontFamily: 'var(--font-bengali)',
        fontSize: '0.75rem',
        color: 'rgba(107,75,59,0.4)',
        marginTop: '1.5rem',
        fontStyle: 'italic',
      }}>
      </p>
    </section>
  )
}
