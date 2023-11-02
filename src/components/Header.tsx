import { MapPin, ShoppingCart } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/Cart/useCart'
import { useLocation } from '../contexts/Location/useLocation'
import * as Tooltip from '@radix-ui/react-tooltip'

export function Header() {
  const { items } = useCart()
  const { location } = useLocation()

  const totalItems = items.reduce((acc, coffee) => {
    return acc + (coffee.quantity || 0)
  }, 0)

  return (
    <header className="flex items-center justify-between px-6 py-8 md:container md:mx-auto">
      <Link to="/">
        <img src="./Logo.svg" srcSet="../Logo.svg" alt="Coffee Delivery" />
      </Link>

      <div className="flex items-center justify-center gap-3">
        {location.city && location.stateCode ? (
          <div className="flex items-center justify-center gap-1 rounded-md bg-purple-100 p-2 font-normal">
            <MapPin
              size={22}
              weight="fill"
              className="text-purple-500"
            ></MapPin>
            <span className="text-sm text-purple-700">
              {location.city}, {location.stateCode}
            </span>
          </div>
        ) : (
          <Tooltip.Provider delayDuration={0}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div className="flex cursor-pointer items-center justify-center gap-1 rounded-md bg-purple-100 p-2 font-normal">
                  <MapPin
                    size={22}
                    weight="fill"
                    className="text-purple-500"
                  ></MapPin>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  sideOffset={2}
                  className="rounded bg-purple-100 p-2 text-sm text-brown-700"
                >
                  Não possuímos os dados da sua localização
                  <Tooltip.Arrow className="fill-purple-100" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        )}

        <Link to="/checkout" className="text-yellow-700">
          <div className="relative flex items-center justify-center rounded-md bg-yellow-100 p-2">
            <ShoppingCart size={22} weight="fill" />
            <span className="absolute -right-[8.345px] -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-700 text-xs text-white-50">
              {totalItems}
            </span>
          </div>
        </Link>
      </div>
    </header>
  )
}
