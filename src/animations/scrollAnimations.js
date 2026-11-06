import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * fadeInUp — fades element in from below on scroll
 */
export function fadeInUp(element, options = {}) {
  if (!element) return
  gsap.fromTo(
    element,
    { opacity: 0, y: options.y ?? 50 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 0.9,
      ease: options.ease ?? 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: options.start ?? 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  )
}

/**
 * staggerFadeIn — staggers a list of elements on scroll
 */
export function staggerFadeIn(elements, options = {}) {
  if (!elements || !elements.length) return
  gsap.fromTo(
    elements,
    { opacity: 0, y: options.y ?? 40 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 0.8,
      stagger: options.stagger ?? 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements[0],
        start: options.start ?? 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  )
}

/**
 * fadeIn — simple opacity fade on scroll
 */
export function fadeIn(element, options = {}) {
  if (!element) return
  gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: options.duration ?? 1.0,
      ease: 'power2.out',
      delay: options.delay ?? 0,
      scrollTrigger: {
        trigger: element,
        start: options.start ?? 'top 90%',
        toggleActions: 'play none none none',
      },
    }
  )
}

/**
 * scaleIn — scale up from slightly smaller
 */
export function scaleIn(element, options = {}) {
  if (!element) return
  gsap.fromTo(
    element,
    { opacity: 0, scale: 0.92 },
    {
      opacity: 1,
      scale: 1,
      duration: options.duration ?? 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: options.start ?? 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  )
}
