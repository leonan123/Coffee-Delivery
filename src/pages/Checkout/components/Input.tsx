import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import * as Tooltip from '@radix-ui/react-tooltip'

interface InputProps extends ComponentProps<'input'> {
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function (
  { className, error = '', ...props },
  ref,
) {
  const isRequired = props.required ?? true

  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger asChild>
          <label className={twMerge(className, 'relative text-brown-500')}>
            <input
              ref={ref}
              {...props}
              className={twMerge(
                'w-full rounded border border-white-400 bg-white-300 p-3 outline-none focus:ring-2 focus:ring-yellow-700',
                error && 'border-red-800',
                !isRequired && 'pe-20',
              )}
            />

            {!isRequired && (
              <span className="pointer-events-none absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs italic opacity-80">
                Opcional
              </span>
            )}
          </label>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          {error && (
            <Tooltip.Content
              side="bottom"
              align="start"
              sticky="always"
              sideOffset={5}
              className="w-full rounded bg-red-100 p-2 text-sm text-red-800"
            >
              {error}
            </Tooltip.Content>
          )}
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
})

Input.displayName = 'Input'
