import { useState, useEffect } from 'react'
import { weddingData } from '../data/weddingData'

/**
 * useCountdown — returns live countdown to the wedding date
 * Updates every second, cleans up on unmount.
 */
export function useCountdown() {
  const targetDate = new Date(weddingData.weddingDate).getTime()

  const calculate = () => {
    const now  = Date.now()
    const diff = targetDate - now

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
    }

    return {
      days:      Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:     Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes:   Math.floor((diff / (1000 * 60)) % 60),
      seconds:   Math.floor((diff / 1000) % 60),
      isExpired: false,
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculate)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calculate()), 1000)
    return () => clearInterval(id)
  }, [])

  return timeLeft
}
