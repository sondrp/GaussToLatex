import { useState } from 'react'

type Props = {
  pushMatrix: (matrix: string[][]) => void
}

// height x width
export default function MatrixCreator(props: Props) {
  const { pushMatrix } = props
  const [width, setWidth] = useState(3)
  const [height, setHeight] = useState(3)

  const handleCreate = () => {
    const matrix = Array(height)
      .fill(null)
      .map(() => Array(width).fill('0'))
    pushMatrix(matrix)
  }

  return (
    <div className="flex w-fit flex-col">
      <div className="flex justify-between">
        <input
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value, 10) || 0)}
          className="w-10 rounded-md border border-black bg-slate-200 p-2 text-center outline-none"
        />
        <div className="text-3xl">x</div>
        <input
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value, 10) || 0)}
          className="w-10 rounded-md border border-black bg-slate-200 p-2 text-center outline-none"
        />
      </div>
      <button
        onClick={handleCreate}
        className="text-sm italic tracking-wide underline"
      >
        Opprett ny matrise
      </button>
    </div>
  )
}
