import { cn } from "../utils/cn"
import cross from '../assets/cross.svg'

type Props = {
  matrix: string[][]
  deleteMatrix: () => void
} & React.HTMLAttributes<HTMLDivElement>

export default function MatrixDisplay(props: Props) {
  const { matrix, deleteMatrix, className, onClick, ...divProps } = props

  return (
    <div
      {...divProps}
      className={cn(
        'group relative cursor-pointer border-x border-black',
        className,
      )}
    >
      <div className="absolute left-0 top-0 h-0.5 w-2 border-t border-black" />
      <div className="absolute right-0 top-0 h-0.5 w-2 border-t border-black" />
      <div className="absolute bottom-0 left-0 h-0.5 w-2 border-b border-black" />
      <div className="absolute bottom-0 right-0 h-0.5 w-2 border-b border-black" />

      <button
        onClick={deleteMatrix}
        className={cn(
          'absolute -right-2 -top-2 hidden size-4 items-center justify-center rounded-full border border-black bg-red-700 hover:scale-150 group-hover:flex',
        )}
      >
        <img src={cross} alt="open/close navgbar" className="size-3" />
      </button>
      <table onClick={onClick}>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((data, i) => (
                <td
                  className="items-center justify-center border-black px-2 last:border-l"
                  key={i}
                >
                  {data}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
