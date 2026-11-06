import { useEffect, useRef } from 'react'
import { MapPin, Clock, Calendar } from 'lucide-react'
import { weddingData } from '../../data/weddingData'
import { staggerFadeIn } from '../../animations/scrollAnimations'

const EventCard = ({ event, index }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    if (cardRef.current) {
      staggerFadeIn([cardRef.current], { y: 50, start: 'top 88%', stagger: 0 })
    }
  }, [])

  const isCenter = index === 1

  return (
    <div
      ref={cardRef}
      className="event-card"
      style={{
        transform: isCenter ? 'none' : `translateY(${index === 0 ? '0' : '0'})`,
        borderTop: `3px solid var(--color-${isCenter ? 'maroon' : 'gold'})`,
      }}
    >
      {/* Emoji icon */}
      <div style={{
        width: 56, height: 56,
        borderRadius: '50%',
        background: isCenter
          ? 'linear-gradient(135deg, var(--color-maroon), var(--color-maroon-dark))'
          : 'linear-gradient(135deg, var(--color-gold), #A8843A)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.6rem',
        margin: '0 auto 1.25rem',
        boxShadow: isCenter
          ? '0 4px 16px rgba(107,26,26,0.3)'
          : '0 4px 16px rgba(201,168,76,0.3)',
      }}>
        {event.emoji}
      </div>

      {/* Event name */}
      <h3 style={{
        fontFamily: 'var(--font-bengali)',
        fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
        fontWeight: 700,
        color: 'var(--color-maroon)',
        textAlign: 'center',
        marginBottom: '0.5rem',
      }}>
        {event.nameBn}
      </h3>

      <p style={{
        fontFamily: 'var(--font-bengali)',
        fontSize: '0.75rem',
        color: 'var(--color-gold)',
        textAlign: 'center',
        letterSpacing: '0.1em',
        marginBottom: '1.25rem',
      }}>
        {event.nameEn}
      </p>

      {/* Thin gold line */}
      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)', marginBottom: '1.25rem' }} />

      {/* Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Calendar size={14} style={{ color: 'var(--color-gold)', flexShrink: 0 }} strokeWidth={1.5} />
          <span style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.9rem', color: 'var(--color-text)' }}>
            {event.dateBn}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Clock size={14} style={{ color: 'var(--color-gold)', flexShrink: 0 }} strokeWidth={1.5} />
          <span style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.9rem', color: 'var(--color-text)' }}>
            {event.timeBn}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
          <MapPin size={14} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '3px' }} strokeWidth={1.5} />
          <div>
            <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.9rem', color: 'var(--color-text)', fontWeight: 600 }}>
              {event.venueBn}
            </p>
            <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.1rem' }}>
              {event.address}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-bengali)',
        fontSize: '0.85rem',
        color: 'var(--color-text-muted)',
        lineHeight: 1.7,
        marginTop: '1rem',
        fontStyle: 'italic',
        borderTop: '1px solid rgba(201,168,76,0.2)',
        paddingTop: '1rem',
        textAlign: 'center',
      }}>
        {event.description}
      </p>

      {/* Map link
      <a
        href={event.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginTop: '1.25rem',
          padding: '0.5rem 1.25rem',
          border: '1px solid var(--color-gold)',
          borderRadius: 4,
          fontFamily: 'var(--font-bengali)',
          fontSize: '0.8rem',
          color: 'var(--color-gold)',
          textDecoration: 'none',
          transition: 'background 0.2s ease',
          width: '100%',
          justifyContent: 'center',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <MapPin size={13} strokeWidth={1.5} />
        মানচিত্রে দেখুন
      </a> */}
    </div>
  )
}

export default function EventsSection() {
  const titleRef = useRef(null)

  useEffect(() => {
    staggerFadeIn([titleRef.current], { y: 30, start: 'top 88%' })
  }, [])

  return (
    <section
      id="events"
      style={{
        background: 'var(--color-cream)',
        padding: '5rem 1.5rem',
        position: 'relative',
      }}
    >
      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/assets/images/ornament.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: '300px',
        opacity: 0.03,
        pointerEvents: 'none',
      }} />

      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: '0.8rem',
          letterSpacing: '0.25em',
          color: 'var(--color-gold)',
          marginBottom: '0.5rem',
        }}>
          ✦ অনুষ্ঠানসমূহ ✦
        </p>
        <h2 style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: 'clamp(1.6rem, 6vw, 2.2rem)',
          fontWeight: 700,
          color: 'var(--color-maroon)',
        }}>
          বিবাহের অনুষ্ঠান
        </h2>
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #C9A84C, transparent)', margin: '1rem auto', maxWidth: 200 }} />
      </div>

      {/* Event cards — stacked on mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        maxWidth: 960,
        margin: '0 auto',
      }}>
        {weddingData.events.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </section>
  )
}
