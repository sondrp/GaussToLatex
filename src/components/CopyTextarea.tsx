import { useEffect, useRef, useState } from 'react'
import copy from '../assets/copy.svg'
import { cn } from '../utils/cn'

export default function CopyTextArea({ value }: { value: string }) {
  const [clicked, setClicked] = useState(false)
  const ref = useRef<HTMLTextAreaElement>(null)

  const handleClick = () => {
    setClicked(!clicked)
    navigator.clipboard.writeText(value)
  }

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.height = '40px'
    ref.current.style.height = `${ref.current.scrollHeight}px`
  }, [value])

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="absolute right-2 top-2 flex items-center"
      >
        <p
          className={cn(
            'text-xs font-bold tracking-wider',
            clicked && 'text-slate-500 opacity-50',
          )}
        >
          Copy latex
        </p>
        <img src={copy} alt="copy text" className="size-6" />
      </button>

      <textarea
        ref={ref}
        readOnly
        className="w-80 resize-none bg-slate-300 p-4 outline-none"
        value={value}
      />
    </div>
  )
}
