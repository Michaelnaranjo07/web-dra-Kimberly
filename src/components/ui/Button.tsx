import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger'
  children: ReactNode
}

const variants = {
  primary: 'bg-signal text-white hover:bg-ink',
  ghost: 'bg-white text-ink border border-line hover:bg-paper',
  danger: 'bg-transparent text-red-700 hover:bg-red-50 border border-red-200',
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold',
        'transition-[transform,background-color,color] duration-150 ease-out-strong',
        'active:scale-97 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
