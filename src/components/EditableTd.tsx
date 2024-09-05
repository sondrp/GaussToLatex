import { useRef, useEffect } from 'react'
import { cn } from '../utils/cn'

type Props = {
  inputClassName?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function EditableTd(props: Props) {
  const { className, inputClassName, ...tdProps } = props
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.width = '20px'
    ref.current.style.width = `${ref.current.scrollWidth}px`
  }, [tdProps.value])

  return (
    <td className={cn(className)} onClick={() => ref.current?.select()}>
      <input className={cn(inputClassName)} {...tdProps} ref={ref} />
    </td>
  )
}
