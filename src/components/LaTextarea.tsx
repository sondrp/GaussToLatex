import { useRef, useEffect } from 'react'

const generateLatexRows = (matrix: string[][]): string => {
  const cols = matrix.length > 0 ? matrix[0].length : 0
  const columnDescription = `${'c'.repeat(cols - 1)}|c`
  return `\\begin{bmatrix}
\\begin{array}{${columnDescription}}
${matrix.map((row) => row.join(' & ')).join(' \\\\\n')}
\\end{array}
\\end{bmatrix}`
}

const matrixRowSeparator = (newline: boolean) =>
  newline ? '\n\\\\\\longrightarrow&\n' : '\n\\longrightarrow\n'

type Props = {
  matrices: string[][][]
  breakpoints: boolean[]
}

export default function LaTextarea(props: Props) {
  const { matrices, breakpoints } = props
  const ref = useRef<HTMLTextAreaElement>(null)


  const latex = `\\begin{align*}
&${matrices
    .map((matrix) => generateLatexRows(matrix))
    .reduce((acc, str, index) => {
      console.log()
      if (matrices.length - 1 === index) return acc + str
      return acc + str + matrixRowSeparator(breakpoints[index])
    }, '')}
\\end{align*}`

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.height = '40px'
    ref.current.style.height = `${ref.current.scrollHeight}px`
  }, [matrices])

  return (
    <textarea
      ref={ref}
      readOnly
      className="h-10 w-80 resize-none bg-slate-300 p-4 outline-none"
      value={latex}
    />
  )
}
