import { MapPin, ShoppingCart } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/Cart/useCart'

export function Header() {
  const { coffees } = useCart()

  const totalItems = coffees?.reduce((acc, coffee) => {
    return acc + coffee.quantity!
  }, 0)

  return (
    <header className="flex items-center justify-between px-6 py-8 md:container md:mx-auto">
      <Link to="/">
        <img src="./Logo.svg" alt="Coffee Delivery" />
      </Link>
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center justify-center gap-1 rounded-md bg-purple-100 p-2 font-normal">
          <MapPin size={22} weight="fill" className="text-purple-500"></MapPin>
          <span className="text-sm text-purple-700">Três de Maio, RS</span>
        </div>
        <div className="relative flex items-center justify-center rounded-md bg-yellow-100 p-2">
          <Link to="/checkout" className="text-yellow-700">
            <ShoppingCart size={22} weight="fill" />
          </Link>
          <span className="absolute -right-[8.345px] -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-700 text-xs text-white-50">
            {totalItems}
          </span>
        </div>
      </div>
    </header>
  )
}
