'use client'

import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  href?: string
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

const variants = {
  primary:
    'bg-[#48D1CC] text-white hover:bg-brand-dark shadow-md shadow-brand/25 hover:shadow-[0_0_25px_rgba(72,209,204,0.5)] transition-all duration-300',
  outline: 'border-2 border-brand text-slate-900 hover:bg-brand-light bg-white',
  ghost: 'text-brand hover:bg-brand-light',
}

const motionSafe =
  'transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:active:scale-100'

export function Button({
  children,
  variant = 'primary',
  className = '',
  href,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const classes = `inline-flex min-h-12 items-center justify-center rounded-xl px-6 text-sm font-semibold transition-colors ${variants[variant]} ${motionSafe} ${className}`

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${classes} ${disabled ? 'pointer-events-none hover:scale-100 active:scale-100' : ''}`}
    >
      {children}
    </button>
  )
}
