import { ReactNode, useState } from 'react'
import { cn } from '../utils/cn'
import arrowLeft from '../assets/arrowLeft.svg'

export default function Navbar({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true)

  return (
    <div
      className={cn(
        'relative flex h-fit items-start justify-between border-b border-black bg-slate-300 px-20 py-10 transition-all duration-500',
        !open && 'h-10 py-0',
      )}
    >
      {open && children}
      <button
        className={cn(
          'absolute rotate-90 -bottom-5 left-20 flex size-10 items-center justify-center rounded-full border border-black bg-slate-200 transition-all duration-500',
          !open && '-rotate-90',
        )}
        onClick={() => setOpen(!open)}
      >
        <img src={arrowLeft} alt="open/close navgbar" className="size-6" />
      </button>
    </div>
  )
}
