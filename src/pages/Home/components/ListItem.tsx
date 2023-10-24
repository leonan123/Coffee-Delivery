import { ShoppingCartSimple } from 'phosphor-react'
import { Coffee } from '../../../db/coffeeList'
import { Button } from '../../../components/Button'
import { useEffect, useState } from 'react'
import { Counter } from '../../../components/Counter'
import { useCart } from '../../../contexts/Cart/useCart'

interface ListItemProps {
  coffee: Coffee
}

export function ListItem({ coffee }: ListItemProps) {
  const [counter, setCounter] = useState(0)
  const { addToCart, items } = useCart()

  function handleAddToCart() {
    addToCart(coffee, counter)
  }

  function onRemoveQuantity() {
    setCounter((state) => {
      if (state > 0) {
        return state - 1
      }

      return state
    })
  }

  function onAddQuantity() {
    setCounter((state) => state + 1)
  }

  useEffect(() => {
    const currentCoffeeId = coffee.id

    const indexOfCoffee =
      items.findIndex((item) => item.id === currentCoffeeId) ?? -1

    if (indexOfCoffee >= 0) {
      setCounter(items[indexOfCoffee].quantity || 0)
    }
  }, [coffee, items])

  return (
    <li
      key={coffee.id}
      className="flex flex-col items-center justify-center space-y-2 rounded-bl-[36px] rounded-se-[36px] bg-white-200 px-5 pb-5"
    >
      <img
        src={coffee.image}
        alt=""
        width={120}
        height={120}
        className="-mt-5"
      />
      <div className="flex items-center justify-center gap-2">
        {coffee.tags.map((tag) => {
          return (
            <span
              key={tag}
              className="rounded-xl bg-yellow-100 px-2 py-1 text-xxs font-bold uppercase leading-3 text-yellow-700"
            >
              {tag}
            </span>
          )
        })}
      </div>
      <h3 className="font-secondary text-xl text-brown-900">{coffee.name}</h3>
      <p className="text-center text-sm text-brown-400">{coffee.description}</p>
      <div className="flex w-full items-center justify-between pt-8">
        <span className="text-xs text-brown-700">
          R${' '}
          <span className="font-secondary text-2xl font-extrabold">
            {coffee.price.toString()}
          </span>
        </span>
        <div className="flex items-center justify-center gap-2">
          <Counter
            coffeeId={coffee.id}
            onAddQuantity={onAddQuantity}
            onRemoveQuantity={onRemoveQuantity}
            counter={counter}
          />
          <Button variant="ghost" onClick={handleAddToCart}>
            <ShoppingCartSimple weight="fill" size={22} />
          </Button>
        </div>
      </div>
    </li>
  )
}
