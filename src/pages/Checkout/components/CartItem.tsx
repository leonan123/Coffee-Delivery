import { Trash } from 'phosphor-react'
import { Button } from '../../../components/Button'
import { Counter } from '../../../components/Counter'
import { useCart } from '../../../contexts/Cart/useCart'
import { CartProps } from '../../../contexts/Cart'

interface CartItemProps {
  coffee: CartProps
}

export function CartItem({ coffee }: CartItemProps) {
  const { removeToCart } = useCart()

  function removeFromCart() {
    removeToCart(coffee.id)
  }

  return (
    <div className="flex flex-col-reverse flex-wrap justify-between border-b border-white-400 px-2 pb-6 md:flex-row ">
      <div className="flex items-center gap-5">
        <img src={coffee.image} alt={coffee.name} className="h-16 w-16" />
        <div className="space-y-1">
          <span className="text-brown-700">{coffee.name}</span>
          <div className="flex flex-wrap items-center gap-2">
            <Counter coffeeId={coffee.id} counter={-1} />
            <Button variant="remove" className="group" onClick={removeFromCart}>
              <Trash
                size={16}
                className="text-purple-500 transition-colors group-hover:text-purple-700"
              />
              remover
            </Button>
          </div>
        </div>
      </div>

      <span className="flex-1 text-end font-bold text-brown-500">
        R$ {coffee.price.toFixed(2)}
      </span>
    </div>
  )
}
