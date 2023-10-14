import { ReactNode, createContext, useState } from 'react'
import { Coffee } from '../../db/coffeeList'

interface CartContextType {
  coffees?: Coffee[]
  addToCart: (coffee: Coffee) => void
  removeToCart: (id: number) => void
  addQuantity: (coffeeToAddQuantity: Coffee) => void
  removeQuantity: (coffeeToRemoveQuantity: Coffee) => void
}

export const CartContext = createContext({} as CartContextType)

interface CartProviderProps {
  children: ReactNode
}
export function CartProvider({ children }: CartProviderProps) {
  const [coffees, setCoffees] = useState<Coffee[]>([])

  function addToCart(coffee: Coffee) {
    setCoffees((state) => [...state, coffee])
  }

  function removeToCart(id: number) {
    const indexOfCoffee = coffees.findIndex((coffee) => coffee.id === id)

    setCoffees((state) => {
      if (indexOfCoffee < 0) {
        return state
      }

      return state.filter((_, index) => index !== indexOfCoffee)
    })
  }

  function addQuantity(coffeeToAddQuantity: Coffee) {
    const indexOfCoffee = coffees.findIndex(
      (coffee) => coffee.id === coffeeToAddQuantity.id,
    )

    if (indexOfCoffee < 0) {
      coffeeToAddQuantity.quantity = 1
      addToCart(coffeeToAddQuantity)
      return
    }

    setCoffees((state) => {
      const newCoffees = [...state]

      newCoffees[indexOfCoffee].quantity! += 1

      return newCoffees
    })
  }

  function removeQuantity(coffeeToRemoveQuantity: Coffee) {
    const indexOfCoffee = coffees.findIndex(
      (coffee) => coffee.id === coffeeToRemoveQuantity.id,
    )

    if (indexOfCoffee >= 0) {
      setCoffees((state) => {
        const newCoffees = [...state]

        if (newCoffees[indexOfCoffee].quantity! >= 1) {
          newCoffees[indexOfCoffee].quantity! -= 1
        }

        return newCoffees
      })
    }
  }

  return (
    <CartContext.Provider
      value={{ coffees, addToCart, removeToCart, addQuantity, removeQuantity }}
    >
      {children}
    </CartContext.Provider>
  )
}
