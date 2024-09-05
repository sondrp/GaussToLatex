import { useState, useEffect, ReactNode } from 'react'
import EditableTd from './EditableTd'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../App'
import { cn } from '../utils/cn'

type Props = {
  matrix: string[][]
  swapRows: (index1: number, index2: number) => void,
  editCell: (rowIndex: number, colIndex: number, value: string) => void
}

export default function MatrixEditorTable(props: Props) {
  const { swapRows, editCell } = props
  const [matrix, setMatrix] = useState<string[][]>([])

  useEffect(() => {
    setMatrix(props.matrix.map((row) => [...row]))
  }, [props.matrix])


  return (
    <table className="size-fit">
      <tbody>
        {matrix.map((row, rowIndex) => (
          <DragnDropTr handleDrop={(movingRowIndex: number) => swapRows(movingRowIndex, rowIndex)} rowIndex={rowIndex} key={rowIndex}>
            {row.map((data, colIndex) => (
              <EditableTd
                onChange={(e) => editCell(rowIndex, colIndex, e.target.value)}
                className="border border-slate-400 p-4"
                inputClassName="bg-inherit text-center outline-none"
                key={colIndex}
                value={data}
              />
            ))}
          </DragnDropTr>
        ))}
      </tbody>
    </table>
  )
}

type DnDRowProps = {
  handleDrop: (rowIndex: number) => void
  rowIndex: number
  children: ReactNode
}

function DragnDropTr(props: DnDRowProps) {
  const { children, rowIndex, handleDrop } = props

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.ROW,
      item: { rowIndex },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [rowIndex],
  )

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.ROW,
      drop: (item: { rowIndex: number }) => handleDrop(item.rowIndex),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [handleDrop],
  )

  return (
    <tr
      className={cn("transition-all duration-500", isDragging && 'bg-ol-200', isOver && 'bg-ol-400')}
      ref={(ref) => drag(drop(ref))}
    >
      {children}
    </tr>
  )
}
