import { Minus, Plus } from 'phosphor-react'
import { useCart } from '../../../contexts/Cart/useCart'
import { Coffee } from '../../../db/coffeeList'

interface CounterProps {
  coffee: Coffee
}
export function Counter({ coffee }: CounterProps) {
  const { coffees, addQuantity, removeQuantity } = useCart()

  function handleAddCount() {
    addQuantity(coffee)
  }

  function handleRemoveCount() {
    removeQuantity(coffee)
  }

  const count = coffees?.find((item) => item.id === coffee.id)?.quantity ?? 0

  return (
    <div className="flex items-center justify-around gap-2 rounded-md bg-white-400 p-2">
      <button
        className="font-bold text-purple-500 transition-colors hover:text-purple-700"
        onClick={handleRemoveCount}
      >
        <Minus size={14} weight="fill" />
      </button>
      <span className="min-w-[20px] text-center text-brown-900">{count}</span>
      <button className="font-bold text-purple-500 transition-colors hover:text-purple-700">
        <Plus size={14} strokeWidth={2} onClick={handleAddCount} />
      </button>
    </div>
  )
}
