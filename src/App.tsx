import { Fragment, useEffect, useState } from 'react'
import { cn } from './utils/cn'
import arrowLeft from './assets/arrowLeft.svg'
import { useImmer } from 'use-immer'
import MatrixCreator from './components/MatrixCreator'
import MatrixDisplay from './components/MatrixDisplay'
import MatrixEditorTable from './components/MatrixEditorTable'
import Navbar from './components/Navbar'
import LaTextarea from './components/LaTextarea'

export const ItemTypes = {
  ROW: 'row',
  MATRIX: 'matrix', // TODO: implement swap of matrix?
}

function App() {
  // string[][] is temporary data type for matrix. Very likely that I move this to a hook, along with operations for changing the data
  const [matrices, setMatrices] = useImmer<string[][][]>([]) // Hard to stop using Immer for nested objects after having tried once
  const [breakpoints, setBreakpoints] = useImmer<boolean[]>([])
  const [selectedMatrixIndex, setSelectedMatrixIndex] = useState(0)

  const pushMatrix = (matrix: string[][]) => {
    setMatrices([...matrices, matrix])
    setBreakpoints([...breakpoints, false])
    setSelectedMatrixIndex(matrices.length)
  }

  const deleteMatrix = (index: number) => {
    setMatrices((draft) => {
      draft.splice(index, 1)
    })
    setSelectedMatrixIndex((old) => Math.max(0, old - 1))
  }

  const editCell = (rowIndex: number, colIndex: number, value: string) => {
    setMatrices((draft) => {
      draft[selectedMatrixIndex][rowIndex][colIndex] = value
    })
  }

  const swapRows = (index1: number, index2: number) => {
    const row1 = matrices[selectedMatrixIndex][index1]
    const row2 = matrices[selectedMatrixIndex][index2]

    setMatrices((draft) => {
      draft[selectedMatrixIndex].splice(index1, 1, row2)
      draft[selectedMatrixIndex].splice(index2, 1, row1)
    })
  }

  const toggleBreakpoint = (index: number) => {
    setBreakpoints((draft) => {
      draft[index] = !draft[index]
    })
  }

  const commitAndContinue = () => {
    if (selectedMatrixIndex < matrices.length) {
      const newMatrix = matrices[selectedMatrixIndex].map((row) => [...row])
      setMatrices((draft) => {
        draft.splice(selectedMatrixIndex, 0, newMatrix)
      })
      setBreakpoints((draft) => {
        draft.splice(selectedMatrixIndex, 0, false)
      })
      setSelectedMatrixIndex((old) => old + 1) // increment selection to select the new matrix
    }
  }

  return (
    <div className="min-h-screen bg-slate-200">
      <Navbar>
        <MatrixCreator pushMatrix={pushMatrix} />
        <div className="flex w-[600px] flex-wrap items-center gap-2 border-x transition-all duration-500">
          {matrices.map((matrix, i) => (
            <Fragment key={i}>
              <MatrixDisplay
                deleteMatrix={() => deleteMatrix(i)}
                className={cn(
                  'first:ml-8',
                  i === selectedMatrixIndex &&
                    'scale-110 shadow-xl shadow-slate-400',
                )}
                onClick={() => setSelectedMatrixIndex(i)}
                matrix={matrix}
              />
              {breakpoints[i] && <div className="w-full" />}
              <button
                onClick={() => toggleBreakpoint(i)}
                className="last:hidden"
              >
                <img
                  src={arrowLeft}
                  className="size-6 rotate-180"
                  alt="math arrow next"
                />
              </button>
            </Fragment>
          ))}
        </div>
      </Navbar>
      <div className="flex size-full justify-between gap-10 py-20 pl-80 pr-20">
        <div className="flex flex-col gap-2">
          {selectedMatrixIndex < matrices.length && (
            <>
              <MatrixEditorTable
                swapRows={swapRows}
                editCell={editCell}
                matrix={matrices[selectedMatrixIndex]}
              />
              <button
                className="w-fit whitespace-nowrap rounded-md border border-black bg-green-700 px-4 py-2 text-slate-100"
                onClick={commitAndContinue}
              >
                Copy & continue
              </button>
            </>
          )}
        </div>
        <div className="flex w-1/3 flex-col items-end gap-2">
          <textarea
            readOnly
            className="h-14 w-80 resize-none bg-slate-300 p-4 outline-none"
            value="\usepackage{amsmath}"
          />
          {matrices.length > 0 && (
            <LaTextarea breakpoints={breakpoints} matrices={matrices} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
