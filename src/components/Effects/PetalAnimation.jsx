import { useEffect, useRef } from 'react'
import { createPetalShower } from '../../animations/petalAnimations'

const PETAL_SRCS = [
  '/assets/flowers/petal.png',
  '/assets/flowers/marigold.png',
]

/**
 * PetalAnimation
 * Renders a fixed overlay container and triggers the petal shower
 * whenever `active` flips from false → true.
 */
export default function PetalAnimation({ active }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (active && containerRef.current) {
      // Clear any leftover petals from a previous run
      containerRef.current.innerHTML = ''
      const count = window.innerWidth < 768 ? 20 : 35
      createPetalShower(containerRef.current, PETAL_SRCS, count)
    }
  }, [active])

  return (
    <div
      id="petal-container"
      ref={containerRef}
      aria-hidden="true"
    />
  )
}
