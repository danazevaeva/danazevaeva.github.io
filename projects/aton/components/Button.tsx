import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'main' | 'secondary' | 'text-red'
}

const styles = {
  main: 'bg-c1 text-c0 shadow-[0_15px_30px_rgba(0,0,0,0.15)]',
  secondary: 'bg-c5 text-c1',
  'text-red': 'bg-transparent text-c12 !p-0 !shadow-none',
} as const

export function Button({ variant, className = '', ...props }: ButtonProps) {
  const base = "font-['Gotham',sans-serif] font-medium text-[16px] leading-[22px] border-none rounded-2xl cursor-pointer transition-transform active:scale-[0.97]"
  const padding = variant === 'text-red' ? '' : 'px-6 py-[13px]'
  return (
    <button
      className={`${base} ${padding} ${styles[variant]} ${className}`}
      {...props}
    />
  )
}
