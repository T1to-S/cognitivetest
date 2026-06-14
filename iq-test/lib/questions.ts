import type { Question, Cell } from './types'

// ─── Cell helpers ─────────────────────────────────────────────────────────────
const cell = (
  shape: Cell['shape'],
  fill: Cell['fill'],
  size: Cell['size'],
  count: 1 | 2 | 3,
  rotation?: number
): Cell => ({ shape, fill, size, count, ...(rotation !== undefined ? { rotation } : {}) })

const co = (s: Cell['size'], n: 1|2|3 = 1): Cell => cell('circle',   'outline', s, n)
const cf = (s: Cell['size'], n: 1|2|3 = 1): Cell => cell('circle',   'filled',  s, n)
const so = (s: Cell['size'], n: 1|2|3 = 1): Cell => cell('square',   'outline', s, n)
const sf = (s: Cell['size'], n: 1|2|3 = 1): Cell => cell('square',   'filled',  s, n)
const to = (s: Cell['size'], n: 1|2|3 = 1, r?: number): Cell => cell('triangle', 'outline', s, n, r)
const tf = (s: Cell['size'], n: 1|2|3 = 1, r?: number): Cell => cell('triangle', 'filled',  s, n, r)

// ─── Questions ────────────────────────────────────────────────────────────────
const questions: Question[] = [

  // ── LOGIQUE ───────────────────────────────────────────────────────────────
  {
    id: 1, category: 'Logique', type: 'text', difficulty: 1, timeLimit: 60,
    question: 'Quelle lettre vient ensuite ? A, C, E, G, ___',
    options: ['H', 'I', 'J', 'K'],
    answer: 'I',
  },
  {
    id: 2, category: 'Logique', type: 'text', difficulty: 1, timeLimit: 60,
    question: 'Quel nombre vient ensuite ? 2, 4, 8, 16, ___',
    options: ['24', '28', '32', '36'],
    answer: '32',
  },
  {
    // Matrix: taille croissante → droite, forme différente par rangée
    id: 3, category: 'Logique', type: 'matrix', difficulty: 1, timeLimit: 60,
    question: 'Quelle figure complète la matrice ?',
    grid: [
      [co('sm'), co('md'), co('lg')],
      [so('sm'), so('md'), so('lg')],
      [to('sm'), to('md'), to('lg')],
    ],
    options: [to('sm'), to('lg'), co('lg'), tf('lg')],
    answer: 1,
  },
  {
    id: 4, category: 'Logique', type: 'text', difficulty: 2, timeLimit: 75,
    question: 'Livre est à Bibliothèque ce que Tableau est à ___',
    options: ['Cadre', 'Peintre', 'Musée', 'Couleur'],
    answer: 'Musée',
  },
  {
    id: 5, category: 'Logique', type: 'text', difficulty: 2, timeLimit: 75,
    question: 'Quel nombre vient ensuite ? 1, 1, 2, 3, 5, 8, ___',
    options: ['11', '12', '13', '14'],
    answer: '13',
  },
  {
    // Matrix: forme par colonne, fill par rangée
    id: 6, category: 'Logique', type: 'matrix', difficulty: 2, timeLimit: 75,
    question: 'Quelle figure complète la matrice ?',
    grid: [
      [cf('md'), sf('md'), tf('md')],
      [co('md'), so('md'), to('md')],
      [cf('md'), sf('md'), tf('md')],
    ],
    options: [to('md'), co('md'), tf('md'), so('md')],
    answer: 2,
  },
  {
    id: 7, category: 'Logique', type: 'text', difficulty: 2, timeLimit: 75,
    question: 'Quel est l\'unique nombre à la fois pair et premier ?',
    options: ['1', '2', '4', '6'],
    answer: '2',
  },
  {
    // Matrix: forme par colonne, fill par colonne (filled/outline/filled), count par rangée
    id: 8, category: 'Logique', type: 'matrix', difficulty: 3, timeLimit: 90,
    question: 'Quelle figure complète la matrice ?',
    grid: [
      [cf('sm', 1), so('sm', 1), tf('sm', 1)],
      [cf('sm', 2), so('sm', 2), tf('sm', 2)],
      [cf('sm', 3), so('sm', 3), tf('sm', 3)],
    ],
    options: [to('sm', 3), tf('sm', 2), co('sm', 3), tf('sm', 3)],
    answer: 3,
  },
  {
    id: 9, category: 'Logique', type: 'text', difficulty: 3, timeLimit: 90,
    question: 'Quel nombre vient ensuite ? 3, 6, 11, 18, 27, ___',
    options: ['36', '37', '38', '39'],
    answer: '38',
  },
  {
    id: 10, category: 'Logique', type: 'text', difficulty: 3, timeLimit: 90,
    question: 'Chaque lettre vaut sa position dans l\'alphabet (A=1, B=2…). Combien vaut CHIEN ?',
    options: ['37', '38', '39', '40'],
    answer: '39',
  },

  // ── MÉMOIRE ───────────────────────────────────────────────────────────────
  {
    id: 11, category: 'Mémoire', type: 'text', difficulty: 1, timeLimit: 60,
    question: 'Mémorisez : 3 — 7 — 2. Quelle était cette séquence ?',
    options: ['3-7-2', '7-3-2', '3-2-7', '2-7-3'],
    answer: '3-7-2',
  },
  {
    id: 12, category: 'Mémoire', type: 'text', difficulty: 1, timeLimit: 60,
    question: 'Les mots étaient : Forêt — Rivière — Montagne. Quel mot était en 2e position ?',
    options: ['Forêt', 'Lac', 'Rivière', 'Montagne'],
    answer: 'Rivière',
  },
  {
    id: 13, category: 'Mémoire', type: 'text', difficulty: 1, timeLimit: 60,
    question: 'Liste de couleurs : Rouge — Bleu — Vert — Jaune. Quelle couleur était en dernière position ?',
    options: ['Rouge', 'Bleu', 'Vert', 'Jaune'],
    answer: 'Jaune',
  },
  {
    id: 14, category: 'Mémoire', type: 'text', difficulty: 2, timeLimit: 75,
    question: 'La séquence était : 5 — 1 — 9 — 3. Donnez-la dans l\'ordre inverse.',
    options: ['3-9-1-5', '5-3-9-1', '9-3-1-5', '1-9-3-5'],
    answer: '3-9-1-5',
  },
  {
    id: 15, category: 'Mémoire', type: 'text', difficulty: 2, timeLimit: 75,
    question: 'Liste : Rouge — Bleu — Vert — Rouge — Jaune. Quelle couleur apparaissait deux fois ?',
    options: ['Bleu', 'Vert', 'Rouge', 'Jaune'],
    answer: 'Rouge',
  },
  {
    id: 16, category: 'Mémoire', type: 'text', difficulty: 2, timeLimit: 75,
    question: 'La séquence était : 8 — 4 — 2 — 6 — 5. Quel chiffre était en 3e position ?',
    options: ['4', '2', '6', '8'],
    answer: '2',
  },
  {
    id: 17, category: 'Mémoire', type: 'text', difficulty: 2, timeLimit: 75,
    question: 'Les mots étaient : Soleil — Lune — Étoile — Nuage — Pluie. Quel mot était en 4e position ?',
    options: ['Étoile', 'Nuage', 'Lune', 'Pluie'],
    answer: 'Nuage',
  },
  {
    id: 18, category: 'Mémoire', type: 'text', difficulty: 3, timeLimit: 90,
    question: 'Séquence : 7 — 3 — 8 — 1 — 5 — 4. Quelle est la somme des chiffres aux positions paires (2e, 4e, 6e) ?',
    options: ['7', '8', '9', '10'],
    answer: '8',
  },
  {
    id: 19, category: 'Mémoire', type: 'text', difficulty: 3, timeLimit: 90,
    question: 'Séquence : 4 — 9 — 2 — 7 — 1. Additionnez les chiffres aux positions impaires (1er, 3e, 5e).',
    options: ['5', '6', '7', '8'],
    answer: '7',
  },
  {
    id: 20, category: 'Mémoire', type: 'text', difficulty: 3, timeLimit: 90,
    question: 'Séquence : A — 3 — B — 7 — C — 2. Quelle lettre correspondait au chiffre 7 ?',
    options: ['A', 'B', 'C', 'D'],
    answer: 'B',
  },

  // ── CALCUL ────────────────────────────────────────────────────────────────
  {
    id: 21, category: 'Calcul', type: 'text', difficulty: 1, timeLimit: 60,
    question: 'Combien fait 15 × 4 ?',
    options: ['55', '60', '65', '70'],
    answer: '60',
  },
  {
    id: 22, category: 'Calcul', type: 'text', difficulty: 1, timeLimit: 60,
    question: 'Quel nombre vient ensuite ? 5, 10, 15, 20, ___',
    options: ['22', '24', '25', '30'],
    answer: '25',
  },
  {
    id: 23, category: 'Calcul', type: 'text', difficulty: 1, timeLimit: 60,
    question: 'Combien fait 144 ÷ 12 ?',
    options: ['10', '11', '12', '13'],
    answer: '12',
  },
  {
    id: 24, category: 'Calcul', type: 'text', difficulty: 2, timeLimit: 75,
    question: 'Un article à 80 € bénéficie d\'une réduction de 25 %. Quel est son prix final ?',
    options: ['55 €', '60 €', '65 €', '70 €'],
    answer: '60 €',
  },
  {
    id: 25, category: 'Calcul', type: 'text', difficulty: 2, timeLimit: 75,
    question: 'Quel nombre vient ensuite ? 2, 6, 12, 20, ___',
    options: ['26', '28', '30', '32'],
    answer: '30',
  },
  {
    id: 26, category: 'Calcul', type: 'text', difficulty: 2, timeLimit: 75,
    question: 'Un train parcourt 360 km en 3 heures. Quelle est sa vitesse moyenne ?',
    options: ['100 km/h', '110 km/h', '120 km/h', '130 km/h'],
    answer: '120 km/h',
  },
  {
    id: 27, category: 'Calcul', type: 'text', difficulty: 2, timeLimit: 75,
    question: 'Combien fait 2³ × 3² ?',
    options: ['54', '64', '72', '81'],
    answer: '72',
  },
  {
    id: 28, category: 'Calcul', type: 'text', difficulty: 3, timeLimit: 90,
    question: 'Si 3x + 7 = 28, quelle est la valeur de x ?',
    options: ['6', '7', '8', '9'],
    answer: '7',
  },
  {
    id: 29, category: 'Calcul', type: 'text', difficulty: 3, timeLimit: 90,
    question: 'Quel nombre vient ensuite ? 1, 4, 9, 16, 25, ___',
    options: ['30', '34', '36', '38'],
    answer: '36',
  },
  {
    id: 30, category: 'Calcul', type: 'text', difficulty: 3, timeLimit: 90,
    question: 'Une pompe vide 1 200 L en 40 min. En combien de temps vide-t-elle 900 L ?',
    options: ['25 min', '28 min', '30 min', '32 min'],
    answer: '30 min',
  },

  // ── SPATIAL ───────────────────────────────────────────────────────────────
  {
    // Matrix: taille croissante par colonne, forme par rangée
    id: 31, category: 'Spatial', type: 'matrix', difficulty: 1, timeLimit: 60,
    question: 'Quelle figure complète la matrice ?',
    grid: [
      [co('sm'), co('md'), co('lg')],
      [so('sm'), so('md'), so('lg')],
      [to('sm'), to('md'), to('lg')],
    ],
    options: [to('md'), co('lg'), to('lg'), tf('lg')],
    answer: 2,
  },
  {
    id: 32, category: 'Spatial', type: 'text', difficulty: 1, timeLimit: 60,
    question: 'Sur un dé, la somme de deux faces opposées vaut toujours 7. Quelle face est en face du 4 ?',
    options: ['1', '2', '3', '6'],
    answer: '3',
  },
  {
    // Matrix: count croissant par colonne, forme par rangée
    id: 33, category: 'Spatial', type: 'matrix', difficulty: 2, timeLimit: 75,
    question: 'Quelle figure complète la matrice ?',
    grid: [
      [co('sm', 1), co('sm', 2), co('sm', 3)],
      [so('sm', 1), so('sm', 2), so('sm', 3)],
      [to('sm', 1), to('sm', 2), to('sm', 3)],
    ],
    options: [to('sm', 3), to('sm', 2), tf('sm', 3), co('sm', 3)],
    answer: 0,
  },
  {
    id: 34, category: 'Spatial', type: 'text', difficulty: 2, timeLimit: 75,
    question: 'Face au Nord, vous tournez 90° à droite, puis 180° à gauche. Où regardez-vous ?',
    options: ['Nord', 'Sud', 'Est', 'Ouest'],
    answer: 'Ouest',
  },
  {
    id: 35, category: 'Spatial', type: 'text', difficulty: 2, timeLimit: 75,
    question: 'Un carré est retourné horizontalement (effet miroir). Une flèche pointait vers le haut-droit. Elle pointe maintenant vers le ___',
    options: ['Haut-droit', 'Haut-gauche', 'Bas-droit', 'Bas-gauche'],
    answer: 'Haut-gauche',
  },
  {
    // Matrix: forme par rangée, fill par colonne (filled/outline/filled)
    id: 36, category: 'Spatial', type: 'matrix', difficulty: 2, timeLimit: 75,
    question: 'Quelle figure complète la matrice ?',
    grid: [
      [cf('md'), co('md'), cf('md')],
      [sf('md'), so('md'), sf('md')],
      [tf('md'), to('md'), tf('md')],
    ],
    options: [to('md'), co('md'), tf('sm'), tf('md')],
    answer: 3,
  },
  {
    id: 37, category: 'Spatial', type: 'text', difficulty: 3, timeLimit: 90,
    question: 'Un cube 3×3×3 est peint sur toutes ses faces puis découpé en 27 petits cubes. Combien ont exactement 2 faces peintes ?',
    options: ['8', '12', '16', '24'],
    answer: '12',
  },
  {
    // Matrix: taille par rangée, count par colonne — tout en cercles pleins
    id: 38, category: 'Spatial', type: 'matrix', difficulty: 3, timeLimit: 90,
    question: 'Quelle figure complète la matrice ?',
    grid: [
      [cf('sm', 1), cf('sm', 2), cf('sm', 3)],
      [cf('md', 1), cf('md', 2), cf('md', 3)],
      [cf('lg', 1), cf('lg', 2), cf('lg', 3)],
    ],
    options: [cf('md', 3), cf('lg', 3), co('lg', 3), cf('lg', 2)],
    answer: 1,
  },
  {
    id: 39, category: 'Spatial', type: 'text', difficulty: 3, timeLimit: 90,
    question: 'Une feuille carrée est pliée en quatre (deux fois). On perce un trou au centre. En dépliant, combien de trous obtient-on ?',
    options: ['1', '2', '3', '4'],
    answer: '4',
  },
  {
    // Matrix: rotation de triangle — (rang + col) × 90° mod 360°
    id: 40, category: 'Spatial', type: 'matrix', difficulty: 3, timeLimit: 90,
    question: 'Quelle figure complète la matrice ?',
    grid: [
      [to('md', 1, 0),   to('md', 1, 90),  to('md', 1, 180)],
      [to('md', 1, 90),  to('md', 1, 180), to('md', 1, 270)],
      [to('md', 1, 180), to('md', 1, 270), to('md', 1, 0)],
    ],
    options: [to('md', 1, 90), to('md', 1, 180), to('md', 1, 0), to('md', 1, 270)],
    answer: 2,
  },

  // ── VITESSE ───────────────────────────────────────────────────────────────
  {
    id: 41, category: 'Vitesse', type: 'text', difficulty: 1, timeLimit: 30,
    question: 'Combien fait 7 × 8 ?',
    options: ['54', '56', '58', '63'],
    answer: '56',
  },
  {
    id: 42, category: 'Vitesse', type: 'text', difficulty: 1, timeLimit: 30,
    question: 'Quel symbole vient ensuite ? ○ □ ○ □ ○ ___',
    options: ['○', '□', '△', '◇'],
    answer: '□',
  },
  {
    id: 43, category: 'Vitesse', type: 'text', difficulty: 1, timeLimit: 30,
    question: 'Parmi ces nombres, lequel est pair ? 17 — 23 — 36 — 41',
    options: ['17', '23', '36', '41'],
    answer: '36',
  },
  {
    id: 44, category: 'Vitesse', type: 'text', difficulty: 1, timeLimit: 30,
    question: 'Quel est l\'antonyme du mot « rapide » ?',
    options: ['Vif', 'Lent', 'Agile', 'Prompt'],
    answer: 'Lent',
  },
  {
    id: 45, category: 'Vitesse', type: 'text', difficulty: 2, timeLimit: 40,
    question: 'Si A > B et B > C, lequel des trois est le plus petit ?',
    options: ['A', 'B', 'C', 'Impossible à déterminer'],
    answer: 'C',
  },
  {
    id: 46, category: 'Vitesse', type: 'text', difficulty: 2, timeLimit: 40,
    question: 'Combien font 1000 − 7 − 7 − 7 − 7 − 7 ?',
    options: ['961', '963', '965', '967'],
    answer: '965',
  },
  {
    id: 47, category: 'Vitesse', type: 'text', difficulty: 2, timeLimit: 40,
    question: 'Quel nombre est compris entre 15 et 20 et divisible par 3 ?',
    options: ['16', '17', '18', '19'],
    answer: '18',
  },
  {
    id: 48, category: 'Vitesse', type: 'text', difficulty: 2, timeLimit: 40,
    question: 'Combien fait 13 × 13 ?',
    options: ['156', '165', '169', '172'],
    answer: '169',
  },
  {
    id: 49, category: 'Vitesse', type: 'text', difficulty: 3, timeLimit: 45,
    question: 'Dans la suite des nombres premiers (2, 3, 5, 7, 11…), quel est le 6e terme ?',
    options: ['11', '12', '13', '17'],
    answer: '13',
  },
  {
    id: 50, category: 'Vitesse', type: 'text', difficulty: 3, timeLimit: 45,
    question: 'Si 2¹⁰ = 1024, quelle est la valeur de 2⁸ ?',
    options: ['128', '256', '512', '768'],
    answer: '256',
  },
]

export default questions
