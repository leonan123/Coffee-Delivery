import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends ComponentProps<'input'> {
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function (
  { className, error = '', ...props },
  ref,
) {
  return (
    <>
      <input
        ref={ref}
        type="text"
        {...props}
        className={twMerge(
          className,
          'w-full rounded border border-white-400 bg-white-300 p-3 text-brown-500 outline-none focus:ring-2 focus:ring-yellow-700',
        )}
      />
      {error && <span className="text-red-500">{error}</span>}
    </>
  )
})

Input.displayName = 'Input'
