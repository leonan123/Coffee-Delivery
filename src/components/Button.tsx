import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
  base: 'p-2 rounded cursor-pointer transition-[background-color] duration-150 ease-in-out',

  variants: {
    variant: {
      ghost: ['bg-purple-700 text-white-200', 'hover:bg-purple-500'],
      primary: ['bg-yellow-500', 'hover:bg-yellow-700'],
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
