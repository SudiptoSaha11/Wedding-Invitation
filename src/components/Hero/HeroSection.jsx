import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'
import { weddingData } from '../../data/weddingData'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const illustRef = useRef(null)
  const titleRef  = useRef(null)
  const namesRef  = useRef(null)
  const dateRef   = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    // Hero is the first thing visible after entering — play immediately, no ScrollTrigger
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    gsap.set([illustRef.current, titleRef.current, namesRef.current, dateRef.current, scrollRef.current], { opacity: 0, y: 30 })

    tl
      .to(illustRef.current, { opacity: 1, y: 0, duration: 1.0 }, 0.15)
      .to(titleRef.current,  { opacity: 1, y: 0, duration: 0.9 }, 0.4)
      .to(namesRef.current,  { opacity: 1, y: 0, duration: 0.9 }, 0.65)
      .to(dateRef.current,   { opacity: 1, y: 0, duration: 0.8 }, 0.85)
      .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.7 }, 1.1)
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem 5rem',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/assets/images/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
      {/* Overlay */}
      <div className="hero-overlay" style={{ position: 'absolute', inset: 0 }} />

      {/* Decorative SVG corners */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
        <svg style={{ position:'absolute', top:16, left:16, width:55, opacity:0.45 }} viewBox="0 0 60 60" fill="none">
          <path d="M2 2 L58 2 L2 58" stroke="#C9A84C" strokeWidth="1" fill="none"/>
          <circle cx="2" cy="2" r="2.5" fill="#C9A84C"/>
        </svg>
        <svg style={{ position:'absolute', top:16, right:16, width:55, opacity:0.45 }} viewBox="0 0 60 60" fill="none">
          <path d="M58 2 L2 2 L58 58" stroke="#C9A84C" strokeWidth="1" fill="none"/>
          <circle cx="58" cy="2" r="2.5" fill="#C9A84C"/>
        </svg>
        <svg style={{ position:'absolute', bottom:16, left:16, width:55, opacity:0.45 }} viewBox="0 0 60 60" fill="none">
          <path d="M2 58 L2 2 L58 58" stroke="#C9A84C" strokeWidth="1" fill="none"/>
          <circle cx="2" cy="58" r="2.5" fill="#C9A84C"/>
        </svg>
        <svg style={{ position:'absolute', bottom:16, right:16, width:55, opacity:0.45 }} viewBox="0 0 60 60" fill="none">
          <path d="M58 58 L58 2 L2 58" stroke="#C9A84C" strokeWidth="1" fill="none"/>
          <circle cx="58" cy="58" r="2.5" fill="#C9A84C"/>
        </svg>
      </div>

      {/* Content */}
      <div style={{ position:'relative', zIndex:2, maxWidth:480, width:'100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Couple illustration */}
        <div
          ref={illustRef}
          style={{
            marginBottom: '1.25rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <img
            src="/assets/images/couple.png"
            alt={`${weddingData.bride.nameBn} ও ${weddingData.groom.nameBn}`}
            style={{
              width: '100%',
              maxWidth: 260,
              height: 'auto',
              display: 'block',
              margin: '0 auto',
              borderRadius: '20px',
              filter: 'drop-shadow(0 12px 36px rgba(0,0,0,0.5))',
            }}
          />
        </div>

        <div ref={titleRef}>
          <p style={{
            fontFamily:'var(--font-bengali)', fontSize:'0.78rem',
            letterSpacing:'0.32em', color:'var(--color-gold-light)',
            marginBottom:'0.4rem',
          }}>
            ✦ &nbsp; শুভ বিবাহ &nbsp; ✦
          </p>
        </div>

        <div style={{ height:1, background:'linear-gradient(to right,transparent,#C9A84C,transparent)', margin:'0.7rem auto', maxWidth:200 }} />

        <div ref={namesRef} style={{ margin:'0.85rem 0' }}>
          <h2 style={{
            fontFamily:'var(--font-bengali)',
            fontSize:'clamp(2rem, 8vw, 3rem)', fontWeight:700,
            color:'#FDF6E3', lineHeight:1.2,
            textShadow:'0 2px 24px rgba(0,0,0,0.65)',
          }}>
            {weddingData.groom.nameBn}
          </h2>
          <p style={{
            fontFamily:'var(--font-display)', fontStyle:'italic',
            fontSize:'1.6rem', color:'var(--color-gold-light)', margin:'0.2rem 0',
          }}>
            &amp;
          </p>
          <h2 style={{
            fontFamily:'var(--font-bengali)',
            fontSize:'clamp(2rem, 8vw, 3rem)', fontWeight:700,
            color:'#FDF6E3', lineHeight:1.2,
            textShadow:'0 2px 24px rgba(0,0,0,0.65)',
          }}>
            {weddingData.bride.nameBn}
          </h2>
        </div>

        <div style={{ height:1, background:'linear-gradient(to right,transparent,#C9A84C,transparent)', margin:'0.7rem auto', maxWidth:200 }} />

        <div ref={dateRef} style={{ marginTop:'0.85rem' }}>
          <p style={{ fontFamily:'var(--font-bengali)', fontSize:'1.05rem', color:'var(--color-gold-light)' }}>
            {weddingData.weddingDateBn}
          </p>
          <p style={{ fontFamily:'var(--font-bengali)', fontSize:'0.78rem', color:'rgba(245,230,192,0.68)', marginTop:'0.2rem' }}>
            {weddingData.weddingDateBengaliCal}
          </p>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollRef} className="scroll-indicator" style={{
          marginTop:'2.5rem',
          display:'flex', flexDirection:'column', alignItems:'center', gap:'0.25rem',
          color:'rgba(201,168,76,0.65)',
        }}>
          <span style={{ fontFamily:'var(--font-bengali)', fontSize:'0.68rem', letterSpacing:'0.18em' }}>
            নিচে স্ক্রোল করুন
          </span>
          <ChevronDown size={18} strokeWidth={1.5} />
        </div>
      </div>
    </section>
  )
}
