'use client'

import { useState } from 'react'
import Link from 'next/link'
import confetti from 'canvas-confetti'

const CARD_SHADOW = '0 8px 32px rgba(5,150,105,0.35)'
const CARD_BORDER = '#D1FAE5'

const FEATURES = [
  { label: 'Score détaillé par catégorie cognitive', desc: 'Logique, Mémoire, Calcul, Spatial, Vitesse — chaque indice décomposé.' },
  { label: 'Comparaison avec votre groupe d\'âge', desc: 'Positionnez-vous parmi les participants de votre tranche d\'âge.' },
  { label: 'Rapport PDF certifié à télécharger', desc: 'Document officiel prêt à partager, signé CogniTest.' },
  { label: 'Recommandations personnalisées', desc: 'Exercices ciblés selon vos points faibles identifiés.' },
]

const FAQ = [
  { q: 'Le paiement est-il sécurisé ?', a: 'Oui. Le paiement est traité par Stripe, certifié PCI-DSS. Vos données bancaires ne transitent jamais par nos serveurs.' },
  { q: 'Est-ce un abonnement ?', a: 'Non. Il s\'agit d\'un paiement unique de 4,99 €. Vous accédez à votre rapport sans engagement ni reconduction.' },
  { q: 'Quand est-ce que je reçois mon rapport ?', a: 'Immédiatement après le paiement. Le rapport est disponible en ligne et en PDF téléchargeable.' },
  { q: 'Puis-je repasser le test ?', a: 'Oui. Chaque passage génère un nouveau rapport. Le paiement couvre un rapport par session.' },
]

export default function PremiumPage() {
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [paid, setPaid] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function formatCard(v: string) {
    return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }
  function formatExpiry(v: string) {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d
  }

  function fireConfetti() {
    const end = Date.now() + 2500
    const colors = ['#059669', '#34D399', '#ffffff', '#D1FAE5', '#6EE7B7']
    const frame = () => {
      confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 }, colors })
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setPaid(true)
      fireConfetti()
    }, 1800)
  }

  if (paid) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div
        className="bg-white rounded-2xl p-12 text-center max-w-md w-full"
        style={{ boxShadow: '0 8px 32px rgba(5,150,105,0.35)', border: '1px solid #D1FAE5' }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: '#ECFDF5' }}
        >
          <svg className="w-8 h-8" style={{ color: '#059669' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
          Paiement confirmé
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          Votre rapport complet est disponible. Merci pour votre confiance.
        </p>
        <Link
          href="/results"
          className="inline-flex items-center justify-center w-full py-4 rounded-xl font-semibold text-white text-sm"
          style={{ background: '#059669' }}
        >
          Accéder à mon rapport
        </Link>
        <Link href="/" className="block mt-4 text-xs text-slate-400 hover:text-slate-600 transition-colors">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-slate-200 px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#059669' }}>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span className="font-bold text-slate-900 tracking-tight">CogniTest</span>
        </Link>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: '#059669' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Paiement sécurisé
        </div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#059669' }}>
            Rapport complet
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Débloquez votre analyse cognitive
          </h1>
          <p className="text-slate-500 text-sm max-w-lg">
            Paiement unique · Accès immédiat · Sans abonnement
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left — what's included */}
          <div className="space-y-5">
            <div
              className="bg-white rounded-2xl p-7"
              style={{ boxShadow: CARD_SHADOW, border: `1px solid ${CARD_BORDER}` }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
                Inclus dans le rapport
              </p>
              <ul className="space-y-5">
                {FEATURES.map(f => (
                  <li key={f.label} className="flex gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: '#ECFDF5' }}
                    >
                      <svg className="w-3 h-3" style={{ color: '#059669' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{f.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div
              className="bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: CARD_SHADOW, border: `1px solid ${CARD_BORDER}` }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 px-7 pt-6 pb-4">
                Questions fréquentes
              </p>
              {FAQ.map((item, i) => (
                <div key={i} className="border-t border-slate-100">
                  <button
                    className="w-full flex items-center justify-between px-7 py-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-sm font-semibold text-slate-800">{item.q}</span>
                    <svg
                      className="w-4 h-4 shrink-0 ml-3 transition-transform"
                      style={{ color: '#059669', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <p className="px-7 pb-5 text-sm text-slate-500 leading-relaxed">{item.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — payment form */}
          <div
            className="bg-white rounded-2xl p-7"
            style={{ boxShadow: CARD_SHADOW, border: `1px solid ${CARD_BORDER}` }}
          >
            {/* Price */}
            <div className="flex items-end justify-between mb-7 pb-7 border-b border-slate-100">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Total</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold text-slate-900 tabular-nums">4,99</span>
                  <span className="text-lg font-semibold text-slate-500">€</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">TVA incluse · paiement unique</p>
              </div>
              <div className="flex gap-1.5">
                {['VISA', 'MC', 'CB'].map(b => (
                  <span
                    key={b}
                    className="text-xs font-bold px-2 py-1 rounded border border-slate-200 text-slate-400"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                  Nom sur la carte
                </label>
                <input
                  type="text"
                  placeholder="Jean Dupont"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm text-slate-900 outline-none transition-all"
                  style={{ border: '1px solid #E2E8F0', background: '#F8FAFC' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#059669')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#E2E8F0')}
                />
              </div>

              {/* Card number */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                  Numéro de carte
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={e => setCardNumber(formatCard(e.target.value))}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm text-slate-900 outline-none transition-all pr-10"
                    style={{ border: '1px solid #E2E8F0', background: '#F8FAFC' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#059669')}
                    onBlur={e => (e.currentTarget.style.borderColor = '#E2E8F0')}
                  />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                </div>
              </div>

              {/* Expiry + CVC */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                    Expiration
                  </label>
                  <input
                    type="text"
                    placeholder="MM / AA"
                    value={expiry}
                    onChange={e => setExpiry(formatExpiry(e.target.value))}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm text-slate-900 outline-none transition-all"
                    style={{ border: '1px solid #E2E8F0', background: '#F8FAFC' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#059669')}
                    onBlur={e => (e.currentTarget.style.borderColor = '#E2E8F0')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cvc}
                    onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm text-slate-900 outline-none transition-all"
                    style={{ border: '1px solid #E2E8F0', background: '#F8FAFC' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#059669')}
                    onBlur={e => (e.currentTarget.style.borderColor = '#E2E8F0')}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-semibold text-white text-sm transition-opacity mt-2"
                style={{ background: '#059669', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Traitement en cours...' : 'Payer 4,99 € et accéder au rapport'}
              </button>

              <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 mt-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Paiement chiffré SSL · Aucune donnée bancaire stockée
              </p>
            </form>
          </div>

        </div>
      </main>

      <footer className="border-t border-slate-100 py-6 text-center">
        <p className="text-xs text-slate-400">
          © 2026 CogniTest ·{' '}
          <Link href="/" className="hover:text-slate-600 transition-colors">Accueil</Link>
          {' · '}
          <span className="cursor-pointer hover:text-slate-600 transition-colors">Mentions légales</span>
        </p>
      </footer>
    </div>
  )
}
