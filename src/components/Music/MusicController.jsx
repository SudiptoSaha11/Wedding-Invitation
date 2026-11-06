import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicController({ audioRef, musicStarted }) {
  const [isPlaying, setIsPlaying] = useState(musicStarted)

  const toggle = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <AnimatePresence>
      <motion.button
        id="music-toggle-btn"
        className="music-btn"
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'backOut' }}
        aria-label={isPlaying ? 'সঙ্গীত বন্ধ করুন' : 'সঙ্গীত চালু করুন'}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        <motion.div
          key={isPlaying ? 'playing' : 'paused'}
          initial={{ rotate: -20, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {isPlaying
            ? <Volume2 size={20} strokeWidth={1.5} />
            : <VolumeX size={20} strokeWidth={1.5} />
          }
        </motion.div>

        {/* Ripple when playing */}
        {isPlaying && (
          <motion.span
            style={{
              position: 'absolute', inset: -4,
              borderRadius: '50%',
              border: '1.5px solid rgba(201,168,76,0.4)',
            }}
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </motion.button>
    </AnimatePresence>
  )
}
