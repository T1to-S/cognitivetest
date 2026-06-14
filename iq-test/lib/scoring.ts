import type { Question, SavedAnswer } from './types'

const RATIO_TO_PERCENTILE: [number, number][] = [
  [0, 0.01], [0.10, 0.07], [0.20, 0.14], [0.30, 0.25],
  [0.40, 0.40], [0.50, 0.55], [0.60, 0.70], [0.70, 0.82],
  [0.80, 0.92], [0.90, 0.97], [1.00, 0.999],
]

const PERCENTILE_TO_IQ: [number, number][] = [
  [0.01, 65], [0.05, 75], [0.10, 81], [0.14, 85],
  [0.25, 90], [0.40, 95], [0.50, 100], [0.60, 105],
  [0.75, 110], [0.84, 115], [0.90, 119], [0.95, 124],
  [0.97, 128], [0.999, 145],
]

function interpolate(table: [number, number][], x: number): number {
  if (x <= table[0][0]) return table[0][1]
  if (x >= table[table.length - 1][0]) return table[table.length - 1][1]
  for (let i = 0; i < table.length - 1; i++) {
    const [x0, y0] = table[i]
    const [x1, y1] = table[i + 1]
    if (x >= x0 && x <= x1) {
      const t = (x - x0) / (x1 - x0)
      return y0 + t * (y1 - y0)
    }
  }
  return table[Math.floor(table.length / 2)][1]
}

export function calculateScore(
  answers: SavedAnswer[],
  questions: Question[]
): { iq: number; percentile: number } {
  let raw = 0
  let max = 0

  questions.forEach((q, i) => {
    const d = q.difficulty
    max += d * 2
    const ans = answers[i]
    if (!ans || !ans.isCorrect) return
    raw += d
    const fraction = ans.timeSpent / q.timeLimit
    if (fraction < 0.4) raw += d * 0.5
    else if (fraction < 0.7) raw += d * 0.25
  })

  const ratio = max > 0 ? raw / max : 0
  const percentile = interpolate(RATIO_TO_PERCENTILE, ratio)
  const iq = Math.round(interpolate(PERCENTILE_TO_IQ, percentile))

  return { iq, percentile: Math.round(percentile * 100) }
}

export function getIQLabel(iq: number): string {
  if (iq < 70) return 'Intelligence limite'
  if (iq < 80) return 'Inférieure à la moyenne'
  if (iq < 90) return 'Légèrement inférieure'
  if (iq < 110) return 'Intelligence moyenne'
  if (iq < 120) return 'Supérieure à la moyenne'
  if (iq < 130) return 'Intelligence supérieure'
  return 'Intelligence très supérieure'
}
