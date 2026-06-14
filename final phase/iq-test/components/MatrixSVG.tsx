'use client'

import type { Cell } from '@/lib/types'

const CELL = 64
const CX = CELL / 2
const CY = CELL / 2

function getRadius(size: Cell['size'], count: Cell['count']): number {
  const table: Record<Cell['size'], [number, number, number]> = {
    sm: [10, 8, 7],
    md: [15, 12, 9],
    lg: [20, 13, 9],
  }
  return table[size][count - 1]
}

function getPositions(count: Cell['count'], r: number): [number, number][] {
  const spacing = r + 4
  if (count === 1) return [[CX, CY]]
  if (count === 2) return [[CX - spacing, CY], [CX + spacing, CY]]
  return [[CX - spacing, CY], [CX, CY], [CX + spacing, CY]]
}

function ShapeEl({
  shape, fill, r, cx, cy, rotation = 0,
}: {
  shape: Cell['shape']
  fill: Cell['fill']
  r: number
  cx: number
  cy: number
  rotation?: number
}) {
  const accent = '#059669'
  const fillColor = fill === 'filled' ? accent : 'none'
  const props = { fill: fillColor, stroke: accent, strokeWidth: 1.5 }
  const tr = rotation ? `rotate(${rotation} ${cx} ${cy})` : undefined

  if (shape === 'circle') {
    return <circle cx={cx} cy={cy} r={r} {...props} transform={tr} />
  }
  if (shape === 'square') {
    return <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} {...props} transform={tr} />
  }
  // triangle — equilateral, pointing up by default
  const pts = `${cx},${cy - r} ${cx + r * 0.866},${cy + r * 0.5} ${cx - r * 0.866},${cy + r * 0.5}`
  return <polygon points={pts} {...props} transform={tr} />
}

export function CellSVG({ cell, size = CELL }: { cell: Cell; size?: number }) {
  const r = getRadius(cell.size, cell.count)
  const positions = getPositions(cell.count, r)
  return (
    <svg viewBox={`0 0 ${CELL} ${CELL}`} width={size} height={size}>
      {positions.map(([cx, cy], i) => (
        <ShapeEl
          key={i}
          shape={cell.shape}
          fill={cell.fill}
          r={r}
          cx={cx}
          cy={cy}
          rotation={cell.rotation}
        />
      ))}
    </svg>
  )
}

export function MatrixGrid({
  grid,
}: {
  grid: [[Cell, Cell, Cell], [Cell, Cell, Cell], [Cell, Cell, Cell]]
}) {
  return (
    <div className="inline-grid grid-cols-3 gap-1 rounded-xl p-1" style={{ background: '#E2E8F0' }}>
      {grid.flat().map((c, i) => (
        <div
          key={i}
          className="bg-white rounded-lg flex items-center justify-center"
          style={{ width: CELL, height: CELL }}
        >
          {i === 8 ? (
            <span className="text-xl font-bold" style={{ color: '#CBD5E1' }}>?</span>
          ) : (
            <CellSVG cell={c} />
          )}
        </div>
      ))}
    </div>
  )
}

export function OptionCell({
  cell,
  index,
  selected,
  correct,
  revealed,
  onClick,
}: {
  cell: Cell
  index: number
  selected: number | null
  correct: number
  revealed: boolean
  onClick: () => void
}) {
  let borderColor = '#E2E8F0'
  let bg = 'white'

  if (revealed) {
    if (index === correct) { borderColor = '#059669'; bg = '#ECFDF5' }
    else if (index === selected) { borderColor = '#EF4444'; bg = '#FEF2F2' }
  } else if (selected === index) {
    borderColor = '#059669'
    bg = '#ECFDF5'
  }

  return (
    <button
      onClick={onClick}
      disabled={revealed}
      className="rounded-xl flex items-center justify-center transition-all active:scale-95"
      style={{
        width: CELL + 24,
        height: CELL + 24,
        border: `2px solid ${borderColor}`,
        background: bg,
        cursor: revealed ? 'default' : 'pointer',
        boxShadow: revealed ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={e => { if (!revealed) e.currentTarget.style.borderColor = '#059669' }}
      onMouseLeave={e => { if (!revealed && selected !== index) e.currentTarget.style.borderColor = '#E2E8F0' }}
    >
      <CellSVG cell={cell} size={CELL} />
    </button>
  )
}
