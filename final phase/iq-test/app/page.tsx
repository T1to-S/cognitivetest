"use client"

// Ombre colorée émeraude — appliquée sur toutes les cards
const CARD_SHADOW = "0 8px 32px rgba(5, 150, 105, 0.35)"
const CARD_BORDER = "#D1FAE5"

// ─── IQScaleDiagram ─────────────────────────────────────────────────────────
function IQScaleDiagram() {
  const W = 560
  const H = 130
  const baseY = H - 18

  const iqToX = (iq: number) => ((iq - 55) / 90) * W
  const densityToY = (d: number) => baseY - d * (baseY - 8)

  const pts: string[] = []
  for (let iq = 55; iq <= 145; iq++) {
    const z = (iq - 100) / 15
    const d = Math.exp(-0.5 * z * z)
    pts.push(`${iqToX(iq).toFixed(1)},${densityToY(d).toFixed(1)}`)
  }
  const curvePath = `M ${pts[0]} L ${pts.slice(1).join(" L ")}`
  const fillPath = `${curvePath} L ${W},${baseY} L 0,${baseY} Z`

  const zones = [
    { from: 55, to: 70,  label: "Très faible",         range: "< 70",    pct: "2,2%",  bg: "#FEE2E2", accent: "#EF4444" },
    { from: 70, to: 80,  label: "Limite",              range: "70–79",   pct: "6,7%",  bg: "#FEF3C7", accent: "#D97706" },
    { from: 80, to: 90,  label: "Inf. à la moyenne",   range: "80–89",   pct: "16,1%", bg: "#FFFBEB", accent: "#CA8A04" },
    { from: 90, to: 110, label: "Moyen",               range: "90–109",  pct: "50%",   bg: "#ECFDF5", accent: "#059669" },
    { from: 110, to: 120, label: "Sup. à la moyenne",  range: "110–119", pct: "16,1%", bg: "#DBEAFE", accent: "#2563EB" },
    { from: 120, to: 130, label: "Supérieur",          range: "120–129", pct: "6,7%",  bg: "#EDE9FE", accent: "#7C3AED" },
    { from: 130, to: 145, label: "Très supérieur",     range: "≥ 130",   pct: "2,2%",  bg: "#FCE7F3", accent: "#9D174D" },
  ]

  return (
    <div>
      <h3 className="text-base font-semibold text-slate-900 mb-4">Échelle des QI</h3>
      <div className="rounded-2xl overflow-hidden" style={{ boxShadow: CARD_SHADOW, border: `1px solid ${CARD_BORDER}` }}>
        <div className="bg-white px-5 pt-5 pb-0">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            Distribution de la population — μ = 100, σ = 15
          </p>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            <path d={fillPath} fill="#ECFDF5" />
            <path d={curvePath} fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {[70, 80, 90, 110, 120, 130].map((iq) => {
              const x = iqToX(iq)
              const z = (iq - 100) / 15
              const y = densityToY(Math.exp(-0.5 * z * z))
              return <line key={iq} x1={x} y1={y} x2={x} y2={baseY} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3,2" />
            })}
            <line x1={0} y1={baseY} x2={W} y2={baseY} stroke="#E2E8F0" strokeWidth="1" />
            {[55, 70, 85, 100, 115, 130, 145].map((iq) => (
              <text key={iq} x={iqToX(iq)} y={H - 3} textAnchor="middle" fontSize="9" fill="#94A3B8" fontFamily="monospace">
                {iq}
              </text>
            ))}
          </svg>
        </div>
        <div className="flex">
          {zones.map((z) => (
            <div
              key={z.range}
              className="flex flex-col items-center justify-center py-3 text-center overflow-hidden"
              style={{ flex: z.to - z.from, background: z.bg, borderTop: `3px solid ${z.accent}` }}
            >
              <span className="text-[10px] font-bold leading-none" style={{ color: z.accent }}>{z.range}</span>
              <span className="hidden lg:block text-[9px] text-slate-500 mt-0.5 leading-tight px-0.5">{z.label}</span>
              <span className="text-[9px] font-semibold mt-0.5" style={{ color: z.accent }}>{z.pct}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#059669" }}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">CogniTest</span>
          </div>
          <button className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            Connexion
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-24 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase mb-8" style={{ color: "#059669" }}>
          Test certifié · 50 questions · résultats immédiats
        </p>
        <h1 className="text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
          Découvrez votre<br />
          <span style={{ color: "#059669" }}>vrai QI</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Une évaluation cognitive scientifique en 5 catégories.
          Résultats certifiés, rapport détaillé disponible pour les membres premium.
        </p>
        <a
          href="/test"
          className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-base mb-10 shadow-sm"
          style={{ background: "#059669" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#047857")}
          onMouseLeave={e => (e.currentTarget.style.background = "#059669")}
        >
          Commencer l&apos;évaluation
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
          {["100% gratuit", "~10 minutes", "Sans inscription"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <svg className="w-4 h-4 shrink-0" style={{ color: "#059669" }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <div className="border-y border-slate-200 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-3 divide-x divide-slate-200 text-center">
          {[
            { value: "12 500+", label: "participants" },
            { value: "104", label: "score moyen" },
            { value: "5", label: "catégories testées" },
          ].map(({ value, label }) => (
            <div key={label} className="px-6">
              <div className="text-3xl font-bold text-slate-900 tabular-nums">{value}</div>
              <div className="text-sm text-slate-400 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment ça fonctionne */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
          Comment ça fonctionne
        </h2>
        <div className="bg-white rounded-2xl p-8 lg:p-10 grid grid-cols-1 md:grid-cols-3 gap-10" style={{ boxShadow: CARD_SHADOW, border: `1px solid ${CARD_BORDER}` }}>
          {[
            { n: "01", title: "Commencez", desc: "Aucune inscription requise. Accès immédiat depuis n'importe quel appareil, à tout moment." },
            { n: "02", title: "Répondez", desc: "50 questions chronométrées réparties en 5 catégories cognitives. Pas de retour en arrière possible." },
            { n: "03", title: "Obtenez votre score", desc: "Recevez votre score QI certifié et comparez-vous aux 12 500 participants du monde entier." },
          ].map(({ n, title, desc }) => (
            <div key={n} className="flex flex-col gap-3">
              <div className="text-5xl font-extrabold font-mono leading-none select-none" style={{ color: '#059669', opacity: 0.25 }}>{n}</div>
              <h3 className="text-base font-semibold text-slate-900">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 catégories */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
          5 catégories cognitives
        </h2>
        <p className="text-slate-400 text-sm mb-12">
          Chaque catégorie cible un aspect distinct de votre intelligence.
        </p>
        <div className="bg-white rounded-2xl p-8 lg:p-10" style={{ boxShadow: CARD_SHADOW, border: `1px solid ${CARD_BORDER}` }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { label: "Logique", desc: "Raisonnement déductif", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /> },
              { label: "Mémoire", desc: "Rétention à court terme", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /> },
              { label: "Calcul", desc: "Calcul & abstraction", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.255 3A23.933 23.933 0 0121 12c0 3.183-.62 6.22-1.745 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.214a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09" /> },
              { label: "Spatial", desc: "Rotation & visualisation", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /> },
              { label: "Vitesse", desc: "Traitement rapide", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /> },
            ].map(({ label, desc, icon }) => (
              <div key={label} className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-slate-50">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#ECFDF5" }}>
                  <svg className="w-5 h-5" style={{ color: "#059669" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    {icon}
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qu'est-ce que le QI */}
      <div className="bg-slate-50 border-y border-slate-200">
        <section className="max-w-5xl mx-auto px-6 py-28">
          <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
            Qu&apos;est-ce que le QI ?
          </h2>
          <p className="text-slate-400 text-sm mb-12">
            Un indicateur scientifique standardisé de l&apos;intelligence cognitive.
          </p>

          <div className="bg-white rounded-2xl p-8 lg:p-10 space-y-8" style={{ boxShadow: CARD_SHADOW, border: `1px solid ${CARD_BORDER}` }}>
            <div className="max-w-2xl space-y-5">
              <p className="text-sm text-slate-600 leading-relaxed">
                Le quotient intellectuel (QI) mesure les capacités cognitives via des épreuves standardisées. Le score est normalisé avec une moyenne de 100 et un écart-type de 15 — soit 68 % de la population entre 85 et 115.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Notre test s&apos;inspire du WAIS-V (Wechsler Adult Intelligence Scale, 5e édition), référence mondiale en évaluation cognitive. Il couvre 5 indices&nbsp;: raisonnement fluide, mémoire de travail, vitesse de traitement, compréhension verbale et perception visuo-spatiale.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Vos réponses sont converties en score brut, pondéré par la difficulté et le temps de réaction. Ce score est ensuite normalisé sur notre base de 12 500+ participants selon une distribution gaussienne (μ = 100, σ = 15).
              </p>
            </div>
            <IQScaleDiagram />
          </div>
        </section>
      </div>

      {/* Premium CTA */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <div className="rounded-2xl p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8" style={{ background: "#059669" }}>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-5 uppercase tracking-widest" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Premium
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Débloquez votre rapport complet</h2>
            <ul className="space-y-2.5">
              {[
                "Score détaillé par catégorie cognitive",
                "Comparaison avec votre groupe d'âge",
                "Rapport PDF certifié à télécharger",
                "Recommandations personnalisées",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                  <svg className="w-4 h-4 shrink-0" style={{ color: "rgba(255,255,255,0.6)" }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center gap-4 shrink-0">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white tabular-nums">4,99 €</div>
              <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>paiement unique</div>
            </div>
            <a href="/premium" className="bg-white font-semibold px-7 py-3 rounded-lg transition-colors text-sm whitespace-nowrap" style={{ color: "#059669" }}>
              Accéder au rapport complet
            </a>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Satisfait ou remboursé 7 jours</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-slate-400">© 2026 CogniTest. Tous droits réservés.</span>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-slate-600 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-slate-600 transition-colors">CGU</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
