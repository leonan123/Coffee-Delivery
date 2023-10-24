import { ReactNode, createContext, useState } from 'react'
import { Coffee } from '../../db/coffeeList'

export interface CartProps extends Coffee {
  quantity?: number
}

interface CartContextType {
  items: CartProps[]
  addToCart: (coffee: Coffee, quantity: number) => void
  removeToCart: (id: number) => void
  removeQuantity: (coffeeIdToRemove: number) => void
  addQuantity: (coffeeIdToAddQuantity: number) => void
}

export const CartContext = createContext({} as CartContextType)

interface CartProviderProps {
  children: ReactNode
}
export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartProps[]>([])

  function addToCart(coffeeToAdd: CartProps, quantity: number = 1) {
    const indexOfCoffee = items.findIndex((item) => item.id === coffeeToAdd.id)

    if (indexOfCoffee >= 0) {
      setItems((state) => {
        const newCoffees = state.map((item, index) => {
          if (index === indexOfCoffee) {
            return { ...item, quantity: (item.quantity || 0) + quantity }
          }

          return item
        })

        return newCoffees
      })
    } else {
      coffeeToAdd.quantity = quantity
      setItems((state) => [...state, coffeeToAdd])
    }
  }

  function removeToCart(id: number) {
    setItems((state) => state.filter((item) => item.id !== id))
  }

  function addQuantity(coffeeIdToAddQuantity: number) {
    const indexOfCoffee = items.findIndex(
      (item) => item.id === coffeeIdToAddQuantity,
    )

    if (indexOfCoffee < 0) return

    setItems((state) => {
      const newCoffees = state.map((item, index) => {
        if (index === indexOfCoffee) {
          return { ...item, quantity: (item.quantity || 0) + 1 }
        }

        return item
      })
      return newCoffees
    })
  }

  function removeQuantity(coffeeIdToRemove: number) {
    const indexOfCoffee = items.findIndex(
      (item) => item.id === coffeeIdToRemove,
    )

    if (indexOfCoffee >= 0) {
      setItems((state) => {
        const newCoffees = state.map((item, index) => {
          if (index === indexOfCoffee && item.quantity !== 0) {
            return { ...item, quantity: (item.quantity || 0) - 1 }
          }

          return item
        })

        return newCoffees
      })
    }
  }

  console.log(items)
  return (
    <CartContext.Provider
      value={{ items, addToCart, removeToCart, removeQuantity, addQuantity }}
    >
      {children}
    </CartContext.Provider>
  )
}
