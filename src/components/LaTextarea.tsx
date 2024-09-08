/* REFERENCE 


\\begin{align*}
&\\begin{bmatrix}
\\begin{array}{ccc|c}
1 & 2 & -1 & 3 \\\\
2 & 3 & 3 & 15 \\\\
1 & 1 & 2 & 8
\\end{array}
\\end{bmatrix}
\\longrightarrow
\\begin{bmatrix}
\\begin{array}{ccc|c}
1 & 2 & -1 & 3 \\\\
0 & -1 & 5 & 9 \\\\
1 & 1 & 2 & 8
\\end{array}
\\end{bmatrix}
\\longrightarrow
\\begin{bmatrix}
\\begin{array}{ccc|c}
1 & 2 & -1 & 3 \\\\
0 & -1 & 5 & 9 \\\\
0 & -1 & 3 & 5
\\end{array}
\\end{bmatrix} \\\\
&\\begin{bmatrix}
\\begin{array}{ccc|c}
1 & 2 & -1 & 3 \\\\
2 & 3 & 3 & 15 \\\\
1 & 1 & 2 & 8
\\end{array}
\\end{bmatrix}
\\longrightarrow
\\begin{bmatrix}
\\begin{array}{ccc|c}
1 & 2 & -1 & 3 \\\\
0 & -1 & 5 & 9 \\\\
1 & 1 & 2 & 8
\\end{array}
\\end{bmatrix}
\\longrightarrow
\\begin{bmatrix}
\\begin{array}{ccc|c}
1 & 2 & -1 & 3 \\\\
0 & -1 & 5 & 9 \\\\
0 & -1 & 3 & 5
\\end{array}
\\end{bmatrix}
\\end{align*}
    


*/

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

export default function LaTextarea({ matrices }: { matrices: string[][][] }) {
  const ref = useRef<HTMLTextAreaElement>(null)

  const latex = `\\usepackage{amsmath}

\\begin{align*}
&${matrices.map((matrix) => generateLatexRows(matrix)).join('\n\\longrightarrow\n')}
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
      className="h-10 w-1/3 resize-none bg-slate-300 p-4 outline-none"
      value={latex}
    />
  )
}
