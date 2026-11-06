import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import PreloaderScreen  from './components/Preloader/PreloaderScreen'
import OpeningScreen    from './components/Opening/OpeningScreen'
import MusicController  from './components/Music/MusicController'
import PetalAnimation   from './components/Effects/PetalAnimation'
import NavDots          from './components/Nav/NavDots'
import ScrollToTop      from './components/Nav/ScrollToTop'

import HeroSection       from './components/Hero/HeroSection'
import CoupleSection     from './components/Couple/CoupleSection'
import InvitationMessage from './components/Invitation/InvitationMessage'
import CountdownTimer    from './components/Countdown/CountdownTimer'
import EventsSection     from './components/Events/EventsSection'
import FamilySection     from './components/Family/FamilySection'
import VenueSection      from './components/Venue/VenueSection'
import GallerySection    from './components/Gallery/GallerySection'
import RSVPForm          from './components/RSVP/RSVPForm'
import ClosingSection    from './components/Closing/ClosingSection'

gsap.registerPlugin(ScrollTrigger)

// ── Phase machine ──────────────────────────────────────────────
// 'preloading' → 'opening' → 'transitioning' → 'entered'

function App() {
  const [phase,        setPhase]        = useState('preloading')
  const [showPetals,   setShowPetals]   = useState(false)
  const [musicStarted, setMusicStarted] = useState(false)

  const audioRef   = useRef(null)
  const openingRef = useRef(null)
  const mainRef    = useRef(null)

  // ── Audio ─────────────────────────────────────────────────────
  useEffect(() => {
    const audio      = new Audio()
    audio.loop       = true
    audio.volume     = 0.45
    audio.onerror    = () => {}
    audio.src        = '/assets/music/wedding-theme.mp3'
    audioRef.current = audio
    return () => { audio.pause(); audio.src = '' }
  }, [])

  // ── Main content fade-in when entered ─────────────────────────
  useEffect(() => {
    if (phase === 'entered' && mainRef.current) {
      gsap.fromTo(mainRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.05 }
      )
    }
  }, [phase])

  // ── Preloader done ────────────────────────────────────────────
  const handlePreloaderDone = () => setPhase('opening')

  // ── Enter clicked ─────────────────────────────────────────────
  const handleEnter = () => {
    if (phase !== 'opening') return

    // Start music (user gesture context)
    audioRef.current?.play().catch(() => {})
    setMusicStarted(true)
    setPhase('transitioning')

    // Petal shower
    setShowPetals(true)

    // Animate opening screen OUT after petals have a moment
    setTimeout(() => {
      if (openingRef.current) {
        gsap.to(openingRef.current, {
          opacity: 0,
          scale:   1.05,
          duration: 0.85,
          ease: 'power2.inOut',
          onComplete: () => {
            setPhase('entered')
            // Scroll to top of main content
            window.scrollTo({ top: 0, behavior: 'instant' })
          },
        })
      } else {
        setPhase('entered')
      }
    }, 700)

    // Stop petals after 6s
    setTimeout(() => setShowPetals(false), 6000)
  }

  const isEntered = phase === 'entered'

  return (
    <>
      {/* ── Petal shower (always in DOM) ──────────────────── */}
      <PetalAnimation active={showPetals} />

      {/* ── Preloader ─────────────────────────────────────── */}
      {phase === 'preloading' && (
        <PreloaderScreen onDone={handlePreloaderDone} />
      )}

      {/* ── Opening cover ─────────────────────────────────── */}
      {(phase === 'opening' || phase === 'transitioning') && (
        <OpeningScreen
          onEnter={handleEnter}
          screenRef={openingRef}
          disabled={phase === 'transitioning'}
        />
      )}

      {/* ── Persistent UI (only after entering) ───────────── */}
      {isEntered && (
        <>
          <MusicController audioRef={audioRef} musicStarted={musicStarted} />
          <NavDots />
          <ScrollToTop />
        </>
      )}

      {/* ── Main invitation ───────────────────────────────── */}
      {isEntered && (
        <main id="main-invitation" ref={mainRef} style={{ opacity: 0 }}>
          <HeroSection />
          <CoupleSection />
          <InvitationMessage />
          <CountdownTimer />
          <EventsSection />
          <FamilySection />
          <VenueSection />
          <GallerySection />
          <RSVPForm />
          <ClosingSection />
        </main>
      )}
    </>
  )
}

export default App
