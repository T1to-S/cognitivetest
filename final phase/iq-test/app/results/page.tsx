'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getIQLabel } from '@/lib/scoring'

interface StoredResult {
  iq: number
  percentile: number
}

const CIRC = 87.96

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<StoredResult | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem('cognitest_result')
    if (!raw) { router.push('/'); return }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResult(JSON.parse(raw) as StoredResult)
  }, [router])

  if (!result) return null

  const { iq, percentile } = result
  const label = getIQLabel(iq)
  const dashFill = Math.min((iq - 55) / 90, 1) * CIRC
  const dashEmpty = CIRC - dashFill

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-slate-200 px-6 h-16 flex items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#059669' }}>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">CogniTest</span>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-6">

          {/* Score card */}
          <div
            className="bg-white rounded-2xl p-8 text-center"
            style={{ boxShadow: '0 8px 32px rgba(5,150,105,0.35)', border: '1px solid #D1FAE5' }}
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
              Score certifié
            </p>

            {/* Circular gauge */}
            <div className="flex justify-center mb-5">
              <div className="relative w-36 h-36">
                <svg className="w-36 h-36" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="3.5" />
                  <circle
                    cx="18" cy="18" r="14" fill="none"
                    stroke="#059669" strokeWidth="3.5"
                    strokeDasharray={`${dashFill} ${dashEmpty}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-slate-900 tabular-nums">{iq}</span>
                  <span className="text-xs text-slate-400 mt-0.5">QI</span>
                </div>
              </div>
            </div>

            <p className="text-base font-semibold text-slate-900 mb-1">{label}</p>
            <p className="text-sm text-slate-400">
              Vous dépassez <span className="font-semibold text-slate-600">{percentile}%</span> de la population
            </p>
          </div>

          {/* Premium CTA */}
          <div className="rounded-2xl p-8" style={{ background: '#059669' }}>
            <div
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-5 uppercase tracking-widest"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Premium
            </div>
            <h2 className="text-lg font-bold text-white mb-4 tracking-tight">
              Débloquez votre rapport complet
            </h2>
            <ul className="space-y-2.5 mb-6">
              {[
                'Score détaillé par catégorie cognitive',
                'Comparaison avec votre groupe d\'âge',
                'Rapport PDF certifié à télécharger',
                'Recommandations personnalisées',
              ].map(item => (
                <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  <svg className="w-4 h-4 shrink-0" style={{ color: 'rgba(255,255,255,0.6)' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-extrabold text-white tabular-nums">4,99 €</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>paiement unique</div>
              </div>
              <Link
                href="/premium"
                className="bg-white font-semibold px-6 py-3 rounded-lg text-sm"
                style={{ color: '#059669' }}
              >
                Accéder au rapport
              </Link>
            </div>
          </div>

          {/* Retake */}
          <div className="text-center">
            <Link
              href="/"
              className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              Retourner à l&apos;accueil
            </Link>
          </div>

        </div>
      </main>
    </div>
  )
}
