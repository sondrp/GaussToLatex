import { Fragment, useEffect, useRef, useState } from 'react'
import { cn } from './utils/cn'
import arrowLeft from './assets/arrowLeft.svg'
import { useImmer } from 'use-immer'
import MatrixCreator from './components/MatrixCreator'
import MatrixDisplay from './components/MatrixDisplay'
import MatrixEditorTable from './components/MatrixEditorTable'
import Navbar from './components/Navbar'

export const ItemTypes = {
  ROW: 'row',
  MATRIX: 'matrix', // TODO: implement swap of matrix?
}

function App() {
  // string[][] is temporary data type for matrix. Very likely that I move this to a hook, along with operations for changing the data
  const [matrices, setMatrices] = useImmer<string[][][]>([]) // Hard to stop using Immer for nested objects after having tried once
  const [selectedMatrixIndex, setSelectedMatrixIndex] = useState(0)

  const pushMatrix = (matrix: string[][]) => {
    setMatrices((draft) => {
      draft.push(matrix)
    })
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

  const commitAndContinue = () => {
    if (selectedMatrixIndex < matrices.length) {
      const newMatrix = matrices[selectedMatrixIndex].map((row) => [...row])
      setMatrices((draft) => {
        draft.splice(selectedMatrixIndex, 0, newMatrix)
      })
      setSelectedMatrixIndex((old) => old + 1) // increment selection to select the new matrix
    }
  }

  return (
    <div className="min-h-screen bg-slate-200">
      <Navbar>
        <MatrixCreator pushMatrix={pushMatrix} />
        <div className="flex items-center gap-2 transition-all duration-500">
          {matrices.map((matrix, i) => (
            <Fragment key={i}>
              <MatrixDisplay
                deleteMatrix={() => deleteMatrix(i)}
                className={cn(
                  i === selectedMatrixIndex &&
                    'scale-110 shadow-xl shadow-slate-400',
                )}
                onClick={() => setSelectedMatrixIndex(i)}
                matrix={matrix}
              />
              <img
                src={arrowLeft}
                className="size-6 rotate-180 last:hidden"
                alt="math arrow next"
              />
            </Fragment>
          ))}
        </div>
      </Navbar>
      <div className="flex flex-col h-full w-full gap-10 py-20 px-80">
        {selectedMatrixIndex < matrices.length && (
          <>
            <MatrixEditorTable
              swapRows={swapRows}
              editCell={editCell}
              matrix={matrices[selectedMatrixIndex]}
            />
            <button
              className="rounded-md border border-black bg-green-700 px-4 py-2 text-slate-100 w-fit"
              onClick={commitAndContinue}
            >
              Opprett kopi og gå videre
            </button>
          </>
        )}
        <div className="flex w-full flex-col gap-2">
          <LaTextArea lines={[amstmath]} />
          <LaTextArea lines={[beginMatrix, ...generateLatex([]), endMatrix, "",  "% Dummy data for now"]} />
        </div>
      </div>
    </div>
  )
}

function generateLatex(matrix: string[][]): string[] {

  // dummy data for now
  return [
    "1 & 2 & 3 \\\\",
    "4 & 5 & 6 \\\\",
    "7 & 8 & 9",
  ]
}

const amstmath = '\\usepackage{amsmath}'
const beginMatrix = `\\[
\\begin{bmatrix}`
const endMatrix = `\\end{bmatrix}
\\]`

function LaTextArea({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.height = '40px'
    ref.current.style.height = `${ref.current.scrollHeight}px`
  }, [lines])

  return (
    <textarea
      ref={ref}
      readOnly
      className="h-10 w-1/3 resize-none bg-slate-300 p-4 outline-none"
      value={lines.join('\n')}
    />
  )
}

export default App
