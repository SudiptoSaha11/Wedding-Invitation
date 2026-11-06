import { useEffect, useRef } from 'react'
import { weddingData } from '../../data/weddingData'
import { playOpeningAnimation } from '../../animations/openingAnimations'
import EnterButton from './EnterButton'

/* ── Inline SVG ornaments ──────────────────────────────────── */
const CornerOrnament = ({ style = {} }) => (
  <svg style={style} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5 Q40 5 75 40 Q40 75 5 75 Q5 40 5 5Z"   stroke="#C9A84C" strokeWidth="0.8" fill="none" opacity="0.6"/>
    <path d="M15 15 Q40 15 65 40 Q40 65 15 65 Q15 40 15 15Z" stroke="#C9A84C" strokeWidth="0.5" fill="none" opacity="0.4"/>
    <circle cx="5"  cy="5"  r="3"   fill="#C9A84C" opacity="0.8"/>
    <circle cx="40" cy="5"  r="1.5" fill="#C9A84C" opacity="0.5"/>
    <circle cx="5"  cy="40" r="1.5" fill="#C9A84C" opacity="0.5"/>
  </svg>
)

const LotusLine = () => (
  <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', justifyContent:'center', margin:'0.5rem 0' }}>
    <div style={{ flex:1, maxWidth:'80px', height:'1px', background:'linear-gradient(to right, transparent, #C9A84C)' }} />
    <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
      <ellipse cx="14" cy="12" rx="4" ry="5"  fill="#C9A84C" opacity="0.7"/>
      <ellipse cx="7"  cy="13" rx="3" ry="4"  fill="#C9A84C" opacity="0.5" transform="rotate(-20 7 13)"/>
      <ellipse cx="21" cy="13" rx="3" ry="4"  fill="#C9A84C" opacity="0.5" transform="rotate(20 21 13)"/>
      <ellipse cx="3"  cy="15" rx="2" ry="3"  fill="#C9A84C" opacity="0.3" transform="rotate(-35 3 15)"/>
      <ellipse cx="25" cy="15" rx="2" ry="3"  fill="#C9A84C" opacity="0.3" transform="rotate(35 25 15)"/>
      <line x1="14" y1="12" x2="14" y2="18" stroke="#C9A84C" strokeWidth="1" opacity="0.5"/>
    </svg>
    <div style={{ flex:1, maxWidth:'80px', height:'1px', background:'linear-gradient(to left, transparent, #C9A84C)' }} />
  </div>
)

/* ── Component ─────────────────────────────────────────────── */
export default function OpeningScreen({ onEnter, screenRef, disabled }) {
  // Internal refs for GSAP entrance animation
  const bgRef      = useRef(null)
  const frameRef   = useRef(null)
  const flowersRef = useRef(null)
  const illustRef  = useRef(null)
  const titleRef   = useRef(null)
  const namesRef   = useRef(null)
  const dateRef    = useRef(null)
  const btnRef     = useRef(null)

  useEffect(() => {
    playOpeningAnimation({
      bg:           bgRef.current,
      frame:        frameRef.current,
      flowers:      flowersRef.current,
      illustration: illustRef.current,
      title:        titleRef.current,
      names:        namesRef.current,
      date:         dateRef.current,
      btn:          btnRef.current,
    })
  }, [])

  return (
    <div
      ref={screenRef}          /* ← external ref for GSAP exit in App.jsx */
      className="opening-screen"
    >
      {/* ── Background ─────────────────────────────────────── */}
      <div
        ref={bgRef}
        style={{
          position:'absolute', inset:0,
          backgroundImage:'url(/assets/images/opening-bg.png)',
          backgroundSize:'cover',
          backgroundPosition:'center',
        }}
      >
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to bottom, rgba(60,10,10,0.65) 0%, rgba(50,22,2,0.60) 100%)',
        }} />
      </div>

      {/* ── Corner frame ───────────────────────────────────── */}
      <div ref={frameRef} style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
        <CornerOrnament style={{ position:'absolute', top:12,    left:12,  width:70, height:70 }} />
        <CornerOrnament style={{ position:'absolute', top:12,    right:12, width:70, height:70, transform:'scaleX(-1)' }} />
        <CornerOrnament style={{ position:'absolute', bottom:12, left:12,  width:70, height:70, transform:'scaleY(-1)' }} />
        <CornerOrnament style={{ position:'absolute', bottom:12, right:12, width:70, height:70, transform:'scale(-1)' }} />
        <div style={{ position:'absolute', inset:'1rem',   border:'1px solid rgba(201,168,76,0.35)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:'1.5rem', border:'1px solid rgba(201,168,76,0.15)', pointerEvents:'none' }} />
      </div>

      {/* ── Top flowers ────────────────────────────────────── */}
      <div ref={flowersRef} style={{
        position:'absolute', top:0, left:0, right:0,
        display:'flex', justifyContent:'center', alignItems:'center', gap:'1rem',
        padding:'1.5rem 2rem 0', pointerEvents:'none',
      }}>
        <img src="/assets/flowers/marigold.png" alt="" aria-hidden="true" style={{ width:60,height:60,objectFit:'contain',opacity:0.95 }} />
        <img src="/assets/flowers/pink-flower.png" alt="" aria-hidden="true" style={{ width:50,height:50,objectFit:'contain',opacity:0.90,alignSelf:'flex-end' }} />
        <img src="/assets/flowers/marigold.png" alt="" aria-hidden="true" style={{ width:55,height:55,objectFit:'contain',opacity:0.95 }} />
      </div>

      {/* ── Main content ───────────────────────────────────── */}
      <div style={{
        position:'relative', zIndex:10,
        display:'flex', flexDirection:'column', alignItems:'center',
        padding:'1.5rem 2rem',
        textAlign:'center', width:'100%', maxWidth:440,
      }}>

        {/* Couple illustration */}
        <div ref={illustRef} style={{ marginBottom:'0.75rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
          <img
            src="/assets/images/couple.png"
            alt="বর ও কনে"
            style={{
              width:'100%', maxWidth:220, height:'auto', objectFit:'contain',
              display: 'block', margin: '0 auto',
              borderRadius: '16px',
              filter:'drop-shadow(0 8px 28px rgba(0,0,0,0.5))',
            }}
          />
        </div>

        {/* শুভ বিবাহ */}
        <div ref={titleRef}>
          <p style={{
            fontFamily:'var(--font-bengali)', fontSize:'0.82rem',
            letterSpacing:'0.28em', color:'var(--color-gold-light)',
            marginBottom:'0.2rem',
          }}>
            ✦ &nbsp; শুভ বিবাহ &nbsp; ✦
          </p>
        </div>

        <LotusLine />

        {/* Names */}
        <div ref={namesRef} style={{ margin:'0.6rem 0' }}>
          <h1 style={{
            fontFamily:'var(--font-bengali)',
            fontSize:'clamp(1.7rem, 7vw, 2.4rem)', fontWeight:700,
            color:'var(--color-cream)', lineHeight:1.25,
            textShadow:'0 2px 16px rgba(0,0,0,0.6)',
          }}>
            আদিত্য
          </h1>
          <p style={{
            fontFamily:'var(--font-display)', fontStyle:'italic',
            fontSize:'1.3rem', color:'var(--color-gold-light)', margin:'0.15rem 0',
          }}>
            ও
          </p>
          <h2 style={{
            fontFamily:'var(--font-bengali)',
            fontSize:'clamp(1.7rem, 7vw, 2.4rem)', fontWeight:700,
            color:'var(--color-cream)', lineHeight:1.25,
            textShadow:'0 2px 16px rgba(0,0,0,0.6)',
          }}>
            সুচন্দ্রা
          </h2>
        </div>

        <LotusLine />

        {/* Date */}
        <div ref={dateRef} style={{ marginTop:'0.6rem' }}>
          <p style={{ fontFamily:'var(--font-bengali)', fontSize:'1rem', color:'var(--color-gold-light)', lineHeight:1.7 }}>
            {weddingData.weddingDateBn}
          </p>
          <p style={{ fontFamily:'var(--font-bengali)', fontSize:'0.78rem', color:'rgba(245,230,192,0.72)' }}>
            {weddingData.weddingDateBengaliCal}
          </p>
        </div>

        {/* Enter button */}
        <div ref={btnRef} style={{ marginTop:'1.75rem' }}>
          <EnterButton onEnter={onEnter} disabled={disabled} />
        </div>
      </div>

      {/* ── Bottom flowers ─────────────────────────────────── */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0,
        display:'flex', justifyContent:'center', alignItems:'center', gap:'1rem',
        padding:'0 2rem 1.25rem', pointerEvents:'none',
      }}>
        <img src="/assets/flowers/marigold.png" alt="" aria-hidden="true" style={{ width:48,height:48,objectFit:'contain',opacity:0.85,transform:'scaleY(-1)' }} />
        <img src="/assets/flowers/pink-flower.png" alt="" aria-hidden="true" style={{ width:40,height:40,objectFit:'contain',opacity:0.85,transform:'scaleY(-1)',alignSelf:'flex-start' }} />
        <img src="/assets/flowers/marigold.png" alt="" aria-hidden="true" style={{ width:48,height:48,objectFit:'contain',opacity:0.85,transform:'scaleY(-1)' }} />
      </div>
    </div>
  )
}
