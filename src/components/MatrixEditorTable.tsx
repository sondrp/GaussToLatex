import { useState, useEffect } from 'react'
import EditableTd from './EditableTd'

type Props = {
  matrix: string[][]
  editCell: (rowIndex: number, colIndex: number, value: string) => void
}

export default function MatrixEditorTable(props: Props) {
  const { editCell } = props
  const [matrix, setMatrix] = useState<string[][]>([])

  useEffect(() => {
    setMatrix(props.matrix.map((row) => [...row]))
  }, [props.matrix])

  return (
    <table className="size-fit">
      <tbody>
        {matrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((data, colIndex) => (
              <EditableTd
                onChange={(e) => editCell(rowIndex, colIndex, e.target.value)}
                className="border border-slate-400 p-4"
                inputClassName="bg-inherit text-center outline-none"
                key={colIndex}
                value={data}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
