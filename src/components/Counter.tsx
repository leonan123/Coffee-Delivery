import { Minus, Plus } from 'phosphor-react'
import { useEffect } from 'react'
import { useCart } from '../contexts/Cart/useCart'

interface CounterProps {
  coffeeId: number
  counter?: number
  onAddQuantity?: () => void
  onRemoveQuantity?: () => void
}

export function Counter({
  coffeeId,
  counter = 0,
  onAddQuantity,
  onRemoveQuantity,
}: CounterProps) {
  const { items, removeFromCart, addQuantity, removeQuantity } = useCart()

  const indexOfCoffee = items.findIndex((item) => item.id === coffeeId)

  function handleRemoveQuantity() {
    if (indexOfCoffee >= 0) {
      removeQuantity(coffeeId)
    } else {
      onRemoveQuantity!()
    }
  }

  function handleAddQuantity() {
    if (indexOfCoffee >= 0) {
      addQuantity(coffeeId)
    } else {
      onAddQuantity!()
    }
  }

  useEffect(() => {
    if (counter === 0 && indexOfCoffee >= 0 && !items[indexOfCoffee].quantity) {
      removeFromCart(coffeeId)
    }
  }, [counter, indexOfCoffee, removeFromCart, coffeeId, items])

  const coffeeQuantity =
    items.find((item) => item.id === coffeeId)?.quantity ?? counter

  return (
    <div className="flex min-h-[32px] max-w-[72px] items-center justify-around gap-2 rounded-md bg-white-400 p-2">
      <button
        className="font-bold text-purple-500 transition-colors hover:text-purple-700"
        onClick={handleRemoveQuantity}
      >
        <Minus size={14} weight="fill" />
      </button>
      <span className="min-w-[20px] text-center text-brown-900">
        {coffeeQuantity}
      </span>
      <button className="font-bold text-purple-500 transition-colors hover:text-purple-700">
        <Plus size={14} strokeWidth={2} onClick={handleAddQuantity} />
      </button>
    </div>
  )
}
