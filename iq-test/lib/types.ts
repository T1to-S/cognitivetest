export type Shape = 'circle' | 'square' | 'triangle'
export type Fill = 'filled' | 'outline'
export type Size = 'sm' | 'md' | 'lg'
export type Category = 'Logique' | 'Mémoire' | 'Calcul' | 'Spatial' | 'Vitesse'

export interface Cell {
  shape: Shape
  fill: Fill
  size: Size
  count: 1 | 2 | 3
  rotation?: number
}

export interface TextQuestion {
  id: number
  category: Category
  type: 'text'
  difficulty: 1 | 2 | 3
  timeLimit: number
  question: string
  options: [string, string, string, string]
  answer: string
}

export interface MatrixQuestion {
  id: number
  category: Category
  type: 'matrix'
  difficulty: 1 | 2 | 3
  timeLimit: number
  question: string
  grid: [[Cell, Cell, Cell], [Cell, Cell, Cell], [Cell, Cell, Cell]]
  options: [Cell, Cell, Cell, Cell]
  answer: 0 | 1 | 2 | 3
}

export type Question = TextQuestion | MatrixQuestion

export interface SavedAnswer {
  timeSpent: number
  isCorrect: boolean
}
