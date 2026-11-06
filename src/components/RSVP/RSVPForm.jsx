import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitRSVP } from '../../services/rsvpService'
import { scaleIn } from '../../animations/scrollAnimations'

export default function RSVPForm() {
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState(null) // 'Accepted' | 'Declined' | null
  const [foodPreference, setFoodPreference] = useState('') // 'Veg' | 'Non-Veg' | ''
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  const [submittedData, setSubmittedData] = useState(null)

  const sectionRef = useRef(null)

  useEffect(() => {
    scaleIn(sectionRef.current, { start: 'top 88%', duration: 1.0 })
  }, [])

  // Handle Attendance Selection
  const handleSelectAttendance = (value) => {
    setAttendance(value)
    if (value === 'Declined') {
      setFoodPreference('N/A')
    } else if (foodPreference === 'N/A') {
      setFoodPreference('')
    }
  }

  // Check if form can be submitted
  const isFormValid =
    name.trim().length > 0 &&
    attendance !== null &&
    (attendance === 'Declined' || (attendance === 'Accepted' && ['Veg', 'Non-Veg'].includes(foodPreference)))

  // Handle Form Submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault()

    const cleanName = name.trim()
    if (!cleanName) {
      alert('অনুগ্রহ করে আপনার নাম লিখুন।')
      return
    }

    if (!attendance) {
      alert('অনুগ্রহ করে আপনি আসতে পারবেন কিনা তা নির্বাচন করুন।')
      return
    }

    if (attendance === 'Accepted' && !['Veg', 'Non-Veg'].includes(foodPreference)) {
      alert('অনুগ্রহ করে আপনার খাবারের পছন্দ (নিরামিষ অথবা আমিষ) নির্বাচন করুন।')
      return
    }

    const submissionPayload = {
      name: cleanName,
      response: attendance,
      foodPreference: attendance === 'Accepted' ? foodPreference : 'N/A',
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      await submitRSVP(submissionPayload)
      setSubmittedData(submissionPayload)
      setStatus('success')
    } catch (err) {
      console.error('RSVP submission error:', err)
      setErrorMessage(
        err.message || 'উত্তরটি গুগল শিটে নথিভুক্ত করা যায়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।'
      )
      setStatus('error')
    }
  }

  const resetForm = () => {
    setStatus('idle')
    setName('')
    setAttendance(null)
    setFoodPreference('')
    setErrorMessage('')
    setSubmittedData(null)
  }

  return (
    <section
      id="rsvp"
      style={{
        background: 'linear-gradient(180deg, var(--color-cream) 0%, var(--color-cream-dark) 100%)',
        padding: '5rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="ornament-divider">
        <span>💌</span>
      </div>

      <div ref={sectionRef} style={{ maxWidth: 430, margin: '2rem auto 0' }}>
        {/* Title */}
        <p
          style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: '0.85rem',
            letterSpacing: '0.25em',
            color: 'var(--color-gold)',
            marginBottom: '0.5rem',
            fontWeight: 600,
          }}
        >
          ✦ আমন্ত্রণের সাড়া ✦
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
            fontWeight: 700,
            color: 'var(--color-maroon)',
            marginBottom: '0.5rem',
          }}
        >
          আসবেন তো?
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: '0.92rem',
            color: 'var(--color-text-muted)',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          আপনার উপস্থিতি আমাদের এই আনন্দের মুহূর্তকে আরও সুন্দর করে তুলবে
        </p>

        {/* ── Idle / Active Form State ───────────────────────────── */}
        {status === 'idle' && (
          <form
            onSubmit={handleSubmit}
            style={{
              border: '1.5px solid rgba(201,168,76,0.45)',
              borderRadius: 20,
              padding: '2.25rem 1.6rem',
              background: 'rgba(253,246,227,0.7)',
              boxShadow: '0 12px 36px rgba(107,26,26,0.08)',
              backdropFilter: 'blur(8px)',
              textAlign: 'left',
            }}
          >
            {/* 1. Name Input */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label
                htmlFor="guest-name"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-bengali)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: 'var(--color-maroon)',
                  marginBottom: '0.6rem',
                }}
              >
                আপনার নাম <span style={{ color: 'var(--color-vermilion)' }}>*</span>
              </label>
              <input
                id="guest-name"
                className="wedding-input"
                type="text"
                placeholder="আপনার পুরো নাম লিখুন..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                required
              />
            </div>

            {/* 2. Attendance Options */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-bengali)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: 'var(--color-maroon)',
                  marginBottom: '0.75rem',
                }}
              >
                আপনি কি উপস্থিত থাকবেন? <span style={{ color: 'var(--color-vermilion)' }}>*</span>
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <button
                  type="button"
                  id="rsvp-yes-btn"
                  onClick={() => handleSelectAttendance('Accepted')}
                  style={{
                    padding: '0.9rem 0.6rem',
                    borderRadius: 12,
                    fontFamily: 'var(--font-bengali)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.25s ease',
                    background:
                      attendance === 'Accepted'
                        ? 'linear-gradient(135deg, var(--color-maroon), var(--color-maroon-dark))'
                        : 'rgba(253,246,227,0.9)',
                    color: attendance === 'Accepted' ? 'var(--color-gold-light)' : 'var(--color-maroon)',
                    border:
                      attendance === 'Accepted'
                        ? '2px solid var(--color-gold)'
                        : '1.5px solid rgba(201,168,76,0.5)',
                    boxShadow:
                      attendance === 'Accepted' ? '0 6px 18px rgba(107,26,26,0.25)' : 'none',
                    transform: attendance === 'Accepted' ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  <span>✅</span> হ্যাঁ, আসব
                </button>

                <button
                  type="button"
                  id="rsvp-no-btn"
                  onClick={() => handleSelectAttendance('Declined')}
                  style={{
                    padding: '0.9rem 0.6rem',
                    borderRadius: 12,
                    fontFamily: 'var(--font-bengali)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.25s ease',
                    background:
                      attendance === 'Declined'
                        ? 'linear-gradient(135deg, #7A2828, #5A1E1E)'
                        : 'rgba(253,246,227,0.9)',
                    color: attendance === 'Declined' ? '#FFFFFF' : 'var(--color-maroon)',
                    border:
                      attendance === 'Declined'
                        ? '2px solid var(--color-vermilion)'
                        : '1.5px solid rgba(192,57,43,0.3)',
                    boxShadow:
                      attendance === 'Declined' ? '0 6px 18px rgba(122,40,40,0.2)' : 'none',
                    transform: attendance === 'Declined' ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  <span>❌</span> পারব না
                </button>
              </div>
            </div>

            {/* 3. Food Preference (Conditional: ONLY for YES / Accepted) */}
            <AnimatePresence>
              {attendance === 'Accepted' && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: '1.75rem' }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    style={{
                      padding: '1.25rem',
                      background: 'rgba(201,168,76,0.1)',
                      border: '1px dashed var(--color-gold)',
                      borderRadius: 14,
                    }}
                  >
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-bengali)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--color-maroon)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      খাবারের পছন্দ নির্বাচন করুন: <span style={{ color: 'var(--color-vermilion)' }}>*</span>
                    </label>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <button
                        type="button"
                        id="food-veg-btn"
                        onClick={() => setFoodPreference('Veg')}
                        style={{
                          padding: '0.75rem 0.5rem',
                          borderRadius: 10,
                          fontFamily: 'var(--font-bengali)',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease',
                          background:
                            foodPreference === 'Veg'
                              ? 'linear-gradient(135deg, #2E7D32, #1B5E20)'
                              : 'rgba(253,246,227,0.95)',
                          color: foodPreference === 'Veg' ? '#FFFFFF' : '#2E7D32',
                          border:
                            foodPreference === 'Veg'
                              ? '2px solid #4CAF50'
                              : '1.5px solid rgba(46,125,50,0.3)',
                          boxShadow:
                            foodPreference === 'Veg' ? '0 4px 12px rgba(46,125,50,0.25)' : 'none',
                        }}
                      >
                        <span>🥗</span> নিরামিষ (Veg)
                      </button>

                      <button
                        type="button"
                        id="food-nonveg-btn"
                        onClick={() => setFoodPreference('Non-Veg')}
                        style={{
                          padding: '0.75rem 0.5rem',
                          borderRadius: 10,
                          fontFamily: 'var(--font-bengali)',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease',
                          background:
                            foodPreference === 'Non-Veg'
                              ? 'linear-gradient(135deg, var(--color-maroon), var(--color-maroon-dark))'
                              : 'rgba(253,246,227,0.95)',
                          color:
                            foodPreference === 'Non-Veg' ? 'var(--color-gold-light)' : 'var(--color-maroon)',
                          border:
                            foodPreference === 'Non-Veg'
                              ? '2px solid var(--color-gold)'
                              : '1.5px solid rgba(201,168,76,0.4)',
                          boxShadow:
                            foodPreference === 'Non-Veg' ? '0 4px 12px rgba(107,26,26,0.2)' : 'none',
                        }}
                      >
                        <span>🍗</span> আমিষ (Non-Veg)
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 4. Submit Button */}
            <button
              type="submit"
              id="rsvp-submit-btn"
              disabled={!isFormValid}
              style={{
                width: '100%',
                padding: '0.95rem',
                borderRadius: 12,
                fontFamily: 'var(--font-bengali)',
                fontSize: '1.05rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                background: isFormValid
                  ? 'linear-gradient(135deg, var(--color-maroon), var(--color-maroon-dark))'
                  : 'rgba(107,26,26,0.3)',
                color: isFormValid ? 'var(--color-gold-light)' : 'rgba(253,246,227,0.6)',
                border: isFormValid ? '2px solid var(--color-gold)' : '1px solid rgba(201,168,76,0.3)',
                boxShadow: isFormValid ? '0 6px 20px rgba(107,26,26,0.3)' : 'none',
                transition: 'all 0.25s ease',
              }}
            >
              উত্তর জমা দিন 💌
            </button>
          </form>
        )}

        {/* ── Loading State ─────────────────────────────────────── */}
        {status === 'loading' && (
          <div
            style={{
              padding: '3.5rem 1.5rem',
              border: '1.5px solid rgba(201,168,76,0.4)',
              borderRadius: 20,
              background: 'rgba(253,246,227,0.7)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                border: '3px solid rgba(201,168,76,0.2)',
                borderTop: '3px solid var(--color-gold)',
                borderRadius: '50%',
                margin: '0 auto 1.5rem',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p
              style={{
                fontFamily: 'var(--font-bengali)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--color-maroon)',
                marginBottom: '0.3rem',
              }}
            >
              তথ্য নথিভুক্ত করা হচ্ছে...
            </p>
            <p
              style={{
                fontFamily: 'var(--font-bengali)',
                fontSize: '0.85rem',
                color: 'var(--color-gold-dark)',
              }}
            >
              গুগল শিটে আপনার উত্তর সংরক্ষিত হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন।
            </p>
          </div>
        )}

        {/* ── SUCCESS State ─────────────────────────────────────── */}
        {status === 'success' && submittedData && (
          <div
            style={{
              padding: '2.5rem 1.5rem',
              border: '1.5px solid rgba(201,168,76,0.5)',
              borderRadius: 20,
              background: 'rgba(253,246,227,0.8)',
              boxShadow: '0 12px 36px rgba(107,26,26,0.1)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {submittedData.response === 'Accepted' ? (
              <>
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>❤️</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-bengali)',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'var(--color-maroon)',
                    marginBottom: '0.75rem',
                  }}
                >
                  অনেক ধন্যবাদ!
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-bengali)',
                    fontSize: '1.05rem',
                    color: 'var(--color-text)',
                    lineHeight: 1.8,
                    marginBottom: '0.75rem',
                  }}
                >
                  <strong>{submittedData.name}</strong>, আপনি আসছেন জেনে আমরা অত্যন্ত আনন্দিত! ❤️
                </p>

                <div
                  style={{
                    display: 'inline-block',
                    padding: '0.4rem 1rem',
                    margin: '0.5rem auto 1.25rem',
                    borderRadius: 20,
                    background:
                      submittedData.foodPreference === 'Veg'
                        ? 'rgba(46,125,50,0.12)'
                        : 'rgba(107,26,26,0.1)',
                    border:
                      submittedData.foodPreference === 'Veg'
                        ? '1px solid #4CAF50'
                        : '1px solid var(--color-gold)',
                    fontFamily: 'var(--font-bengali)',
                    fontSize: '0.85rem',
                    color:
                      submittedData.foodPreference === 'Veg' ? '#2E7D32' : 'var(--color-maroon)',
                    fontWeight: 600,
                  }}
                >
                  খাবারের পছন্দ:{' '}
                  {submittedData.foodPreference === 'Veg' ? 'নিরামিষ (Veg) 🥗' : 'আমিষ (Non-Veg) 🍗'}
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-bengali)',
                    fontSize: '0.92rem',
                    color: 'var(--color-gold-dark)',
                    marginBottom: '1.75rem',
                  }}
                >
                  আপনার উপস্থিতি আমাদের বিবাহ অনুষ্ঠানকে পরিপূর্ণ করবে। 🌸
                </p>
              </>
            ) : (
              <>
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🙏</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-bengali)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--color-maroon)',
                    marginBottom: '0.75rem',
                  }}
                >
                  জানানোর জন্য ধন্যবাদ
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-bengali)',
                    fontSize: '1.05rem',
                    color: 'var(--color-text)',
                    lineHeight: 1.8,
                    marginBottom: '0.75rem',
                  }}
                >
                  <strong>{submittedData.name}</strong>, আপনাকে অনুষ্ঠানে খুব মিস করব! ❤️
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-bengali)',
                    fontSize: '0.92rem',
                    color: 'var(--color-gold-dark)',
                    marginBottom: '1.75rem',
                  }}
                >
                  পরবর্তী কোনো শুভ অনুষ্ঠানে আপনার সাথে নিশ্চয়ই দেখা হবে।
                </p>
              </>
            )}

            <button
              type="button"
              onClick={resetForm}
              style={{
                fontFamily: 'var(--font-bengali)',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--color-maroon)',
                background: 'rgba(201,168,76,0.15)',
                border: '1px solid rgba(201,168,76,0.5)',
                borderRadius: 8,
                padding: '0.6rem 1.4rem',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
            >
              অন্য কারো জন্য উত্তর দিন ↩
            </button>
          </div>
        )}

        {/* ── ERROR State ───────────────────────────────────────── */}
        {status === 'error' && (
          <div
            style={{
              padding: '2.5rem 1.5rem',
              border: '1.5px solid rgba(192,57,43,0.4)',
              borderRadius: 20,
              background: 'rgba(253,246,227,0.85)',
              boxShadow: '0 12px 36px rgba(192,57,43,0.08)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div style={{ fontSize: '2.8rem', marginBottom: '0.75rem' }}>⚠️</div>
            <h3
              style={{
                fontFamily: 'var(--font-bengali)',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--color-vermilion)',
                marginBottom: '0.75rem',
              }}
            >
              তথ্য পাঠানো সম্ভব হয়নি
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-bengali)',
                fontSize: '0.92rem',
                color: 'var(--color-maroon)',
                marginBottom: '1.75rem',
                lineHeight: 1.7,
              }}
            >
              {errorMessage}
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              style={{
                fontFamily: 'var(--font-bengali)',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#FFFFFF',
                background: 'linear-gradient(135deg, var(--color-maroon), var(--color-maroon-dark))',
                border: '1.5px solid var(--color-gold)',
                borderRadius: 8,
                padding: '0.65rem 1.5rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(107,26,26,0.2)',
              }}
            >
              আবার চেষ্টা করুন ↺
            </button>
          </div>
        )}
      </div>

      <div className="ornament-divider" style={{ marginTop: '3.5rem' }}>
        <span>💌</span>
      </div>
    </section>
  )
}
