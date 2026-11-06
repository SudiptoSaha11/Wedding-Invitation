import { gsap } from 'gsap'

/**
 * playOpeningAnimation
 * Staggers the opening screen elements in a slow, premium sequence.
 * refs: { bg, frame, flowers, illustration, title, names, date, btn }
 */
export function playOpeningAnimation(refs) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // Set initial states
  gsap.set([refs.bg], { opacity: 0 })
  gsap.set([refs.frame], { opacity: 0, scale: 0.95 })
  gsap.set([refs.flowers], { opacity: 0, y: -20 })
  gsap.set([refs.illustration], { opacity: 0, y: 30, scale: 0.96 })
  gsap.set([refs.title], { opacity: 0, y: 20 })
  gsap.set([refs.names], { opacity: 0, y: 20 })
  gsap.set([refs.date], { opacity: 0, y: 15 })
  gsap.set([refs.btn], { opacity: 0, y: 15 })

  tl
    .to(refs.bg,           { opacity: 1,  duration: 1.6 })
    .to(refs.frame,        { opacity: 1, scale: 1, duration: 1.2 }, '-=0.8')
    .to(refs.flowers,      { opacity: 1, y: 0, duration: 1.0 }, '-=0.5')
    .to(refs.illustration, { opacity: 1, y: 0, scale: 1, duration: 1.2 }, '-=0.6')
    .to(refs.title,        { opacity: 1, y: 0, duration: 0.9 }, '-=0.4')
    .to(refs.names,        { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
    .to(refs.date,         { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .to(refs.btn,          { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')

  return tl
}

/**
 * playEnterTransition
 * Animates the opening screen out when "Enter Invitation" is clicked.
 */
export function playEnterTransition(screenRef, onComplete) {
  gsap.to(screenRef, {
    opacity: 0,
    scale: 1.04,
    duration: 1.0,
    ease: 'power2.inOut',
    onComplete,
  })
}
