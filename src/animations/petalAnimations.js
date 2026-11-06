import { gsap } from 'gsap'

/**
 * createPetalShower
 * Generates petal elements inside a container and animates them falling.
 * @param {HTMLElement} container  — the petal-container div
 * @param {string[]}    petalSrcs  — array of image src paths to use
 * @param {number}      count      — number of petals (default 22)
 */
export function createPetalShower(container, petalSrcs, count = 22) {
  if (!container) return

  const petals = []

  for (let i = 0; i < count; i++) {
    const img = document.createElement('img')
    img.src = petalSrcs[i % petalSrcs.length]
    img.alt = ''
    img.setAttribute('aria-hidden', 'true')

    const size  = gsap.utils.random(28, 60)
    const startX = gsap.utils.random(0, window.innerWidth)
    const startY = gsap.utils.random(-120, -30)
    const rot    = gsap.utils.random(-180, 180)
    const dur    = gsap.utils.random(3.5, 6.5)
    const delay  = gsap.utils.random(0, 2.0)

    Object.assign(img.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      objectFit: 'contain',
      left: `${startX}px`,
      top: `${startY}px`,
      opacity: 0,
      pointerEvents: 'none',
      userSelect: 'none',
    })

    container.appendChild(img)
    petals.push({ el: img, startX, dur, rot, delay })
  }

  // Animate each petal
  petals.forEach(({ el, startX, dur, rot, delay }) => {
    gsap.to(el, {
      y: window.innerHeight + 150,
      x: gsap.utils.random(-80, 80),
      rotation: rot,
      opacity: gsap.utils.random(0.7, 1),
      duration: dur,
      delay,
      ease: 'power1.inOut',
      onComplete: () => el.remove(),
    })
    gsap.to(el, { opacity: 0.9, duration: 0.4, delay })
  })
}
