'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import questions from '@/lib/questions'
import { calculateScore } from '@/lib/scoring'
import type { SavedAnswer } from '@/lib/types'
import Link from 'next/link'
import { MatrixGrid, OptionCell } from '@/components/MatrixSVG'

const CIRC = 87.96 // 2π × 14

type QState = {
  idx: number
  timeLeft: number
  chosen: string | number | null
  revealed: boolean
}

function mkState(idx: number): QState {
  return { idx, timeLeft: questions[idx].timeLimit, chosen: null, revealed: false }
}

export default function TestPage() {
  const router = useRouter()
  const [qs, setQS] = useState<QState>(() => mkState(0))
  const answersRef = useRef<SavedAnswer[]>([])

  const { idx, timeLeft, chosen, revealed } = qs
  const q = questions[idx]
  const progress = (idx / questions.length) * 100
  const timerColor = timeLeft <= 10 ? '#EF4444' : '#059669'
  const dashFill = (timeLeft / q.timeLimit) * CIRC

  // Countdown timer
  useEffect(() => {
    if (chosen !== null || timeLeft <= 0) return
    const t = setTimeout(
      () => setQS(s => ({ ...s, timeLeft: s.timeLeft - 1 })),
      1000
    )
    return () => clearTimeout(t)
  }, [timeLeft, chosen])

  // Auto-submit on timeout
  useEffect(() => {
    if (timeLeft === 0 && chosen === null) doSubmit(null)
  }, [timeLeft]) // eslint-disable-line react-hooks/exhaustive-deps

  function doSubmit(selected: string | number | null) {
    const timeSpent = q.timeLimit - timeLeft
    const isCorrect = selected !== null && selected === q.answer
    answersRef.current.push({ timeSpent, isCorrect })

    setQS(s => ({ ...s, chosen: selected, revealed: true }))

    setTimeout(() => {
      const next = idx + 1
      if (next >= questions.length) {
        const { iq, percentile } = calculateScore(answersRef.current, questions)
        localStorage.setItem('cognitest_result', JSON.stringify({ iq, percentile }))
        router.push('/results')
      } else {
        setQS(mkState(next))
      }
    }, 700)
  }

  function handleSelect(selected: string | number) {
    if (chosen !== null) return
    doSubmit(selected)
  }

  const catColors: Record<string, string> = {
    Logique: '#059669', Mémoire: '#2563EB', Calcul: '#D97706',
    Spatial: '#7C3AED', Vitesse: '#DC2626',
  }
  const catColor = catColors[q.category] ?? '#059669'

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-slate-100 shrink-0">
        <div
          className="h-1 transition-all duration-500"
          style={{ width: `${progress}%`, background: '#059669' }}
        />
      </div>

      {/* Navbar */}
      <nav className="border-b border-slate-200 px-6 h-14 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#059669' }}>
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span className="text-sm font-bold text-slate-900 tracking-tight">CogniTest</span>
        </Link>
        <span className="text-xs text-slate-400 tabular-nums">
          Question <span className="text-slate-700 font-semibold">{idx + 1}</span> / {questions.length}
        </span>
      </nav>

      {/* Main */}
      <main className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-xl">
          <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 8px 32px rgba(5,150,105,0.35)', border: '1px solid #D1FAE5' }}
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-4 flex items-center justify-between">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: catColor }}
              >
                {q.category}
              </span>
              <div className="relative w-11 h-11">
                <svg className="w-11 h-11" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="14" fill="none"
                    stroke={timerColor} strokeWidth="3"
                    strokeDasharray={`${dashFill} ${CIRC - dashFill}`}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 0.5s linear' }}
                  />
                </svg>
                <span
                  className="absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums"
                  style={{ color: timerColor }}
                >
                  {timeLeft}
                </span>
              </div>
            </div>

            {/* Question body */}
            <div className="px-5 pb-6">
              <p className="text-sm font-semibold text-slate-900 leading-snug mb-5">
                {q.question}
              </p>

              {q.type === 'matrix' ? (
                <>
                  <div className="flex justify-center mb-5">
                    <MatrixGrid grid={q.grid} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 justify-items-center">
                    {q.options.map((opt, i) => (
                      <OptionCell
                        key={i}
                        cell={opt}
                        index={i}
                        selected={typeof chosen === 'number' ? chosen : null}
                        correct={q.answer}
                        revealed={revealed}
                        onClick={() => handleSelect(i)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, i) => {
                    let bg = '#F8FAFC', border = '#E2E8F0', color = '#475569'
                    if (revealed) {
                      if (opt === q.answer) { bg = '#ECFDF5'; border = '#059669'; color = '#059669' }
                      else if (opt === chosen) { bg = '#FEF2F2'; border = '#EF4444'; color = '#EF4444' }
                    } else if (opt === chosen) {
                      bg = '#ECFDF5'; border = '#059669'; color = '#059669'
                    }
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelect(opt)}
                        disabled={revealed}
                        className="flex items-center gap-3 px-4 py-4 rounded-xl text-left text-sm font-semibold transition-all active:scale-95"
                        style={{
                          background: bg,
                          border: `2px solid ${border}`,
                          color,
                          cursor: revealed ? 'default' : 'pointer',
                          boxShadow: revealed ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
                        }}
                        onMouseEnter={e => { if (!revealed) e.currentTarget.style.borderColor = '#059669' }}
                        onMouseLeave={e => { if (!revealed && opt !== chosen) e.currentTarget.style.borderColor = '#E2E8F0' }}
                      >
                        <span
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: border === '#E2E8F0' ? '#E2E8F0' : `${border}22`, color: border === '#E2E8F0' ? '#94A3B8' : color }}
                        >
                          {i + 1}
                        </span>
                        {opt}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
