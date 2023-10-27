import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
  base: 'p-2 rounded cursor-pointer transition-[background-color] duration-150 ease-in-out uppercase',

  variants: {
    variant: {
      ghost: ['bg-purple-700 text-white-200', 'hover:bg-purple-500'],
      primary: [
        'text-white-50 bg-yellow-500 py-3 font-bold text-sm',
        'hover:bg-yellow-700',
        'disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-yellow-500',
      ],
      remove: [
        'flex items-center justify-center gap-1 bg-white-400 max-h-[32px] text-xs text-brown-500',
        'hover:bg-brown-100 hover:text-brown-700',
      ],
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export function Button({ className, variant, ...props }: ButtonProps) {
  return <button {...props} className={button({ variant, className })} />
}
