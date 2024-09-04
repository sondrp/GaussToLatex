import { Fragment, useState } from 'react'
import { cn } from './utils/cn'
import arrowLeft from './assets/arrowLeft.svg'
import { useImmer } from 'use-immer'
import MatrixCreator from './components/MatrixCreator'
import MatrixDisplay from './components/MatrixDisplay'
import MatrixEditorTable from './components/MatrixEditorTable'
import Navbar from './components/Navbar'

function App() {
  const [matrices, setMatrices] = useImmer<string[][][]>([]) // Hard to stop using Immer for nested objects after having tried once
  const [selectedMatrixIndex, setSelectedMatrixIndex] = useState(0)

  const pushMatrix = (matrix: string[][]) => {
    setMatrices(draft => {
      draft.push(matrix)
    })
    setSelectedMatrixIndex(matrices.length)
  }

  const deleteMatrix = (index: number) => {
    setMatrices((draft) => {
      draft.splice(index, 1)
    })
  }

  const editCell = (rowIndex: number, colIndex: number, value: string) => {
    setMatrices(draft => {
      draft[selectedMatrixIndex][rowIndex][colIndex] = value
    })
  }


  // will not push, but splice the matrix in, after the index. Making it possible to expand previous?
  const commitAndContinue = () => {
    if (selectedMatrixIndex < matrices.length) {
      const newMatrix = matrices[selectedMatrixIndex].map(row => [...row])
      setMatrices(draft => {
        draft.splice(selectedMatrixIndex, 0, newMatrix)
      })
      setSelectedMatrixIndex(old => old + 1) // increment selection to select the new matrix
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
                className={cn(i === selectedMatrixIndex && 'scale-110')}
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
      <div className="flex h-full w-full gap-10 py-20 items-end">
        <div className="w-1/5" />
        {selectedMatrixIndex < matrices.length &&
        <>
          <MatrixEditorTable
          editCell={editCell}
          matrix={matrices[selectedMatrixIndex]}
          />
          <button className='border border-black bg-green-700 rounded-md text-slate-100 py-2 px-4' onClick={commitAndContinue}>Opprett kopi og gå videre</button>
          </>
        }
      </div>
    </div>
  )
}

export default App
