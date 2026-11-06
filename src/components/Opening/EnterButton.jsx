import { motion } from 'framer-motion'

export default function EnterButton({ onEnter, disabled = false }) {
  return (
    <motion.button
      id="enter-invitation-btn"
      onClick={disabled ? undefined : onEnter}
      className="enter-btn-pulse"
      whileHover={disabled ? {} : { scale: 1.06 }}
      whileTap={disabled   ? {} : { scale: 0.96 }}
      disabled={disabled}
      aria-label="আমন্ত্রণে প্রবেশ করুন"
      style={{
        background: disabled
          ? 'rgba(107,26,26,0.5)'
          : 'linear-gradient(135deg, rgba(107,26,26,0.88), rgba(74,14,14,0.95))',
        border: '1.5px solid var(--color-gold)',
        color: disabled ? 'rgba(201,168,76,0.5)' : 'var(--color-gold-light)',
        fontFamily: 'var(--font-bengali)',
        fontSize: '1rem',
        letterSpacing: '0.08em',
        padding: '0.9rem 2.75rem',
        borderRadius: '2px',
        cursor: disabled ? 'default' : 'pointer',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s ease, color 0.3s ease',
        // stop the pulse animation once disabled
        animation: disabled ? 'none' : undefined,
      }}
    >
      {/* Inner decorative border */}
      <span style={{
        position:'absolute', inset:4,
        border:'1px solid rgba(201,168,76,0.22)',
        borderRadius:'1px', pointerEvents:'none',
      }} />

      {/* Shimmer sweep on hover */}
      {!disabled && (
        <motion.span
          initial={{ x: '-100%', opacity: 0 }}
          whileHover={{ x: '200%', opacity: 0.18 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent 20%, #fff 50%, transparent 80%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {disabled ? '...' : 'আমন্ত্রণে প্রবেশ করুন'}
    </motion.button>
  )
}
