import { useState, useRef, useEffect } from 'react'
import { Share2, Calendar, Copy, Check } from 'lucide-react'
import { weddingData } from '../../data/weddingData'
import { fadeIn, fadeInUp } from '../../animations/scrollAnimations'

export default function ClosingSection() {
  const sectionRef  = useRef(null)
  const illustRef   = useRef(null)
  const textRef     = useRef(null)
  const flowerRef   = useRef(null)
  const actionsRef  = useRef(null)

  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fadeIn(illustRef.current,  { duration: 1.2, start: 'top 90%' })
    fadeInUp(textRef.current,  { duration: 1.0, y: 30, start: 'top 88%' })
    fadeIn(flowerRef.current,  { duration: 1.4, start: 'top 88%' })
    fadeInUp(actionsRef.current, { duration: 0.9, y: 20, start: 'top 90%' })
  }, [])

  const { bride, groom } = weddingData

  const handleShareWhatsApp = () => {
    const text = `🌸 *শুভ বিবাহ আমন্ত্রণ* 🌸\n\n*${bride.nameBn}* ও *${groom.nameBn}*-র শুভ বিবাহ অনুষ্ঠানে আপনাকে সাদর আমন্ত্রণ।\n📅 তারিখ: ${weddingData.weddingDateBn} (${weddingData.weddingDateBengaliCal})\n\nডিজিটাল আমন্ত্রণপত্রটি দেখুন:\n${window.location.origin}`
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank')
  }

  const handleShareOrCopy = async () => {
    const shareData = {
      title: `${bride.nameBn} ও ${groom.nameBn} | শুভ বিবাহ আমন্ত্রণ`,
      text: `${bride.nameBn} ও ${groom.nameBn}-র শুভ বিবাহ অনুষ্ঠানে আপনাকে সাদর আমন্ত্রণ।\n${weddingData.weddingDateBn}।`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch (e) {
        // user cancelled or fallback
      }
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch (e) {
      alert('লিঙ্কটি কপি করুন: ' + window.location.href)
    }
  }

  const handleAddToCalendar = () => {
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`শুভ বিবাহ: ${bride.nameBn} ও ${groom.nameBn}`)}&dates=20261126T133000Z/20261126T183000Z&details=${encodeURIComponent(`${bride.nameBn} ও ${groom.nameBn}-র শুভ বিবাহ অনুষ্ঠান।\nতারিখ: ${weddingData.weddingDateBn}\nবঙ্গাব্দ: ${weddingData.weddingDateBengaliCal}`)}&location=${encodeURIComponent('Kolkata, West Bengal')}`
    window.open(calUrl, '_blank')
  }

  return (
    <section
      id="closing"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, var(--color-cream-dark) 0%, var(--color-cream) 40%, #EEE0C2 100%)',
        padding: '5rem 1.5rem 4rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.06) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
        pointerEvents: 'none',
      }} />

      {/* Top flowers */}
      <div ref={flowerRef} style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.85rem',
        marginBottom: '2rem',
      }}>
        <img src="/assets/flowers/marigold.png" alt="" aria-hidden="true" style={{ width: 48, height: 48, objectFit: 'contain' }} />
        <img src="/assets/flowers/pink-flower.png" alt="" aria-hidden="true" style={{ width: 42, height: 42, objectFit: 'contain' }} />
        <img src="/assets/flowers/marigold.png" alt="" aria-hidden="true" style={{ width: 56, height: 56, objectFit: 'contain' }} />
        <img src="/assets/flowers/pink-flower.png" alt="" aria-hidden="true" style={{ width: 42, height: 42, objectFit: 'contain' }} />
        <img src="/assets/flowers/marigold.png" alt="" aria-hidden="true" style={{ width: 48, height: 48, objectFit: 'contain' }} />
      </div>

      {/* Couple illustration - Centered */}
      <div
        ref={illustRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          margin: '0 auto 2rem',
        }}
      >
        <img
          src="/assets/images/couple.png"
          alt={`${bride.nameBn} ও ${groom.nameBn}`}
          style={{
            width: '100%',
            maxWidth: 220,
            height: 'auto',
            display: 'block',
            margin: '0 auto',
            borderRadius: '16px',
            filter: 'drop-shadow(0 8px 24px rgba(107,26,26,0.15))',
          }}
        />
      </div>

      {/* Closing text */}
      <div ref={textRef} style={{ maxWidth: 400, margin: '0 auto' }}>

        <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--color-gold)', marginBottom: '1.25rem' }}>
          ✦ ✦ ✦
        </p>

        <h2 style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: 'clamp(1.15rem, 4.5vw, 1.55rem)',
          fontWeight: 600,
          color: 'var(--color-maroon)',
          lineHeight: 1.8,
          marginBottom: '1.5rem',
        }}>
          আপনার উপস্থিতি<br />
          আমাদের এই আনন্দের মুহূর্তকে<br />
          আরও বিশেষ করে তুলবে।
        </h2>

        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #C9A84C, transparent)', margin: '0 auto 1.5rem', maxWidth: 180 }} />

        <p style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: '0.95rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.8,
          marginBottom: '1.75rem',
        }}>
          ভালোবাসায়,
        </p>

        <p style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: 'clamp(1.4rem, 5.5vw, 1.9rem)',
          fontWeight: 700,
          color: 'var(--color-maroon)',
          lineHeight: 1.4,
        }}>
          {bride.nameBn}
        </p>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: '1.2rem',
          color: 'var(--color-gold)',
          margin: '0.3rem 0',
        }}>
          &amp;
        </p>
        <p style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: 'clamp(1.4rem, 5.5vw, 1.9rem)',
          fontWeight: 700,
          color: 'var(--color-maroon)',
          lineHeight: 1.4,
          marginBottom: '2rem',
        }}>
          {groom.nameBn}
        </p>

        <p style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: '0.95rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.8,
          fontStyle: 'italic',
          marginBottom: '0.5rem',
        }}>
          আমাদের গল্পের অংশ হওয়ার জন্য<br />
          অসংখ্য ধন্যবাদ ❤️
        </p>

        <p style={{ fontFamily: 'var(--font-bengali)', fontSize: '0.85rem', letterSpacing: '0.2em', color: 'var(--color-gold)', marginTop: '1.5rem', marginBottom: '2.5rem' }}>
          ✦ শুভ বিবাহ ✦
        </p>
      </div>

      {/* ── Interactive Share & Calendar Action Panel ── */}
      <div
        ref={actionsRef}
        style={{
          maxWidth: 420,
          margin: '0 auto 2.5rem',
          padding: '1.25rem',
          background: 'rgba(253,246,227,0.7)',
          border: '1px solid rgba(201,168,76,0.4)',
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(107,26,26,0.06)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: '0.85rem',
          color: 'var(--color-gold-dark)',
          fontWeight: 600,
          marginBottom: '1rem',
          letterSpacing: '0.05em',
        }}>
          আমন্ত্রণপত্র শেয়ার বা সংরক্ষণ করুন
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: '0.75rem',
        }}>
          {/* WhatsApp Share */}
          <button
            onClick={handleShareWhatsApp}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '0.75rem 0.6rem',
              borderRadius: 10,
              background: '#25D366',
              color: '#FFFFFF',
              border: 'none',
              fontFamily: 'var(--font-bengali)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(37,211,102,0.25)',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
            }}
          >
            <Share2 size={16} />
            <span>হোয়াটসঅ্যাপ</span>
          </button>

          {/* Add to Calendar */}
          <button
            onClick={handleAddToCalendar}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '0.75rem 0.6rem',
              borderRadius: 10,
              background: 'linear-gradient(135deg, var(--color-maroon), var(--color-maroon-dark))',
              color: 'var(--color-gold-light)',
              border: '1px solid var(--color-gold)',
              fontFamily: 'var(--font-bengali)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(107,26,26,0.2)',
              transition: 'transform 0.2s ease',
            }}
          >
            <Calendar size={16} />
            <span>ক্যালেন্ডার</span>
          </button>

          {/* Copy / Native Share */}
          <button
            onClick={handleShareOrCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '0.75rem 0.6rem',
              borderRadius: 10,
              background: 'rgba(201,168,76,0.15)',
              color: 'var(--color-maroon)',
              border: '1px solid rgba(201,168,76,0.5)',
              fontFamily: 'var(--font-bengali)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            {copied ? <Check size={16} color="#27AE60" /> : <Copy size={16} />}
            <span>{copied ? 'কপি হয়েছে!' : 'লিঙ্ক কপি'}</span>
          </button>
        </div>
      </div>

      {/* Bottom ornament */}
      <img
        src="/assets/images/ornament.png"
        alt=""
        aria-hidden="true"
        style={{ width: '100%', maxWidth: 250, height: 'auto', opacity: 0.4, marginTop: '1.5rem' }}
      />

      {/* Copyright */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.7rem',
        color: 'rgba(107,75,59,0.35)',
        marginTop: '2rem',
      }}>
        {weddingData.bride.nameEn} &amp; {weddingData.groom.nameEn} · 26.11.2026
      </p>
    </section>
  )
}
