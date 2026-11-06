import { useEffect, useRef } from 'react'
import { MapPin, Clock, Calendar, Navigation } from 'lucide-react'
import { weddingData } from '../../data/weddingData'
import { fadeInUp, scaleIn } from '../../animations/scrollAnimations'

export default function VenueSection() {
  const titleRef = useRef(null)
  const cardRef  = useRef(null)

  useEffect(() => {
    fadeInUp(titleRef.current, { start: 'top 88%' })
    scaleIn(cardRef.current,   { start: 'top 85%', duration: 1.0 })
  }, [])

  const { venue, events, weddingDateBn, weddingDateBengaliCal } = weddingData
  const mainEvent = events.find(e => e.id === 'wedding')

  return (
    <section
      id="venue"
      style={{
        background: 'linear-gradient(135deg, var(--color-maroon-dark) 0%, #5A1212 50%, var(--color-maroon) 100%)',
        padding: '5rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Soft dot pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.07) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
        pointerEvents: 'none',
      }} />

      {/* Top line */}
      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)', marginBottom: '3rem' }} />

      {/* Title */}
      <div ref={titleRef} style={{ marginBottom: '2.5rem' }}>
        <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.8rem', letterSpacing: '0.25em', color: 'rgba(201,168,76,0.7)', marginBottom: '0.5rem' }}>
          ✦ অনুষ্ঠান স্থান ✦
        </p>
        <h2 style={{ fontFamily: 'var(--font-bengali)', fontSize: 'clamp(1.6rem, 6vw, 2.2rem)', fontWeight: 600, color: 'var(--color-cream)' }}>
          কোথায় আসবেন
        </h2>
      </div>

      {/* Venue card */}
      <div
        ref={cardRef}
        style={{
          maxWidth: 420,
          margin: '0 auto',
          background: 'rgba(253,246,227,0.07)',
          border: '1px solid rgba(201,168,76,0.35)',
          borderRadius: 16,
          padding: '2.5rem 1.75rem',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        {/* Inner border */}
        <div style={{ position: 'absolute', inset: '1rem', border: '1px solid rgba(201,168,76,0.12)', borderRadius: 12, pointerEvents: 'none' }} />

        {/* Venue icon */}
        <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>🏛️</div>

        <h3 style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: '1.4rem',
          fontWeight: 700,
          color: 'var(--color-gold-light)',
          marginBottom: '0.5rem',
        }}>
          {venue.nameBn}
        </h3>

        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)', margin: '1rem 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', textAlign: 'left', marginBottom: '1.5rem' }}>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <MapPin size={16} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: 2 }} strokeWidth={1.5} />
            <div>
              <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.95rem', color: 'var(--color-cream)', fontWeight: 500 }}>
                {venue.addressBn}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(245,230,192,0.6)', marginTop: '0.2rem' }}>
                {venue.addressEn}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Calendar size={16} style={{ color: 'var(--color-gold)', flexShrink: 0 }} strokeWidth={1.5} />
            <div>
              <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.95rem', color: 'var(--color-cream)' }}>
                {weddingDateBn}
              </p>
              <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.75rem', color: 'rgba(201,168,76,0.7)', marginTop: '0.15rem' }}>
                {weddingDateBengaliCal}
              </p>
            </div>
          </div>

          {mainEvent && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Clock size={16} style={{ color: 'var(--color-gold)', flexShrink: 0 }} strokeWidth={1.5} />
              <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.95rem', color: 'var(--color-cream)' }}>
                {mainEvent.timeBn}
              </p>
            </div>
          )}
        </div>

        {/* Map button */}
        <a
          href={venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            width: '100%',
            padding: '0.9rem 1.5rem',
            background: 'linear-gradient(135deg, var(--color-gold), #A8843A)',
            borderRadius: 8,
            fontFamily: 'var(--font-bengali)',
            fontSize: '0.95rem',
            fontWeight: 600,
            color: 'var(--color-maroon-dark)',
            textDecoration: 'none',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          <Navigation size={16} strokeWidth={2} />
          গুগল ম্যাপে দেখুন
        </a>
      </div>

      {/* Bottom line */}
      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)', marginTop: '3rem' }} />
    </section>
  )
}
