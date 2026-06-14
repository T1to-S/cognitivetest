# Design System — CogniTest

> Décisions validées. Ce fichier fait référence pour tout développement UI.

---

## Direction générale

| Décision | Valeur |
|---|---|
| Style | Clean Clinical — cartes avec ombre émeraude, timer circulaire, grille 2×2 |
| Mode couleur | Light only |
| Ton copywriting | Premium & exclusif — "Score certifié", "Rapport complet" |

---

## Typographie

| Rôle | Valeur |
|---|---|
| Font globale | **Noto Sans** (via `next/font/google`) |
| Variable CSS | `--font-noto` |
| Poids chargés | 400, 500, 600, 700, 800 |
| Application | Tout le texte — titres, body, labels, scores |
| Font mono (secondaire) | **IBM Plex Mono** — variable `--font-mono-main`, réservée aux chiffres tabulaires / éléments code |

Déclaration dans `layout.tsx` :
```ts
const notoSans = Noto_Sans({ variable: '--font-noto', subsets: ['latin'], weight: ['400','500','600','700','800'] })
const ibmPlexMono = IBM_Plex_Mono({ variable: '--font-mono-main', subsets: ['latin'], weight: ['400','500','600','700'] })
```

`globals.css` :
```css
@theme inline {
  --font-sans: var(--font-noto), ui-sans-serif, sans-serif;
  --font-mono: var(--font-mono-main), ui-monospace, monospace;
}
body { font-family: var(--font-sans); }
input, button, select, textarea { font-family: inherit; }
```

---

## Palette de couleurs

### Accent principal — Émeraude

| Token | Valeur | Usage |
|---|---|---|
| Accent | `#059669` | Boutons primaires, timer ring, progress bar, badges actifs |
| Accent hover | `#047857` | Hover state des boutons primaires |
| Accent tint | `#ECFDF5` | Fonds de badges, hover léger sur réponses |
| Border accent | `#D1FAE5` | Bordure des cards avec ombre émeraude |

### Neutrals

| Token | Valeur | Usage |
|---|---|---|
| Background | `#FFFFFF` | Page |
| Surface | `#F8FAFC` | Sections alternées (`bg-slate-50`), inputs |
| Border subtile | `#E2E8F0` | Contours cards, séparateurs, inputs au repos |
| Text primary | `#0F172A` | Titres, headings |
| Text body | `#334155` | Paragraphes |
| Text secondary | `#475569` | Texte des réponses |
| Text muted | `#64748B` | Labels, meta, placeholders |
| Text disabled | `#94A3B8` | Désactivé |

### États sémantiques

| Token | Valeur | Usage |
|---|---|---|
| Success | `#059669` / `#ECFDF5` | Réponse correcte — bordure / fond |
| Danger | `#EF4444` / `#FEF2F2` | Réponse incorrecte, timer urgent (<10s) — bordure / fond |

---

## Ombres

Style retenu : ombre teintée émeraude.

```css
/* Card shadow — standard */
box-shadow: 0 8px 32px rgba(5, 150, 105, 0.35);
border: 1px solid #D1FAE5;
```

Constantes JS à réutiliser :
```ts
const CARD_SHADOW = '0 8px 32px rgba(5,150,105,0.35)'
const CARD_BORDER = '#D1FAE5'
```

---

## Border radius

| Composant | Tailwind | px |
|---|---|---|
| Cards | `rounded-2xl` | 16px |
| Boutons primaires | `rounded-lg` | 8px |
| Inputs | `rounded-xl` | 12px |
| Answer options | `rounded-xl` | 12px |
| Numéro de réponse (badge) | `rounded-lg` | 8px |

---

## Espacement

- Base grid : 4px
- Séparation entre sections : `py-28` (112px)
- Card padding : `p-7` à `p-10`
- Gap entre cards : `gap-6` (24px)
- Réduction du top margin dans "Comment ça fonctionne" : `mb-6` après le `h2`

---

## Alignement

- **Hero** : centré (`text-center`, `mx-auto`)
- **Toutes les autres sections** : alignées à gauche (`text-left`)
- Contenu des sections enveloppé dans une card blanche avec ombre émeraude

---

## Composants clés

### Navbar

- Hauteur : `h-16`
- Logo : icône SVG bulbe sur fond `#059669` (`w-8 h-8 rounded-lg`) + texte "CogniTest" `font-bold`
- Le logo est un `<Link href="/">` cliquable sur toutes les pages
- Border bottom : `border-b border-slate-200`

### Bouton primaire

```tsx
<a href="…" className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-lg text-base shadow-sm" style={{ background: '#059669' }}>
```
Hover : `#047857`

### Bouton secondaire (sur fond coloré)

```tsx
<button className="bg-white font-semibold px-6 py-3 rounded-lg text-sm" style={{ color: '#059669' }}>
```

### Badge de section (au-dessus des titres)

Texte simple, sans bulle :
```tsx
<p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#059669' }}>
```

### Badge catégorie (page test)

Texte simple sans bulle :
```tsx
<span className="text-xs font-semibold uppercase tracking-widest" style={{ color: catColor }}>
```

### Card avec ombre émeraude

```tsx
<div className="bg-white rounded-2xl p-7" style={{ boxShadow: '0 8px 32px rgba(5,150,105,0.35)', border: '1px solid #D1FAE5' }}>
```

### Answer options (texte)

- État neutre : `bg-slate-50`, border `2px solid #E2E8F0`, `box-shadow: 0 2px 8px rgba(0,0,0,0.06)`
- Hover : border passe à `#059669` (via `onMouseEnter`)
- Sélectionné : `bg-[#ECFDF5]`, border `#059669`, couleur `#059669`
- Correct (révélé) : `bg-[#ECFDF5]`, border `#059669`
- Incorrect (révélé) : `bg-[#FEF2F2]`, border `#EF4444`
- Numéro : petit carré `rounded-lg` `w-6 h-6` avec fond `#E2E8F0` et texte `#94A3B8`
- `active:scale-95` + `cursor: pointer`

### Answer options (SVG matrix)

Même états que texte. `OptionCell` dans `components/MatrixSVG.tsx` :
- Taille : `CELL + 24` px (88px)
- Hover : `onMouseEnter` → border `#059669`
- `active:scale-95` + `cursor: pointer`

### Timer circulaire

```tsx
// SVG 36×36, rotate(-90deg)
// r=14, CIRC = 87.96 (2π×14)
<circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="3" />
<circle stroke={timerColor} strokeDasharray={`${dashFill} ${CIRC - dashFill}`} strokeLinecap="round" />
```
- Normal : `#059669`
- Urgent (≤10s) : `#EF4444`
- Chiffre centré en `font-bold tabular-nums`

### Gauge résultats

Même SVG que timer, `strokeWidth="3.5"`, IQ mappé sur `(iq - 55) / 90 * CIRC`.

### Progress bar (page test)

- `h-1` en haut de la page, `bg-slate-100`
- Fill : `background: #059669`, `transition: width 500ms`

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — Hero, Stats, Comment ça fonctionne, 5 catégories, Qu'est-ce que le QI, CTA Premium |
| `/test` | Test 50 questions — timer, feedback couleur, matrices SVG, auto-avance 700ms |
| `/results` | Score QI + gauge + CTA Premium |
| `/premium` | Page d'achat — inclus détaillé, FAQ accordion, formulaire CB |

---

## Couleurs par catégorie (page test)

| Catégorie | Couleur |
|---|---|
| Logique | `#059669` (émeraude) |
| Mémoire | `#2563EB` (bleu) |
| Calcul | `#D97706` (ambre) |
| Spatial | `#7C3AED` (violet) |
| Vitesse | `#DC2626` (rouge) |

---

## Stack de référence

```
Next.js 16 (App Router) · React 19 · TypeScript strict
Tailwind CSS v4 · Noto Sans + IBM Plex Mono (next/font/google)
```
