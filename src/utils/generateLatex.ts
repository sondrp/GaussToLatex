
// Turns the array of matrices into latex that can be copied into a .tex file.
export function generateLatex(matrices: string[][][], breakpoints: boolean[]) {
  return `\\begin{align*}
&${matrices
    .map((matrix) => generateLatexRows(matrix))
    .reduce((acc, str, index) => {
      console.log()
      if (matrices.length - 1 === index) return acc + str
      return acc + str + matrixRowSeparator(breakpoints[index])
    }, '')}
\\end{align*}`
}

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
